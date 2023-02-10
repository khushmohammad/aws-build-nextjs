import React from "react";
import { Container, Row, Col, Form, Dropdown } from "react-bootstrap";
import Link from "next/link";
import Card from "../../components/Card";

import Default from "../../layouts/default";

import store1 from "../../public/assets/images/store/01.jpg";
import store2 from "../../public/assets/images/store/02.jpg";
import store3 from "../../public/assets/images/store/03.jpg";
import store4 from "../../public/assets/images/store/04.jpg";
import store5 from "../../public/assets/images/store/05.jpg";
import store6 from "../../public/assets/images/store/06.jpg";
import store7 from "../../public/assets/images/store/07.jpg";
import store8 from "../../public/assets/images/store/08.jpg";
import CustomToggle from "../../components/dropdowns";
import { useSelector } from "react-redux";
import Image from "next/image";

const Events = () => {
  const events = useSelector((state) => state?.events?.allEvents);

  return (
    <>
      <Default>
        <Container>
          <Row>
            <Col lg="12">
              <Card className="shadow-none p-0">
                <Card.Header className="d-flex justify-content-between rounded border-bottom-0 ">
                  <div className="header-title">
                    <h4 className="mb-2">Discover Events</h4>
                    <div className="d-md-flex align-items-center ">
                      <Form.Group>
                        <Form.Control
                          type="datetime-local"
                          name="question2"
                          placeholder="Any date"
                        />
                      </Form.Group>
                      <ul
                        className="nav nav-pills d-md-flex align-items-center text-center profile-forum-items p-0 m-0 ms-md-3 ps-md-3 event-tabs"
                        role="tablist"
                      >
                        <li className="p-0">
                          <a
                            className="nav-link active"
                            data-bs-toggle="pill"
                            href="#pill-topicstart-tab"
                            data-bs-target="#topicstart"
                            role="button"
                            aria-selected="true"
                          >
                            Going
                          </a>
                        </li>
                        <li className="p-0">
                          <a
                            className="nav-link"
                            data-bs-toggle="pill"
                            href="#pill-replies-tab"
                            data-bs-target="#replies"
                            role="button"
                            aria-selected="false"
                            tabindex="-1"
                          >
                            Invitations
                          </a>
                        </li>
                        <li className="p-0">
                          <a
                            className="nav-link"
                            data-bs-toggle="pill"
                            href="#pill-likedtopic-tab"
                            data-bs-target="#likedtopic"
                            role="button"
                            aria-selected="false"
                            tabindex="-1"
                          >
                            Interested
                          </a>
                        </li>
                        <li className="p-0">
                          <a
                            className="nav-link"
                            data-bs-toggle="pill"
                            href="#pill-likedtopic-tab"
                            data-bs-target="#likedtopic"
                            role="button"
                            aria-selected="false"
                            tabindex="-1"
                          >
                            Hosting
                          </a>
                        </li>
                        <li className="p-0">
                          <a
                            className="nav-link"
                            data-bs-toggle="pill"
                            href="#pill-likedtopic-tab"
                            data-bs-target="#likedtopic"
                            role="button"
                            aria-selected="false"
                            tabindex="-1"
                          >
                            Past events
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card.Header>
              </Card>
              <Row>
                {events?.map((event, index) => (
                  <Col key={index} sm="6" md="6" lg="4">
                    <Card className="card-block card-stretch card-height product">
                      <Card.Body className="p-0 d-flex flex-column justify-content-between">
                        <div>
                          <div className="image-block position-relative">
                            <Image
                              src={event?.coverPicture || store5}
                              className="img-fluid w-100 rounded-top"
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
                            <p className="mb-0">1.1K interested</p>
                          </div>
                        </div>
                        <div className="p-3 pt-0 d-flex">
                          <button
                            type="button"
                            className="btn d-flex me-2 w-100 justify-content-center btn-light"
                          >
                            <i className="material-symbols-outlined me-1">
                              star
                            </i>
                            Interested
                          </button>
                          <button
                            type="button"
                            className="btn d-inline-flex btn-light"
                          >
                            <i className="material-symbols-outlined">
                              google_plus_reshare
                            </i>
                          </button>
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
