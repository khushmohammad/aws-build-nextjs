import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import user1 from "../../public/assets/images/user/1.jpg";

function NotificationList() {

    const notificationlist = useSelector((state) => state?.notification?.list)


    return (
        <Card className="shadow-none m-0">
            <Card.Header className="d-flex justify-content-between bg-primary">
                <div className="header-title bg-primary">
                    <h5 className="mb-0 text-white">
                        All Notifications
                    </h5>
                </div>
                <small className="badge  bg-light text-dark">4</small>
            </Card.Header>
            <Card.Body className="p-0">
                {
                    notificationlist && notificationlist.map((data, index) => {
                        return (
                            <React.Fragment key={index}>
                                {data &&
                                    <NotificationLink notification={data} />}
                            </React.Fragment>


                        )

                    })
                }


                <div className="text-center iq-sub-card">
                    <Link
                        href="/notification"
                        className=" btn text-primary"
                    >
                        View All
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}


const NotificationLink = ({ notification }) => {


    return (
        <Link href="#" className="iq-sub-card">
            <div className="d-flex align-items-center">
                <div className="">
                    <Image
                        className="avatar-40 rounded"
                        src={user1}
                        alt=""
                        loading="lazy"
                    />
                </div>
                <div className="ms-3 w-100">
                    <h6 className="mb-0 ">{notification.message}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">95 MB</p>
                        <small className="float-right font-size-12">
                            Just Now
                        </small>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default NotificationList