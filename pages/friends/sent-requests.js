import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../components/Card";
import Link from "next/link";
import Default from "../../layouts/default";
import Image from "next/image";
//profile-header
import ProfileHeader from "../../components/profile-header";

// image

import img1 from "../../public/assets/images/page-img/profile-bg1.jpg";
import img3 from "../../public/assets/images/page-img/profile-bg3.jpg";

import user05 from "../../public/assets/images/user/25.png";

import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { getPendingRequestFriendList } from "../../store/friends";
import { SendAndCancelFriendRequest } from "../../services/friends.service";

const SentRequest = () => {
    const pendingRequests = useSelector(
        (state) => state?.friends?.PendingRequest
    );

    //console.log(pendingRequests, "pendingRequests");

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPendingRequestFriendList())

    }, []);
    const [isRequested, setIsRequested] = useState([]);

    const SendAndCancelFriendRequestOnClick = async (userId, status) => {
        const res = await SendAndCancelFriendRequest(userId, status);

        if (res == true) {
            setIsRequested((prev) =>
                Boolean(!prev[userId])
                    ? { ...prev, [userId]: true }
                    : { ...prev, [userId]: false }
            );
        }
    };


    return (
        <Default>
            <Head>
                <title>Friend List</title>
            </Head>
            <ProfileHeader title="Friend Request Sent List" img={img3} />
            <div id="content-page" className="content-page">
                <Container>
                    <Row>
                        {pendingRequests &&
                            pendingRequests.map((userData, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {userData && (
                                            <Col md={6}>
                                                <Card className=" card-block card-stretch card-height">
                                                    <Card.Body className=" profile-page p-0">
                                                        <div className="profile-header-image">
                                                            <div className="cover-container">
                                                                <Image
                                                                    loading="lazy"
                                                                    src={
                                                                        userData.coverPictureInfo?.file
                                                                            ?.location || img1
                                                                    }
                                                                    alt="profile-bg"
                                                                    className="rounded img-fluid w-100"
                                                                    height={100}
                                                                    width={100}
                                                                    style={{
                                                                        maxHeight: "150px",
                                                                        objectfit: "cover",
                                                                    }}
                                                                />

                                                                {/* <Image
                                  loading="lazy"
                                  src={img1}
                                  alt="profile-bg"
                                  className="rounded img-fluid w-100"
                                /> */}
                                                            </div>
                                                            <div className="profile-info p-4">
                                                                <div className="user-detail">
                                                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                                                        <div className="profile-detail d-flex">
                                                                            <div className="profile-img pe-4">
                                                                                {userData && (
                                                                                    <Image
                                                                                        className="rounded-circle img-fluid"
                                                                                        src={
                                                                                            userData
                                                                                                ?.profilePictureInfo?.file
                                                                                                ?.location || user05
                                                                                        }
                                                                                        alt=""
                                                                                        height={100}
                                                                                        width={100}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                            <div className="user-data-block">
                                                                                <h4>
                                                                                    <Link href={`${userData?._id}`}>
                                                                                        {userData?.userInfo?.firstName}{" "}
                                                                                        {userData?.userInfo?.lastName}
                                                                                    </Link>
                                                                                </h4>
                                                                                <h6>@designer</h6>
                                                                                {/* <p>
                                          Lorem Ipsum is simply dummy text of
                                          the
                                        </p> */}
                                                                            </div>
                                                                        </div>


                                                                        {isRequested[userData?.userInfo?._id] ? (
                                                                            <button
                                                                                type="submit"
                                                                                onClick={() =>
                                                                                    SendAndCancelFriendRequestOnClick(
                                                                                        userData?.userInfo?._id,
                                                                                        "request"
                                                                                    )
                                                                                }
                                                                                className="btn btn-primary"
                                                                            >
                                                                                Add Friend
                                                                            </button>

                                                                        ) : (
                                                                            <button
                                                                                type="submit"
                                                                                onClick={() =>
                                                                                    SendAndCancelFriendRequestOnClick(
                                                                                        userData?.userInfo?._id,
                                                                                        "cancel"
                                                                                    )
                                                                                }
                                                                                className="btn btn-primary"
                                                                            >
                                                                                Cancel Request
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )}
                                    </React.Fragment>
                                );
                            })}

                        {Array.isArray(pendingRequests) && pendingRequests.length === 0 && (
                            <Col>
                                <div>
                                    <p className="p-3 bg-danger text-alert text-center">
                                        No user found!
                                    </p>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        </Default>
    );
};

export default SentRequest;
