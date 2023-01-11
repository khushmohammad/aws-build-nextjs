import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../Card";
import CustomToggle from "../../dropdowns";
import {
  Row,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Modal,
  Alert,
} from "react-bootstrap";
import ShareOffcanvas from "../../share-offcanvas";
import user2 from "../../../public/assets/images/user/02.jpg";
import user3 from "../../../public/assets/images/user/03.jpg";

import icon1 from "../../../public/assets/images/icon/01.png";
import icon2 from "../../../public/assets/images/icon/02.png";
import icon3 from "../../../public/assets/images/icon/03.png";
import icon4 from "../../../public/assets/images/icon/04.png";
import icon5 from "../../../public/assets/images/icon/05.png";
import icon6 from "../../../public/assets/images/icon/06.png";
import icon7 from "../../../public/assets/images/icon/07.png";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import loader from "../../../public/assets/images/page-img/page-load-loader.gif";

import {
  deletePostByPostId,
  getAllFeeds,
  getAllPostsByUserId,
  editPostById,
  likePostByUser,
  getUserInfoByUserId,
} from "../../../services/posts.service";
import { useRouter } from "next/router";
import EditPost from "../EditPost";
import PostMediaGrid from "./PostMediaGrid";
import PostContentSection from "./PostContentSection";
import { useForm } from "react-hook-form";

