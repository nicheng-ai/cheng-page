"""Social links data models"""
from pydantic import BaseModel
from typing import List


class SocialLink(BaseModel):
    """Single social link model"""
    name: str
    name_en: str = ""
    url: str
    icon: str


class SocialLinksResponse(BaseModel):
    """Social links response model"""
    links: List[SocialLink]
