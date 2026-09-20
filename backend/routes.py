
from fastapi import APIRouter
from pydantic import BaseModel

from backend.model_service import predict_demand


router = APIRouter()


class DemandRequest(BaseModel):
    hour: int
    day_of_week: int
    day_of_month: int
    month: int
    week_of_year: int
    is_weekend: int


@router.get("/")
def home():
    return {"message": "Snabbit Demand Predictor API is running"}


@router.post("/predict")
def predict(request: DemandRequest):

    prediction = predict_demand(
        hour=request.hour,
        day_of_week=request.day_of_week,
        day_of_month=request.day_of_month,
        month=request.month,
        week_of_year=request.week_of_year,
        is_weekend=request.is_weekend
    )

    return {
        "predicted_demand": prediction
    }