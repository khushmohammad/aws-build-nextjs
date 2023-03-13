import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import user2 from "../../../public/assets/images/user/25.png";
import {
  getCommentbyPostId,
  
  postCommentByPostId,
  postCommentDeletebyPostId,
} from "../../../services/posts.service";
import ConfirmModelReturn from "../../modals/ConfirmModelReturn";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { mergeUserBasicDetails } from "../../../services/user.service";

const schema = yup
  .object({
    commentInputText: yup.string().required("Please write comment !"),
  })
  .required();

function Commentapi({ postId }) {

  // const [commentInputText, setCommentInputText] = useState('')
  const [commentlist, setCommentlist] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const onFormSubmit = async (e) => {
    if (e.commentInputText !== '') {
      const res = await postCommentByPostId(postId, e.commentInputText, 0, null)
      const result = await res?.data?.body
      const withUserDetails = await mergeUserBasicDetails([result])

      commentlist && commentlist.length == 0 ? setCommentlist([withUserDetails[0]]) : setCommentlist([...commentlist, withUserDetails[0]])
      // setCommentInputText('')

      reset()
    }
  }

  useEffect(() => {

    postId && getCommentList()
  }, [page])



  const getCommentList = async () => {
    const res = await getCommentbyPostId(postId, page, limit, 0, "")
    const commentrepArr = await res?.comments
    commentrepArr && commentrepArr.length != 0 ? (setCommentlist([...commentlist, ...commentrepArr]), setShowLoadMoreButton(true)) : setShowLoadMoreButton(false)

  }

  const LoadMore = () => {

    setPage((prev) => prev + 1)
  }

  return (
    <Container>
      <div>
        <ul className="post-comments list-inline p-0 m-0">
          {commentlist && commentlist.map((comment, i) => {

            return (
              <React.Fragment key={i}>
                {commentlist &&
                  <>
                    <CommentList postId={postId} comment={comment} refreshcommetlist={getCommentList} />
                  </>
                }

              </React.Fragment>
            )
          })
          }
          {showLoadMoreButton ?
            <>
              <p role="button" onClick={LoadMore}> View more comments </p>
            </>
            : ""}

          <div className='w-100'>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("firstName")} />
                            <p>{errors.firstName?.message}</p>
                        </form> */}

            <form onSubmit={handleSubmit(onFormSubmit)}>
              <input
                type="text"
                {...register("commentInputText")}
                defaultValue={""}
                className="form-control rounded"
                placeholder="Enter Your Comment"
              />
              <p className="text-primary">{errors.commentInputText?.message}</p>
            </form>
          </div>
        </ul>
      </div>
    </Container>
  );
}

const CommentReplyViewOne = ({ postId, parentId, commmetLevel }) => {


  const [commentReplylist, setCommentReplylist] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)


  const updatedLevel = commmetLevel ? commmetLevel + 1 : 1
  const getCommentReplyList = async () => {
    const res = await getCommentbyPostId(postId, page, limit, updatedLevel, parentId)
    const commentrepArr = await res?.comments
    // setCommentReplylist(commentrepArr)
    commentrepArr && commentrepArr.length != 0 ? (setCommentReplylist([...commentReplylist, ...commentrepArr]), setShowLoadMoreButton(true)) : setShowLoadMoreButton(false)

  }
  // useEffect(() => {
  //     postId && getCommentReplyList()
  // }, [])
  useEffect(() => {

    postId && getCommentReplyList()
  }, [page])

  useEffect(() => {
    postId && getCommentReplyList()
  }, [commmetLevel])
  const LoadMore = () => {

    setPage((prev) => prev + 1)
  }
  // const [showMoreCommentReply, setshowMoreCommentReply] = useState(false)


  return (
    <ul className={`post-comments list-inline p-0 m-0  ${updatedLevel < 3 ? 'ms-4' : ''}`}>
      {commentReplylist && commentReplylist.map((comment, i) => {
        return (
          <React.Fragment key={i}>
            <CommentList postId={postId} comment={comment} refreshcommetlist={getCommentReplyList} />
            {/* <form >
                            <input type="text" value={"newReplyText"}  className="form-control rounded ms-3" placeholder="Enter Your Comment Reply" />
                        </form> */}
          </React.Fragment>
        )
      })
      }
      {showLoadMoreButton ?
        <>
          <p role="button" onClick={LoadMore}>View more replies </p>
        </>
        : ""}
    </ul>
  )
}


