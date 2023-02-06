import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deletePostByPostId } from '../../../services/posts.service';
import { getAllFeedsList } from '../../../store/post/allFeeds';
import EditPost from '../EditPost';

function PostThreeDotmenu({ isPin, is_SelfPost, PostId, refreshPostList }) {

    const [showModal, setShowModal] = useState(false);

    const DeletePostByPostId = async (postId) => {
        const res = await deletePostByPostId(postId);
        const postDeleted = res.status;
        if (postDeleted == 200) {
            refreshPostList()

        }
    };
    const pinPost = async (postId) => {
        const res = await pinPostByUser(postId);

        if (res.data.success == true) {
            refreshPostList()
        }
    };
    return (
        <div>


            <Dropdown>
                <Dropdown.Toggle variant="bg-transparent">
                    <span className="material-symbols-outlined">
                        more_horiz
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                    {is_SelfPost && is_SelfPost === true &&
                        <Dropdown.Item className=" p-3">

                            <div
                                className="d-flex align-items-top"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                <div className="h4 material-symbols-outlined">
                                    <i className="ri-save-line"></i>
                                </div>
                                <div className="data ms-2">
                                    <h6>Edit Post</h6>
                                    <p className="mb-0">Edit</p>
                                </div>
                            </div>
                        </Dropdown.Item>
                    }


                    {is_SelfPost && is_SelfPost === true && (
                        <Dropdown.Item className=" p-3" href="#">
                            <div
                                className="d-flex align-items-top"
                                onClick={() => pinPost(PostId)}
                            >
                                <div className="h4 material-symbols-outlined">
                                    <i className="ri-save-line"></i>
                                </div>
                                {isPin != true ? (
                                    <div className="data ms-2">
                                        <h6>Pin Post</h6>
                                        <p className="mb-0">
                                            Add this to your pinned post
                                        </p>
                                    </div>
                                ) : (
                                    <div className="data ms-2">
                                        <h6>Unpin Post</h6>
                                        <p className="mb-0">
                                            Add this to your pinned post
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item className=" p-3" href="#">
                        <div className="d-flex align-items-top">
                            <div className="h4 material-symbols-outlined">
                                <i className="ri-save-line"></i>
                            </div>
                            <div className="data ms-2">
                                <h6>Save Post</h6>
                                <p className="mb-0">
                                    Add this to your saved items
                                </p>
                            </div>
                        </div>
                    </Dropdown.Item>

                    <Dropdown.Item className="p-3" href="#">
                        <div className="d-flex align-items-top">
                            <i className="ri-close-circle-line h4"></i>
                            <div className="data ms-2">
                                <h6>Hide Post</h6>
                                <p className="mb-0">
                                    See fewer posts like this.
                                </p>
                            </div>
                        </div>
                    </Dropdown.Item>
                    {is_SelfPost && is_SelfPost === true && (
                        <Dropdown.Item className=" p-3">
                            <div
                                className="d-flex align-items-top"
                                onClick={() => DeletePostByPostId(PostId)}
                            >
                                <div className="h4 material-symbols-outlined">
                                    <i className="ri-save-line"></i>
                                </div>
                                <div className="data ms-2">
                                    <h6>Delete Post</h6>
                                    <p className="mb-0">Delete</p>
                                </div>
                            </div>
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item className=" p-3" href="#">
                        <div className="d-flex align-items-top">
                            <i className="ri-user-unfollow-line h4"></i>
                            <div className="data ms-2">
                                <h6>Unfollow User</h6>
                                <p className="mb-0">
                                    Stop seeing posts but stay friends.
                                </p>
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item className=" p-3" href="#">
                        <div className="d-flex align-items-top">
                            <i className="ri-notification-line h4"></i>
                            <div className="data ms-2">
                                <h6>Notifications</h6>
                                <p className="mb-0">
                                    Turn on notifications for this post
                                </p>
                            </div>
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <EditPost
                show={showModal}
                onHide={() => setShowModal(false)}
                onShow={() => setShowModal(true)}
                postid={PostId}
                refreshPostList={() => refreshPostList()}
            />
        </div>
    )
}

export default PostThreeDotmenu