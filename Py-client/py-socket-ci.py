
import socketio
import random
import time
sio = socketio.Client()



dataJSON = {
    "timestamp":  "0",
    "status_code": 1,
    "team_id": "hyperloop-india-111",
    "no_data_packets": 0,
    "comm_primary": 1,
    "comm_secondary": 1,
    "comm_current":2,
    "console_entry": "Console Entry", 
    "battery_primary_soc": [1, 2, 3, 4],
    "battery_primary_current": [ 2.1 , 3.4 , 4.5 , 1.1],
    "battery_primary_temperature": [30, 31, 32, 33],
    "battery_secondary_soc" : 4,
    "battery_secondary_current": 4.5,
    "battery_secondary_temperature" : 34,
    "battery_backup": 1,
    "pod_temperature": 12,
    "pressure": 67,
    "position": 10,
    "strip_count": 12,
    "velocity": 12,
    "acceleration": 30,
    "levitation_value": [13, 21, 34, 41],
    "brake_pad_distance": 8,
    "yaw": 0,
    "pitch": 100,
    "roll": 150,
    "pusher": 0
}






@sio.on('connect')
def connect_handler():
    print('Connected!')

@sio.on('commands')
def on_message(data):
    print(data)


sio.connect('http://localhost:5000')


while True: 
    time.sleep(0.5)
    speed = random.randint(0,200)
    dataJSON["velocity"] = speed
    if dataJSON["acceleration"]==0:
        dataJSON["acceleration"] = 12
    else:
        dataJSON["acceleration"] = 0
    sio.emit("incoming data", dataJSON)
