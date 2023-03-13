import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../components/Card";
import Link from "next/link";
import Default from "../../layouts/default";
import Image from "next/image";
// image
import loader from "../../public/assets/images/page-img/page-load-loader.gif";
import img1 from "../../public/assets/images/page-img/profile-bg2.jpg";

import user05 from "../../public/assets/images/user/25.png";

import { useDispatch, useSelector } from "react-redux";
import { SendAndCancelFriendRequest } from "../../services/friends.service";
import { getNonFriendsList } from "../../store/friends/nonFriendsList";
import Head from "next/head";

const FriendList = () => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  // const [user, setUser] = useState([]);
  const [isRequested, setIsRequested] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.nonFriendsLIst?.NonFriendList);
  const loading = useSelector((state) => state?.nonFriendsLIst?.status);

  const [notificationListState, setNotificationListState] = useState([]);
  useEffect(() => {
    // setNotificationListState(notificationlist)
    // setNotificationListState((prev) => [...prev, ...notificationlist])

    if (page && page == 1) {
      user?.length == 0
        ? setNotificationListState("")
        : setNotificationListState(user);
    } else {
      user?.length == 0
        ? ""
        : Array.isArray(user)
        ? setNotificationListState((prev) => [...prev, ...user])
        : "";
    }
  }, [user]);

  const params = { page: page, limit: limit };
  useEffect(() => {
    dispatch(getNonFriendsList(params));
  }, [page]);

  const LoadMore = () => {
    setPage((prev) => prev + 1);
  };

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
        <title>Find-Friends</title>
      </Head>
      {/* <ProfileHeader title="Friend Lists" img={img3} /> */}
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {notificationListState &&
              notificationListState?.map((user, index) => (
                <Col md={6} key={index}>
                  <Card className=" card-block card-stretch card-height">
                    <Card.Body className=" profile-page p-0">
                      <div className="profile-header-image">
                        <div className="cover-container">
                          {user && (
                            <Image
                              loading="lazy"
                              src={
                                user?.coverPictureInfo?.file?.location || img1
                              }
                              alt="profile-bg"
                              className="rounded img-fluid w-100"
                              height={100}
                              width={100}
                              style={{ maxHeight: "150px", objectfit: "cover" }}
                            />
                          )}
                        </div>
                        <div className="profile-info p-4">
                          <div className="user-detail">
                            <div className="d-flex flex-wrap justify-content-between align-items-start">
                              <div className="profile-detail d-flex">
                                <div className="profile-img pe-4">
                                  <Image
                                    loading="lazy"
                                    src={
                                      user.profilePicture?.file?.location ||
                                      user05
                                    }
                                    alt="profile-img"
                                    className="avatar-130 img-fluid"
                                  />
                                </div>
                                <div className="user-data-block">
                                  <h4>
                                    <Link
                                      href={`/user/${user?.userInfo?._id}`}
                                    >
                                      {user?.userInfo?.firstName}{" "}
                                      {user?.userInfo?.lastName}
                                    </Link>
                                  </h4>
                                  <h6>@designer</h6>
                                  {/* <p>Lorem Ipsum is simply dummy text of the</p> */}
                                </div>
                              </div>
                              {isRequested[user?.userInfo?._id] ? (
                                <button
                                  type="submit"
                                  onClick={() =>
                                    SendAndCancelFriendRequestOnClick(
                                      user?.userInfo?._id,
                                      "cancel"
                                    )
                                  }
                                  className="btn btn-primary"
                                >
                                  Cancel Request
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  onClick={() =>
                                    SendAndCancelFriendRequestOnClick(
                                      user?.userInfo?._id,
                                      "request"
                                    )
                                  }
                                  className="btn btn-primary"
                                >
                                  Add Friend
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}

            <Col sm={12}>
              {user && user?.length != 0 ? (
                <div className="text-center iq-sub-card">
                  <button
                    onClick={() => LoadMore()}
                    className=" btn text-primary  mb-3"
                  >
                    View More
                  </button>
                </div>
              ) : (
                <div className="text-center iq-sub-card">
                  <p>No record found!</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Default>
  );
};

export default FriendList;
