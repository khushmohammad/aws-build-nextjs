import React, { useEffect, useState } from "react";
import { Row, Col, Container, Dropdown, Modal, Button } from "react-bootstrap";
import Card from "../../components/Card";
import CustomToggle from "../../components/dropdowns";
import FsLightbox from "fslightbox-react";
import ShareOffcanvas from "../../components/share-offcanvas";

// images
import img1 from "../../public/assets/images/page-img/profile-bg1.jpg";
import user1 from "../../public/assets/images/user/25.png";
import user05 from "../../public/assets/images/user/25.png";
import user06 from "../../public/assets/images/user/06.jpg";
import user07 from "../../public/assets/images/user/07.jpg";
import user08 from "../../public/assets/images/user/08.jpg";
import user09 from "../../public/assets/images/user/09.jpg";
import user10 from "../../public/assets/images/user/10.jpg";
import icon8 from "../../public/assets/images/icon/08.png";
import icon9 from "../../public/assets/images/icon/09.png";
import icon10 from "../../public/assets/images/icon/10.png";
import icon11 from "../../public/assets/images/icon/11.png";
import icon12 from "../../public/assets/images/icon/12.png";
import icon13 from "../../public/assets/images/icon/13.png";
import g1 from "../../public/assets/images/page-img/g1.jpg";
import g2 from "../../public/assets/images/page-img/g2.jpg";
import g3 from "../../public/assets/images/page-img/g3.jpg";
import g4 from "../../public/assets/images/page-img/g4.jpg";
import g5 from "../../public/assets/images/page-img/g5.jpg";
import g6 from "../../public/assets/images/page-img/g6.jpg";
import g7 from "../../public/assets/images/page-img/g7.jpg";
import g8 from "../../public/assets/images/page-img/g8.jpg";
import g9 from "../../public/assets/images/page-img/g9.jpg";
import Link from "next/link";
import Image from "next/image";
import Default from "../../layouts/default";

import Post from "../../components/post/postView/Post";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUserByUserId } from "../../store/profile";

