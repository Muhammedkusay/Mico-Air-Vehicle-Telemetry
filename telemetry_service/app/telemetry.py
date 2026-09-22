import math
from .mavlink import connection
from pymavlink import mavutil
from time import time

telemetry = {
    "connection": False,
    "vehicle_id": None,
    "last_update": None,
    "mode": None,
    "armed": False,
    "latitude": None,
    "longitude": None,
    "altitude": None,
    "roll": None,
    "pitch": None,
    "yaw": None,
    "ground_speed": None,
    "heading": None,
    "climb": None,
    "battery_voltage": None,
    "battery_current": None,
    "battery_remaining": None,
    "gps_fix": None,
    "satellites": None,
}

def update_telemetry():
    msg = connection.recv_match(
        blocking=True,
        timeout=1
    )

    if not msg:
        telemetry["connection"] = False
        return

    telemetry["connection"] = True
    telemetry["last_update"] = time()

    message_type = msg.get_type()

    if message_type == "HEARTBEAT":
        telemetry["vehicle_id"] = connection.target_system
        telemetry["mode"] = mavutil.mode_string_v10(msg)
        telemetry["armed"] = bool(
            msg.base_mode & mavutil.mavlink.MAV_MODE_FLAG_SAFETY_ARMED
        )

    elif message_type == "GLOBAL_POSITION_INT":
        telemetry["latitude"] = msg.lat / 1e7
        telemetry["longitude"] = msg.lon / 1e7
        telemetry["altitude"] = msg.relative_alt / 1000

    elif message_type == "ATTITUDE":
        telemetry["roll"] = math.degrees(msg.roll) / 1e7
        telemetry["pitch"] = math.degrees(msg.pitch) / 1e7
        telemetry["yaw"] = math.degrees(msg.yaw) / 1e7 

    elif message_type == "VFR_HUD":
        telemetry["ground_speed"] = msg.groundspeed
        telemetry["heading"] = msg.heading
        telemetry["climb"] = msg.climb

    elif message_type == "SYS_STATUS":
        telemetry["battery_voltage"] = msg.voltage_battery / 1000
        telemetry["battery_current"] = msg.current_battery / 100
        telemetry["battery_remaining"] = msg.battery_remaining

    elif message_type == "GPS_RAW_INT":
        telemetry["gps_fix"] = msg.fix_type
        telemetry["satellites"] = msg.satellites_visible