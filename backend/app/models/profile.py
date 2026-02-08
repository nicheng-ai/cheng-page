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
    institution: Institution
    university: Optional[Institution] = None
    email: EmailStr
    bio: str
    goal: str
    image_filename: str
