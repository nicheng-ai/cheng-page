"""Travels API routes"""
from fastapi import APIRouter, HTTPException
from app.models.travels import TravelsResponse
from app.services.data_service import DataService

router = APIRouter()
data_service = DataService()


@router.get("/travels", response_model=TravelsResponse)
async def get_travels():
    try:
        return data_service.load_travels()
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
