"""Research API routes"""
from fastapi import APIRouter, HTTPException, Query
from app.models.research import ResearchResponse
from app.services.data_service import DataService

router = APIRouter()
data_service = DataService()


@router.get("/research", response_model=ResearchResponse)
async def get_research(lang: str = Query("zh", regex="^(en|zh)$")):
    """
    Get research interests and focus in specified language

    Args:
        lang: Language code ('zh' or 'en'), defaults to 'zh'

    Returns:
        Research data including interests, questions, and current focus

    Raises:
        HTTPException: If research data cannot be loaded
    """
    try:
        research = data_service.load_research(lang=lang)
        return research
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=f"Research data not found: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
