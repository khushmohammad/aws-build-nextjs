import React, { useEffect, useState } from 'react'
import { getUserInfoByUserId } from '../../services/posts.service'
import NotificatonCard from './NotificatonCard'
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';

const socket = io.connect("http://localhost:3011");

function NewNotification({ type }) {

  const [newNotification, setNewNotification] = useState()
  const [newNotificationList, setNewNotificationList] = useState([])
  const userId = useSelector((state) => state?.user?.data?.userInfo?._id)

  const getNotificationWithUserDetails = async () => {
    const res = newNotification?.senderId && await getUserInfoByUserId(newNotification.senderId)
    if (res?.status === 200) {
      const userDetails = res.data.body
      const notification = { ...newNotification, userDetails }
      newNotification.receiverId == userId ? setNewNotificationList([notification, ...newNotificationList]) : ""
    }
  }

  useEffect(() => {
    socket.on("new_notification", (data) => {
      console.log(data, "data")
      setNewNotification(data)
    })
  }, [socket])

  useEffect(() => {
    getNotificationWithUserDetails()
  }, [newNotification])

  return (
    <div>
      {newNotificationList && newNotificationList.map((data, index) => {
        return (
          <React.Fragment key={index}>
            {data &&
              <NotificatonCard notification={data} page={type} />}

          </React.Fragment>
        )
      })}

    </div>
  )
}

export default NewNotification