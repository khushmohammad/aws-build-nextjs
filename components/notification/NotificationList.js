import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import user1 from "../../public/assets/images/user/25.png";
import { getPostTime } from '../../services/time.service';
import { getNotification } from '../../store/site/Notification';
import NewNotification from './NewNotification';
import NotificationMessage from './NotificationMessage';

function NotificationList() {

    const notificationlist = useSelector((state) => state?.notification?.list)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getNotification())
    }, [])

    

    return (
        <Card className="shadow-none m-0">
            <Card.Header className="d-flex justify-content-between bg-primary">
                <div className="header-title bg-primary">
                    <h5 className="mb-0 text-white">
                        All Notifications
                    </h5>
                </div>
                <small className="badge  bg-light text-dark">{notificationlist?.length}</small>
            </Card.Header>
            <Card.Body className="p-0">

                <NewNotification type="headerNotification" />
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

                {notificationlist?.length > 4 &&

                    <div className="text-center iq-sub-card">

                        <Link
                            href="/notification"
                            className=" btn text-primary w-100 d-block"
                        >
                            View All
                        </Link>
                    </div>}
                {notificationlist?.length == 0 &&

                    <div className="text-center iq-sub-card">

                        <p>
                            No record found!
                        </p>
                    </div>}
            </Card.Body>
        </Card >
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
                        {notification?.userDetails?.userInfo?.lastName || ''} {NotificationMessage(notification.message)}</h6>
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