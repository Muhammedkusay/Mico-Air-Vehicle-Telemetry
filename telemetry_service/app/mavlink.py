from pymavlink import mavutil

connection = mavutil.mavlink_connection(
    "udpin:0.0.0.0:14550"
)

def connect():
    print("waiting for heartbeat...")
    connection.wait_heartbeat()

    print("Connected!")
    print("System:", connection.target_system)
    print("Comopnent:", connection.target_component)