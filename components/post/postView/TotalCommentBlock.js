import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { getCommentbyPostId } from '../../../services/posts.service';
import CustomToggle from "../../dropdowns";

function TotalCommentBlock({ postId }) {

    const [commentCount, setCommentCount] = useState(0)
    const [commentUserList, setCommentUserList] = useState([])

    const getCommentList = async () => {
        const res = await getCommentbyPostId(postId, 1, 100, 0, "")
        const commentrepArr = await res


        //console.log(commentrepArr, "commentrepArr");
        console.log();


        const countComment = await commentrepArr?.commentsOrReplyCounts?.commentsOrReplyCounts
        setCommentCount(countComment ? countComment : 0)
        setCommentUserList(commentrepArr?.comments)
    }
    useEffect(() => {
        postId && getCommentList()
    }, [])

    return (
        <div>
            <div className="total-comment-block">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="post-option">
                        {commentCount && commentCount} Comment
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {commentUserList && (commentUserList || []).map((comment, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Dropdown.Item className="bg-secondary">
                                        {comment.userDetails?.userInfo?.firstName || 'Name'} {comment.userDetails?.userInfo?.lastName || ''}
                                    </Dropdown.Item>
                                </React.Fragment>
                            )
                        })}


                    </Dropdown.Menu>

                </Dropdown>
            </div>
        </div>
    )
}

export default TotalCommentBlock