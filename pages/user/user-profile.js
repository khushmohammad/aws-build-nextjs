import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Nav,
  Tab,
  OverlayTrigger,
  Tooltip,
  Button,
  Modal,
} from "react-bootstrap";
import Card from "../../components/Card";
import CustomToggle from "../../components/dropdowns";
import ShareOffcanvas from "../../components/share-offcanvas";
import FsLightbox from "fslightbox-react";
import { Uploader } from "../../components/ImageDropzone/Uploader";
import { CoverPicUploader } from "../../components/ImageDropzone/CoverPicUploader";
import moment from "moment";
// images
import img1 from "../../public/assets/images/page-img/profile-bg1.jpg";
import img2 from "../../public/assets/images/user/11.png";
import img3 from "../../public/assets/images/icon/08.png";
import img4 from "../../public/assets/images/icon/09.png";
import img5 from "../../public/assets/images/icon/10.png";
import img6 from "../../public/assets/images/icon/11.png";
import img7 from "../../public/assets/images/icon/12.png";
import img8 from "../../public/assets/images/icon/13.png";
import img9 from "../../public/assets/images/page-img/07.jpg";
import img10 from "../../public/assets/images/page-img/06.jpg";
import user1 from "../../public/assets/images/user/1.jpg";
import user05 from "../../public/assets/images/user/05.jpg";
import user01 from "../../public/assets/images/user/01.jpg";
import user02 from "../../public/assets/images/user/02.jpg";
import user03 from "../../public/assets/images/user/03.jpg";
import user06 from "../../public/assets/images/user/06.jpg";
import user07 from "../../public/assets/images/user/07.jpg";
import user08 from "../../public/assets/images/user/08.jpg";
import user09 from "../../public/assets/images/user/09.jpg";
import user10 from "../../public/assets/images/user/10.jpg";
import user13 from "../../public/assets/images/user/13.jpg";
import user14 from "../../public/assets/images/user/14.jpg";
import user15 from "../../public/assets/images/user/15.jpg";
import user16 from "../../public/assets/images/user/16.jpg";
import user17 from "../../public/assets/images/user/17.jpg";
import user18 from "../../public/assets/images/user/18.jpg";
import user19 from "../../public/assets/images/user/19.jpg";
import p1 from "../../public/assets/images/page-img/p1.jpg";
import p3 from "../../public/assets/images/page-img/p3.jpg";
import icon1 from "../../public/assets/images/icon/01.png";
import icon2 from "../../public/assets/images/icon/02.png";
import icon3 from "../../public/assets/images/icon/03.png";
import icon4 from "../../public/assets/images/icon/04.png";
import icon5 from "../../public/assets/images/icon/05.png";
import icon6 from "../../public/assets/images/icon/06.png";
import icon7 from "../../public/assets/images/icon/07.png";
import g1 from "../../public/assets/images/page-img/g1.jpg";
import g2 from "../../public/assets/images/page-img/g2.jpg";
import g3 from "../../public/assets/images/page-img/g3.jpg";
import g4 from "../../public/assets/images/page-img/g4.jpg";
import g5 from "../../public/assets/images/page-img/g5.jpg";
import g6 from "../../public/assets/images/page-img/g6.jpg";
import g7 from "../../public/assets/images/page-img/g7.jpg";
import g8 from "../../public/assets/images/page-img/g8.jpg";
import g9 from "../../public/assets/images/page-img/g9.jpg";

import img51 from "../../public/assets/images/page-img/51.jpg";
import img52 from "../../public/assets/images/page-img/52.jpg";
import img53 from "../../public/assets/images/page-img/53.jpg";
import img54 from "../../public/assets/images/page-img/54.jpg";
import img55 from "../../public/assets/images/page-img/55.jpg";
import img56 from "../../public/assets/images/page-img/56.jpg";
import img57 from "../../public/assets/images/page-img/57.jpg";
import img58 from "../../public/assets/images/page-img/58.jpg";
import img59 from "../../public/assets/images/page-img/59.jpg";
import img60 from "../../public/assets/images/page-img/60.jpg";
import img61 from "../../public/assets/images/page-img/61.jpg";
import img62 from "../../public/assets/images/page-img/62.jpg";
import img64 from "../../public/assets/images/page-img/64.jpg";
import img65 from "../../public/assets/images/page-img/65.jpg";
import img63 from "../../public/assets/images/page-img/63.jpg";

