import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { Col, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import user05 from "../../public/assets/images/user/25.png";

function FriendCardProfile() {
    const friendsList = useSelector((state) => state?.friends?.friendList?.list);

    return (
        <>
            {friendsList && friendsList.map((userData, index) => {
                return (
                    <React.Fragment key={index}>

                        {userData && <FriendCard userData={userData} />}
                    </React.Fragment>
                )
            })}
            {Array.isArray(friendsList) && friendsList.length == 0 && (
                <Col>
                    <div>
                        <p className="p-3 bg-light text-alert text-center">
                            No user found!
                        </p>
                    </div>
                </Col>)}
        </>
    )
}

const FriendCard = ({ userData }) => {


    // const unFriend = () => {

    // }
    return (
        <div className="col-md-6 col-lg-6 mb-3" >
            <div className="iq-friendlist-block">

                <div className="d-flex align-items-center justify-content-between" >
                    <div className="d-flex align-items-center">
                        <Link href={`/user/${userData._id}`}>
                            <Image
                                loading="lazy"
                                src={
                                    userData?.profileInfo
                                        ?.profilePictureInfo?.file
                                        ?.location || user05
                                }
                                alt="profile-bg"
                                height={100}
                                width={100}
                                className="img-fluid"
                            />
                        </Link>
                        <div className="friend-info ms-3">
                            <h5>{userData?.firstName || ''}{" "}
                                {userData?.lastName || ''}</h5>
                            {/* <p className="mb-0">15 friends</p> */}
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
    )
}

export default FriendCardProfile