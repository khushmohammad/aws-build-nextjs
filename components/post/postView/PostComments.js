import React, { useEffect, useState } from 'react'
import { getPostTime } from '../../../services/time.service';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import user2 from "../../../public/assets/images/user/1.jpg";
import Link from 'next/link';
import Image from 'next/image';
import { getCommentbyPostId, mergeUserBasicDetails, postCommentByPostId } from '../../../services/posts.service';

const schema = yup.object({
    commentInput: yup.string().required("Please write something")

}).required();

function PostComments({ postId }) {

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [commentlist, setCommentlist] = useState([''])

    const onSubmit = async (data) => {

        const res = await postCommentByPostId(postId, data?.commentInput, 0)
        const result = await res
        if (result.status == 200) {
            const dataWithUserDetails = await mergeUserBasicDetails([result?.data?.body])
            console.log(dataWithUserDetails, "dataWithUserDetails");
            commentlist && commentlist.length > 0 ? setCommentlist([...commentlist, dataWithUserDetails[0]]) : setCommentlist([dataWithUserDetails[0]])
            reset()
        }
        else {

            console.log(result, "apiError");
        }
    };

    const getCommentList = async () => {
        const res = await getCommentbyPostId(postId, 1, 5, 0, "")
        const commentrepArr = await res?.comments
        setCommentlist(commentrepArr)
    }
    useEffect(() => {
        getCommentList()
    }, [postId])



    return (
        <div>
            <ul className="post-comments list-inline p-0 m-0">

                {commentlist && (commentlist || []).map((comment, i) => {
                    return (
                        <React.Fragment key={i}>
                            {commentlist && <CommentLiComponent comment={comment} postId={postId} />}
                        </React.Fragment>
                    )
                })
                }
            </ul >

            <form onSubmit={handleSubmit(onSubmit)}  >
                <div className="comment-text d-flex align-items-center mt-3"  >
                    <div className="input-group mb-3">
                        <input type="text"  {...register("commentInput")} className="form-control rounded" placeholder="Enter Your Comment" />
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
                </div>
                {errors.commentInput && (
                    <p className="text-danger">{errors.commentInput.message}</p>
                )}
            </form>
        </div >
    )
}


function CommentLiComponent({ comment, postId, level, parentId }) {

    const NestedComments = React.memo(({ parentId, level }) => {
        const [commentReply, setCommentReply] = useState()

        const getCommentReply = async () => {
            if (comment) {
                const res = await getCommentbyPostId(postId, 1, 5, level, parentId)
                const commentrepArr = await res?.comments
                commentrepArr && setCommentReply(commentrepArr)
            }
        }

        useEffect(() => {
            getCommentReply()
            //console.log("object");
        }, [postId])

        return (
            <React.Fragment >


                {commentReply && (commentReply || []).map((replydata, i) => {
                    return (
                        <React.Fragment key={i}>
                            {replydata && <CommentLiComponent comment={replydata} postId={postId} level={level} parentId={replydata._id || ""} />}
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    })
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [commentInputText, setCommentInputText] = useState('')
    const [commentReply, setCommentReply] = useState([])

    const onFormSubmit = async (e) => {
        e.preventDefault();


        const updatedLevel = level == undefined ? 0 : level + 1
        const res = await postCommentByPostId(postId, commentInputText, updatedLevel, comment._id)
        const result = await res

        if (result.status == 200) {
            const dataWithUserDetails = await mergeUserBasicDetails([result?.data?.body])
            dataWithUserDetails && commentReply && commentReply.length > 0 ? setCommentReply([...commentReply, dataWithUserDetails[0]]) : setCommentReply([dataWithUserDetails[0]])

            setCommentInputText('')
            setShowCommentInput(false)
        }
        else {

            console.log(result, "apiError");
        }

        // send state to server with e.g. `window.fetch`
    }


    const [viewReply, setviewReply] = useState()

    return (
        <>

            <li className={`mb-2 `} >
                <div className="d-flex">
                    <div className="user-img flex-shrink-0">
                        <Image
                            className="avatar-35 rounded-circle img-fluid"
                            src={comment?.userDetails?.profilePictureInfo?.file?.location || user2}
                            alt=""
                            height={35}
                            width={35}
                        />
                    </div>
                    <div className="comment-data-block ms-3 flex-grow-1">
                        <h6>{comment?.userDetails?.userInfo?.firstName || "fistName"}  {comment?.userDetails?.userInfo?.lastName || ""}</h6>
                        <p className="mb-0">{comment?.textInfo}</p>
                        <div className="d-flex flex-wrap align-items-center comment-activity">

                            <a role="button" className='text-primary'>like </a>
                            <a role="button" className='text-primary' onClick={() => setShowCommentInput(!showCommentInput)}>reply </a>
                            <a role="button" className='text-primary'>delete </a>

                            <span className='text-primary'  >{comment?.createdAt && getPostTime(comment.createdAt)} </span>

                            {showCommentInput &&
                                <div className='w-100'>

                                    <form onSubmit={onFormSubmit} >
                                        <input type="text" onChange={(e) => setCommentInputText(e.target.value)} className="form-control rounded" placeholder="Enter Your Comment Reply" />
                                    </form>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </li>
            {comment && comment?.repliesCounts >= 0 && <>
                <p role="button" className='text-primary '>view reply </p>

                <ul className={`post-comments list-inline  ${comment?.level < 2 ? 'ms-4' : ''}`}>
                    <NestedComments parentId={comment?._id} level={comment?.level + 1} />
                </ul>
            </>}
        </>
    );
}


export default React.memo(PostComments)