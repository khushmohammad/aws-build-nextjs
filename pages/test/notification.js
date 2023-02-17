import React, { useEffect } from 'react'
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3011");


function Notification() {


    console.log(socket,"socket");
    useEffect(() => {
        socket.on('testEvent', (data) => {
            // Handle the data received
            console.log(data, "testEvent");
        });



    }, [socket])
    useEffect(() => {
        socket.on('testEvent', (data) => {
            // Handle the data received
            console.log(data, "testEvent");
        });



    }, [])
    useEffect(() => {
        socket.on('testEvent', (data) => {
            // Handle the data received
            console.log(data, "testEvent");
        });



    })
    return (
        <div>Notification</div>
    )
}

export default Notification