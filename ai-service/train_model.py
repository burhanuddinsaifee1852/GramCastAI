import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib

np.random.seed(42)

n = 500

block_rainfall = np.random.uniform(0, 50, n)
latitude = np.random.uniform(22.90, 23.05, n)
longitude = np.random.uniform(75.75, 75.90, n)
elevation = np.random.uniform(450, 650, n)
humidity = np.random.uniform(45, 95, n)

local_adjustment = (
    (elevation - 550) * 0.015
    + (humidity - 70) * 0.08
    + (latitude - 22.97) * 12
    - (longitude - 75.82) * 8
)

noise = np.random.normal(0, 1.8, n)

local_rainfall = np.maximum(
    0,
    block_rainfall + local_adjustment + noise
)

X = np.column_stack([
    block_rainfall,
    latitude,
    longitude,
    elevation,
    humidity
])

split = 400

X_train = X[:split]
X_test = X[split:]

y_train = local_rainfall[:split]
y_test = local_rainfall[split:]

model = RandomForestRegressor(
    n_estimators=120,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

mae = mean_absolute_error(
    y_test,
    predictions
)

rmse = mean_squared_error(
    y_test,
    predictions
) ** 0.5

baseline_predictions = X_test[:, 0]

baseline_mae = mean_absolute_error(
    y_test,
    baseline_predictions
)

baseline_rmse = mean_squared_error(
    y_test,
    baseline_predictions
) ** 0.5

joblib.dump(
    model,
    "models/gramcast_rain_v1.joblib"
)

metrics = {
    "baseline_mae": float(baseline_mae),
    "baseline_rmse": float(baseline_rmse),
    "gramcast_mae": float(mae),
    "gramcast_rmse": float(rmse)
}

joblib.dump(
    metrics,
    "models/metrics.joblib"
)

print("✅ GramCast prototype model trained")
print()
print("Baseline MAE :", round(baseline_mae, 3))
print("GramCast MAE :", round(mae, 3))
print()
print("Baseline RMSE:", round(baseline_rmse, 3))
print("GramCast RMSE:", round(rmse, 3))
