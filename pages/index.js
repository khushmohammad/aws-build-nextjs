import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import Card from "../components/Card";
import CustomToggle from "../components/dropdowns";
import ShareOffcanvas from "../components/share-offcanvas";

//image
import user1 from "../public/assets/images/user/1.jpg";
import user01 from "../public/assets/images/user/01.jpg";
import user2 from "../public/assets/images/user/02.jpg";
import user3 from "../public/assets/images/user/03.jpg";
import user4 from "../public/assets/images/user/04.jpg";
import img1 from "../public/assets/images/small/07.png";
import img2 from "../public/assets/images/small/08.png";
import img3 from "../public/assets/images/small/09.png";
import img4 from "../public/assets/images/small/10.png";
import img5 from "../public/assets/images/small/11.png";
import img6 from "../public/assets/images/small/12.png";
import img7 from "../public/assets/images/small/13.png";
import img8 from "../public/assets/images/small/14.png";
import p1 from "../public/assets/images/page-img/p1.jpg";
import s1 from "../public/assets/images/page-img/s1.jpg";
import s2 from "../public/assets/images/page-img/s2.jpg";
import s3 from "../public/assets/images/page-img/s3.jpg";
import s4 from "../public/assets/images/page-img/s4.jpg";
import s5 from "../public/assets/images/page-img/s5.jpg";
import p2 from "../public/assets/images/page-img/p2.jpg";
import p3 from "../public/assets/images/page-img/p3.jpg";
import p4 from "../public/assets/images/page-img/p4.jpg";
import p5 from "../public/assets/images/page-img/p5.jpg";
import img42 from "../public/assets/images/page-img/42.png";
import icon1 from "../public/assets/images/icon/01.png";
import icon2 from "../public/assets/images/icon/02.png";
import icon3 from "../public/assets/images/icon/03.png";
import icon4 from "../public/assets/images/icon/04.png";
import icon5 from "../public/assets/images/icon/05.png";
import icon6 from "../public/assets/images/icon/06.png";
import icon7 from "../public/assets/images/icon/07.png";
import img9 from "../public/assets/images/small/img-1.jpg";
import img10 from "../public/assets/images/small/img-2.jpg";
import loader from "../public/assets/images/page-img/page-load-loader.gif";
import Default from "../layouts/default";
import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../store/profile";
import Post from "../components/post/postView/Post";
import axios from "axios";
import CreatePost from "../components/post/CreatePost";

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: session } = useSession();
  const profileImage = useSelector((state) => state.user.profile_picture);

  return (
    <>
      <Default>
        <Container>
          <Row>
            <Col lg={8} className="row m-0 p-0">
              <Col sm={12}>
                <CreatePost />
              </Col>

              <Col sm={12}>
                <Post activePage={'home'} />
              </Col>
              {/*  <Col sm={12}>
                <Card className=" card-block card-stretch card-height">
                  <Card.Body>
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <Image
                            className="rounded-circle img-fluid"
                            src={user01}
                            alt=""
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">
                                Anna Sthesia
                              </h5>
                              <span className="mb-0 ps-1 d-inline-block">
                                Add New Post
                              </span>
                              <p className="mb-0 text-primary">Just Now</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">
                                    more_horiz
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4 material-symbols-outlined">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">
                                          Add this to your saved items
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">
                                          See fewer posts like this.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">
                                          Stop seeing posts but stay friends.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">
                                          Turn on notifications for this post
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi nulla dolor, ornare at commodo non, feugiat non
                        nisi. Phasellus faucibus mollis pharetra. Proin blandit
                        ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="user-post">
                      <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                        <div className="row-span-2 row-span-md-1">
                          <Image
                            src={p2}
                            alt="post1"
                            className="img-fluid rounded w-100"
                          />
                        </div>
                        <div className="row-span-1">
                          <Image
                            src={p1}
                            alt="post2"
                            className="img-fluid rounded w-100"
                          />
                        </div>
                        <div className="row-span-1 ">
                          <Image
                            src={p3}
                            alt="post3"
                            className="img-fluid rounded w-100"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <Image
                                    src={icon1}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <Image
                                      src={icon1}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Love</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon2}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Happy</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon3}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>HaHa</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon4}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Think</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon5}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Sade</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon6}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Lovely</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon7}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">
                                    Max Emum
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Bill Yerds
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Hap E. Birthday
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Tara Misu
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Midge Itz
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Sal Vidge
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="post-option"
                              >
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Bill Yerds
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Hap E. Birthday
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Tara Misu
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Midge Itz
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Sal Vidge
                                </Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffcanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex">
                            <div className="user-img">
                              <Image
                                src={user2}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex">
                            <div className="user-img">
                              <Image
                                src={user3}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Enter Your Comment"
                        />
                        <div className="comment-attagement d-flex">
                          <Link href="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <Image
                            className="rounded-circle img-fluid"
                            src={user3}
                            alt=""
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex  justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">
                                Barb Ackue
                              </h5>
                              <span className="mb-0 ps-1 d-inline-block">
                                Added New Image in a Post
                              </span>
                              <p className="mb-0 text-primary">1 hour ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">
                                    more_horiz
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">
                                          Add this to your saved items
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">
                                          See fewer posts like this.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">
                                          Stop seeing posts but stay friends.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">
                                          Turn on notifications for this post
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi nulla dolor, ornare at commodo non, feugiat non
                        nisi. Phasellus faucibus mollis pharetra. Proin blandit
                        ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="user-post">
                      <Link href="#">
                        <Image
                          src={p4}
                          alt="post1"
                          className="img-fluid rounded w-100"
                        />
                      </Link>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <Image
                                    src={icon1}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <Image
                                      src={icon1}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Love</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon2}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Happy</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon3}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>HaHa</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon4}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Think</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon5}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Sade</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon6}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Lovely</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon7}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">
                                    Max Emum
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Bill Yerds
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Hap E. Birthday
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Tara Misu
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Midge Itz
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Sal Vidge
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="post-option"
                              >
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Bill Yerds
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Hap E. Birthday
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Tara Misu
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Midge Itz
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Sal Vidge
                                </Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffcanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex ">
                            <div className="user-img">
                              <Image
                                src={user2}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex ">
                            <div className="user-img">
                              <Image
                                src={user3}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Enter Your Comment"
                        />
                        <div className="comment-attagement d-flex">
                          <Link href="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <Image
                            className="rounded-circle img-fluid"
                            src={user4}
                            alt=""
                          />
                        </div>
                        <div className="w-100">
                          <div className=" d-flex  justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">
                                Ira Membrit
                              </h5>
                              <p className="mb-0 ps-1 d-inline-block">
                                Update her Status
                              </p>
                              <p className="mb-0 text-primary">6 hour ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">
                                    more_horiz
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">
                                          Add this to your saved items
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">
                                          See fewer posts like this.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">
                                          Stop seeing posts but stay friends.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">
                                          Turn on notifications for this post
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi nulla dolor, ornare at commodo non, feugiat non
                        nisi. Phasellus faucibus mollis pharetra. Proin blandit
                        ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <Image
                                    src={icon1}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <Image
                                      src={icon1}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Love</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon2}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Happy</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon3}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>HaHa</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon4}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Think</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon5}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Sade</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon6}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Lovely</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon7}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">
                                    Max Emum
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Bill Yerds
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Hap E. Birthday
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Tara Misu
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Midge Itz
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Sal Vidge
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="post-option"
                              >
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Bill Yerds
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Hap E. Birthday
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Tara Misu
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Midge Itz
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Sal Vidge
                                </Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffcanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex">
                            <div className="user-img">
                              <Image
                                src={user2}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex ">
                            <div className="user-img">
                              <Image
                                src={user3}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Enter Your Comment"
                        />
                        <div className="comment-attagement d-flex">
                          <Link href="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="post-item">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <Image
                            className="rounded-circle img-fluid avatar-60"
                            src={user1}
                            alt=""
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">Bni Cyst</h5>
                              <p className="ms-1 mb-0 ps-1 d-inline-block">
                                Changed Profile Picture
                              </p>
                              <p className="mb-0">3 day ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">
                                    more_horiz
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">
                                          Add this to your saved items
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">
                                          See fewer posts like this.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">
                                          Stop seeing posts but stay friends.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">
                                          Turn on notifications for this post
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="user-post text-center">
                      <Link href="#">
                        <Image
                          src={p5}
                          alt="post1"
                          className="img-fluid rounded w-100 mt-3"
                        />
                      </Link>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <Image
                                    src={icon1}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <Image
                                      src={icon1}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Love</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon2}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Happy</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon3}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>HaHa</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon4}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Think</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon5}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Sade</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon6}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Lovely</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon7}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">
                                    Max Emum
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Bill Yerds
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Hap E. Birthday
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Tara Misu
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Midge Itz
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Sal Vidge
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="post-option"
                              >
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Bill Yerds
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Hap E. Birthday
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Tara Misu
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Midge Itz
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Sal Vidge
                                </Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffcanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex">
                            <div className="user-img">
                              <Image
                                src={user2}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex">
                            <div className="user-img">
                              <Image
                                src={user3}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Enter Your Comment"
                        />
                        <div className="comment-attagement d-flex">
                          <Link href="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <Image
                            className="rounded-circle img-fluid"
                            src={user2}
                            alt=""
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">
                                Paige Turner
                              </h5>
                              <p className="mb-0 ps-1 d-inline-block">
                                Added New Video in his Timeline
                              </p>
                              <p className="mb-0 text-primary">1 day ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">
                                    more_horiz
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">
                                          Add this to your saved items
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">
                                          See fewer posts like this.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">
                                          Stop seeing posts but stay friends.
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">
                                          Turn on notifications for this post
                                        </p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Morbi nulla dolor, ornare at commodo non, feugiat non
                        nisi. Phasellus faucibus mollis pharetra. Proin blandit
                        ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="user-post">
                      <div className="ratio ratio-16x9">
                        <iframe title="vedio" src="https://www.youtube.com/embed/j_GsIanLxZk?rel=0" ></iframe>
                      </div>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  <Image
                                    src={icon1}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <Image
                                      src={icon1}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Love</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon2}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Happy</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon3}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>HaHa</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon4}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Think</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon5}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Sade</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon6}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Lovely</Tooltip>}
                                    className="me-2"
                                  >
                                    <Image
                                      src={icon7}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle
                                  as={CustomToggle}
                                  id="post-option"
                                >
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">
                                    Max Emum
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Bill Yerds
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Hap E. Birthday
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Tara Misu
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Midge Itz
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    Sal Vidge
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="post-option"
                              >
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Bill Yerds
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Hap E. Birthday
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Tara Misu
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Midge Itz
                                </Dropdown.Item>
                                <Dropdown.Item href="#">
                                  Sal Vidge
                                </Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffcanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex flex-wrap">
                            <div className="user-img">
                              <Image
                                src={user2}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex flex-wrap">
                            <div className="user-img">
                              <Image
                                src={user3}
                                alt="user1"
                                className="avatar-35 rounded-circle img-fluid"
                              />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link href="#">like</Link>
                                <Link href="#">reply</Link>
                                <Link href="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input
                          type="text"
                          className="form-control rounded"
                          placeholder="Enter Your Comment"
                        />
                        <div className="comment-attagement d-flex">
                          <Link href="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link href="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col> */}
            </Col>
            {/* <Col lg={4}>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Stories</h4>
                  </div>
                </div>
                <Card.Body>
                  <ul className="media-story list-inline m-0 p-0">
                    <li className="d-flex mb-3 align-items-center">
                      <i className="ri-add-line"></i>
                      <div className="stories-data ms-3">
                        <h5>Creat Your Story</h5>
                        <p className="mb-0">time to story</p>
                      </div>
                    </li>
                    <li className="d-flex mb-3 align-items-center active">
                      <Image
                        src={s2}
                        alt="story-img"
                        className="rounded-circle img-fluid"
                      />
                      <div className="stories-data ms-3">
                        <h5>Anna Mull</h5>
                        <p className="mb-0">1 hour ago</p>
                      </div>
                    </li>
                    <li className="d-flex mb-3 align-items-center">
                      <Image
                        src={s3}
                        alt="story-img"
                        className="rounded-circle img-fluid"
                      />
                      <div className="stories-data ms-3">
                        <h5>Ira Membrit</h5>
                        <p className="mb-0">4 hour ago</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <Image
                        src={s1}
                        alt="story-img"
                        className="rounded-circle img-fluid"
                      />
                      <div className="stories-data ms-3">
                        <h5>Bob Frapples</h5>
                        <p className="mb-0">9 hour ago</p>
                      </div>
                    </li>
                  </ul>
                  <Link href="#" className="btn btn-primary d-block mt-3">
                    See All
                  </Link>
                </Card.Body>
              </Card>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Events</h4>
                  </div>
                  <div className="card-header-toolbar d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        role="button"
                      >
                        <i className="ri-more-fill h4"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className=" dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Dropdown.Item href="#">
                          <i className="ri-eye-fill me-2"></i>View
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-delete-bin-6-fill me-2"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-pencil-fill me-2"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-printer-fill me-2"></i>Print
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-file-download-fill me-2"></i>Download
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <Card.Body>
                  <ul className="media-story list-inline m-0 p-0">
                    <li className="d-flex mb-4 align-items-center ">
                      <Image
                        src={s4}
                        alt="story1"
                        className="rounded-circle img-fluid"
                      />
                      <div className="stories-data ms-3">
                        <h5>Web Workshop</h5>
                        <p className="mb-0">1 hour ago</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <Image
                        src={s5}
                        alt="story2"
                        className="rounded-circle img-fluid"
                      />
                      <div className="stories-data ms-3">
                        <h5>Fun Events and Festivals</h5>
                        <p className="mb-0">1 hour ago</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Upcoming Birthday</h4>
                  </div>
                </div>
                <Card.Body>
                  <ul className="media-story list-inline m-0 p-0">
                    <li className="d-flex mb-4 align-items-center">
                      <Image
                        src={user01}
                        alt="story3"
                        className="rounded-circle img-fluid"
                      />
                      <div className="stories-data ms-3">
                        <h5>Anna Sthesia</h5>
                        <p className="mb-0">Today</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <Image
                        src={user2}
                        alt="story-img"
                        className="rounded-circle img-fluid"
                      />
                      <div className="stories-data ms-3">
                        <h5>Paul Molive</h5>
                        <p className="mb-0">Tomorrow</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Suggested Pages</h4>
                  </div>
                  <div className="card-header-toolbar d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle}>
                        <i className="ri-more-fill h4"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton01"
                      >
                        <Dropdown.Item href="#">
                          <i className="ri-eye-fill me-2"></i>View
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-delete-bin-6-fill me-2"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-pencil-fill me-2"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-printer-fill me-2"></i>Print
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-file-download-fill me-2"></i>Download
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <Card.Body>
                  <ul className="suggested-page-story m-0 p-0 list-inline">
                    <li className="mb-3">
                      <div className="d-flex align-items-center mb-3">
                        <Image
                          src={img42}
                          alt="story-img"
                          className="rounded-circle img-fluid avatar-50"
                        />
                        <div className="stories-data ms-3">
                          <h5>Iqonic Studio</h5>
                          <p className="mb-0">Lorem Ipsum</p>
                        </div>
                      </div>
                      <Image
                        src={img9}
                        className="img-fluid rounded"
                        alt="Responsive"
                      />
                      <div className="mt-3">
                        <Link href="#" className="btn d-block">
                          <i className="ri-thumb-up-line me-2"></i> Like Page
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center mb-3">
                        <Image
                          src={img42}
                          alt="story-img"
                          className="rounded-circle img-fluid avatar-50"
                        />
                        <div className="stories-data ms-3">
                          <h5>Cakes & Bakes </h5>
                          <p className="mb-0">Lorem Ipsum</p>
                        </div>
                      </div>
                      <Image
                        src={img10}
                        className="img-fluid rounded"
                        alt="Responsive"
                      />
                      <div className="mt-3">
                        <Link href="#" className="btn d-block">
                          <i className="ri-thumb-up-line me-2"></i> Like Page
                        </Link>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col> */}
            {/* <div className="col-sm-12 text-center">
              <Image
                src={loader}
                alt="loader"
                style={{ height: "100px", width: "100px" }}
              />
            </div> */}
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default Home;
