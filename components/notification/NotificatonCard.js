import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import user1 from '../../public/assets/images/user/25.png'

import moment from 'moment'
import { NotificationMessage } from './NotificationMessage'

function NotificatonCard({ notification, page }) {

    return (
        <div>
            <Card>
                <Card.Body>
                    <ul className="notification-list m-0 p-0">
                        <li className="d-flex align-items-center justify-content-between">

                            <div className="user-img img-fluid">
                                <Image src={notification?.userDetails?.profilePictureInfo?.file?.location || user1}
                                    alt="profile-bg"
                                    height={100}
                                    width={100} className="rounded-circle avatar-40" />
                            </div>
                            <div className="w-100">
                                <div className="d-flex justify-content-between">
                                    <div className=" ms-3">
                                        <h6> <strong> {notification?.userDetails?.userInfo?.firstName || ''}{" "}
                                            {notification?.userDetails?.userInfo?.lastName || ''} </strong> {NotificationMessage(notification?.message)}</h6>
                                        <p className="mb-0">   {notification?.createdAt && moment(notification?.createdAt).fromNow()}</p>
                                    </div>
                                    {page != "headerNotification" ?
                                        <div className="d-flex align-items-center">
                                            <Link href="#" className="me-3 iq-notify bg-soft-primary rounded">
                                                <i className="material-symbols-outlined md-18">
                                                    military_tech
                                                </i>
                                            </Link>
                                            <div className="card-header-toolbar d-flex align-items-center">
                                                <Dropdown>
                                                    <Link href="#">
                                                        <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                            more_horiz
                                                        </Dropdown.Toggle>
                                                    </Link>
                                                    <Dropdown.Menu className="dropdown-menu-right">
                                                        <Dropdown.Item href="#">
                                                            <i className="ri-eye-fill me-2"></i>View
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                        <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                        <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                        <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div> : ""
                                    }
                                </div>
                            </div>
                        </li>
                    </ul>
                </Card.Body>
            </Card>

        </div>
    )
}

export default NotificatonCard