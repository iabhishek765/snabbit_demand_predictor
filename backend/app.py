
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.routes import router


app = FastAPI(
    title="Snabbit Demand Predictor API",
    description="Demand prediction using Gradient Boosting",
    version="1.0.0"
)


# Serve frontend static files
app.mount(
    "/static",
    StaticFiles(directory="frontend/static"),
    name="static"
)


# Frontend home page
@app.get("/", response_class=FileResponse)
async def home():
    return "frontend/templates/dashboard.html"


# API routes
app.include_router(router)