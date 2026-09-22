import asyncio
import json
from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosed
from .telemetry import telemetry

async def handler(websocket):
    print("Client connected")

    try:
        while True:
            await websocket.send(json.dumps(telemetry))
            await asyncio.sleep(0.05)
    except ConnectionClosed:
        print("Client Disconnected")

async def start_server():
    async with serve(handler, "localhost", 8765):
        print("WebSocket server running on ws://localhost:8765")
        await asyncio.Future()