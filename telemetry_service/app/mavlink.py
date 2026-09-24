from pymavlink import mavutil

def connect():
    master = mavutil.mavlink_connection(
        "udpin:0.0.0.0:14550"
    )

    print("waiting for heartbeat...")
    master.wait_heartbeat()

    print(f"Connected to system {master.target_system}")

    return master

def receive(master):
    return master.recv_match(
        blocking=True,
        timeout=1
    )