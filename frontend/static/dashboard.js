
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("predictionForm");
    const predictBtn = document.getElementById("predictBtn");

    const predictionResult = document.getElementById("predictionResult");
    const resultStatus = document.getElementById("resultStatus");
    const errorMessage = document.getElementById("errorMessage");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Clear previous messages
        errorMessage.textContent = "";
        predictionResult.textContent = "...";
        resultStatus.textContent = "Predicting...";
        predictBtn.disabled = true;

        // Collect form values
        const data = {
            hour: Number(document.getElementById("hour").value),
            day_of_week: Number(document.getElementById("day_of_week").value),
            day_of_month: Number(document.getElementById("day_of_month").value),
            month: Number(document.getElementById("month").value),
            week_of_year: Number(document.getElementById("week_of_year").value),
            is_weekend: Number(document.getElementById("is_weekend").value)
        };

        try {
            const response = await fetch("/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.detail || "Prediction failed"
                );
            }

            // Display prediction
            predictionResult.textContent =
                Math.round(result.predicted_demand);

            resultStatus.textContent = "Success";
        } catch (error) {
            console.error("Prediction error:", error);

            predictionResult.textContent = "--";
            resultStatus.textContent = "Error";
            errorMessage.textContent = error.message;
        } finally {
            predictBtn.disabled = false;
        }
    });
});