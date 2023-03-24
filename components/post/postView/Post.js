import React, { useEffect, useState } from "react";

import Image from "next/image";
import loader from "../../../public/assets/images/page-img/page-load-loader.gif";
import { useRouter } from "next/router";
import PostMediaGrid from "./PostMediaGrid";
import PostContentSection from "./PostContentSection";
import PostFooter from "./PostFooter";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeedsList } from "../../../store/post/allFeeds";
import user2 from "../../../public/assets/images/user/25.png";
import CreatePost from "../CreatePost";
import PostThreeDotmenu from "./PostThreeDotmenu";
import MediaComponent from "./MediaComponent";
import moment from "moment";
import Link from "next/link";
import { Spinner, Card } from "react-bootstrap";
import { SpinnerLoader } from "../../Loader/Loading";

const Post = ({ activePage, groupId, postDetailObj, userId }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const StorePosts = useSelector((state) => state?.allFeed?.allFeeds?.postList);
  const loading = useSelector((state) => state?.allFeed?.status);
  const error = useSelector((state) => state?.allFeed?.error);

  // get post
  const GetPostNet = async (pageNum = page, limitNum = limit) => {
    const groupAndUserId = userId && userId ? userId : groupId;

    const params = {
      activePage: activePage,
      page: pageNum,
      limit: limitNum,
      groupAndUserId: groupAndUserId && groupAndUserId,
    };

    if (activePage == "PostDetail") {
      setPosts([]);
      setPosts(postDetailObj);
    } else {
      dispatch(getAllFeedsList(params));
    }
  };

  // load more post on scroll

  useEffect(() => {
    if (page && page == 1) {
      StorePosts?.length == 0 ? setPosts("") : setPosts(StorePosts);
    } else {
      StorePosts?.length == 0
        ? ""
        : Array.isArray(StorePosts)
        ? setPosts((prev) => [...prev, ...StorePosts])
        : "";
    }
  }, [StorePosts]);

  useEffect(() => {
    GetPostNet();
  }, [page]);

  useEffect(() => {
    activePage != "PostDetail"
      ? window.addEventListener("scroll", handleScroll)
      : "";
    return () =>
      activePage != "PostDetail"
        ? window.removeEventListener("scroll", handleScroll)
        : "";
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };
  // post refresh mathod

  const onClickRefreshPostList = () => {
    setPosts([]);
    GetPostNet(1, limit);
  };

  // onclick post hide

  const [hidePost, setHidePost] = useState([]);

  const onClickHidePost = (postId, type) => {
    if (type == "delete") {
      setHidePost((prev) => ({ ...prev, [postId]: "delete" }));
    } else {
      setHidePost((prev) => ({ ...prev, [postId]: "save" }));
    }
  };
  console.log(hidePost, "first");
  return (
    <div>
      {activePage != "PostDetail" && activePage != "savedPost" ? (
        <CreatePost
          refreshpostlist={() => onClickRefreshPostList()}
          groupId={groupId}
          userId={userId}
        />
      ) : (
        ""
      )}

      <div style={{ position: "relative", marginBottom: "7rem" }}>
        {error && (
          <Card>
            <Card.Body>
              <div className="col-sm-12 text-center">
                <p className="p-3  text-danger text-center">
                  {error || "No posts found!"}
                </p>
              </div>
            </Card.Body>
          </Card>
        )}
        {posts &&
          Array.isArray(posts) &&
          posts.length > 0 &&
          posts.map((data, index) => {
            const {
              _id,
              description,
              createdAt,
              fileInfo,
              isPin,
              is_SelfPost,
              share,
              userInfo,
              profileImage,
            } = data;

            return (
              <Card className="card-block card-stretch card-height" key={index}>
                {data && data?.isDeleted === false ? (
                  <>
                    {hidePost &&
                    hidePost[_id] != "save" &&
                    hidePost[_id] != "delete" ? (
                      <Card.Body>
                        {console.log("post content")}
                        <div className="user-post-data">
                          <div className="d-flex justify-content-between">
                            <div className="me-3">
                              <Image
                                className="rounded-circle img-fluid"
                                src={profileImage?.location || user2}
                                alt=""
                                height={53}
                                width={53}
                              />

                              {console.log(
                                profileImage?.location,
                                "profileImage?.location"
                              )}
                            </div>
                            <div className="w-100">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <Link href={`user/${userInfo?._id}`}>
                                    <h5 className="mb-0 d-inline-flex">
                                      {`${userInfo?.firstName || ""}   ${
                                        userInfo?.lastName || ""
                                      } `}
                                    </h5>
                                  </Link>

                                  {isPin == true && is_SelfPost ? (
                                    <span className="material-symbols-outlined">
                                      push_pin
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <p className="mb-0 text-primary">
                                    {createdAt && moment(createdAt).fromNow()}
                                  </p>
                                </div>
                                <div className="card-post-toolbar">
                                  {_id && (
                                    <PostThreeDotmenu
                                      postLength={posts.length}
                                      refreshpostlist={() =>
                                        onClickRefreshPostList()
                                      }
                                      PostId={_id}
                                      isPin={isPin}
                                      is_SelfPost={is_SelfPost}
                                      activePage={activePage}
                                      onClickHidePost={(e, type) =>
                                        onClickHidePost(e, type)
                                      }
                                    />
                                  )}
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
                            {activePage != "PostDetail" ? (
                              <PostMediaGrid mediaContent={data && data} />
                            ) : (
                              <MediaComponent mediaData={fileInfo} />
                            )}
                          </>
                        )}
                        {_id && (
                          <PostFooter
                            currentPostId={_id}
                            refreshpostlist={onClickRefreshPostList}
                            share={share}
                          />
                        )}
                      </Card.Body>
                    ) : hidePost && hidePost[_id] == "delete" ? (
                      <Card.Body>
                        {console.log("delete")}
                        <div className="col-sm-12 text-center">
                          <p className="p-3  text-dark text-center">
                            Post Deleted Successfully
                          </p>
                        </div>
                      </Card.Body>
                    ) : (
                      <Card.Body>
                        {console.log("save")}
                        <div className="col-sm-12 text-center">
                          <p className="p-3  text-dark text-center">
                            {activePage != "savedPost"
                              ? "Content Moved to Saved Post ."
                              : "Content Moved to Feed Page."}

                            <span>
                              {" "}
                              <Link
                                href={
                                  activePage != "savedPost"
                                    ? "/post/saved-post"
                                    : "/"
                                }
                              >
                                Click Here
                              </Link>
                            </span>
                          </p>
                        </div>
                      </Card.Body>
                    )}
                  </>
                ) : (
                  <Card.Body>
                    {console.log("not found")}

                    <h4
                      className="justify-content-center  d-flex align-items-center"
                      style={{ height: "18vh" }}
                    >
                      Sorry, this content isn't available at this time
                    </h4>
                  </Card.Body>
                )}
              </Card>
            );
          })}

        {activePage != "PostDetail" && loading == "loading" ? (
          <div
            className=""
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
                <SpinnerLoader />
              </div>
            </Card.Body>
          </div>
        ) : (
          ""
        )}
        <div className="w-100">
          {activePage != "PostDetail" &&
            StorePosts &&
            loading != "loading" &&
            StorePosts.length == 0 && (
              <div
                className=""
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
                    <p className="p-3  text-alert text-center">
                      No posts found!
                    </p>
                  </div>
                </Card.Body>
              </div>
            )}

          {/* {activePage == "PostDetail" && posts.length == 0 && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Post;