const Post = ({ activePage }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postID, setPostID] = useState();
  const [apiError, setapiError] = useState();

  const getpostfetch = async () => {
    if (activePage == "userProfile") {
      // const response = await getAllPostsByUserId(page, 2);
      // const newData = await response?.data?.body?.allFeeds?.docs;

      // if (newData && newData) {
      //   setPosts((prev) => {
      //     return [...prev, ...newData];
      //   });
      // } else {

      //   setapiError(response)
      // }

      // setLoading(false);

      const response = await getAllPostsByUserId(page, 2);

      const newData = await response?.data?.body?.allUserPost?.docs;
      // console.log(newData,"newData");

      if (newData && newData) {
        // setPosts((prev) => {
        //   return [...prev, ...newData];
        // });
        newData &&
          newData.forEach(async (postData) => {
            //console.log(postData.userId, "element");
            const res = await getUserInfoByUserId(postData.userId);
            const userData = await res?.data?.body;
            userData &&
              setPosts((prev) => [
                ...prev,
                { ...postData, postCreatedBy: userData },
              ]);
          });
      } else {
        setapiError(response);
      }
      setLoading(false);
    } else {
      const response = await getAllFeeds(page, 2);

      const newData = await response?.data?.body?.allFeeds?.docs;
      // console.log(newData,"newData");

      if (newData && newData) {
        // setPosts((prev) => {
        //   return [...prev, ...newData];
        // });
        newData &&
          newData.forEach(async (postData) => {
            //console.log(postData.userId, "element");
            const res = await getUserInfoByUserId(postData.userId);
            const userData = await res?.data?.body;

            userData &&
              setPosts((prev) => [
                ...prev,
                { ...postData, postCreatedBy: userData },
              ]);
          });
      } else {
        setapiError(response);
      }
      setLoading(false);
    }
  };
  // console.log(postsWithUserData, "postWithUserDetails");

  useEffect(() => {
    getpostfetch();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);

      setPage((prev) => prev + 1);
    }
  };

  const router = useRouter();

  const DeletePostByPostId = async (postId) => {
    const res = await deletePostByPostId(postId);

    if (res.status == 200) {
      router.push("/");
    }
  };

  const LikePostByUser = async (postId, reactionId) => {

    const res = await likePostByUser(postId, reactionId);
    const data = await res
    console.log(data, "sdfsfd");
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch("comment"));


  return (
    <div style={{ position: "relative" }}>
      {apiError && (
        <Alert Alert key={`danger`} variant={`danger`}>
          Error Code {apiError.status} message :{" "}
          {/*   {apiError.message.message} */}
        </Alert>
      )}
      {/* <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<div className="col-sm-12 text-center">
          <Image
            src={loader}
            alt="loader"
            style={{ height: "100px", width: "100px" }}
          />
        </div>}
      // endMessage={<h4>Nothing more to show</h4>}
      > */}

      <EditPost
        show={showModal}
        onHide={() => setShowModal(false)}
        postid={postID}
      />

      {/* {posts && JSON.stringify(posts[0])} */}

      {posts &&
        posts.map((data, index) => {
          const {
            _id,
            description,
            share,
            postLikes,
            createdAt,
            file,
            postCreatedBy,
          } = data;
          const { userInfo, profilePictureInfo } =
            postCreatedBy && postCreatedBy;
          return (
            <Card className=" card-block card-stretch card-height" key={index}>
              {/* {JSON.stringify(data)} */}
              <Card.Body>
                <div className="user-post-data">
                  <div className="d-flex justify-content-between">
                    <div className="me-3">
                      {profilePictureInfo && profilePictureInfo.file && (
                        <Image
                          className="rounded-circle img-fluid"
                          src={profilePictureInfo.file.location}
                          alt=""
                          height={53}
                          width={53}
                        />
                      )}
                    </div>
                    <div className="w-100">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5 className="mb-0 d-inline-block">
                            {" "}
                            {userInfo &&
                              `${userInfo?.firstName}   ${userInfo?.lastName} `}
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
                              <Dropdown.Item className=" p-3">
                                <div
                                  className="d-flex align-items-top"
                                  onClick={() => {
                                    setPostID(_id);
                                    setShowModal(true);
                                  }}
                                >
                                  <div className="h4 material-symbols-outlined">
                                    <i className="ri-save-line"></i>
                                  </div>
                                  <div className="data ms-2">
                                    <h6>Edit Post</h6>
                                    <p className="mb-0">Edit</p>
                                  </div>
                                </div>
                              </Dropdown.Item>
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
                              <Dropdown.Item className=" p-3">
                                <div
                                  className="d-flex align-items-top"
                                  onClick={() => DeletePostByPostId(_id)}
                                >
                                  <div className="h4 material-symbols-outlined">
                                    <i className="ri-save-line"></i>
                                  </div>
                                  <div className="data ms-2">
                                    <h6>Delete Post</h6>
                                    <p className="mb-0">Delete</p>
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
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Morbi nulla dolor, ornare at commodo non, feugiat non
                                        nisi. Phasellus faucibus mollis pharetra. Proin blandit
                                        ac massa sed rhoncus */}

                    {description && (
                      <PostContentSection stringContent={description} />
                    )}
                  </p>
                </div>
                {file && <PostMediaGrid mediaContent={file && file} />}

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
                                onClick={() => LikePostByUser(_id, "Like")}
                              />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className=" py-2">
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip >Like</Tooltip>}
                                className="ms-2 me-2"

                              >
                                <Image
                                  src={icon1}
                                  className="img-fluid"
                                  alt=""
                                  onClick={() => LikePostByUser(_id, "Like")}
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
                                  onClick={() => LikePostByUser(_id, "Love")}
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
                                  onClick={() => LikePostByUser(_id, "Happy")}
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
                                  onClick={() => LikePostByUser(_id, "HaHa")}
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
                                  onClick={() => LikePostByUser(_id, "Think")}

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
                                  onClick={() => LikePostByUser(_id, "Sade")}
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
                                  onClick={() => LikePostByUser(_id, "Lovely")}
                                />
                              </OverlayTrigger>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="total-like-block ms-2 me-3">
                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="post-option">
                              140 Likes
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                              <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                              <Dropdown.Item href="#">
                                Hap E. Birthday
                              </Dropdown.Item>
                              <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                              <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                              <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                              <Dropdown.Item href="#">Other</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <div className="total-comment-block">
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} id="post-option">
                            20 Comment
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                            <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                            <Dropdown.Item href="#">
                              Hap E. Birthday
                            </Dropdown.Item>
                            <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                            <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                            <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
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
                  <form className="comment-text d-flex align-items-center mt-3"  >

                    <div class="input-group mb-3">
                      <input type="text"  className="form-control rounded" placeholder="Enter Your Comment" />
                      {/* <div class="input-group-append">
                        <button type="submit" class="input-group-text" id="basic-addon2">Submit</button>
                      </div> */}
                    </div>

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
          );
        })}
      {/* </InfiniteScroll> */}

      <div>
        {loading && loading ? (
          <div className="col-sm-12 text-center">
            <Image
              src={loader}
              alt="loader"
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        ) : (
          <div className="w-100">
            {" "}
            <p className="text-center">Nothing more to show</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
