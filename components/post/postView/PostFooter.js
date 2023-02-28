import React, { useEffect, useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import CustomToggle from "../../dropdowns";
import icon1 from "../../../public/assets/images/icon/01.png";
import icon2 from "../../../public/assets/images/icon/02.png";
import icon3 from "../../../public/assets/images/icon/03.png";
import icon4 from "../../../public/assets/images/icon/04.png";
import icon5 from "../../../public/assets/images/icon/05.png";
import icon6 from "../../../public/assets/images/icon/06.png";
import icon7 from "../../../public/assets/images/icon/07.png";
import user2 from "../../../public/assets/images/user/25.png";
import user3 from "../../../public/assets/images/user/03.jpg";

import ShareOffcanvas from "../../share-offcanvas";
import Link from "next/link";
import Image from "next/image";

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  getAllLikesByPostId,
  likePostByUser,
} from "../../../services/posts.service";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PostComments from "./PostComments";
import TotalCommentBlock from "./TotalCommentBlock";
import Commentapi from "./Commentapi";

function PostFooter({ currentPostId, refreshpostlist, share }) {
  const [likesWithUserDetails, setLikesListWithUserDetails] = useState([]);
  const [apiError, setApiError] = useState("");
  const loginUserId = useSelector((state) => state?.user?.data?.userInfo._id);

  function GetReactionIcon(props) {
    const reaction =
      props && props.reactionByUser ? props.reactionByUser : "Like";

    if (reaction == "Like") {
      return (
        <>
          <AiFillLike size={28} className="text-primary" />
        </>
      );
    } else if (reaction == "Think") {
      return (
        <>
          <Image src={icon5} className="img-fluid" alt="" />
        </>
      );
    } else if (reaction == "Love") {
      return (
        <>
          <Image src={icon2} className="img-fluid" alt="" />
        </>
      );
    } else if (reaction == "Happy") {
      return (
        <>
          <Image src={icon3} className="img-fluid" alt="" />
        </>
      );
    } else if (reaction == "HaHa") {
      return (
        <>
          <Image src={icon4} className="img-fluid" alt="" />
        </>
      );
    } else if (reaction == "Sade") {
      return (
        <>
          <Image src={icon6} className="img-fluid" alt="" />
        </>
      );
    } else if (reaction == "Lovely") {
      return (
        <>
          <Image src={icon7} className="img-fluid" alt="" />
        </>
      );
    }
  }

  const LikeThePost = async (reaction) => {
    currentPostId && PostLikeById(currentPostId, reaction);
  };
  const PostLikeById = async (postId, reaction) => {
    const response = await likePostByUser(postId, reaction);

    if (response.status == 200) {
      getLikeslist();
    }
  };

  const getLikeslist = async () => {
    const res = await getAllLikesByPostId(currentPostId);
    if (res?.code == "ERR_NETWORK") {
      setLikesListWithUserDetails([]);
    } else {
      setLikesListWithUserDetails(res);
    }
  };

  useEffect(() => {
    getLikeslist();
  }, []);

  const isliked =
    likesWithUserDetails &&
    Array.isArray(likesWithUserDetails) &&
    likesWithUserDetails
      .map((e) => e?.userDetails?.userInfo?._id)
      .indexOf(loginUserId);
  const islikedData =
    likesWithUserDetails &&
    Array.isArray(likesWithUserDetails) &&
    likesWithUserDetails.find(
      (e) => e?.userDetails?.userInfo?._id == loginUserId
    );

  return (
    <div>
      <div className="comment-area mt-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="like-block position-relative d-flex align-items-center">
            <div className="d-flex align-items-center">
              <div className="like-data">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    <div onClick={() => LikeThePost("Like")}>
                      {isliked != -1 ? (
                        <GetReactionIcon
                          reactionByUser={
                            islikedData && islikedData.reactionEmoji
                          }
                        />
                      ) : (
                        <AiOutlineLike size={24} className="text-primary" />
                      )}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="py-2">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Like</Tooltip>}
                      className="ms-2 me-2"
                    >
                      <AiOutlineLike
                        size={24}
                        onClick={() => LikeThePost("Like")}
                        className="text-primary mx-1"
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Love</Tooltip>}
                      className="me-2"
                    >
                      <Image
                        src={icon2}
                        className="img-fluid mx-1"
                        alt=""
                        onClick={() => LikeThePost("Love")}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Happy</Tooltip>}
                      className="me-2"
                    >
                      <Image
                        src={icon3}
                        className="img-fluid mx-1"
                        alt=""
                        onClick={() => LikeThePost("Happy")}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>HaHa</Tooltip>}
                      className="me-2"
                    >
                      <Image
                        src={icon4}
                        className="img-fluid mx-1"
                        alt=""
                        onClick={() => LikeThePost("HaHa")}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Think</Tooltip>}
                      className="me-2"
                    >
                      <Image
                        src={icon5}
                        className="img-fluid mx-1"
                        alt=""
                        onClick={() => LikeThePost("Think")}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Sade</Tooltip>}
                      className="me-2"
                    >
                      <Image
                        src={icon6}
                        className="img-fluid mx-1"
                        alt=""
                        onClick={() => LikeThePost("Sade")}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Lovely</Tooltip>}
                      className="me-2"
                    >
                      <Image
                        src={icon7}
                        className="img-fluid mx-1"
                        alt=""
                        onClick={() => LikeThePost("Lovely")}
                      />
                    </OverlayTrigger>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="total-like-block ms-2 me-3">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="post-option">
                    {likesWithUserDetails.length != 0
                      ? likesWithUserDetails.length
                      : 0}{" "}
                    Likes
                  </Dropdown.Toggle>
                  {likesWithUserDetails && (
                    <Dropdown.Menu>
                      {likesWithUserDetails &&
                        Array.isArray(likesWithUserDetails) &&
                        likesWithUserDetails.map((data, index) => {
                          // console.log(data, "data");
                          return (
                            <React.Fragment key={index}>
                              {index < 10 && (
                                <Dropdown.ItemText
                                  key={index}
                                  className="bg-light p-2"
                                  style={{
                                    overflow: "hiddle",
                                    minWidth: "200px",
                                  }}
                                >
                                  {/* <Link href={`/friends/${data?.userDetails._id}`}> */}
                                  <GetReactionIcon
                                    reactionByUser={
                                      data.reactionEmoji && data.reactionEmoji
                                    }
                                  />{" "}
                                  <Image
                                    className="avatar-35 rounded-circle img-fluid"
                                    src={
                                      data?.userDetails?.profilePictureInfo
                                        ?.file?.location || user2
                                    }
                                    alt=""
                                    height={30}
                                    width={30}
                                  />
                                  <span className="mx-2 text-primary">
                                    {data?.userDetails &&
                                      `${
                                        data.userDetails?.userInfo?.firstName ||
                                        ""
                                      } ${
                                        data.userDetails?.userInfo?.lastName ||
                                        ""
                                      }`}{" "}
                                  </span>
                                  {/* </Link> */}
                                </Dropdown.ItemText>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
            </div>

            {currentPostId && <TotalCommentBlock postId={currentPostId} />}
          </div>
          <ShareOffcanvas
            sharePostId={currentPostId}
            refreshpostlistshare={refreshpostlist}
            share={share}
          />
        </div>
        <hr />
        {currentPostId && (
          <>
            {/* <PostComments postId={currentPostId} /> */}
            <Commentapi postId={currentPostId} />
          </>
        )}
      </div>
    </div>
  );
}

export default PostFooter;