import Link from "next/link";
import Image from "next/image";
import Default from "../../layouts/default";
import { useSelector } from "react-redux";
import HobbyModal from "../../components/modals/HobbyModal";
import RelationModal from "../../components/modals/RelationModal";
import FamilyModal from "../../components/modals/FamilyModal";
import ProfessionalModal from "../../components/modals/ProfessionalModal";
import CollegeModal from "../../components/modals/CollegeModal";
import LanguageModal from "../../components/modals/LanguageModal";
import Post from "../../components/post/postView/Post";
import { getAllPostsCountByUserId } from "../../services/posts.service";
import FriendCardProfile from "../../components/friends/FriendCardProfile";
import UserFriend from "../../components/friends/UserFriend";

const UserProfile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profilePicModalShow, setProfilePicModalShow] = useState(false);
  const [coverPicModalShow, setCoverPicModalShow] = useState(false);

  const [showHobby, setShowHobby] = useState(false);
  const [relationModal, setRelationModal] = useState(false);
  const [familyModal, setFamilyModal] = useState(false);
  const [professionalModal, setProfessionalModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [collegeModal, setCollegeModal] = useState(false);
  const postsLength = useSelector((state) => state?.allFeed?.postcount);

  const user = useSelector((state) => state.user.data);
  const allHobbies = user.hobbies;

  const handleShowHobby = () => setShowHobby(false);

  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  function imageOnSlide(number) {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  }

  return (
    <>
      <Uploader
        show={profilePicModalShow}
        onHide={() => setProfilePicModalShow(false)}
      />

      <CoverPicUploader
        show={coverPicModalShow}
        onHide={() => setCoverPicModalShow(false)}
      />
      <Default>
        <FsLightbox
          toggler={imageController.toggler}
          sources={[
            g1,
            g2,
            g3,
            g4,
            g5,
            g6,
            g7,
            g8,
            g9,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img59,
            img60,
            img61,
            img62,
            img63,
            img64,
            img65,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img51,
            img52,
            img53,
            img54,
            img55,
            img56,
            img57,
            img58,
            img59,
            img60,
          ]}
          slide={imageController.slide}
        />

        <Container>
          <Row>
            <Col sm={12}>
              <Card>
                <Card.Body className=" profile-page p-0">
                  <div className="profile-header">
                    <div
                      className="position-relative justify-content-center"
                      style={{ width: "100%", height: "250px" }}
                    >
                      <Image
                        loading="lazy"
                        src={user?.coverPictureInfo?.file?.location || img1}
                        alt="profile-bg"
                        className="rounded img-fluid"
                        layout="fill"
                        objectFit="contain"
                      />
                      <ul
                        className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0"
                        style={{ zIndex: "1" }}
                      >
                        <li onClick={() => setCoverPicModalShow(true)}>
                          <Link href="" className="material-symbols-outlined">
                            photo_camera
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/user/user-account-setting"
                            className="material-symbols-outlined"
                          >
                            settings
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="user-detail text-center mb-3">
                      <div
                        className="profile-img "
                        style={{ position: "relative" }}
                      >
                        <Image
                          loading="lazy"
                          src={user?.profilePictureInfo?.file?.location || img2}
                          alt="profile-img1"
                          className="avatar-130 img-fluid"
                          width={100}
                          height={100}
                        />
                        <div
                          className="p-image d-flex justify-content-center align-items-center"
                          style={{ position: "absolute", left: "53%" }}
                          onClick={() => setProfilePicModalShow(true)}
                        >
                          <span className="material-symbols-outlined upload-button text-white">
                            photo_camera
                          </span>
                        </div>
                      </div>
                      <div className="profile-detail">
                        {user && (
                          <h3>
                            {user.userInfo.firstName} {user.userInfo.lastName}
                          </h3>
                        )}
                      </div>
                    </div>
                    <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                      <div className="social-links">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={img3}
                                className="img-fluid rounded"
                                alt="facebook"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={img4}
                                className="img-fluid rounded"
                                alt="Twitter"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={img5}
                                className="img-fluid rounded"
                                alt="Instagram"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={img6}
                                className="img-fluid rounded"
                                alt="Google plus"
                              />
                            </Link>
                          </li>
                          <li className="text-center pe-3">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={img7}
                                className="img-fluid rounded"
                                alt="You tube"
                              />
                            </Link>
                          </li>
                          <li className="text-center md-pe-3 pe-0">
                            <Link href="#">
                              <Image
                                loading="lazy"
                                src={img8}
                                className="img-fluid rounded"
                                alt="linkedin"
                              />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="social-info">
                        <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li className="text-center ps-3">
                            <h6>Posts</h6>
                            <p className="mb-0">
                              {postsLength && postsLength > 0 ? postsLength : 0}
                            </p>
                          </li>
                          <li className="text-center ps-3">
                            <h6>Followers</h6>
                            <p className="mb-0">206</p>
                          </li>
                          <li className="text-center ps-3">
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
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Card className="p-0">
                <Card.Body className="p-0">
                  <div className="user-tabing">
                    <Nav
                      as="ul"
                      variant="pills"
                      className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
                    >
                      <Nav.Item as="li" className=" col-12 col-sm-3 p-0 ">
                        <Nav.Link
                          href="#pills-timeline-tab"
                          eventKey="first"
                          role="button"
                          className=" text-center p-3"
                        >
                          Timeline
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                        <Nav.Link
                          href="#pills-about-tab"
                          eventKey="second"
                          role="button"
                          className="text-center p-3"
                        >
                          About
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className=" col-12 col-sm-3 p-0">
                        <Nav.Link
                          href="#pills-friends-tab"
                          eventKey="third"
                          role="button"
                          className="text-center p-3"
                        >
                          Friends
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                        <Nav.Link
                          href="#pills-photos-tab"
                          eventKey="forth"
                          role="button"
                          className="text-center p-3"
                        >
                          Photos
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </Card.Body>
              </Card>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Card.Body className=" p-0">
                      <Row>
                        <Col lg={4}>
                          {/* <Card>
                            <Card.Body>
                              <Link href="#">
                                <span className="badge badge-pill bg-primary font-weight-normal ms-auto me-1  material-symbols-outlined md-14">
                                  grade
                                </span>{" "}
                                27 Items for you
                              </Link>
                            </Card.Body>
                          </Card> */}
                          {/* <Card>
                            <div className="card-header d-flex justify-content-between">
                              <div className="header-title">
                                <h4 className="card-title">Life Event</h4>
                              </div>
                              <div className="card-header-toolbar d-flex align-items-center">
                                <p className="m-0">
                                  <Link href="#"> Create </Link>
                                </p>
                              </div>
                            </div>
                            <Card.Body>
                              <Row>
                                <Col sm={12}>
                                  <div className="event-post position-relative">
                                    <Link href="#">
                                      <Image
                                        loading="lazy"
                                        src={img9}
                                        alt="gallary1"
                                        className="img-fluid rounded"
                                      />
                                    </Link>
                                    <div className="job-icon-position">
                                      <div className="job-icon bg-primary p-2 d-inline-block rounded-circle material-symbols-outlined text-white">
                                        local_mall
                                      </div>
                                    </div>
                                    <div className="card-body text-center p-2">
                                      <h5>Started New Job at Apple</h5>
                                      <p>January 24, 2019</p>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={12}>
                                  <div className="event-post position-relative">
                                    <Link href="#">
                                      <Image
                                        loading="lazy"
                                        src={img10}
                                        alt="gallary1"
                                        className="img-fluid rounded"
                                      />
                                    </Link>
                                    <div className="job-icon-position">
                                      <div className="job-icon bg-primary p-2 d-inline-block rounded-circle material-symbols-outlined text-white">
                                        local_mall
                                      </div>
                                    </div>
                                    <div className="card-body text-center p-2">
                                      <h5>Freelance Photographer</h5>
                                      <p className="mb-0">January 24, 2019</p>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card> */}
                          <Card>
                            <div className="card-header d-flex justify-content-between">
                              <div className="header-title">
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
                                  <Link
                                    onClick={() => imageOnSlide(1)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g1}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(2)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g2}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(3)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g3}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(4)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g4}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(5)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g5}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(6)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g6}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(7)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g7}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(8)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g8}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() => imageOnSlide(9)}
                                    href="#"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={g9}
                                      alt="gallary"
                                      className="img-fluid"
                                    />
                                  </Link>
                                </li>
                              </ul>
                            </Card.Body>
                          </Card>
                          {/* friend list comp */}
                          <UserFriend />
                        </Col>
                        <Col lg={8}>
                          <Post activePage={"myProfile"} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="about1"
                    >
                      <Row>
                        <Col md={4}>
                          <Card>
                            <Card.Body>
                              <Nav
                                variant="pills"
                                className=" basic-info-items list-inline d-block p-0 m-0"
                              >
                                <Nav.Item>
                                  <Nav.Link href="#" eventKey="about1">
                                    Contact and Basic Info
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link href="#" eventKey="about2">
                                    Hobbies and Interests
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link href="#" eventKey="about3">
                                    Family and Relationship
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link href="#" eventKey="about4">
                                    Work and Education
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link href="#" eventKey="about5">
                                    Languages Known
                                  </Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={8} className=" ps-4">
                          <Card>
                            <Card.Body>
                              <Tab.Content>
                                <Tab.Pane eventKey="about1">
                                  <h4>Personal Info</h4>
                                  <hr />
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Nick Name:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.nickName ? (
                                        <p className="mb-0">{user.nickName}</p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Full Name:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.userInfo ? (
                                        <p className="mb-0">
                                          {user.userInfo.firstName}{" "}
                                          {user.userInfo.middleName}{" "}
                                          {user.userInfo.lastName}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>About Me:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.profileDescription ? (
                                        <p className="mb-0">
                                          {user.profileDescription}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Email:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user.userInfo.userName ? (
                                        <p className="mb-0">
                                          {user.userInfo.userName}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Mobile:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user.phoneNumber ? (
                                        <p className="mb-0">
                                          {user.phoneNumber}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Address:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user.address ? (
                                        <p className="mb-0">
                                          {user.address}
                                          {user.cityInfo.name ? "," : ""}
                                          {user.cityInfo.name}
                                          {user.stateInfo.name ? "," : ""}
                                          {user.stateInfo.name}
                                          {user.userInfo.countryInfo.name
                                            ? ","
                                            : ""}
                                          {user.userInfo.countryInfo.name}
                                          {user.pinCode ? "," : ""}
                                          {user.pinCode}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  {/* <Row className="row mb-2">
                                  <div className="col-3">
                                    <h6>Social Link:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">www.bootstrap.com</p>
                                  </div>
                                </Row> */}
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Birth Date:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user.userInfo.dateOfBirth ? (
                                        <p className="mb-0">
                                          {moment(
                                            user.userInfo.dateOfBirth
                                          ).format("DD-MMM-YYYY")}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  {/* <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>Birth Year:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">1994</p>
                                  </div>
                                </Row>
                                <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>Birthplace:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">Austin, Texas, USA</p>
                                  </div>
                                </Row> */}
                                  {/* <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>Lives in:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">
                                      San Francisco, California, USA
                                    </p>
                                  </div>
                                </Row> */}
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Gender:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user.userInfo.gender ? (
                                        <p className="mb-0">
                                          {user.userInfo.gender}
                                          {/* === "Male"
                                          ? "Male"
                                          : user.userInfo.gender === 2
                                          ? "Female"
                                          : "Other" */}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  {/* <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>Interested in:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">Designing</p>
                                  </div>
                                </Row> */}
                                  {/* <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>language:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">English, French</p>
                                  </div>
                                </Row>
                                <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>Joined:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">April 31st, 2014</p>
                                  </div>
                                </Row> */}
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Relationship Status:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user.maritalStatusInfo &&
                                      user.maritalStatusInfo.dropdownValue ? (
                                        <p className="mb-0">
                                          {user.maritalStatusInfo.dropdownValue}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Current Town/City:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.City ? (
                                        <p className="mb-0">{user.user.City}</p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Home Town/City:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.City ? (
                                        <p className="mb-0">{user.user.City}</p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Country:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.userInfo.countryInfo ? (
                                        <p className="mb-0">
                                          {user.userInfo.countryInfo.name}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Member Since:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.createdAt ? (
                                        <p className="mb-0">
                                          {moment(user.createdAt).format(
                                            "DD-MMM-YYYY"
                                          )}
                                        </p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  {/* <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>Country Code:</h6>
                                  </div>
                                  <div className="col-9">
                                    {user.userInfo.countryInfo.countryCode ? (
                                      <p className="mb-0">
                                        {user.userInfo.countryInfo.countryCode}
                                      </p>
                                    ) : (
                                      "---"
                                    )}
                                  </div>
                                </Row> */}
                                  {/* <Row className="mb-3">
                                  <div className="col-3">
                                    <h6>Political Incline:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">Democrat</p>
                                  </div>
                                </Row> */}
                                  <h4 className="mt-2">Websites</h4>
                                  <hr />
                                  <Row className="mb-2">
                                    <div className="col-3">
                                      <h6>Site Url:</h6>
                                    </div>
                                    <div className="col-9">
                                      {user && user.siteUrl ? (
                                        <p className="mb-0">{user.siteUrl}</p>
                                      ) : (
                                        "---"
                                      )}
                                    </div>
                                  </Row>
                                  {/* <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>Social Link:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">www.bootstrap.com</p>
                                  </div>
                                </Row> */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="about2">
                                  <h4 className="mt-3 mb-3">
                                    Add Hobbies and Interests
                                  </h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li
                                      className="d-flex mb-4 align-items-center"
                                      role="button"
                                      onClick={() => setShowHobby(true)}
                                    >
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add Hobby</h6>
                                      </div>
                                    </li>
                                    <HobbyModal
                                      show={showHobby}
                                      onHide={handleShowHobby}
                                      heading="Add Hobby"
                                    />
                                  </ul>
                                  <h4 className="mb-3">
                                    Hobbies and Interests
                                  </h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="w-100">
                                        {allHobbies.length > 0 ? (
                                          allHobbies.map((ele) => {
                                            // console.log("array of hobby", ele);
                                            return (
                                              <div
                                                key={ele.hobbyId._id}
                                                className="d-flex flex-wrap justify-content-between p-1"
                                              >
                                                <div className="ms-2">
                                                  <h6>
                                                    {ele.hobbyId.dropdownValue}
                                                  </h6>
                                                </div>
                                                {/* <div className="edit-relation">
                                              <Link
                                                href="#"
                                                className="d-flex align-items-center"
                                              >
                                                <span className="material-symbols-outlined me-2 md-18">
                                                  edit
                                                </span>
                                                Edit
                                              </Link>
                                            </div> */}
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <p className="ms-2">No Hobbies</p>
                                        )}
                                      </div>
                                    </li>
                                  </ul>
                                  {/* <h4 className="mt-2">Hobbies and Interests</h4>
                                <hr />
                                <h6 className="mb-1">Hobbies:</h6>

                                {user.hobbies.length > 0 ? (
                                  user.hobbies.map((hobbies) => {
                                    <li>{hobbies.name}</li>;
                                  })
                                ) : (
                                  <p>No Hobbies</p>
                                )} */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="about3">
                                  <h4 className="mb-3">Relationship</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li
                                      className="d-flex mb-4 align-items-center"
                                      role="button"
                                      onClick={() => setRelationModal(true)}
                                    >
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="media-support-info ms-3">
                                        <h6>Add Your Relationship Status</h6>
                                      </div>
                                    </li>
                                    <RelationModal
                                      heading="Add Relation"
                                      onHide={() => setRelationModal(false)}
                                      show={relationModal}
                                    />
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <Image
                                          loading="lazy"
                                          src={user01}
                                          alt="story1"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                          <div className="ms-3">
                                            <h6>Paul Molive</h6>
                                            <p className="mb-0">Brothe</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link href="#">
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <h4 className="mt-3 mb-3">Family Members</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li
                                      className="d-flex mb-4 align-items-center"
                                      role="button"
                                      onClick={() => setFamilyModal(true)}
                                    >
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="media-support-info ms-3">
                                        <h6>Add Family Members</h6>
                                      </div>
                                    </li>
                                    <FamilyModal
                                      show={familyModal}
                                      heading="Add Family Member"
                                      onHide={() => setFamilyModal(false)}
                                    />
                                    <li className="d-flex justify-content-between mb-4  align-items-center">
                                      <div className="user-img img-fluid">
                                        <Image
                                          loading="lazy"
                                          src={user02}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className=" ms-3">
                                            <h6>Anna Mull</h6>
                                            <p className="mb-0">Sister</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link href="#">
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <Image
                                          loading="lazy"
                                          src={user03}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                          <div className="ms-3">
                                            <h6>Paige Turner</h6>
                                            <p className="mb-0">Cousin</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link href="#">
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="about4">
                                  <h4 className="mb-3">Professional Skills</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li
                                      className="d-flex mb-4 align-items-center"
                                      role="button"
                                      onClick={() => setProfessionalModal(true)}
                                    >
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add Professional Skills</h6>
                                      </div>
                                    </li>
                                    <ProfessionalModal
                                      show={professionalModal}
                                      heading="Add Professional Skills"
                                      onHide={() => setProfessionalModal(false)}
                                    />
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="user-img img-fluid">
                                        <Image
                                          loading="lazy"
                                          src={user01}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex justify-content-between">
                                          <div className="ms-3">
                                            <h6>Themeforest</h6>
                                            <p className="mb-0">Web Designer</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              href="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <h4 className="mt-3 mb-3">College/School</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li
                                      className="d-flex mb-4 align-items-center"
                                      role="button"
                                      onClick={() => setCollegeModal(true)}
                                    >
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add College/School</h6>
                                      </div>
                                    </li>
                                    <CollegeModal
                                      show={collegeModal}
                                      heading="Add College/School"
                                      onHide={() => setCollegeModal(false)}
                                    />
                                    <li className="d-flex mb-4 align-items-center">
                                      <div className="user-img img-fluid">
                                        <Image
                                          loading="lazy"
                                          src={user01}
                                          alt="story-img"
                                          className="rounded-circle avatar-40"
                                        />
                                      </div>
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className="ms-3">
                                            <h6>Lorem ipsum</h6>
                                            <p className="mb-0">USA</p>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              href="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="about5">
                                  <h4 className="mt-3 mb-3">Add Languages</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li
                                      className="d-flex mb-4 align-items-center"
                                      role="button"
                                      onClick={() => setLanguageModal(true)}
                                    >
                                      <div className="user-img img-fluid">
                                        <span className="material-symbols-outlined md-18">
                                          add
                                        </span>
                                      </div>
                                      <div className="ms-3">
                                        <h6>Add Language</h6>
                                      </div>
                                    </li>
                                    <LanguageModal
                                      show={languageModal}
                                      heading="Add Language "
                                      onHide={() => setLanguageModal(false)}
                                    />
                                  </ul>
                                  <h4 className="mb-3">Languages Known</h4>
                                  <ul className="suggestions-lists m-0 p-0">
                                    <li className="d-flex mb-4 align-items-center justify-content-between">
                                      <div className="w-100">
                                        <div className="d-flex flex-wrap justify-content-between">
                                          <div className="ms-2">
                                            <h6>English</h6>
                                          </div>
                                          <div className="edit-relation">
                                            <Link
                                              href="#"
                                              className="d-flex align-items-center"
                                            >
                                              <span className="material-symbols-outlined me-2 md-18">
                                                edit
                                              </span>
                                              Edit
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </Tab.Pane>
                              </Tab.Content>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="all-friends"
                    >
                      <Card>
                        <Card.Body>
                          <h2>Friends</h2>
                          <div className="friend-list-tab mt-2">
                            <Nav
                              variant="pills"
                              className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
                            >
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-all-friends"
                                  eventKey="all-friends"
                                >
                                  All Friends
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-recently-add"
                                  eventKey="recently-add"
                                >
                                  Recently Added
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-closefriends"
                                  eventKey="closefriends"
                                >
                                  {" "}
                                  Close friends
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-home"
                                  eventKey="home-town"
                                >
                                  {" "}
                                  Home/Town
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link
                                  href="#pill-following"
                                  eventKey="following"
                                >
                                  Following
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey="all-friends">
                                <Card.Body className="p-0">
                                  <Row>
                                    <FriendCardProfile />
                                  </Row>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="recently-add">
                                <div className="card-body p-0">
                                  <div className="row">
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Otto Matic</h5>
                                              <p className="mb-0">4 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Moe Fugga</h5>
                                              <p className="mb-0">16 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Tom Foolery</h5>
                                              <p className="mb-0">14 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bud Wiser</h5>
                                              <p className="mb-0">16 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Polly Tech</h5>
                                              <p className="mb-0">10 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Holly Graham</h5>
                                              <p className="mb-0">8 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Tara Zona</h5>
                                              <p className="mb-0">5 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barry Cade</h5>
                                              <p className="mb-0">20 friends</p>
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
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="closefriends">
                                <div className="card-body p-0">
                                  <div className="row">
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bud Wiser</h5>
                                              <p className="mb-0">32 friends</p>
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
                                              <h5>Otto Matic</h5>
                                              <p className="mb-0">9 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Peter Pants</h5>
                                              <p className="mb-0">2 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Zack Lee</h5>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Barry Wine</h5>
                                              <p className="mb-0">36 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Robin Banks</h5>
                                              <p className="mb-0">22 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Cory Ander</h5>
                                              <p className="mb-0">18 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Moe Fugga</h5>
                                              <p className="mb-0">12 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Polly Tech</h5>
                                              <p className="mb-0">30 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Hal Appeno</h5>
                                              <p className="mb-0">25 friends</p>
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
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="home-town">
                                <div className="card-body p-0">
                                  <div className="row">
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Paul Molive</h5>
                                              <p className="mb-0">14 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Paige Turner</h5>
                                              <p className="mb-0">8 friends</p>
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
                                              <h5>Barb Ackue</h5>
                                              <p className="mb-0">23 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Ira Membrit</h5>
                                              <p className="mb-0">16 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Maya Didas</h5>
                                              <p className="mb-0">12 friends</p>
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
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="following">
                                <div className="card-body p-0">
                                  <div className="row">
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
                                              <h5>Maya Didas</h5>
                                              <p className="mb-0">20 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Monty Carlo</h5>
                                              <p className="mb-0">3 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Cliff Hanger</h5>
                                              <p className="mb-0">20 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>b Ackue</h5>
                                              <p className="mb-0">12 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user09}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bob Frapples</h5>
                                              <p className="mb-0">12 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user10}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Anna Mull</h5>
                                              <p className="mb-0">6 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user15}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>ry Wine</h5>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user16}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Don Stairs</h5>
                                              <p className="mb-0">12 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user17}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Peter Pants</h5>
                                              <p className="mb-0">8 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user18}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Polly Tech</h5>
                                              <p className="mb-0">18 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user19}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Tara Zona</h5>
                                              <p className="mb-0">30 friends</p>
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
                                              <h5>Arty Ficial</h5>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user06}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bill Emia</h5>
                                              <p className="mb-0">25 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user07}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Bill Yerds</h5>
                                              <p className="mb-0">9 friends</p>
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
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link href="#">
                                              <Image
                                                loading="lazy"
                                                src={user08}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Matt Innae</h5>
                                              <p className="mb-0">19 friends</p>
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
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="p1">
                      <Card>
                        <Card.Body>
                          <h2>Photos</h2>
                          <div className="friend-list-tab mt-2">
                            <Nav
                              variant="pills"
                              className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
                            >
                              <li>
                                <Nav.Link
                                  eventKey="p1"
                                  href="#pill-photosofyou"
                                >
                                  Photos of You
                                </Nav.Link>
                              </li>
                              <li>
                                <Nav.Link
                                  eventKey="p2"
                                  href="#pill-your-photos"
                                >
                                  Your Photos
                                </Nav.Link>
                              </li>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey="p1">
                                <Card.Body className="p-0">
                                  <div className="d-grid gap-2 d-grid-template-1fr-13">
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(10)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img51}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(11)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img52}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(12)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img53}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(13)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img54}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(14)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img55}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(15)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img56}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(16)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img57}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(17)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img58}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(18)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img59}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(19)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img60}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(20)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img61}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(21)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img62}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(22)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img63}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(23)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img64}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(24)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img65}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(25)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img51}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(26)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img52}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(27)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img53}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(28)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img54}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(29)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img55}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(30)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img56}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(31)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img57}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(32)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img58}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="p2">
                                <div className="card-body p-0">
                                  <div className="d-grid gap-2 d-grid-template-1fr-13 ">
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(33)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img51}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(34)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img52}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(35)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img53}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(36)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img54}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(37)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img55}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(38)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img56}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(39)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img57}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(40)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img58}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(41)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img59}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link
                                          onClick={() => imageOnSlide(42)}
                                          href="#"
                                        >
                                          <Image
                                            loading="lazy"
                                            src={img60}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  60{" "}
                                                  <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  30{" "}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link
                                                  href="#"
                                                  className="pe-3 text-white d-flex align-items-center"
                                                >
                                                  {" "}
                                                  10{" "}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{" "}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>Edit or Remove</Tooltip>
                                          }
                                        >
                                          <Link
                                            href="#"
                                            className="image-edit-btn material-symbols-outlined md-16"
                                          >
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  </Tab.Pane>
                  {/* <div className="col-sm-12 text-center">
                  <Image
                    loading="lazy"
                    src={loader}
                    alt="loader"
                    style={{ height: "100px" }}
                  />
                </div> */}
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default UserProfile;
