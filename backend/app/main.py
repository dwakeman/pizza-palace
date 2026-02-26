from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import orders_router, menu_router

# Create FastAPI app
app = FastAPI(
    title="Pizza Palace API",
    description="API for ordering custom pizzas online (Stub Mode - No Database)",
    version="1.0.0-stub",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(orders_router, prefix="/api")
app.include_router(menu_router, prefix="/api")


@app.on_event("startup")
def on_startup():
    """Startup event - using stub data (no database)"""
    print("🍕 Pizza Palace API started in STUB MODE (no database)")
    print("📝 Using in-memory data storage for testing")


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Pizza Palace API",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=True
    )

# Made with Bob
