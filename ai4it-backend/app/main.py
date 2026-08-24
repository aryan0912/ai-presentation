from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import linear_regression, neural_network

def create_app() -> FastAPI:
    app = FastAPI(title="AI4IT Backend API", version="1.0.0")

    # CORS configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register routers
    app.include_router(linear_regression.router, prefix="/api")
    app.include_router(neural_network.router, prefix="/api")

    @app.get("/api/health")
    def health_check():
        return {"status": "ok", "message": "API is running securely and cleanly"}

    return app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    # To run locally: uv run python -m app.main
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
