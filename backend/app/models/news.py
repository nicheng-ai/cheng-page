"""News data models"""
from pydantic import BaseModel
from typing import List, Literal


class NewsItem(BaseModel):
    """Single news item model"""
    id: int
    date: str
    date_full: str
    content: str
    type: Literal["milestone", "talk", "project", "award"]


class NewsResponse(BaseModel):
    """News response model"""
    items: List[NewsItem]
