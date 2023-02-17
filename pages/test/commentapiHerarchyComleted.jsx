import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import user2 from "../../public/assets/images/user/25.png";
import { getCommentbyPostId, postCommentByPostId } from '../../services/posts.service';

function Commentapi() {

    const [commentInputText, setCommentInputText] = useState('')
    const [commentlist, setCommentlist] = useState([''])

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const res = await postCommentByPostId("63e3a0e01b2f4232326a3c34", commentInputText, 0, null)
        const result = await res?.data?.body
        setCommentlist([...commentlist, result])
    }

    const getCommentList = async () => {
        const res = await getCommentbyPostId("63e3a0e01b2f4232326a3c34", 1, 5, 0, "")
        console.log(res, "sdfsdf")
        const commentrepArr = await res?.comments
        setCommentlist(commentrepArr)
    }
    useEffect(() => {
        getCommentList()
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
                                        <CommentList comment={comment} />

                                        {comment.repliesCounts && comment.repliesCounts > 0 &&
                                            <>

                                                <CommentReplyViewOne parentId={comment._id} commmetLevel={comment.level} />
                                            </>
                                        }



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




const CommentReplyViewOne = ({ parentId, commmetLevel }) => {
    const [commentReplylist, setCommentReplylist] = useState([])
    const updatedLevel = commmetLevel ? commmetLevel + 1 : 1
    console.log(updatedLevel, "updatedLevel");
    const getCommentReplyList = async () => {
        const res = await getCommentbyPostId("63e3a0e01b2f4232326a3c34", 1, 5, updatedLevel, parentId)
        console.log(res, "sdfsdf")
        const commentrepArr = await res?.comments
        setCommentReplylist(commentrepArr)
    }
    useEffect(() => {
        getCommentReplyList()
    }, [])

    return (
        <ul className={`post-comments list-inline p-0 m-0  ${updatedLevel < 3 ? 'ms-4' : ''}`}>
            {commentReplylist && (commentReplylist || []).map((comment, i) => {
                return (
                    <React.Fragment key={i}>
                        {comment.level}
                        <>
                            <CommentList comment={comment} />

                            {comment.repliesCounts > 0 &&
                                <>
                                    <CommentReplyViewOne parentId={comment._id} commmetLevel={comment.level} />
                                </>
                            }
                        </>
                    </React.Fragment>
                )
            })
            }

        </ul>
    )
}


const CommentList = ({ comment }) => {

    const [viewReplyInput, setViewReplyInput] = useState()
    const [newReply, setNewReply] = useState([])
    const [newReplyText, setNewReplyText] = useState("")


    const FormSubmit = (e) => {
        e.preventDefault()
        console.log(newReplyText)
        setNewReply([...newReply, newReplyText])
        setNewReplyText('')
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

                            <a role="button" className='text-primary'>like </a>
                            <a role="button" className='text-primary' onClick={() => setViewReplyInput(!viewReplyInput)}>reply </a>
                            <a role="button" className='text-primary'>delete </a>

                            {/* <span className='text-primary'  >{comment?.createdAt && getPostTime(comment.createdAt)} </span> */}

                        </div>


                    </div>
                </div>
                {viewReplyInput &&
                    <>
                        <ul className={`post-comments list-inline ms-4`}>
                            <>
                                {newReply && newReply.map((data, index) => {
                                    return (
                                        <NewCommetViewList newComment={data} />
                                    )
                                })}
                            </>
                        </ul>
                        <form onSubmit={FormSubmit}>
                            <input type="text" value={newReplyText} onChange={(e) => setNewReplyText(e.target.value)} className="form-control rounded" placeholder="Enter Your Comment Reply" />
                        </form>
                    </>
                }


            </li>


        </>
    )
}


const NewCommetViewList = ({ newComment }) => {


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
                        <p className="mb-0">{newComment}</p>
                        <div className="d-flex flex-wrap align-items-center comment-activity">

                            <a role="button" className='text-primary'>like </a>
                            <a role="button" className='text-primary' >reply </a>
                            <a role="button" className='text-primary'>delete </a>

                        </div>


                    </div>
                </div>
            </li>
        </>
    )
}



export default Commentapi