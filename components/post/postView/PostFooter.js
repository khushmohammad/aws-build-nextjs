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
import user2 from "../../../public/assets/images/user/02.jpg";
import user3 from "../../../public/assets/images/user/03.jpg";

import ShareOffcanvas from '../../share-offcanvas';
import Link from 'next/link';
import Image from 'next/image';

import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { getAllCommentsByPostId, getAllLikesByPostId,  likePostByUser, postCommentbyPostId, postCommentDeletebyPostId } from '../../../services/posts.service';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getPostTime } from '../../../services/time.service';

const schema = yup.object({
  commentInput: yup.string().required()
}).required();

function PostFooter({ postIdForLike }) {
  const [likesWithUserDetails, setLikesListWithUserDetails] = useState([])
  const [CommentWithUserDetails, setCommentListWithUserDetails] = useState([])
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
    postIdForLike && PostLikeById(postIdForLike, reaction)

  }
  const PostLikeById = async (postId, reaction) => {
    const response = await likePostByUser(postId, reaction)

    if (response.status == 200) {
      getLikeslist()
    }
  }

  const getLikeslist = async () => {
    const res = await getAllLikesByPostId(postIdForLike)
    setLikesListWithUserDetails(res)
  }
  const getCommetslist = async () => {
    const res = await getAllCommentsByPostId(postIdForLike)
    setCommentListWithUserDetails(res)
  }


  useEffect(() => {
    getLikeslist()
    getCommetslist()
  }, [])

  const isliked = likesWithUserDetails && likesWithUserDetails.map(e => e?.userDetails?.userInfo?._id).indexOf(loginUserId)
  const islikedData = likesWithUserDetails && likesWithUserDetails.find(e => e?.userDetails?.userInfo?._id == loginUserId)


  const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data) => {
    const res = await postCommentbyPostId(postIdForLike, data);

    if (res == true) {
      getCommetslist();
      reset()
    } else {
      setApiError("Yout Comment is not submited, try after some time")
    }
  };

  // console.log(watch("commentInput"));

  const DeleteComment = async (commentId) => {

    const res = await postCommentDeletebyPostId(postIdForLike, commentId);
    console.log(res, "rdffdes");

    if (res == true) {
      getCommetslist();
    } else {
      setApiError("Yout Comment is not Deleted, try after some time")
    }

  }
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
                      {likesWithUserDetails &&
                        likesWithUserDetails.map((data, index) => {
                          return (
                            <React.Fragment key={index}>
                              {index < 10 &&
                                <Dropdown.Item key={index} className="bg-secondary">

                                  <GetReactionIcon reactionByUser={data.reactionEmoji && data.reactionEmoji} />   {data?.userDetails && `${data.userDetails?.userInfo.firstName} ${data.userDetails?.userInfo.lastName}`}
                                </Dropdown.Item>
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
            <div className="total-comment-block">
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="post-option">
                  {CommentWithUserDetails && CommentWithUserDetails.length} Comment
                </Dropdown.Toggle>
                {CommentWithUserDetails &&
                  <Dropdown.Menu>
                    {CommentWithUserDetails &&
                      CommentWithUserDetails.map((data, index) => {
                        return (
                          <React.Fragment key={index}>
                            {index < 6 &&
                              <Dropdown.Item key={index} className="bg-secondary">
                                {data?.userDetails && `${data.userDetails?.userInfo?.firstName} ${data.userDetails?.userInfo?.lastName}`}
                              </Dropdown.Item>
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
          <ShareOffcanvas />
        </div>
        <hr />
        <ul className="post-comments list-inline p-0 m-0">
          {CommentWithUserDetails && CommentWithUserDetails.map((commentData, index) => {
            return (
              <React.Fragment key={index}>
                {index < 30 &&
                  <li className="mb-2">
                    <div className="d-flex">
                      <div className="user-img flex-shrink-0">
                        {commentData?.userDetails &&
                          <Image
                            className="avatar-35 rounded-circle img-fluid"
                            src={commentData?.userDetails?.profilePictureInfo?.file?.location || user2}
                            alt=""
                            height={35}
                            width={35}
                          />
                        }

                      </div>
                      <div className="comment-data-block ms-3 flex-grow-1">
                        <h6> {commentData?.userDetails && `${commentData.userDetails?.userInfo?.firstName} ${commentData.userDetails?.userInfo?.lastName}`}</h6>
                        <p className="mb-0">{commentData.mainComment.commentText}</p>
                        <div className="d-flex flex-wrap align-items-center comment-activity">
                          {/* <Link href="#">like</Link> */}
                          {/* <Link href="#">reply</Link> */}
                          {commentData && commentData.canDelete ?
                            <><a role="button" className='text-primary' onClick={() => DeleteComment(commentData._id)}>delete </a></>
                            :
                            ""}
                          <span className='text-primary'  >{commentData?.createdAt && getPostTime(commentData.createdAt)} </span>
                        </div>
                      </div>
                    </div>
                  </li>
                }
              </React.Fragment>
            )
          })}

          {/* <li>
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
          </li> */}
        </ul>
        {apiError && <p className='text-danger'>{apiError}</p>}
        <form className="comment-text d-flex align-items-center mt-3" onSubmit={handleSubmit(onSubmit)}  >

          <div className="input-group mb-3">
            <input type="text"  {...register("commentInput")} className="form-control rounded" placeholder="Enter Your Comment" />
            {/* <div className="input-group-append">
                        <button type="submit" className="input-group-text" id="basic-addon2">Submit</button>
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
    </div >
  )
}

export default PostFooter