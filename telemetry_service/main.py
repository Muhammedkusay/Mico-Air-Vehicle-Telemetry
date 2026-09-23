import asyncio
import time
import threading

from app.mavlink import connect, receive
from app.telemetry import update_telemetry, telemetry
from app.api import create_flight, send_telemetry
from app.websocket import start_server

def run_websocket():
    asyncio.run(start_server())

# Start websocket server
websocket_thread = threading.Thread(
    target=run_websocket,
    daemon=True
)

websocket_thread.start()

# Connect to mavlink
master = connect()

telemetry["connection"] = True

vehicle_id = 1
flight_id = create_flight(vehicle_id)

print(f"Flight started {flight_id}")

last_api = 0

while True:
    msg = receive(master)

    if msg:
        update_telemetry(msg)
        telemetry["connection"] = True
    else:
        telemetry["connection"] = False

    now = time.time()

    if telemetry["connection"] and now - last_api >= 1.0:
        send_telemetry(vehicle_id, flight_id, telemetry)
        print("Telemetry sent")
        last_api = now