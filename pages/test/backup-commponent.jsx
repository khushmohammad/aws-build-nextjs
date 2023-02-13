import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import user2 from "../../public/assets/images/user/1.jpg";
import { getCommentbyPostId, postCommentByPostId } from '../../services/posts.service';

function Commentapi({ postId }) {



    const [commentInputText, setCommentInputText] = useState('')
    const [commentlist, setCommentlist] = useState([])

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const res = await postCommentByPostId(postId, commentInputText, 0, null)
        const result = await res?.data?.body
        commentlist && commentlist.length == 0 ? setCommentlist(result) : setCommentlist([...commentlist || [], result])
        setCommentInputText('')
    }

    const getCommentList = async () => {
        const res = await getCommentbyPostId(postId, 1, 2, 0, "")
        const commentrepArr = await res?.comments
        setCommentlist(commentrepArr)
    }
    useEffect(() => {
        postId && getCommentList()


    }, [])



    return (
        <Container>
            <div>
                <ul className="post-comments list-inline p-0 m-0">
                    {commentlist && (commentlist || []).map((comment, i) => {
                        return (
                            <React.Fragment key={i}>
                                {commentlist &&
                                    <>
                                        <CommentList postId={postId} comment={comment} />
                                        {comment.repliesCounts > 0 && <CommentReplyViewOne postId={postId && postId} parentId={comment._id} commmetLevel={comment.level} />}
                                    </>
                                }

                            </React.Fragment>
                        )
                    })
                    }
                    <div className='w-100'>
                        <form onSubmit={onFormSubmit} >
                            <input type="text" value={commentInputText} onChange={(e) => setCommentInputText(e.target.value)} className="form-control rounded" placeholder="Enter Your Comment" />
                        </form>
                    </div>

                </ul>


            </div>
        </Container>
    )
}




const CommentReplyViewOne = ({ postId, parentId, commmetLevel }) => {


    const [commentReplylist, setCommentReplylist] = useState([])
    const updatedLevel = commmetLevel ? commmetLevel + 1 : 1
    const getCommentReplyList = async () => {
        const res = await getCommentbyPostId(postId, 1, 2, updatedLevel, parentId)
        const commentrepArr = await res?.comments
        setCommentReplylist(commentrepArr)
    }
    useEffect(() => {
        postId && getCommentReplyList()
    }, [])
    useEffect(() => {
        postId && getCommentReplyList()
    }, [commmetLevel])

    return (
        <ul className={`post-comments list-inline p-0 m-0  ${updatedLevel < 3 ? 'ms-4' : ''}`}>
            {commentReplylist && (commentReplylist || []).map((comment, i) => {
                return (
                    <React.Fragment key={i}>
                        <CommentList postId={postId} comment={comment} />
                        {comment.repliesCounts > 0 && <CommentReplyViewOne postId={postId} parentId={comment._id} commmetLevel={comment.level} />}
                    </React.Fragment>
                )
            })
            }
        </ul>
    )
}


const CommentList = ({ postId, comment }) => {

    const [viewReplyInput, setViewReplyInput] = useState()
    const [newReply, setNewReply] = useState([])
    const [newReplyText, setNewReplyText] = useState("")


    const FormSubmit = async (e) => {
        e.preventDefault()
        const res = postId && await postCommentByPostId(postId, newReplyText, 0, comment._id)
        const result = await res?.data?.body

        setNewReply([...newReply, result])
        setNewReplyText('')
        setViewReplyInput(false)
    }


    return (
        <>
            <li className={`mb-2 `} >
                <div className="d-flex">
                    <div className="user-img flex-shrink-0">
                        <Image
                            className="avatar-35 rounded-circle img-fluid"
                            src={user2}
                            alt=""
                            height={35}
                            width={35}
                        />
                    </div>
                    <div className="comment-data-block ms-3 flex-grow-1">
                        <h6>name</h6>
                        <p className="mb-0">{comment?.textInfo}</p>
                        <div className="d-flex flex-wrap align-items-center comment-activity">

                            {/* <a role="button" className='text-primary'>like </a> */}
                            <a role="button" className='text-primary' onClick={() => setViewReplyInput(!viewReplyInput)}>reply </a>
                            <a role="button" className='text-primary'>delete </a>

                        </div>


                    </div>
                </div>
                <ul className={`post-comments list-inline ${comment.level < 3 ? 'ms-4' : ''}`}>
                    <>
                        {newReply && newReply.map((data, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {data &&
                                        <CommentReplyViewOne postId={postId} parentId={comment._id} commmetLevel={comment.level} />
                                    }

                                </React.Fragment>
                            )
                        })}
                    </>
                </ul>
                {viewReplyInput &&
                    <>

                        <form onSubmit={FormSubmit}>
                            <input type="text" value={newReplyText} onChange={(e) => setNewReplyText(e.target.value)} className="form-control rounded" placeholder="Enter Your Comment Reply" />
                        </form>
                    </>
                }


            </li>
        </>
    )
}





export default Commentapi