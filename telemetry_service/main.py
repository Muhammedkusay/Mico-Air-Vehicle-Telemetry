import asyncio
from threading import Thread

from app.mavlink import connect
from app.telemetry import update_telemetry
from app.websocket import start_server

def telemetry_loop():
    connect()

    while True:
        update_telemetry()

async def main():
    telemetry_thread = Thread(target=telemetry_loop, daemon=True)
    telemetry_thread.start()

    await start_server()

if __name__ == "__main__":
    asyncio.run(main())