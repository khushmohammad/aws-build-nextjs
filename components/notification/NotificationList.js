import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import user1 from "../../public/assets/images/user/25.png";
import { getPostTime } from '../../services/time.service';
import { getNotification } from '../../store/site/Notification';
import NewNotification from './NewNotification';
import {NotificationMessage} from './NotificationMessage';
import CustomToggle from "../dropdowns";

import { io } from "socket.io-client";
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_CONNECTION_FOR_NOTIFICATION);

function NotificationList() {

    const notificationlist = useSelector((state) => state?.notification?.list)
    const dispatch = useDispatch()

    const params = { page: 1, limit: 5 }

    useEffect(() => {
        dispatch(getNotification(params))
    }, [])


    useEffect(() => {
        socket.on("new_notification", (data) => {
            console.log(data, "data")
            dispatch(getNotification(params))
        })
    }, [socket])


    return (
        <Dropdown as="li" className="nav-item d-none d-lg-block">
            <Dropdown.Toggle
                href="#"
                as={CustomToggle}
                variant="search-toggle d-flex align-items-center"
            >
                <i className="material-symbols-outlined">notifications</i>
                {/* {notificationlist && notificationlist.length} */}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="sub-drop"
                style={{ inset: "75px 0px auto auto" }}
            >
                <Card className="shadow-none m-0">
                    <Card.Header className="d-flex justify-content-between bg-primary">
                        <div className="header-title bg-primary">
                            <h5 className="mb-0 text-white">
                                All Notifications
                            </h5>
                        </div>
                        <small className="badge  bg-light text-dark">{notificationlist && notificationlist?.length}</small>
                    </Card.Header>
                    <Card.Body className="p-0">

                        {/* <NewNotification type="headerNotification" /> */}
                        {
                            notificationlist && notificationlist.slice(0, 5).map((data, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {data &&
                                            <NotificationLink notification={data} />}
                                    </React.Fragment>


                                )

                            })
                        }


                       
                        {notificationlist?.length == 0 &&
                            <div className="text-center iq-sub-card">
                                <p>
                                    No record found!
                                </p>
                            </div>}
                            <div className="text-center iq-sub-card">
                            <Link
                                href="/notification"
                                className=" btn text-primary w-100 d-block"
                            >
                                View All
                            </Link>
                        </div>
                    </Card.Body>
                </Card >
            </Dropdown.Menu>
        </Dropdown>

    )
}


const NotificationLink = ({ notification }) => {


    return (
        <Link href="/notification" className="iq-sub-card">
            <div className="d-flex align-items-center">
                <div className="">
                    <Image
                        className="avatar-40 rounded"
                        src={notification?.userDetails?.profilePictureInfo?.file?.location || user1}
                        alt="profile-bg"
                        height={100}
                        width={100}
                        loading="lazy"
                    />
                </div>
                <div className="ms-3 w-100">
                    <h6 className="mb-0 ">{notification?.userDetails?.userInfo?.firstName || ''}{" "}
                        {notification?.userDetails?.userInfo?.lastName || ''} {notification && NotificationMessage(notification?.message)}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        {/* <p className="mb-0">95 MB</p> */}
                        <small className="float-right font-size-12">
                            {getPostTime(notification.createdAt)}
                        </small>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default NotificationList