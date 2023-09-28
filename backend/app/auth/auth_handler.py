
import time
from typing import Dict

import jwt
from decouple import config


JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")
TOKEN_REFRESH_THRESHOLD = 60

def token_response(token: str):
    return {
        "access_token": token
    }
    
def signJWT(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 1000
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def refreshJWT(token: str) -> Dict[str, str]:
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    current_time = time.time()
    expires_at = decoded_token.get("expires", 0)
    
    if expires_at < current_time:
        raise Exception("Token has already expired")
    
    if expires_at - current_time <= TOKEN_REFRESH_THRESHOLD:
        user_id = decoded_token.get("user_id", "")
        return signJWT(user_id)
    return token_response(token)

def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        return None
    except jwt.InvalidTokenError:
        print("Invalid token")
        return None
    except Exception as e:
        print("unexpected error during token decoding:", e)
        return None    
    

def expireJWT(token: str) -> Dict[str, str]:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        decoded_token["expires"] = time.time() - 1
        return {"message": "Token expired successfully"}
    except jwt.ExpiredSignatureError:
        print("Token has already expired")
        return {"message": "Token has already expired"}
    except jwt.InvalidTokenError:
        print("Invalid token")
        return {"message": "Invalid token"}
    except Exception as e:
        print("Unexpected error during token expiration:", e)
        return {"message": "Unexpected error during token expiration"}