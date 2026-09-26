
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("predictionForm");
    const predictBtn = document.getElementById("predictBtn");

    const predictionResult = document.getElementById("predictionResult");
    const resultStatus = document.getElementById("resultStatus");
    const errorMessage = document.getElementById("errorMessage");

    const recommendedStaff = document.getElementById("recommendedStaff");
    const demandLevel = document.getElementById("demandLevel");
    const forecastStatus = document.getElementById("forecastStatus");
    const forecastTableBody = document.getElementById("forecastTableBody");
    const forecastCanvas = document.getElementById("forecastChart");

    let forecastChart = null;

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

// Display staffing recommendation
const staffing = result.staffing_recommendation;

recommendedStaff.textContent =
    staffing.recommended_staff;

// Display demand level
demandLevel.textContent =
    staffing.demand_level;

resultStatus.textContent = "Success";
await loadForecast(data);
        } catch (error) {
            console.error("Prediction error:", error);

            predictionResult.textContent = "--";
            resultStatus.textContent = "Error";
            errorMessage.textContent = error.message;
        } finally {
            predictBtn.disabled = false;
        }

async function loadForecast(data) {
    forecastStatus.textContent = "Loading...";
    forecastTableBody.innerHTML = "";

    try {
        const response = await fetch("/forecast", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail || "Forecast generation failed"
            );
        }

        const forecast = result.forecast;

        forecastStatus.textContent = "Success";

        // Create table rows
        forecast.forEach((item) => {
            const row = document.createElement("tr");


            const demandLevel = item.demand_level;

row.innerHTML = `
    <td>${String(item.hour).padStart(2, "0")}:00</td>
    <td>${Math.round(item.predicted_demand)}</td>
    <td>${item.recommended_staff}</td>
    <td>
        <span class="demand-badge ${demandLevel.toLowerCase()}">
            ${demandLevel}
        </span>
    </td>
`;

            

            forecastTableBody.appendChild(row);
        });

        // Destroy previous chart
        if (forecastChart) {
            forecastChart.destroy();
        }

        // Create new chart
        
        forecastChart = new Chart(forecastCanvas, {
    type: "line",

    data: {
        labels: forecast.map(
            item => `${String(item.hour).padStart(2, "0")}:00`
        ),

        datasets: [{
            label: "Predicted Demand",

            data: forecast.map(
                item => item.predicted_demand
            ),

            borderColor: "#2f80ed",
            backgroundColor: "rgba(47, 128, 237, 0.10)",

            borderWidth: 3,

            tension: 0.4,

            fill: true,

            pointRadius: 3,
            pointHoverRadius: 6,

            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#2f80ed",
            pointBorderWidth: 2,

            pointHoverBackgroundColor: "#2f80ed",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 2
        }]
    },

    options: {
        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index"
        },

        plugins: {
            legend: {
                display: true,

                labels: {
                    usePointStyle: true,
                    pointStyle: "line",
                    padding: 20,

                    font: {
                        size: 13,
                        weight: "600"
                    }
                }
            },

            tooltip: {
                backgroundColor: "#1f2937",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",

                padding: 12,

                displayColors: false,

                callbacks: {
                    label: function(context) {
                        return `Demand: ${context.parsed.y} units`;
                    }
                }
            }
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: "Hour",

                    font: {
                        size: 13,
                        weight: "600"
                    }
                },

                grid: {
                    color: "rgba(148, 163, 184, 0.18)"
                },

                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            },

            y: {
                beginAtZero: true,

                title: {
                    display: true,
                    text: "Demand",

                    font: {
                        size: 13,
                        weight: "600"
                    }
                },

                grid: {
                    color: "rgba(148, 163, 184, 0.20)"
                },

                ticks: {
                    precision: 0
                }
            }
        }
    }
});



    } catch (error) {
        console.error("Forecast error:", error);

        forecastStatus.textContent = "Error";

        forecastTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    ${error.message}
                </td>
            </tr>
        `;
    }
}      

    
    });
});