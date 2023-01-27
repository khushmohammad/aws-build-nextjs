import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import user05 from "../../public/assets/images/user/05.jpg";

function FriendCardProfile() {
    const friendsList = useSelector((state) => state?.friends?.friendList?.friendsList);
    // /console.log(friendsList,"friendsList");
    return (
        <div>
            <div className="col-md-6 col-lg-6 mb-3">
                <div className="iq-friendlist-block">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <Link href="#">
                                <Image
                                    loading="lazy"
                                    src={user05}
                                    alt="profile-img"
                                    className="img-fluid"
                                />
                            </Link>
                            <div className="friend-info ms-3">
                                <h5>Petey Cruiser</h5>
                                <p className="mb-0">15 friends</p>
                            </div>
                        </div>
                        <div className="card-header-toolbar d-flex align-items-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary me-2 d-flex align-items-center">
                                    <i className="material-symbols-outlined me-2">
                                        done
                                    </i>
                                    Friend
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-right">
                                    <Dropdown.Item href="#">
                                        Get Notification
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Close Friend
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Unfollow
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Unfriend
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        Block
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendCardProfile