let socket = require('socket.io-client')('http://127.0.0.1:5000');

//starting speed at 0
let speed = 0;

socket.on("commands", (data)=>{
    console.log(data);
    dataJSON.acceleration = dataJSON.acceleration ? 0 : 12;
})
var dataJSON = {
    "timestamp":  new Date(),
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
};
//Simulating reading data every 100 milliseconds
setInterval(function () {
    
    //some sudo-randomness to change the values but not to drastically
    let nextMin = (speed-2)>0 ? speed-2 : 2;
    let nextMax = speed+5 < 140 ? speed+5 : Math.random() * (130 - 5 + 1) + 5;
    speed = Math.floor(Math.random() * (nextMax - nextMin + 1) + nextMin);
    dataJSON.velocity = speed
    //we emit the data. No need to JSON serialization!
    socket.emit('incoming data', dataJSON);
}, 1000);