const FriendProfile = () => {
  const [show, setShow] = useState(false);

  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  const imageOnSlide = (number) => {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router?.query;

  const userDetail = useSelector((state) => state?.user?.userInfo);
  const postsLength = useSelector((state) => state?.allFeed?.allFeeds?.postcount);

  useEffect(() => {
    dispatch(getUserByUserId(id));
  }, [id]);

  return (
    <>
      {/* <FsLightbox
        toggler={imageController.toggler}
        sources={[g1, g2, g3, g4, g5, g6, g7, g8, g9]}
        slide={imageController.slide}
      /> */}
      <Default>
        <Container>
          <Row>
            <Col sm={12}>
              <Card>
                <Card.Body className=" profile-page p-0">
                  <div className="profile-header profile-info">
                    <div className="cover-container position-relative justify-content-center">
                      <Image
                        loading="lazy"
                        src={
                          userDetail?.coverPictureInfo?.file?.location || img1
                        }
                        alt="profile-bg"
                        className="rounded img-fluid w-100"
                        height={250}
                        width={1000}
                      />
                      {/* <ul className="header-nav d-flex flex-wrap justify-end p-0 m-0">
                        <li>
                          <Link href="#" className="material-symbols-outlined">
                            edit
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="material-symbols-outlined">
                            settings
                          </Link>
                        </li>
                      </ul> */}
                    </div>
                    <div className="user-detail text-center mb-3">
                      <div className="profile-img">
                        <Image
                          loading="lazy"
                          src={
                            userDetail?.profilePictureInfo?.file?.location ||
                            user1
                          }
                          alt="profile-img"
                          className="avatar-130 img-fluid"
                          height={100}
                          width={100}
                        />
                      </div>
                      <div className="profile-detail">
                        <h3>
                          {userDetail?.userInfo?.firstName}{" "}
                          {userDetail?.userInfo?.middleName}{" "}
                          {userDetail?.userInfo?.lastName}
                        </h3>
                      </div>
                    </div>
                    <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                      <div className="social-links">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={icon8}
                                className="img-fluid rounded"
                                alt="facebook"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={icon9}
                                className="img-fluid rounded"
                                alt="Twitter"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={icon10}
                                className="img-fluid rounded"
                                alt="Instagram"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={icon11}
                                className="img-fluid rounded"
                                alt="Google plus"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={icon12}
                                className="img-fluid rounded"
                                alt="You tube"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={icon13}
                                className="img-fluid rounded"
                                alt="linkedin"
                              />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="social-info">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li className="text-center pe-3">
                            <h6>Posts</h6>
                            <p className="mb-0">
                              {(postsLength && postsLength) || 0}
                            </p>
                          </li>
                          <li className="text-center pe-3">
                            <h6>Followers</h6>
                            <p className="mb-0">206</p>
                          </li>
                          <li className="text-center pe-3">
                            <h6>Following</h6>
                            <p className="mb-0">100</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Row>
              <Col lg={4}>
                <Card>
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">About</h4>
                    </div>
                  </div>
                  <Card.Body>
                    <ul className="list-inline p-0 m-0">
                      <li className="mb-2 d-flex align-items-center">
                        <span className="material-symbols-outlined md-18">
                          person
                        </span>
                        <p className="mb-0 ms-2">Web Developer</p>
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <span className="material-symbols-outlined md-18">
                          gpp_good
                        </span>
                        <p className="mb-0 ms-2">
                          Success in slowing economic activity.
                        </p>
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <span className="material-symbols-outlined md-18">
                          place
                        </span>
                        <p className="mb-0 ms-2">
                          {userDetail?.userInfo?.countryInfo?.name}
                        </p>
                      </li>
                      {userDetail?.maritalStatusInfo &&
                        userDetail?.maritalStatusInfo?.dropdownValue ? (
                        <li className="d-flex align-items-center">
                          <span className="material-symbols-outlined md-18">
                            favorite_border
                          </span>
                          <p className="mb-0 ms-2">
                            {userDetail?.maritalStatusInfo?.dropdownValue}
                          </p>
                        </li>
                      ) : null}
                    </ul>
                  </Card.Body>
                </Card>
                <Card>
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-timport FsLightbox from 'fslightbox-react';itle">
                      <h4 className="card-title">Photos</h4>
                    </div>
                    <div className="card-header-toolbar d-flex align-items-center">
                      <p className="m-0">
                        <Link href="#">Add Photo </Link>
                      </p>
                    </div>
                  </div>
                  <Card.Body>
                    <ul className="profile-img-gallary p-0 m-0 list-unstyled">
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(1)}
                            src={g1}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(2)}
                            src={g2}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(3)}
                            src={g3}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(4)}
                            src={g4}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(5)}
                            src={g5}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(6)}
                            src={g6}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(7)}
                            src={g7}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(8)}
                            src={g8}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            onClick={() => imageOnSlide(9)}
                            src={g9}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
                <Card>
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Friends</h4>
                    </div>
                    <div className="card-header-toolbar d-flex align-items-center">
                      <p className="m-0">
                        <Link href="#">Add New </Link>
                      </p>
                    </div>
                  </div>
                  <Card.Body>
                    <ul className="profile-img-gallary p-0 m-0 list-unstyled">
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user05}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Anna Rexia</h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user06}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Tara Zona</h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user07}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Polly Tech</h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user08}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Bill Emia</h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user09}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Moe Fugga</h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user10}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Hal Appeno </h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user07}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Zack Lee</h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user06}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Terry Aki</h6>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            loading="lazy"
                            src={user05}
                            alt="gallary"
                            className="img-fluid"
                          />
                        </Link>
                        <h6 className="mt-2 text-center">Greta Life</h6>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={8}>

                {id && userDetail?.showDetails ? <Post activePage={"userProfile"} userId={id} /> :
                  <Card className="">
                    <Card.Body className="bg-light text-dark   rounded">
                      <div className="d-flex justify-content-center align-items-center">
                        <span class="material-symbols-outlined fs-1">
                          lock_person
                        </span>
                        <h4 className="ps-3 ">

                          <b>{userDetail?.userInfo?.firstName}{" "}
                            {userDetail?.userInfo?.middleName}{" "}
                            {userDetail?.userInfo?.lastName}</b> his profile
                            <br></br>
                          Only his friends can see what he shares on his profile.
                        </h4>
                      </div>
                    </Card.Body>
                  </Card>}
              </Col>
            </Row>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default FriendProfile;
