import React, { useEffect, useState } from 'react'
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import CustomToggle from "../../dropdowns";
import icon1 from "../../../public/assets/images/icon/01.png";
import icon2 from "../../../public/assets/images/icon/02.png";
import icon3 from "../../../public/assets/images/icon/03.png";
import icon4 from "../../../public/assets/images/icon/04.png";
import icon5 from "../../../public/assets/images/icon/05.png";
import icon6 from "../../../public/assets/images/icon/06.png";
import icon7 from "../../../public/assets/images/icon/07.png";
import user2 from "../../../public/assets/images/user/1.jpg";
import user3 from "../../../public/assets/images/user/03.jpg";

import ShareOffcanvas from '../../share-offcanvas';
import Link from 'next/link';
import Image from 'next/image';

import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import {  getAllLikesByPostId, likePostByUser } from '../../../services/posts.service';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import PostComments from './PostComments';
import TotalCommentBlock from './TotalCommentBlock';



function PostFooter({ currentPostId, refreshPostList }) {
  const [likesWithUserDetails, setLikesListWithUserDetails] = useState([])
  const [apiError, setApiError] = useState('')
  const loginUserId = useSelector((state) => state?.user?.data?.userInfo._id)

  function GetReactionIcon(props) {
    const reaction = props && props.reactionByUser ? props.reactionByUser : 'Like'

    if (reaction == 'Like') {
      return <><AiFillLike size={30} color={"#dd300e"} /></>;
    } else if (reaction == 'Think') {
      return <><Image
        src={icon5}
        className="img-fluid"
        alt=""
      /></>;
    }
    else if (reaction == 'Love') {
      return <><Image
        src={icon2}
        className="img-fluid"
        alt=""

      /></>;
    }
    else if (reaction == 'Happy') {
      return <><Image
        src={icon3}
        className="img-fluid"
        alt=""

      /></>;
    }
    else if (reaction == 'HaHa') {
      return <><Image
        src={icon4}
        className="img-fluid"
        alt=""

      /></>;
    }
    else if (reaction == 'Sade') {
      return <><Image
        src={icon6}
        className="img-fluid"
        alt=""

      /></>;
    }
    else if (reaction == 'Lovely') {
      return <><Image
        src={icon7}
        className="img-fluid"
        alt=""

      /></>;
    }
  }

  const LikeThePost = async (reaction) => {
    currentPostId && PostLikeById(currentPostId, reaction)

  }
  const PostLikeById = async (postId, reaction) => {
    const response = await likePostByUser(postId, reaction)

    if (response.status == 200) {
      getLikeslist()
    }
  }

  const getLikeslist = async () => {
    const res = await getAllLikesByPostId(currentPostId)
    setLikesListWithUserDetails(res)
  }



  useEffect(() => {
    getLikeslist()

  }, [])

  const isliked = likesWithUserDetails && likesWithUserDetails.map(e => e?.userDetails?.userInfo?._id).indexOf(loginUserId)
  const islikedData = likesWithUserDetails && likesWithUserDetails.find(e => e?.userDetails?.userInfo?._id == loginUserId)



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
                      {isliked != -1 ? <GetReactionIcon reactionByUser={islikedData && islikedData.reactionEmoji} /> : <AiOutlineLike size={36} color={"#dd300e"} />}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="py-2">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip >Like</Tooltip>}
                      className="ms-2 me-2"
                    >
                      <AiOutlineLike size={36} onClick={() => LikeThePost("Like")} color={"#dd300e"} />
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
                        className="img-fluid"
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
                        className="img-fluid"
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
                        className="img-fluid"
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
                        className="img-fluid"
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
                        className="img-fluid"
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
                    {likesWithUserDetails.length != 0 ? likesWithUserDetails.length : 0}  Likes
                  </Dropdown.Toggle>
                  {likesWithUserDetails &&
                    <Dropdown.Menu>
                      {likesWithUserDetails && Array.isArray(likesWithUserDetails) &&
                        likesWithUserDetails.map((data, index) => {
                          // console.log(data, "data");
                          return (
                            <React.Fragment key={index}>
                              {index < 10 &&
                                <Dropdown.ItemText key={index} className="bg-secondary p-2" style={{ overflow: "hiddle", minWidth: "200px" }}>
                                  {/* <Link href={`/friends/${data?.userDetails._id}`}> */}
                                  <GetReactionIcon reactionByUser={data.reactionEmoji && data.reactionEmoji} />  <Image
                                    className="avatar-35 rounded-circle img-fluid"
                                    src={data?.userDetails?.profilePictureInfo?.file?.location || user2}
                                    alt=""
                                    height={35}
                                    width={35}
                                  />  {data?.userDetails && `${data.userDetails?.userInfo.firstName} ${data.userDetails?.userInfo.lastName}`}
                                  {/* </Link> */}
                                </Dropdown.ItemText>
                              }
                            </React.Fragment>
                          )
                        })
                      }
                    </Dropdown.Menu>
                  }
                </Dropdown>
              </div>
            </div>

            {currentPostId &&
              <TotalCommentBlock postId={currentPostId} />}
          </div>
          <ShareOffcanvas sharePostId={currentPostId} refreshPostListshare={refreshPostList} />
        </div>
        <hr />
        {currentPostId &&
          <PostComments postId={currentPostId} />
        }
      </div>
    </div >
  )
}

export default PostFooter