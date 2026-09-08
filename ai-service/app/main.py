from pathlib import Path

import joblib
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = (
    BASE_DIR
    / "models"
    / "gramcast_rain_v1.joblib"
)

METRICS_PATH = (
    BASE_DIR
    / "models"
    / "metrics.joblib"
)


model = joblib.load(MODEL_PATH)
metrics = joblib.load(METRICS_PATH)


app = FastAPI(
    title="GramCast AI Service",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionRequest(BaseModel):

    blockRainfall: float

    latitude: float

    longitude: float

    elevation: float

    humidity: float


@app.get("/health")
def health():

    return {
        "service": "gramcast-ai",
        "status": "UP",
        "modelVersion": "gramcast-rain-v1",
        "mode": "PROTOTYPE"
    }


@app.post("/predict/downscale")
def predict(
    request: PredictionRequest
):

    features = np.array([
        [
            request.blockRainfall,
            request.latitude,
            request.longitude,
            request.elevation,
            request.humidity
        ]
    ])

    prediction = float(
        model.predict(features)[0]
    )

    lower = max(
        0.0,
        prediction - 3.5
    )

    upper = prediction + 3.5

    if prediction >= 25:

        risk = "HIGH"

    elif prediction >= 18:

        risk = "MODERATE"

    else:

        risk = "LOW"


    return {
        "blockRainfall": round(
            request.blockRainfall,
            2
        ),

        "predictedRainfall": round(
            prediction,
            2
        ),

        "lowerBound": round(
            lower,
            2
        ),

        "upperBound": round(
            upper,
            2
        ),

        "risk": risk,

        "modelVersion":
            "gramcast-rain-v1",

        "modelMode":
            "PROTOTYPE"
    }


@app.get("/metrics")
def get_metrics():

    return {
        "modelVersion":
            "gramcast-rain-v1",

        "mode":
            "PROTOTYPE_SYNTHETIC_DATA",

        "baselineMAE":
            round(
                metrics[
                    "baseline_mae"
                ],
                3
            ),

        "baselineRMSE":
            round(
                metrics[
                    "baseline_rmse"
                ],
                3
            ),

        "gramcastMAE":
            round(
                metrics[
                    "gramcast_mae"
                ],
                3
            ),

        "gramcastRMSE":
            round(
                metrics[
                    "gramcast_rmse"
                ],
                3
            )
    }
