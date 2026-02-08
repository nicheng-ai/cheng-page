"""Profile API routes"""
from fastapi import APIRouter, HTTPException, Query
from app.models.profile import ProfileResponse
from app.services.data_service import DataService

router = APIRouter()
data_service = DataService()


@router.get("/profile", response_model=ProfileResponse)
async def get_profile(lang: str = Query("zh", regex="^(en|zh)$")):
    """
    Get user profile information in specified language

    Args:
        lang: Language code ('zh' or 'en'), defaults to 'zh'

    Returns:
        Profile data including name, title, bio, etc.

    Raises:
        HTTPException: If profile data cannot be loaded
    """
    try:
        profile = data_service.load_profile(lang=lang)
        return profile
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=f"Profile not found: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
