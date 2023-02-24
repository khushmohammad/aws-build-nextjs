import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3011");


function Notification() {

    const userid = useSelector((state) => state?.user?.data?.userInfo?._id)


    console.log(userid, "socket");
    // useEffect(() => {
    //     socket.on('testEvent', (data) => {
    //         // Handle the data received
    //         console.log(data, "testEvent");
    //     });



    // }, [socket])
    // useEffect(() => {
    //     socket.on('testEvent', (data) => {
    //         // Handle the data received
    //         console.log(data, "testEvent");
    //     });



    // }, [])
    // useEffect(() => {
    //     socket.on('testEvent', (data) => {
    //         // Handle the data received
    //         console.log(data, "testEvent");
    //     });



    // })


    const joinSocket = async () => {
        const res = await socket.emit("NOTIFICATIONJOIN", userid);
        if (res.connected == true) {
            console.log("first")
            // receiverUserId && getCurrentMessages(receiverUserId)
            socket.on("new_notification", (data) => {
                console.log(data, "data");

            })
        }
    }
    useEffect(() => {
        joinSocket()



    }, [socket]);


    useEffect(() => {
        joinSocket()
    }, []);

    return (
        <div>Notification</div>
    )
}

export default Notification