"""Social links API routes"""
from fastapi import APIRouter, HTTPException
from app.models.social import SocialLinksResponse
from app.services.data_service import DataService

router = APIRouter()
data_service = DataService()


@router.get("/social-links", response_model=SocialLinksResponse)
async def get_social_links():
    """
    Get social media links (no translation needed)

    Returns:
        Social links data including list of links

    Raises:
        HTTPException: If social links data cannot be loaded
    """
    try:
        social_links = data_service.load_social_links()
        return social_links
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=f"Social links not found: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
