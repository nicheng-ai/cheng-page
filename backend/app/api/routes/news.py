"""News API routes"""
from fastapi import APIRouter, HTTPException, Query
from app.models.news import NewsResponse
from app.services.data_service import DataService

router = APIRouter()
data_service = DataService()


@router.get("/news", response_model=NewsResponse)
async def get_news(lang: str = Query("zh", regex="^(en|zh)$")):
    """
    Get news updates in specified language

    Args:
        lang: Language code ('zh' or 'en'), defaults to 'zh'

    Returns:
        News data including list of news items

    Raises:
        HTTPException: If news data cannot be loaded
    """
    try:
        news = data_service.load_news(lang=lang)
        return news
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=f"News data not found: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
