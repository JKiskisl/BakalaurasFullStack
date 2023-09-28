
from pydantic import BaseModel, Field, EmailStr


class PostSchema(BaseModel):
    id: int = Field(default=None)
    title: str = Field(...)
    content: str = Field(...)
    date: str = Field(...)
    happythings: str = Field(...)
    waterintake: int = Field(...)
    todaysmood: int = Field(...)
    selfcareActivities: str = Field(...)
    Breakfast: str = Field(...)
    Lunch: str = Field(...)
    Dinner: str = Field(...)
    Snacks: str = Field(...)
    Anxious: str = Field(...)
    Sad: str = Field(...)
    email: str = None

    class Config:
        schema_extra = {
            "example": {
                "title": "Securing FastAPI applications with JWT.",
                "content": "Test!",
                "date": "08/24/2023",
                "happythings": "Enjoyed a walk in the park.",
                "waterintake": 5,
                "todaysmood": 4,
                "selfcareActivities": "Read a book",
                "Breakfast": "Oatmeal",
                "Lunch": "Salad",
                "Dinner": "Grilled chicken",
                "Snacks": "Fruit",
                "Anxious": "Managed stress through deep breathing",
                "Sad": "Something reminded me of my ex",
            }
        }
class UserSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Name Surname",
                "email": "test@test.com",
                "password": "password123"
            }
        }

class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "test@test.com",
                "password": "password123"
            }
        }
        
class UpdatePostSchema(BaseModel):
    title: str = Field(default=None)
    content: str = Field(default=None)
    date: str = Field(default=None)
    happythings: str = Field(default=None)
    waterintake: int = Field(default=None)
    todaysmood: int = Field(default=None)
    selfcareActivities: str = Field(default=None)
    Breakfast: str = Field(default=None)
    Lunch: str = Field(default=None)
    Dinner: str = Field(default=None)
    Snacks: str = Field(default=None)
    Anxious: str = Field(default=None)
    Sad: str = Field(default=None)
    
    
    class Config:
        schema_extra = {
            "example": {
                "title": "UpdatedContent",
                "content": "Test!",
                "date": "08/24/2023",
                "happythings": "Enjoyed a walk in the park.",
                "waterintake": 5,
                "todaysmood": 4,
                "selfcareActivities": "Read a book",
                "Breakfast": "Oatmeal",
                "Lunch": "Salad",
                "Dinner": "Grilled chicken",
                "Snacks": "Fruit",
                "Anxious": "Managed stress through deep breathing",
                "Sad": "Something reminded me of my ex",
            }
        }