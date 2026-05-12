from pydantic import BaseModel
from typing import List, Optional

class Publication(BaseModel):
    id: int
    title: str
    title_en: str
    authors: str
    venue: str
    venue_short: str
    year: int
    url: Optional[str] = ""
    tags: List[str] = []

class PublicationsResponse(BaseModel):
    items: List[Publication]
