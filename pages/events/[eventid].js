import React, { useState } from "react";
import {
  Container,
  Nav,
  Form,
  Dropdown,
  Tab,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import Default from "../../layouts/default";
import ProfileHeader from "../../components/profile-header";
import profilebg7 from "../../public/assets/images/page-img/profile-bg7.jpg";
import Card from "../../components/Card";
import CustomToggle from "../../components/dropdowns";

import store1 from "../../public/assets/images/store/01.jpg";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoById } from "../../store/profile";
import Link from "next/link";
import moment from "moment";
import GuestList from "../../components/events/GuestList";
import Image from "next/image";
import { getEventDetail } from "../../store/events";
import { eventActionService } from "../../services/event.service";

const EventDetail = () => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [eventType, setEventType] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { eventid } = router.query;

  const eventDetail = useSelector((state) => state?.events?.eventDetail);
  const host = useSelector((state) => state?.user?.userProfileDetail);

  useEffect(() => {
    if (host && host.length !== 0) {
      setUserDetail(host[0]);
    }
  }, [host]);

  useEffect(() => {
    if (eventid !== undefined) {
      dispatch(getEventDetail(eventid));
      dispatch(getUserInfoById([`${eventDetail?.eventInfo?.eventCreator}`]));
    }
  }, [eventid]);

  const ChangeEventStatus = async (eventStaus, id) => {
    const res = await eventActionService(eventStaus, id);
    if (res.success === true) {
      dispatch(getEventDetail(eventid));
    }
  };

  return (
    <>
      <GuestList show={show} onHide={() => setShow(false)} />
      <Default className="p-0">
        <div className="position-relative">
          <div className="container event-date-container">
            <h3 className="event-date position-relative">8</h3>
          </div>
          <ProfileHeader
            className="banner-bg"
            img={eventDetail?.fileInfo?.file?.location || profilebg7}
          />
        </div>
        <Card className="card-block card-stretch card-height product">
          <Container>
            <div>
              <p className="mt-4 mb-0">
                {moment(eventDetail?.eventInfo?.start).calendar()}
              </p>
              <h1 className="m-0 text-capitalize">
                {eventDetail?.eventInfo?.title}
              </h1>
              <p className="mb-4 text-capitalize">
                {eventDetail?.eventInfo?.location}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-end flex-column flex-lg-row">
              <Tab.Container defaultActiveKey="f1">
                <nav className="tab-bottom-bordered mb-3 mb-lg-0">
                  <Nav variant="tabs" className="mb-0 rounded-top border-0">
                    <Nav.Link eventKey="f1" href="#">
                      About
                    </Nav.Link>
                    <Nav.Link eventKey="f2" href="#">
                      Discussion
                    </Nav.Link>
                  </Nav>
                </nav>
              </Tab.Container>
              <div className="d-flex align-items-center">
                <div className="blog-meta d-flex align-items-center position-right-side flex-wrap">
                  <Button
                    onClick={() =>
                      ChangeEventStatus(
                        "interested",
                        eventDetail?.eventInfo?._id
                      )
                    }
                    className="date date me-2  d-flex align-items-center btn btn-secondary"
                  >
                    <i className="material-symbols-outlined pe-1 md-18 text-li">
                      star
                    </i>
                    Interested
                  </Button>
                  <Button
                    onClick={() =>
                      ChangeEventStatus("going", eventDetail?.eventInfo?._id)
                    }
                    className="like date me-2  d-flex align-items-center btn btn-secondary"
                  >
                    <i className="material-symbols-outlined pe-1 md-18 text-li">
                      select_check_box
                    </i>
                    Going
                  </Button>
                  <Button className="comments date me-2  d-flex align-items-center btn btn-secondary">
                    <i className="material-symbols-outlined pe-1 md-18 text-li">
                      mode_comment
                    </i>
                    Invite
                  </Button>
                  <Button className="share date me-2 d-flex align-items-center btn btn-secondary">
                    <i className="material-symbols-outlined pe-1 md-18 text-li">
                      share
                    </i>
                    share
                  </Button>
                </div>
                {/* <Form.Group className="form-group mb-0">
                  <select
                    className="form-select"
                    id="exampleFormControlSelect1"
                  >
                    <option>Select your age</option>
                    <option>0-18</option>
                    <option>18-26</option>
                    <option>26-46</option>
                    <option>46-60</option>
                    <option>Above 60</option>
                  </select>
                </Form.Group> */}

                <Dropdown className="dropdown-toggle-main ms-2">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="post-option"
                    className="d-flex"
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className=" dropdown-menu-right"
                    aria-labelledby="post-option"
                  >
                    <Dropdown.Item onClick={handleShow} href="#">
                      Report event!
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Container>
        </Card>
        <Container>
          <Row>
            <Col lg="7">
              <Tab.Container defaultActiveKey="f1">
                <Tab.Content className="card-body">
                  <Tab.Pane eventKey="f1" className="fade show">
                    <Card>
                      <div className="card-header d-flex justify-content-between">
                        <div className="header-title">
                          <h4 className="card-title">Details</h4>
                        </div>
                      </div>
                      <Card.Body>
                        <div className="d-flex flex-column justify-content-between">
                          <div className="d-flex align-items-center mb-3">
                            <i className="material-symbols-outlined pe-2">
                              group
                            </i>
                            <span>
                              {eventDetail?.goingCount +
                                eventDetail?.interestedCount || 0}{" "}
                              people responded
                            </span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <i className="material-symbols-outlined pe-2">
                              person
                            </i>
                            <span>
                              Event by{" "}
                              <Link
                                href={`/friends/${eventDetail?.eventInfo?.eventCreator}`}
                              >
                                {userDetail?.userInfo?.firstName}{" "}
                                {userDetail?.userInfo?.lastName}
                              </Link>
                            </span>
                          </div>
                          {eventDetail?.eventInfo?.location && (
                            <div className="d-flex align-items-center mb-3">
                              <i className="material-symbols-outlined pe-2">
                                location_on
                              </i>
                              <span className="text-capitalize">
                                {eventDetail?.eventInfo?.location || "Jaipur"}
                              </span>
                            </div>
                          )}
                          {/* <div className="d-flex align-items-center mb-3">
                            <i className="material-symbols-outlined pe-2">
                              alarm
                            </i>
                            <span>Duration: 2 hr</span>
                          </div> */}
                          {eventDetail?.eventInfo?.privacy && (
                            <div className="d-flex align-items-center mb-3">
                              <i className="material-symbols-outlined pe-2">
                                {eventDetail?.eventInfo?.privacy === "public"
                                  ? "public"
                                  : "lock"}
                              </i>
                              <span className="text-capitalize">
                                {eventDetail?.eventInfo?.privacy}
                              </span>
                            </div>
                          )}
                          {eventDetail?.eventInfo?.description && (
                            <div className="d-flex align-items-center mb-3">
                              <span className="text-capitalize">
                                {eventDetail?.eventInfo?.description}
                              </span>
                            </div>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                    <Card>
                      <div className="card-header d-flex justify-content-between">
                        <div className="header-title">
                          <h4 className="card-title">Meet your host</h4>
                        </div>
                      </div>
                      <Card.Body>
                        <div className="text-center">
                          <Image
                            src={
                              userDetail?.profilePictureInfo?.file?.location ||
                              store1
                            }
                            className="img-fluid event-host mb-3 rounded-circle w-50"
                            alt="product-img"
                            width={100}
                            height={100}
                          />
                          <h4>Ankit Jangid</h4>
                          <div className="d-flex align-items-center justify-content-center">
                            <span>3 past events</span>
                            {/* <span className="event-detail-dot"></span> */}
                            {/* <span>Page</span>
                            <span className="event-detail-dot"></span>
                            <span>Diagnostic center</span> */}
                          </div>
                        </div>
                      </Card.Body>
                      <Card.Footer className="border-top text-center">
                        <div>
                          {/* <p className="mt-3">
                            Being a diagnostic center our job is to deliver
                            satisfactory services to our customers.
                          </p> */}
                          <Link
                            href={`/friends/${eventDetail?.eventInfo?.eventCreator}`}
                            className="btn btn-primary w-100"
                          >
                            Visit Profile
                          </Link>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
            <Col lg="5">
              <Card>
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Details</h4>
                    </div>
                    <Link
                      href="#"
                      // onClick={() => setShow(true)}
                    >
                      see all
                    </Link>
                  </div>
                  <Row className="mt-3">
                    <Col lg="6" className="text-center">
                      <Link
                        href="#"
                        // onClick={() => setShow(true)}
                      >
                        <h5>{eventDetail?.goingCount || 0}</h5>
                        <p className="m-0">Going</p>
                      </Link>
                    </Col>
                    <Col lg="6" className="text-center">
                      <Link
                        href="#"
                        // onClick={() => setShow(true)}
                      >
                        <h5>{eventDetail?.interestedCount || 0}</h5>
                        <p className="m-0">Interested</p>
                      </Link>
                    </Col>
                  </Row>
                </div>
                <Card.Body>
                  <li className="d-flex align-items-center flex-wrap py-2">
                    <div className="user-img img-fluid flex-shrink-0">
                      <img
                        loading="lazy"
                        src={store1.src}
                        alt="story-img"
                        className="rounded-circle avatar-40 object-fit-cover"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6>Reanne Carnation</h6>
                    </div>
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <button className="btn btn-light rounded">Invite</button>
                    </div>
                  </li>
                  <li className="d-flex align-items-center flex-wrap py-2">
                    <div className="user-img img-fluid flex-shrink-0">
                      <img
                        loading="lazy"
                        src={store1.src}
                        alt="story-img"
                        className="rounded-circle avatar-40 object-fit-cover"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6>Reanne Carnation</h6>
                    </div>
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <button className="btn btn-light rounded">Invite</button>
                    </div>
                  </li>
                  <li className="d-flex align-items-center flex-wrap py-2">
                    <div className="user-img img-fluid flex-shrink-0">
                      <img
                        loading="lazy"
                        src={store1.src}
                        alt="story-img"
                        className="rounded-circle avatar-40 object-fit-cover"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6>Reanne Carnation</h6>
                    </div>
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <button className="btn btn-light rounded">Invite</button>
                    </div>
                  </li>
                </Card.Body>
              </Card>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Share to groups</h4>
                  </div>
                  <a href="#">see all</a>
                </div>
                <Card.Body>
                  <li className="d-flex align-items-center flex-wrap py-2">
                    <div className="user-img img-fluid flex-shrink-0">
                      <img
                        loading="lazy"
                        src={store1.src}
                        alt="story-img"
                        className="rounded-circle avatar-40 object-fit-cover"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6>Reanne Carnation</h6>
                      <p>Private Group</p>
                    </div>
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <button className="btn btn-light rounded d-flex align-item-center">
                        <i className="material-symbols-outlined me-2">send</i>
                        Share
                      </button>
                    </div>
                  </li>
                  <li className="d-flex align-items-center flex-wrap py-2">
                    <div className="user-img img-fluid flex-shrink-0">
                      <img
                        loading="lazy"
                        src={store1.src}
                        alt="story-img"
                        className="rounded-circle avatar-40 object-fit-cover"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6>Reanne Carnation</h6>
                      <p>Private Group</p>
                    </div>
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <button className="btn btn-light rounded d-flex align-item-center">
                        <i className="material-symbols-outlined me-2">send</i>
                        Share
                      </button>
                    </div>
                  </li>
                  <li className="d-flex align-items-center flex-wrap py-2">
                    <div className="user-img img-fluid flex-shrink-0">
                      <img
                        loading="lazy"
                        src={store1.src}
                        alt="story-img"
                        className="rounded-circle avatar-40 object-fit-cover"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6>Reanne Carnation</h6>
                      <p>Private Group</p>
                    </div>
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                      <button className="btn btn-light rounded d-flex align-item-center">
                        <i className="material-symbols-outlined me-2">send</i>
                        Share
                      </button>
                    </div>
                  </li>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default EventDetail;