const CommentList = ({ postId, comment, refreshcommetlist }) => {
  const [viewReplyInput, setViewReplyInput] = useState(false);
  const [newReply, setNewReply] = useState([]);
  const [newReplyText, setNewReplyText] = useState("");

  const FormSubmit = async (e) => {
    e.preventDefault();
    if (newReplyText !== "") {
      const res =
        postId &&
        (await postCommentByPostId(postId, newReplyText, 0, comment._id));
      const result = await res?.data?.body;
      setNewReply([...newReply, result]);
      setNewReplyText("");
      setViewReplyInput(false);
    }
  };
  const [showMoreCommentReply, setshowMoreCommentReply] = useState(false);

  const [modalShowConfirmBox, setModalShowConfirmBox] = React.useState(false);

  const [isRequested, setIsRequested] = useState([]);

  const DeleteComment = async (confirm) => {
    if (confirm) {
      setModalShowConfirmBox(false);
      const res = await postCommentDeletebyPostId(postId, comment._id);
      //  console.log(res);
      if (res.status == 200) {
        setIsRequested((prev) =>
          Boolean(!prev[comment._id])
            ? { ...prev, [comment._id]: true }
            : { ...prev, [comment._id]: false }
        );
        refreshcommetlist();
      }
    }
  };

  const [commentCount, setCommentCount] = useState(comment.repliesCounts);

  return (
    <>
      {!isRequested[comment._id] ? (
        <li className={`mb-2  border-top py-2`}>
          <div className="d-flex ">
            <div className="user-img flex-shrink-0">
              <Image
                className="avatar-35 rounded-circle img-fluid "
                src={
                  comment.userDetails?.profilePictureInfo?.file?.location ||
                  user2
                }
                alt=""
                height={35}
                width={35}
              />
            </div>
            <div className="comment-data-block ms-3 flex-grow-1 ">
              <h6 className="fw-semibold">
                {comment.userDetails?.userInfo?.firstName || "Name"}{" "}
                {comment.userDetails?.userInfo?.lastName || ""}
              </h6>
              <p className="mb-0">{comment?.textInfo}</p>
              <div className="d-flex flex-wrap align-items-center comment-activity">
                {/* <a role="button" className='text-primary'>like </a> */}
                <a
                  role="button"
                  className="text-primary"
                  onClick={() => setViewReplyInput(!viewReplyInput)}
                >
                  reply{" "}
                </a>
                <a
                  role="button"
                  className="text-primary"
                  onClick={() => setModalShowConfirmBox(true)}
                >
                  delete{" "}
                </a>
              </div>
            </div>
          </div>

          {viewReplyInput ? (
            <>
              <form onSubmit={FormSubmit}>
                <input
                  type="text"
                  value={newReplyText}
                  onChange={(e) => setNewReplyText(e.target.value)}
                  className="form-control rounded ms-3"
                  placeholder="Enter Your Comment Reply"
                />
              </form>
            </>
          ) : (
            ""
          )}
          <ul
            className={`post-comments list-inline ${comment.level < 1 ? "ms-4" : ""
              }`}
          >
            <>
              {newReply &&
                newReply.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <CommentReplyViewOne
                        postId={postId}
                        parentId={comment._id}
                        commmetLevel={comment.level}
                      />
                    </React.Fragment>
                  );
                })}
            </>
          </ul>

          {commentCount && commentCount > 0 ? (
            <>
              <a
                role="button"
                onClick={() => setshowMoreCommentReply(!showMoreCommentReply)}
                className="text-primary ms-4"
              >
                {showMoreCommentReply ? "Hide" : "Show"} reply{" "}
                {comment.repliesCounts}
              </a>
              {showMoreCommentReply && (
                <CommentReplyViewOne
                  postId={postId && postId}
                  parentId={comment._id}
                  commmetLevel={comment.level}
                />
              )}
            </>
          ) : (
            ""
          )}
        </li>
      ) : (
        ""
      )}

      <ConfirmModelReturn
        show={modalShowConfirmBox}
        message={"Are you sure ?"}
        onHide={() => setModalShowConfirmBox(false)}
        deletecomment={(e) => DeleteComment(e)}
      />
    </>
  );
};

export default Commentapi;
