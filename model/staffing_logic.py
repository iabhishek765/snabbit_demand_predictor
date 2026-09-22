
import math


def recommend_staff(
    predicted_demand: float,
    bookings_per_staff: int = 5
):
    """
    Convert predicted demand into staffing recommendations.

    Args:
        predicted_demand: Predicted number of bookings.
        bookings_per_staff: Bookings handled by one staff member.

    Returns:
        Dictionary containing staffing recommendation.
    """

    if predicted_demand < 0:
        raise ValueError("Predicted demand cannot be negative.")

    if bookings_per_staff <= 0:
        raise ValueError("Bookings per staff must be greater than zero.")

    recommended_staff = math.ceil(
        predicted_demand / bookings_per_staff
    )

    if predicted_demand == 0:
        demand_level = "Low"
    elif predicted_demand <= 20:
        demand_level = "Medium"
    else:
        demand_level = "High"

    return {
        "predicted_demand": round(predicted_demand, 2),
        "recommended_staff": recommended_staff,
        "demand_level": demand_level
    }