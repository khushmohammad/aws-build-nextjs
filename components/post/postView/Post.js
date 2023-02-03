import React, { useEffect, useState } from "react";
import Card from "../../Card";
import { Dropdown } from "react-bootstrap";
import Image from "next/image";
import loader from "../../../public/assets/images/page-img/page-load-loader.gif";
import {
  deletePostByPostId,
  getAllPostsByUserId,
  pinPostByUser,
} from "../../../services/posts.service";
import { useRouter } from "next/router";
import EditPost from "../EditPost";
import PostMediaGrid from "./PostMediaGrid";
import PostContentSection from "./PostContentSection";
import PostFooter from "./PostFooter";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeedsList } from "../../../store/post/allFeeds";
import user2 from "../../../public/assets/images/user/1.jpg";
import { getPostTime } from "../../../services/time.service";
import CreatePost from "../CreatePost";
import { getGroupFeeds } from "../../../store/groups";

const Post = ({ activePage, groupId }) => {
  const [showModal, setShowModal] = useState(false);
  const [postID, setPostID] = useState();

  const [page, setPage] = useState(1);

  const [posts, setposts] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const StorePosts = useSelector((state) => state?.allFeed?.allFeeds);
  const loading = useSelector((state) => state?.allFeed?.status);

  const limit = 5;

  const GetPostNet = async () => {
    const userIdFromQueryPath = router?.query?.id;
    if (userIdFromQueryPath && userIdFromQueryPath) {
      dispatch(
        getAllFeedsList({
          activePage: activePage,
          page: page,
          limit: limit,
          uerId: userIdFromQueryPath,
        })
      );
    } else if (groupId && activePage == "group") {
      //dispatch(getGroupFeeds(groupId));
      // getAllFeedsList({ activePage: activePage, page: page, limit: limit })
      //console.log("fsdf");
      dispatch(
        getAllFeedsList({
          activePage: activePage,
          page: page,
          limit: limit,
          groupId: groupId,
        })
      );
    } else {
      dispatch(
        getAllFeedsList({ activePage: activePage, page: page, limit: limit })
      );
    }
  };

  useEffect(() => {
    if (page && page == 1) {
      StorePosts?.length == 0 ? setposts("") : setposts(StorePosts);
    } else {
      StorePosts?.length == 0
        ? ""
        : Array.isArray(StorePosts)
        ? setposts((prev) => [...prev, ...StorePosts])
        : "";
    }
  }, [StorePosts]);

  useEffect(() => {
    GetPostNet();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };
  // post view

  const DeletePostByPostId = async (postId) => {
    const res = await deletePostByPostId(postId);
    const postDeleted = await res.status;
    if (postDeleted == 200) {
      dispatch(
        getAllFeedsList({
          activePage: activePage,
          page: 1,
          limit: posts.length,
        })
      );
      setposts(StorePosts);
    }
  };
  const pinPost = async (postId) => {
    const res = await pinPostByUser(postId);

    if (res.data.success == true) {
      dispatch(
        getAllFeedsList({
          activePage: activePage,
          page: 1,
          limit: posts.length,
        })
      );
      setposts(StorePosts);
    }

    //  const res = await pinPostByUser(postId);

    // // //  console.log("RESPONSE", res);
    // if (res.status == 200) {
    //   await getAllPostsByUserId(page, 2)
    //    console.log("ALLL POST POST RESPONSE", await getAllPostsByUserId(page, 2))
    //     //  router.reload();
    // }
  };

  return (
    <div>
      <CreatePost refreshPostList={() => GetPostNet()} groupId={groupId} />
      <div style={{ position: "relative", marginBottom: "7rem" }}>
        <EditPost
          show={showModal}
          onHide={() => setShowModal(false)}
          onShow={() => setShowModal(true)}
          postid={postID}
          refreshPostList={() => GetPostNet()}
        />

        {posts &&
          Array.isArray(posts) &&
          posts.length > 0 &&
          posts.map((data, index) => {
            const {
              _id,
              description,
              share,
              postLikes,
              createdAt,
              updatedAt,
              fileInfo,
              isPin,
              is_SelfPost,
            } = data;

            const userDetails = data && data?.postCreatedBy;
            const userprofilePicture = data && data?.postCreatedBy;

            return (
              <Card className="card-block card-stretch card-height" key={index}>
                <Card.Body>
                  <div className="user-post-data">
                    <div className="d-flex justify-content-between">
                      <div className="me-3">
                        {userprofilePicture && (
                          <Image
                            className="rounded-circle img-fluid"
                            src={
                              userprofilePicture?.profilePictureInfo?.file
                                ?.location || user2
                            }
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
                              {userDetails &&
                                `${userDetails.userInfo.firstName}   ${userDetails.userInfo.lastName} `}
                            </h5>

                            {isPin == true && is_SelfPost ? (
                              <span className="material-symbols-outlined">
                                push_pin
                              </span>
                            ) : (
                              ""
                            )}
                            <p className="mb-0 text-primary">
                              {createdAt && getPostTime(createdAt)}
                            </p>
                          </div>
                          <div className="card-post-toolbar">
                            <Dropdown>
                              <Dropdown.Toggle variant="bg-transparent">
                                <span className="material-symbols-outlined">
                                  more_horiz
                                </span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                {/* {is_SelfPost && is_SelfPost ? ( */}
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
                                {/* ) : (
                                  ""
                                )} */}
                                {is_SelfPost && is_SelfPost ? (
                                  <Dropdown.Item className=" p-3" href="#">
                                    <div
                                      className="d-flex align-items-top"
                                      onClick={() => pinPost(_id)}
                                    >
                                      <div className="h4 material-symbols-outlined">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      {isPin != true ? (
                                        <div className="data ms-2">
                                          <h6>Pin Post</h6>
                                          <p className="mb-0">
                                            Add this to your pinned post
                                          </p>
                                        </div>
                                      ) : (
                                        <div className="data ms-2">
                                          <h6>Unpin Post</h6>
                                          <p className="mb-0">
                                            Add this to your pinned post
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </Dropdown.Item>
                                ) : (
                                  ""
                                )}
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
                                {is_SelfPost && is_SelfPost ? (
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
                                ) : (
                                  ""
                                )}
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
                    {description && (
                      <PostContentSection stringContent={description} />
                    )}
                  </div>
                  {fileInfo && (
                    <>
                      <PostMediaGrid mediaContent={data && data} />
                    </>
                  )}
                  {_id && <PostFooter postIdForLike={_id} />}
                </Card.Body>
              </Card>
            );
          })}

        {loading && loading == "loading" ? (
          <div
            className="card card-block card-stretch card-height"
            style={{
              marginBottom: "-6rem",
              height: "90px",
              width: "100%",
              position: "absolute",
              bottom: "0px",
              justifyContent: "center",
            }}
          >
            <Card.Body>
              <div className="col-sm-12 text-center">
                <Image
                  src={loader}
                  alt="loader"
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
            </Card.Body>
          </div>
        ) : (
          ""
        )}
        <div className="w-100">
          {StorePosts && loading != "loading" && StorePosts.length == 0 && (
            <div
              className="card card-block card-stretch card-height"
              style={{
                marginBottom: "-6rem",
                height: "90px",
                width: "100%",
                position: "absolute",
                bottom: "0px",
                justifyContent: "center",
              }}
            >
              <Card.Body>
                <div className="col-sm-12 text-center">
                  <p className="p-3  text-alert text-center">No posts found!</p>
                </div>
              </Card.Body>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
