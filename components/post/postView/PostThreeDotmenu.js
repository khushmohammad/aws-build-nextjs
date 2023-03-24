import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  deletePostByPostId,
  pinPostByUser,
  savePostApi,
} from "../../../services/posts.service";
import ConfirmBox from "../../modals/ConfirmBox";
import EditPost from "../EditPost";

function PostThreeDotmenu({
  isPin,
  is_SelfPost,
  PostId,
  refreshpostlist,
  activePage,
  onClickHidePost,
}) {
  const [showModal, setShowModal] = useState(false);

  const [modalShowConfirmBox, setModalShowConfirmBox] = React.useState(false);

  const DeletePostByPostId = async (postId) => {
    const res = await deletePostByPostId(postId);

    const postDeleted = res.status;
    if (postDeleted == 200) {
      // refreshpostlist();
      onClickHidePost(PostId, "delete");
    }
  };
  const pinPost = async (postId) => {
    const res = await pinPostByUser(postId);

    if (res.data.success == true) {
      refreshpostlist();
    }
  };

  const [boxMessage, setBoxMessage] = useState("");
  const savePost = async (postid) => {
    const res = await savePostApi(postid);
    if (res.status === 200) {
      setModalShowConfirmBox(true);
      setBoxMessage(res?.data?.message || "Message");
    }
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="bg-transparent">
          <span className="material-symbols-outlined">more_horiz</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu m-0 p-0">
          {is_SelfPost && is_SelfPost === true && (
            <Dropdown.ItemText className=" p-3" role="button">
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
              <EditPost
                show={showModal}
                onHide={() => setShowModal(false)}
                onShow={() => setShowModal(true)}
                postid={PostId}
                refreshPostList={() => refreshpostlist()}
              />
            </Dropdown.ItemText>
          )}

          {is_SelfPost && activePage == "myProfile" && is_SelfPost === true && (
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
                    <p className="mb-0">Add this to your pinned post</p>
                  </div>
                ) : (
                  <div className="data ms-2">
                    <h6>Unpin Post</h6>
                    <p className="mb-0">Add this to your pinned post</p>
                  </div>
                )}
              </div>
            </Dropdown.Item>
          )}
          <Dropdown.Item
            onClick={() => savePost(PostId)}
            className=" p-3 "
            role="button"
          >
            <div className="d-flex align-items-top">
              <div className="h4 material-symbols-outlined">
                <i className="ri-save-line"></i>
              </div>
              <div className="data ms-2">
                <h6>
                  {activePage != "savedPost"
                    ? "Save Post"
                    : "Remove Saved Post"}
                </h6>
                <p className="mb-0">Add this to your saved items</p>
              </div>
            </div>
          </Dropdown.Item>

          {/* <Dropdown.Item className="p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-close-circle-line h4"></i>
              <div className="data ms-2">
                <h6>Hide Post</h6>
                <p className="mb-0">See fewer posts like this.</p>
              </div>
            </div>
          </Dropdown.Item> */}

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
          {/* <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-user-unfollow-line h4"></i>
              <div className="data ms-2">
                <h6>Unfollow User</h6>
                <p className="mb-0">Stop seeing posts but stay friends.</p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-notification-line h4"></i>
              <div className="data ms-2">
                <h6>Notifications</h6>
                <p className="mb-0">Turn on notifications for this post</p>
              </div>
            </div>
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>

      <ConfirmBox
        show={modalShowConfirmBox}
        message={boxMessage || "Message"}
        onHide={() => {
          setModalShowConfirmBox(false), onClickHidePost(PostId, "save");
        }}
      />
    </div>
  );
}

export default PostThreeDotmenu;
