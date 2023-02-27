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
import { getAllFriendList } from "../../store/friends";

const FriendList = () => {
  // state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [friendListState, setFriendListState] = useState([]);

  // redux method
  const dispatch = useDispatch();

  const friendsList = useSelector((state) => state?.friends?.friendList?.list);

  //logic for load more data
  useEffect(() => {
    if (page && page == 1) {
      friendsList?.length == 0
        ? setFriendListState("")
        : setFriendListState(friendsList);
    } else {
      friendsList?.length == 0
        ? ""
        : Array.isArray(friendsList)
        ? setFriendListState((prev) => [...prev, ...friendsList])
        : "";
    }
  }, [friendsList]);
  const LoadMore = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    const params = { page: page, limit: limit };

    dispatch(getAllFriendList(params));
  }, [page]);

  return (
    <Default>
      <Head>
        <title>Friend List</title>
      </Head>
      <ProfileHeader title="Friend Lists" img={img3} />
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {friendListState &&
              friendListState.map((userData, index) => {
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
                                    userData.profileInfo?.coverPictureInfo?.file
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
                                              userData?.profileInfo
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
                                            {userData?.firstName}{" "}
                                            {userData?.lastName}
                                          </Link>
                                        </h4>
                                        <h6>@designer</h6>
                                        {/* <p>
                                          Lorem Ipsum is simply dummy text of
                                          the
                                        </p> */}
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Following
                                    </button>
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

            <Col sm={12}>
              {friendsList && friendsList?.length != 0 ? (
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
