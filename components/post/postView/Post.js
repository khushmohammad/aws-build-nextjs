import React, { useEffect, useState } from "react";
import Card from "../../Card";
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

const Post = ({ activePage, groupId, postDetailObj, userId }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [posts, setposts] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const StorePosts = useSelector((state) => state?.allFeed?.allFeeds?.postList);
  const loading = useSelector((state) => state?.allFeed?.status);
  const error = useSelector((state) => state?.allFeed?.error);



  const GetPostNet = async (pagenum = page, limitnum = limit) => {

    const groupanduserId = userId && userId ? userId : groupId;

    const params = {
      activePage: activePage,
      page: pagenum,
      limit: limitnum,
      groupanduserId: groupanduserId && groupanduserId,
    }


    if (activePage == "PostDetail") {
      setposts([]);
      setposts(postDetailObj);
    } else {
      dispatch(
        getAllFeedsList(params)
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
  // post view

  const onClickRefreshPostList = () => {
    setposts([]);
    GetPostNet(1, limit);
  };

  return (
    <div>
      {activePage != "PostDetail" && activePage != 'savedPost' ? (
        <CreatePost
          refreshpostlist={() => onClickRefreshPostList()}
          groupId={groupId}
          userId={userId}
        />
      ) : ""}
      <div style={{ position: "relative", marginBottom: "7rem" }}>
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

            } = data;

            const userDetails = data && data?.userDetails;
            const userprofilePicture = data && data?.userDetails;

            // console.log(posts, "posts")

            return (
              <Card className="card-block card-stretch card-height" key={index}>
                {data && data?.isDeleted === false ?
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

                              <Link href={`user/${userDetails?.userInfo?._id}`} >
                                <h5 className="mb-0 d-inline-flex fw-bold">
                                  {/* shivam{" "}
                                <span className="material-symbols-outlined">
                                  play_arrow
                                </span> */}
                                  {" "}
                                  {userDetails &&
                                    `${userDetails?.userInfo?.firstName || ""}   ${userDetails?.userInfo?.lastName || ""} `}
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
                                {/* {createdAt && getPostTime(createdAt)} */}
                                {createdAt && moment(createdAt).fromNow()}
                              </p>
                            </div>
                            <div className="card-post-toolbar">
                              {_id && (
                                <PostThreeDotmenu
                                  postLength={posts.length}
                                  refreshpostlist={() => onClickRefreshPostList()}
                                  PostId={_id}
                                  isPin={isPin}
                                  is_SelfPost={is_SelfPost}
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
                  :
                  <Card.Body>
                    <h4 className="justify-content-center  d-flex align-items-center" style={{ height: "18vh" }}>
                      Sorry, this content isn't available at this time
                    </h4>
                  </Card.Body>
                }
              </Card>
            );
          })}

        {activePage != "PostDetail" && loading && loading == "loading" ? (
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
          {activePage != "PostDetail" &&
            StorePosts &&
            loading != "loading" &&
            StorePosts.length == 0 && (
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
                    <p className="p-3  text-alert text-center">
                      No posts found!
                    </p>
                  </div>
                </Card.Body>
              </div>
            )}
          {activePage == "PostDetail" &&
            posts.length == 0 && (
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
                    <p className="p-3  text-alert text-center">
                      No posts found!
                    </p>
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
