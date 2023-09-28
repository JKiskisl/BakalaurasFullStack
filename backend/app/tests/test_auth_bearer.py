
import asyncio
import unittest
from fastapi.testclient import TestClient
from fastapi import Request, HTTPException
from ..auth.auth_bearer import JWTBearer





class MockRequest:
    def __init__(self, url_path, token=None):
        self.url = MockURL(url_path)
        self.headers= {}
        if token:
            self.headers["Authorization"] = f"Bearer {token}"

class MockURL:
    def __init__(self, path):
        self.path=path
        
        

        
        
        
class TestJWTBearer(unittest.TestCase):
    def setUp(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
        self.jwt_bearer = JWTBearer(auto_error=False)  # Set auto_error to False for testing

    def tearDown(self):
        self.loop.close()

    def run_async(self, coro):
        return self.loop.run_until_complete(coro)

    def test_valid_token(self):
        valid_token = "VALID_TOKEN"
        mock_request = MockRequest("/posts", token=valid_token)
        credentials = self.run_async(self.jwt_bearer(mock_request))
        self.assertEqual(credentials, valid_token)

    def test_expired_token(self):
        expired_token = "EXPIRED_TOKEN"
        mock_request = MockRequest("/posts", token=expired_token)
        credentials = self.run_async(self.jwt_bearer(mock_request))
        self.assertEqual(credentials, expired_token)

    def test_refreshed_token(self):
        original_token = "ORIGINAL_TOKEN"
        refreshed_token = "REFRESHED_TOKEN"
        mock_request = MockRequest("/user/logout", token=original_token)
        credentials = self.run_async(self.jwt_bearer(mock_request))
        self.assertEqual(credentials, refreshed_token)



    def test_invalid_scheme(self):
        invalid_scheme_token = "INVALID_SCHEME_TOKEN"
        mock_request = MockRequest("/posts", token=invalid_scheme_token)
        credentials = self.run_async(self.jwt_bearer(mock_request))
        self.assertEqual(credentials, invalid_scheme_token)


    def test_missing_token(self):
        mock_request = MockRequest("/posts")
        with self.assertRaises(HTTPException):
            self.run_async(self.jwt_bearer(mock_request))