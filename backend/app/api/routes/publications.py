from fastapi import APIRouter, HTTPException
from app.models.publications import PublicationsResponse
from app.services.data_service import DataService

router = APIRouter()
data_service = DataService()

@router.get("/publications", response_model=PublicationsResponse)
async def get_publications():
    try:
        return data_service.load_publications()
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
