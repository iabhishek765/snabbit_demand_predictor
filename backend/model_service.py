
from pathlib import Path
import joblib
import pandas as pd
import numpy as np


# Locate the saved model
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model" / "gradient_boosting_model.pkl"


# Load model artifact
model_artifact = joblib.load(MODEL_PATH)

model = model_artifact["model"]
features = model_artifact["features"]


def create_features(
    hour: int,
    day_of_week: int,
    day_of_month: int,
    month: int,
    week_of_year: int,
    is_weekend: int
):
    """
    Create model features in the same order
    used during training.
    """

    hour_sin = np.sin(2 * np.pi * hour / 24)
    hour_cos = np.cos(2 * np.pi * hour / 24)

    day_sin = np.sin(2 * np.pi * day_of_week / 7)
    day_cos = np.cos(2 * np.pi * day_of_week / 7)

    input_data = pd.DataFrame([{
        "hour": hour,
        "day_of_week": day_of_week,
        "day_of_month": day_of_month,
        "month": month,
        "week_of_year": week_of_year,
        "is_weekend": is_weekend,
        "hour_sin": hour_sin,
        "hour_cos": hour_cos,
        "day_sin": day_sin,
        "day_cos": day_cos
    }])

    # Ensure the exact training feature order
    input_data = input_data[features]

    return input_data


def predict_demand(
    hour: int,
    day_of_week: int,
    day_of_month: int,
    month: int,
    week_of_year: int,
    is_weekend: int
):

    input_data = create_features(
        hour,
        day_of_week,
        day_of_month,
        month,
        week_of_year,
        is_weekend
    )

    prediction = model.predict(input_data)[0]

    return round(float(prediction), 2)