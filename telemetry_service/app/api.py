import requests

API_URL = "http://127.0.0.1:8000/api"

def create_flight(vehicle_id):
    response = requests.post(
        f"{API_URL}/vehicles/{vehicle_id}/flights"
    )

    response.raise_for_status()

    data = response.json()

    return data["data"]["id"]

def send_telemetry(vehicle_id, flight_id, telemetry):
    response = requests.post(
        f"{API_URL}/vehicles/{vehicle_id}/flights/{flight_id}/telemetry",
        json=telemetry
    )

    response.raise_for_status()

    return response.json()