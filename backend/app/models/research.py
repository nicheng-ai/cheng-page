"""Research data models"""
from pydantic import BaseModel


class ResearchResponse(BaseModel):
    """Research response model"""
    interests: str
    questions: str
    current_focus: str
