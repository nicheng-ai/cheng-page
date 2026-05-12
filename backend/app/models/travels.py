from pydantic import BaseModel
from typing import List, Literal

class Place(BaseModel):
    id: int
    name: str
    country: str
    lat: float
    lng: float
    type: Literal["lived", "visited"]
    note: str

class TravelsResponse(BaseModel):
    places: List[Place]
