import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import socketIOClient from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer"
const Homepage = () => {

    const [isConnected, setIsConnected] = useState(false)
    const [speed, setSpeed] = useState(0)
    const [acc, setAcc] = useState(0)
    const socket = socketIOClient("http://localhost:5000", {
        id:"ui"
    });
    useEffect(() => {
        console.log("hello");
        socket.on("telemetry-data", (data)=>{
            if(!data.data.velocity){
                setSpeed(9999);
                setIsConnected(false)
                return;
            }
            setIsConnected(true)
            setSpeed(data.data.velocity)
            setAcc(data.data.acceleration)

        })
        socket.on("disconnected", (data)=>{
            setIsConnected(false);
            setSpeed(9999);
            setAcc(0)

        })
        
        
    }, []);
    return (
        <div>
            {isConnected ? <h1>Connected</h1> : <h1>Disconnected</h1>}
            <h1>Speed Is :- {speed}</h1>

            <ReactSpeedometer currentValueText='Speed' segments={12} value={speed} minValue={0} maxValue={200}/>
            <ReactSpeedometer currentValueText='Accelaration' segments={12} value={acc} minValue={0} maxValue={200}/>

            <button onClick={(e)=>{socket.emit("command-ingest", 
                {"Start": "00000000",
                "Stop": "00000000",
                "Emergency Stop":"00000000",
                "Engage Brakes":"00000000", 
                "Disengage Brakes":"00000000",
                "Engage Clutch":"00000000", 
                "Disengage Clutch":"00000000",
                "Actuate Levitation Module":"00000000",
                "Unactuate Levitation Module":"00000000",
                "Engage Auxillary Propulsion":"00000000",
                "Disengage Auxillary Propulsion":"00000000" 
            })}}>SEND COMMAND</button>
        </div>
    );
}

export default Homepage;
