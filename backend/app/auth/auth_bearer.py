from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .auth_handler import decodeJWT, refreshJWT

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        
        if not credentials:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

        # Check if it's a logout request
        if request.url.path.endswith("/user/logout"):
            return credentials.credentials
        
        # For other requests, proceed with token verification
        if not credentials.scheme == "Bearer":
            raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
        
        if not self.verify_jwt(credentials.credentials):
            raise HTTPException(status_code=403, detail="Invalid token or expired token.")
        
        return credentials.credentials

    async def verify_jwt(self, jwtoken: str) -> bool:
        try:
            payload = await decodeJWT(jwtoken)
            if payload:
                return True
            else:
                refreshed_token = refreshJWT(jwtoken)
                if refreshed_token:
                    self.credentials.credentials = refreshed_token["access_token"]
                    print("Token refreshed successfully")
                    print(refreshed_token)
                    return True
        except Exception as e:
            print(f"Error verifying token: {e}")
        return False
