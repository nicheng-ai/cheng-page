"""
FastAPI application entry point for personal website backend.
Provides RESTful API endpoints for profile, research, news, and social links.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pathlib import Path

from app.api.routes import profile, research, news, social, travels, publications

app = FastAPI(
    title="Personal Website API",
    description="Backend API for Cheng Ni's personal website",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(profile.router, prefix="/api", tags=["profile"])
app.include_router(research.router, prefix="/api", tags=["research"])
app.include_router(news.router, prefix="/api", tags=["news"])
app.include_router(social.router, prefix="/api", tags=["social"])
app.include_router(travels.router, prefix="/api", tags=["travels"])
app.include_router(publications.router, prefix="/api", tags=["publications"])

@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "Personal Website API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/api/profile-image")
async def get_profile_image():
    """Serve profile image"""
    image_path = Path(__file__).parent / "app" / "data" / "images" / "profile.jpg"
    if not image_path.exists():
        # Return a placeholder or 404
        return {"error": "Profile image not found"}
    return FileResponse(image_path, media_type="image/jpeg")
