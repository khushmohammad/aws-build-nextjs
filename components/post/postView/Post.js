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
import PostMediaGrid from "./PostMediaGrid";
import PostContentSection from "./PostContentSection";
import PostFooter from "./PostFooter";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeedsList } from "../../../store/post/allFeeds";
import user2 from "../../../public/assets/images/user/1.jpg";
import { getPostTime } from "../../../services/time.service";
import CreatePost from "../CreatePost";
import { getGroupFeeds } from "../../../store/groups";
import PostThreeDotmenu from "./PostThreeDotmenu";
import MediaComponent from "./MediaComponent";

const Post = ({ activePage, groupId, postDetailObj }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [posts, setposts] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const StorePosts = useSelector((state) => state?.allFeed?.allFeeds);
  const loading = useSelector((state) => state?.allFeed?.status);

  const GetPostNet = async (pagenum = page, limitnum = limit) => {
    const userIdFromQueryPath = router?.query?.id;
    if (userIdFromQueryPath && userIdFromQueryPath) {
      dispatch(
        getAllFeedsList({
          activePage: activePage,
          page: pagenum,
          limit: limitnum,
          uerId: userIdFromQueryPath,
        })
      );
    } else if (groupId && activePage == "groups") {
      dispatch(
        getAllFeedsList({
          activePage: activePage,
          page: pagenum,
          limit: limitnum,
          groupId: groupId,
        })
      );
    } else if (activePage == "PostDetail") {
      setposts([]);
      setposts([postDetailObj]);
    } else {
      dispatch(
        getAllFeedsList({
          activePage: activePage,
          page: pagenum,
          limit: limitnum,
        })
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
    GetPostNet(1, posts.length);
  };

  return (
    <div>
      {activePage != "PostDetail" && (
        <CreatePost refreshPostList={() => GetPostNet()} groupId={groupId} />
      )}
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
                            {_id && (
                              <PostThreeDotmenu
                                postLength={posts.length}
                                refreshPostList={() => onClickRefreshPostList()}
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
                      refreshPostList={onClickRefreshPostList}
                    />
                  )}
                </Card.Body>
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
        </div>
      </div>
    </div>
  );
};



export default Post;
