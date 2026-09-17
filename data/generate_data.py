
from pathlib import Path
import sqlite3

import numpy as np
import pandas as pd


# Project paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATABASE_PATH = PROJECT_ROOT / "data" / "bookings.db"


# Reproducibility
RANDOM_SEED = 42
rng = np.random.default_rng(RANDOM_SEED)


# Dataset configuration
START_DATE = "2026-01-01"
DAYS = 180

ZONES = ["Z1", "Z2", "Z3", "Z4", "Z5"]

SERVICES = [
    "cleaning",
    "laundry",
    "appliance",
]


def generate_booking_data():
    """Generate synthetic hourly booking data."""

    timestamps = pd.date_range(
        start=START_DATE,
        periods=DAYS * 24,
        freq="h",
    )

    records = []
    booking_id = 1

    for timestamp in timestamps:
        hour = timestamp.hour
        weekday = timestamp.weekday()
        is_weekend = weekday >= 5

        # Synthetic rain condition
        rain_flag = int(rng.random() < 0.20)

        # Time-based demand patterns
        evening_multiplier = (
            1.6 if 17 <= hour <= 21 else 1.0
        )

        weekend_multiplier = (
            1.25 if is_weekend else 1.0
        )

        rain_multiplier = (
            1.15 if rain_flag else 1.0
        )

        # Mild growth over time
        days_elapsed = (timestamp - timestamps[0]).days
        trend_multiplier = 1 + (0.0008 * days_elapsed)

        for zone in ZONES:
            # Selected zones have higher baseline demand
            zone_multiplier = {
                "Z1": 1.0,
                "Z2": 1.1,
                "Z3": 1.5,
                "Z4": 0.9,
                "Z5": 1.3,
            }[zone]

            for service_type in SERVICES:
                service_multiplier = {
                    "cleaning": 1.0,
                    "laundry": 0.8,
                    "appliance": 0.6,
                }[service_type]

                base_demand = 3.0

                expected_bookings = (
                    base_demand
                    * zone_multiplier
                    * service_multiplier
                    * evening_multiplier
                    * weekend_multiplier
                    * rain_multiplier
                    * trend_multiplier
                )

                # Add realistic random variation
                bookings = int(
                    rng.poisson(expected_bookings)
                )

                providers_available = int(
                    max(
                        1,
                        round(
                            3
                            * zone_multiplier
                            + rng.normal(0, 0.5)
                        ),
                    )
                )

                records.append(
                    {
                        "booking_id": booking_id,
                        "timestamp": timestamp,
                        "zone": zone,
                        "service_type": service_type,
                        "rain_flag": rain_flag,
                        "providers_available": providers_available,
                        "bookings": bookings,
                    }
                )

                booking_id += 1

    return pd.DataFrame(records)


def save_to_sqlite(df):
    """Save generated data into SQLite."""

    DATABASE_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with sqlite3.connect(DATABASE_PATH) as connection:
        df.to_sql(
            "bookings",
            connection,
            if_exists="replace",
            index=False,
        )


if __name__ == "__main__":
    print("Generating synthetic booking data...")

    df = generate_booking_data()

    save_to_sqlite(df)

    print("\nData generation completed.")
    print(f"Total records: {len(df):,}")
    print(f"Database saved at: {DATABASE_PATH}")
    print("\nFirst five rows:")
    print(df.head())