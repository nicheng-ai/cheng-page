"""Profile data models"""
from pydantic import BaseModel, EmailStr
from typing import Optional


class Institution(BaseModel):
    """Institution model"""
    name: str
    url: str


class ProfileResponse(BaseModel):
    """Profile response model"""
    name: str
    name_chinese: str
    name_english: str
    title: str
    institution: Optional[Institution] = None
    university: Optional[str] = None
    degree: Optional[str] = None
    age: Optional[int] = None
    email: EmailStr
    bio: str
    goal: str
    image_filename: str
