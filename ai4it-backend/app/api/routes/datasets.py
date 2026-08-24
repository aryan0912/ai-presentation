from fastapi import APIRouter, HTTPException
from typing import Dict, Any

router = APIRouter(prefix="/datasets", tags=["datasets"])

CANONICAL_DATASETS: Dict[str, Any] = {
    "milk-7day": [
        {"x": 1, "y": 2140, "label": "Mon"},
        {"x": 2, "y": 2210, "label": "Tue"},
        {"x": 3, "y": 2180, "label": "Wed"},
        {"x": 4, "y": 2300, "label": "Thu"},
        {"x": 5, "y": 2350, "label": "Fri"},
        {"x": 6, "y": 2420, "label": "Sat"},
        {"x": 7, "y": 2390, "label": "Sun"}
    ],
    "milk-seasonal-curve": [
        {"x": 1, "y": 1800, "label": "Jan"},
        {"x": 2, "y": 1950, "label": "Feb"},
        {"x": 3, "y": 2250, "label": "Mar"},
        {"x": 4, "y": 2600, "label": "Apr (Flush Start)"},
        {"x": 5, "y": 2850, "label": "May (Peak)"},
        {"x": 6, "y": 2900, "label": "Jun (Peak)"},
        {"x": 7, "y": 2800, "label": "Jul"},
        {"x": 8, "y": 2500, "label": "Aug"},
        {"x": 9, "y": 2200, "label": "Sep (Lean Start)"},
        {"x": 10, "y": 1950, "label": "Oct"},
        {"x": 11, "y": 1850, "label": "Nov"},
        {"x": 12, "y": 1800, "label": "Dec"}
    ],
    "anscombe": {
        "description": "F. J. Anscombe (1973) - 4 datasets with identical mean, variance, and linear regression line",
        "statistics": {
            "mean_x": 9.0,
            "var_x": 11.0,
            "mean_y": 7.50,
            "var_y": 4.125,
            "linear_regression": "y = 0.50x + 3.00",
            "r2": 0.67
        },
        "dataset_1": [
            {"x": 10.0, "y": 8.04}, {"x": 8.0, "y": 6.95}, {"x": 13.0, "y": 7.58},
            {"x": 9.0, "y": 8.81}, {"x": 11.0, "y": 8.33}, {"x": 14.0, "y": 9.96},
            {"x": 6.0, "y": 7.24}, {"x": 4.0, "y": 4.26}, {"x": 12.0, "y": 10.84},
            {"x": 7.0, "y": 4.82}, {"x": 5.0, "y": 5.68}
        ],
        "dataset_2": [
            {"x": 10.0, "y": 9.14}, {"x": 8.0, "y": 8.14}, {"x": 13.0, "y": 8.74},
            {"x": 9.0, "y": 8.77}, {"x": 11.0, "y": 9.26}, {"x": 14.0, "y": 8.10},
            {"x": 6.0, "y": 6.13}, {"x": 4.0, "y": 3.10}, {"x": 12.0, "y": 9.13},
            {"x": 7.0, "y": 7.26}, {"x": 5.0, "y": 4.74}
        ],
        "dataset_3": [
            {"x": 10.0, "y": 7.46}, {"x": 8.0, "y": 6.77}, {"x": 13.0, "y": 12.74},
            {"x": 9.0, "y": 7.11}, {"x": 11.0, "y": 7.81}, {"x": 14.0, "y": 8.84},
            {"x": 6.0, "y": 6.08}, {"x": 4.0, "y": 5.39}, {"x": 12.0, "y": 8.15},
            {"x": 7.0, "y": 6.42}, {"x": 5.0, "y": 5.73}
        ],
        "dataset_4": [
            {"x": 8.0, "y": 6.58}, {"x": 8.0, "y": 5.76}, {"x": 8.0, "y": 7.71},
            {"x": 8.0, "y": 8.84}, {"x": 8.0, "y": 8.47}, {"x": 8.0, "y": 7.04},
            {"x": 8.0, "y": 5.25}, {"x": 19.0, "y": 12.50}, {"x": 8.0, "y": 5.56},
            {"x": 8.0, "y": 7.91}, {"x": 8.0, "y": 6.89}
        ]
    },
    "tickets": [
        {"x": 1, "y": 142, "label": "Week 1"},
        {"x": 2, "y": 155, "label": "Week 2"},
        {"x": 3, "y": 168, "label": "Week 3"},
        {"x": 4, "y": 174, "label": "Week 4"},
        {"x": 5, "y": 190, "label": "Week 5"},
        {"x": 6, "y": 205, "label": "Week 6"},
        {"x": 7, "y": 218, "label": "Week 7"},
        {"x": 8, "y": 230, "label": "Week 8"}
    ],
    "disk-usage": [
        {"x": 1, "y": 45.0, "label": "Month 1 (45%)"},
        {"x": 2, "y": 49.2, "label": "Month 2 (49%)"},
        {"x": 3, "y": 52.8, "label": "Month 3 (53%)"},
        {"x": 4, "y": 57.1, "label": "Month 4 (57%)"},
        {"x": 5, "y": 62.0, "label": "Month 5 (62%)"},
        {"x": 6, "y": 66.4, "label": "Month 6 (66%)"},
        {"x": 7, "y": 71.0, "label": "Month 7 (71%)"},
        {"x": 8, "y": 74.8, "label": "Month 8 (75%)"}
    ]
}

@router.get("/{name}")
def get_dataset(name: str):
    if name not in CANONICAL_DATASETS:
        raise HTTPException(
            status_code=404, 
            detail=f"Dataset '{name}' not found. Available datasets: {list(CANONICAL_DATASETS.keys())}"
        )
    return CANONICAL_DATASETS[name]
