import React, { useEffect } from "react";
import { Container, Row, Col, Form, Dropdown, Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import Card from "../../components/Card";

import Default from "../../layouts/default";

// images
import img2 from "../../public/assets/images/page-img/profile-bg1.jpg";

import CustomToggle from "../../components/dropdowns";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import { getEvents } from "../../store/events";
import CreateEvent from "../../components/events";
import { eventActionService } from "../../services/event.service";

const Events = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [eventType, setEventType] = useState("going");

  const dispatch = useDispatch();
  const events = useSelector((state) => state?.events?.allEvents);

  useEffect(() => {
    dispatch(getEvents(eventType));
    window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, [eventType]);

  const ChangeEventStatus = async (eventStaus, id) => {
    const res = await eventActionService(eventStaus, id);
    if (res.success === true) {
      dispatch(getEvents(eventType));
    }
  };

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <CreateEvent show={show} onHide={() => setShow(false)} />
      <Default>
        <Container>
          <Row>
            <Col lg="12">
              <Card className="shadow-none p-0">
                <Card.Header className="rounded border-bottom-0 ">
                  <div className="header-title w-100">
                    <div className="d-lg-flex justify-content-between">
                      <h4 className="mb-2">Discover Events</h4>
                      <div className="card-header-toolbar d-flex align-items-start">
                        <Link
                          onClick={() => setShow(true)}
                          href="#"
                          className="btn btn-primary d-flex align-items-center"
                        >
                          <i className="material-symbols-outlined me-1 md-18">
                            add
                          </i>
                          Create An Event
                        </Link>
                      </div>
                    </div>

                    <Tab.Container
                      id="pills"
                      defaultActiveKey="#pill-eventGoing"
                    >
                      <div className="d-md-flex align-items-center ">
                        {/* <Form.Group>
                          <Form.Control
                            type="datetime-local"
                            name="question2"
                            placeholder="Any date"
                          />
                        </Form.Group> */}
                        <Nav
                          as="ul"
                          variant="pills"
                          className="nav nav-pills d-md-flex align-items-center text-center profile-forum-items p-0 m-0 ms-md-3 ps-md-3 event-tabs"
                        >
                          <Nav.Item
                            as="li"
                            className="p-0"
                            onClick={() => setEventType("going")}
                          >
                            <Nav.Link
                              data-bs-toggle="pill"
                              href="#pill-eventGoing"
                              data-bs-target="#topicstart"
                              role="button"
                              aria-selected="true"
                            >
                              Going
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item
                            as="li"
                            className="p-0"
                            onClick={() => setEventType("invitations")}
                          >
                            <Nav.Link
                              data-bs-toggle="pill"
                              href="#pill-eventInvitations"
                              data-bs-target="#replies"
                              role="button"
                              aria-selected="false"
                              tabIndex="-1"
                            >
                              Invitations
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item
                            as="li"
                            className="p-0"
                            onClick={() => setEventType("interested")}
                          >
                            <Nav.Link
                              data-bs-toggle="pill"
                              href="#pill-eventInterested"
                              data-bs-target="#likedtopic"
                              role="button"
                              aria-selected="false"
                              tabIndex="-1"
                            >
                              Interested
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item
                            as="li"
                            className="p-0"
                            onClick={() => setEventType("hosting")}
                          >
                            <Nav.Link
                              data-bs-toggle="pill"
                              href="#pill-eventHosting"
                              data-bs-target="#likedtopic"
                              role="button"
                              aria-selected="false"
                              tabIndex="-1"
                            >
                              Hosting
                            </Nav.Link>
                          </Nav.Item>
                          {/* <Nav.Item
                            as="li"
                            className="p-0"
                            onClick={() => setEventType("pastEvent")}
                          >
                            <Nav.Link
                              data-bs-toggle="pill"
                              href="#pill-PastEvents"
                              data-bs-target="#likedtopic"
                              role="button"
                              aria-selected="false"
                              tabIndex="-1"
                            >
                              Past events
                            </Nav.Link>
                          </Nav.Item> */}
                        </Nav>
                      </div>
                    </Tab.Container>
                  </div>
                </Card.Header>
              </Card>
              <Row>
                {events &&
                  events?.map((event, index) => (
                    <Col key={index} sm="6" md="6" lg="4">
                      <Card className="card-block card-stretch card-height product">
                        <Card.Body className="p-0 d-flex flex-column justify-content-between">
                          <div>
                            <Link href={`/events/${event.id}`}>
                              <div className="image-block position-relative">
                                <Image
                                  src={event?.fileInfo?.file?.location || img2}
                                  className="img-fluid w-100 rounded-top"
                                  style={{ height: "220px", objectfit: "fill" }}
                                  alt="event-img"
                                  width={100}
                                  height={100}
                                />
                              </div>
                              <div className="product-description p-3">
                                <h5 className="mb-1 text-capitalize">
                                  {event?.title}
                                </h5>
                                <span className="text-secondary mb-2 position-relative">
                                  online
                                </span>
                                {/* <p className="mb-0">1.1K interested</p> */}
                              </div>
                            </Link>
                          </div>
                          <div className="p-3 pt-0 d-flex">
                            <Link href="#" className="w-100 me-2">
                              <button
                                type="button"
                                onClick={() =>
                                  ChangeEventStatus("interested", event._id)
                                }
                                className="btn d-flex me-2 w-100 justify-content-center btn-light"
                              >
                                <i className="material-symbols-outlined me-1">
                                  star
                                </i>
                                Interested
                              </button>
                            </Link>
                            <Link href="#">
                              <button
                                type="button"
                                className="btn d-inline-flex btn-light"
                              >
                                <i className="material-symbols-outlined">
                                  google_plus_reshare
                                </i>
                              </button>
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Col>
            {events?.length === 0 || events === undefined ? (
              <Card className="mb-0">
                <div className="card-body text-center">
                  <h5 className="card-title">No Events</h5>
                </div>
              </Card>
            ) : null}
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default Events;
