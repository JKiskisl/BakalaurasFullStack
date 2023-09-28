
from fastapi import FastAPI, Body, Depends, HTTPException, status, Request

from app.model import PostSchema, UserSchema, UserLoginSchema, UpdatePostSchema
from app.auth.auth_bearer import JWTBearer
from app.auth.auth_handler import signJWT
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from passlib.context import CryptContext
from app.auth.auth_handler import decodeJWT, refreshJWT, expireJWT
import jwt
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import JSONResponse
from app.custom_json_encoder import CustomJSONEncoder
import json
from bson.json_util import dumps

client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
users_collection = db["users"]
posts_collection = db["posts"]

users_collection.create_index("email", unique=True)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

async def get_current_user(token: str = Depends(JWTBearer())):
    try:
        payload = decodeJWT(token)
        if payload is None:
            refreshed_token = refreshJWT(token)
            if refreshed_token:
                payload = decodeJWT(refreshed_token["access_token"])
                token = refreshed_token["access_token"]
        
        email = payload.get("user_id")
        user_data = users_collection.find_one({"email": email})
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        return user_data
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token or token tampering detected.")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unexpected error during token verification/refresh.")

async def get_current_email(token: str = Depends(JWTBearer())):
    try:
        payload = decodeJWT(token)
        if payload is None:
            refreshed_token = refreshJWT(token)
            if refreshed_token:
                payload = decodeJWT(refreshed_token["access_token"])
                token = refreshed_token["access_token"]
        
        email = payload.get("user_id")
        user_data = users_collection.find_one({"email": email})
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        print("User email:", email)
        print(user_data)
        return user_data["email"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token or token tampering detected.")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unexpected error during token verification/refresh.")



@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your backend!"}


#lamaGPT
LLAMAGPT_URI = "http://localhost:3001/v1/completions"

class LLamaGPTRequest(BaseModel):
    prompt: str
    stop: list[str]

async def generate_llamagpt_response(input_text: str) -> str:
    llama_gpt_request_data = {
        "prompt": f"\n\n### Instructions:\n{input_text}\n\n### Response:\n",
        "stop": ["\n", "###"]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(LLAMAGPT_URI, json=llama_gpt_request_data, timeout=30)
        if response.status_code == 200:
            response_data = response.json()
            # Extract the generated text
            generated_text = response_data.get("choices", [{}])[0].get("text", "")
            if generated_text:
                return generated_text
            else:
                return "No generated text found in LLamaGPT response"
        else:
            return f"LlamaGPT request failed with status code {response.status_code}"


@app.post("/generate-ai-response", dependencies=[Depends(JWTBearer())], tags=["ai"])
async def generate_ai_response(input_text: str, email: str = Depends(get_current_email)) -> dict:
    generated_response = await generate_llamagpt_response(input_text)
    
    return {"generated_response": generated_response}
#End of llamagpt


@app.get("/posts", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def get_user_posts(email: str = Depends(get_current_email)) -> dict:
    print(email)
    user_posts = posts_collection.find({"email.email": email})
    serialized_posts = dumps(list(user_posts), cls=CustomJSONEncoder)
    return JSONResponse(content={"data": json.loads(serialized_posts)})


@app.get("/posts/{id}", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def get_single_post(id: int, email: str = Depends(get_current_email)) -> dict:
    post_data = posts_collection.find_one({"id": id, "email.email": email})
    serialized_post = dumps((post_data), cls=CustomJSONEncoder)
    if serialized_post:
        return JSONResponse(content={"data": json.loads(serialized_post)})
    return {
        "error":"No such post with supplied ID."
    }
            
@app.post("/posts", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def add_post(post: PostSchema, email=Depends(get_current_user)) -> dict:
    post_data = post.dict()
    post_data["email"] = email
    post_data["id"] = posts_collection.count_documents({}) + 1
    posts_collection.insert_one(post_data)
    return {
        "data": "post added."
    }
    
    
@app.post("/user/signup", tags=["user"])
async def create_user(user: UserSchema = Body(...)):
    hashed_password = pwd_context.hash(user.password)
    try:
        user_data = user.dict()
        user_data["password"] = hashed_password
        users_collection.insert_one(user_data)
        return signJWT(user.email)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Email already in use")


def check_user(data: UserLoginSchema):
    user_data = users_collection.find_one({"email": data.email})
    if user_data and pwd_context.verify(data.password, user_data["password"]):
        return True
    return False

@app.post("/user/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(...)):
    if check_user(user):
        return signJWT(user.email)
    else:
        raise HTTPException(status_code=401, detail="Wrong login details!")
    
    

@app.delete("/posts/{id}", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def delete_post(id: int, email: str = Depends(get_current_email)) -> dict:
    existing_post = posts_collection.find_one({"id": id, "email.email": email})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Post not found")
    posts_collection.delete_one({"id": id, "email.email": email})
    return {"data": "Post deleted succesfully"}


@app.put("/posts/{id}", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def update_post(id: int, post: UpdatePostSchema, email: str = Depends(get_current_email)) -> dict:
    existing_post = posts_collection.find_one({"id": id, "email.email": email})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    update_data = post.dict(exclude_unset=True)
    posts_collection.update_one({"id": id, "email.email": email}, {"$set": update_data})
    
    updated_post = posts_collection.find_one({"id": id, "email.email": email})
    serialized_post = dumps(updated_post, cls=CustomJSONEncoder)
    
    return JSONResponse(content={"data": json.loads(serialized_post)})
    
    
@app.post("/user/logout", tags=["user"])
async def user_logout(token: str = Depends(JWTBearer())) -> dict:
    try:
        response = expireJWT(token)
        return response
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token or token tampering detected.")
    except Exception as e:
        return("unexpected error", e)
    