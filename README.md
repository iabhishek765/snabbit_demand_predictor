
# 📊 Snabbit Demand Predictor

### Machine Learning-Powered Demand Forecasting Web Application

> A full-stack machine learning application that predicts demand using time-based features and a trained Gradient Boosting regression model. Built with Python, FastAPI, and a responsive web interface.

---

## 🚀 Overview

**Snabbit Demand Predictor** is a machine learning project designed to estimate demand based on temporal patterns such as hour, day of the week, month, and week of the year.

The application combines a trained machine learning model with a FastAPI backend and an interactive frontend, allowing users to enter time-related information and receive demand predictions in real time.

The project focuses on applying machine learning in a practical application with API integration, input validation, and an accessible user interface.

---

## ✨ Features

- 📈 **Demand Prediction:** Estimate demand using a trained Gradient Boosting model.
- ⚡ **FastAPI Backend:** REST API for serving machine learning predictions.
- 🖥️ **Interactive Dashboard:** Clean and responsive frontend interface.
- 🔒 **Input Validation:** Validates request data through frontend and backend constraints.
- 🔄 **Real-Time API Communication:** Connects the frontend with the `/predict` endpoint.
- 📅 **Time-Based Features:** Uses hour, weekday, day, month, and week-of-year information.
- 🧪 **API Testing:** Supports endpoint verification through FastAPI Swagger UI.
- 🧩 **Modular Architecture:** Separates backend routes, model services, and frontend assets.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Programming Language | Python |
| Machine Learning | Scikit-learn |
| ML Algorithm | Gradient Boosting |
| Backend Framework | FastAPI |
| ASGI Server | Uvicorn |
| Frontend | HTML, CSS, JavaScript |
| API Format | REST / JSON |
| API Documentation | Swagger UI / OpenAPI |
| Environment | Python Virtual Environment |

---

## 🧠 Machine Learning

### Model

The application uses a **Gradient Boosting** machine learning model to estimate demand.

Gradient Boosting is an ensemble learning technique that builds a prediction model by combining multiple decision trees sequentially. Each new tree focuses on improving the errors made by the previous trees.

### Input Features

The model receives the following time-based features:

| Feature | Description |
|---|---|
| `hour` | Hour of the day (0–23) |
| `day_of_week` | Day of the week (0–6) |
| `day_of_month` | Day of the month (1–31) |
| `month` | Month of the year (1–12) |
| `week_of_year` | Week of the year (1–53) |
| `is_weekend` | Whether the date falls on a weekend |

### Prediction Output

The model returns an estimated demand value in units.

> Note: The displayed prediction is a model estimate and should not be treated as guaranteed real-world demand.

---

## 🏗️ Project Architecture

```text
snabbit_demand_predictor/
│
├── backend/
│   ├── app.py
│   ├── routes.py
│   └── model_service.py
│
├── data/
│
├── frontend/
│   ├── static/
│   │   ├── dashboard.js
│   │   └── style.css
│   │
│   └── templates/
│       └── dashboard.html
│
├── model/
│
├── notebooks/
│   └── eda_and_modeling.ipynb
│
├── outreach/
│
├── .gitignore
├── requirements.txt
└── README.md
```

### Architecture Flow

```text
User Input
    │
    ▼
Frontend Dashboard
    │
    ▼
JavaScript Fetch API
    │
    ▼
FastAPI Backend
    │
    ▼
Input Validation
    │
    ▼
Gradient Boosting Model
    │
    ▼
Demand Prediction
    │
    ▼
JSON Response
    │
    ▼
Frontend Result Display
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd snabbit_demand_predictor
```

### 2. Create a Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate the virtual environment:

```bash
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

Start the FastAPI development server:

```bash
uvicorn backend.app:app --reload
```

The exact startup command should match your local project configuration.

### 5. Open the Application

Dashboard:

```text
http://127.0.0.1:8000/
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🔌 API Documentation

### POST `/predict`

Generates a demand prediction using the supplied input features.

#### Request Body

```json
{
  "hour": 17,
  "day_of_week": 2,
  "day_of_month": 20,
  "month": 9,
  "week_of_year": 38,
  "is_weekend": false
}
```

#### Example Response

```json
{
  "prediction": 74
}
```

> The response structure above is illustrative. Confirm the exact response fields in your implementation before publishing this example.

### HTTP Status Codes

| Status Code | Meaning |
|---|---|
| `200` | Successful prediction |
| `422` | Invalid request data |
| `500` | Internal server error |

---

## 🧪 Testing & Validation

The application has been tested through the frontend and FastAPI Swagger interface.

### Completed Verification

- [x] Frontend prediction with valid inputs
- [x] Frontend input constraints
- [x] Backend valid request testing
- [x] Backend invalid request testing
- [x] Swagger UI API testing
- [x] Boundary-value prediction testing

### Validation Example

Invalid input:

```json
{
  "hour": 47,
  "day_of_week": 2,
  "day_of_month": 20,
  "month": 9,
  "week_of_year": 38,
  "is_weekend": false
}
```

Expected behavior:

```text
422 Unprocessable Entity
```

The backend should independently validate incoming requests, even when the frontend already restricts input values.

---

## 📊 Model Evaluation

Model evaluation should be documented using the actual results obtained during training and testing.

| Metric | Value |
|---|---|
| Algorithm | Gradient Boosting |
| Evaluation Dataset | Add verified dataset details |
| MAE | Add measured value |
| RMSE | Add measured value |
| R² Score | Add measured value |

> Evaluation metrics should be updated from the actual model training and evaluation results. They are not estimated in this README.

---

## 📁 Main Components

### Backend

**`backend/app.py`**

Application entry point and FastAPI configuration.

**`backend/routes.py`**

Defines API routes and request handling.

**`backend/model_service.py`**

Handles model loading and prediction logic.

### Frontend

**`frontend/templates/dashboard.html`**

Provides the dashboard structure and input form.

**`frontend/static/dashboard.js`**

Collects user inputs, sends requests to the backend, and displays prediction results.

**`frontend/static/style.css`**

Provides dashboard styling and layout.

### Machine Learning

**`notebooks/eda_and_modeling.ipynb`**

Used for exploratory data analysis and model development.

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- [ ] Add historical demand visualization.
- [ ] Compare multiple regression models.
- [ ] Display prediction confidence or uncertainty estimates where appropriate.
- [ ] Add model performance charts.
- [ ] Improve feature engineering for temporal patterns.
- [ ] Add automated tests for API validation.
- [ ] Deploy the application to a cloud platform.
- [ ] Add monitoring for model performance and input drift.

---

## ⚠️ Limitations

- Predictions depend on the quality and representativeness of the training data.
- Time-based features alone may not capture all factors affecting demand.
- Model performance should be assessed using a suitable held-out evaluation dataset.
- The current application is intended as a machine learning project and demonstration.

---

## 🎯 Learning Outcomes

Through this project, I practiced:

- Machine learning regression workflows.
- Gradient Boosting model implementation.
- Feature preparation for time-based prediction.
- FastAPI backend development.
- REST API integration with JavaScript.
- Input validation and API testing.
- Organizing a machine learning project for practical use.

---

## 👨‍💻 Author

**Krish**

B.Tech CSE | Artificial Intelligence & Machine Learning

Interested in Machine Learning, AI Engineering, and building practical data-driven applications.

---

## 📄 License

This project is intended for educational and portfolio purposes.

Add an appropriate license when publishing the repository.