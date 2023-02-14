import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../components/Card";
import Link from "next/link";
import Default from "../../layouts/default";
import Image from "next/image";
// image
import loader from "../../public/assets/images/page-img/page-load-loader.gif";
import img1 from "../../public/assets/images/page-img/profile-bg2.jpg";

import user05 from "../../public/assets/images/user/05.jpg";

import { useDispatch, useSelector } from "react-redux";
import { SendAndCancelFriendRequest } from "../../services/friends.service";
import { getNonFriendsList } from "../../store/friends/nonFriendsList";
import Head from "next/head";

const FriendList = () => {
  const [page, setPage] = useState(1);
  // const [user, setUser] = useState([]);
  const [isRequested, setIsRequested] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.nonFriendsLIst?.NonFriendList);
  const loading = useSelector((state) => state?.nonFriendsLIst?.status);
  const limit = 50;
  // console.log(findFriendsList, "findFriendsList");

  useEffect(() => {
    fetchUser();
    window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, []);

  const fetchUser = () => {
    dispatch(getNonFriendsList({ page: page }));
    //setUser(findFriendsList);
  };

  // const handleScroll = () => {
  //   let userScrollHeight = window.innerHeight + window.scrollY;
  //   let windowBottomHeight = document.documentElement.offsetHeight;

  //   if (userScrollHeight >= windowBottomHeight) {
  //     fetchUser();
  //   }
  // };

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
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
            {user &&
              user?.map((user, index) => (
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
                                      href={`/friends/${user?.userInfo?._id}`}
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
            <Col>
              <div>
                {loading && loading == "loading" ? (
                  <div className="col-sm-12 text-center">
                    <Image
                      src={loader}
                      alt="loader"
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : (
                  <div className="w-100">
                    {user && user.length == 0 && (
                      <div>
                        <p className="p-3 bg-danger text-alert text-center">
                          No user found!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Default>
  );
};

export default FriendList;
