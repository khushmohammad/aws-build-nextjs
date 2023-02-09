import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-filebase64";
import Link from "next/link";

// images
import user1 from "../../public/assets/images/user/1.jpg";
import small1 from "../../public/assets/images/small/07.png";
import small2 from "../../public/assets/images/small/08.png";
import small3 from "../../public/assets/images/small/09.png";
import small4 from "../../public/assets/images/small/10.png";
import small6 from "../../public/assets/images/small/12.png";

import { updatePost } from "../../services/posts.service";
import { allPostPhotos, getPostDetails } from "../../store/post";
import { useRouter } from "next/router";
import ModalPop from "../popupModal/ModalPop";
import { allPhotos } from "../../store/profile";

const EditPost = (props) => {
  const [modalShowFriendList, setModalShowFriendList] = useState(false);
  const [imageKey, setImageKey] = useState([]);
  const [imageFileIds, setImageFileIds] = useState([]);
  const [imageAndId, setImageAndId] = useState({ data: [] });
  const [count, setCount] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [privacy, setPrivacy] = useState(null);
  const [privacyFriendList, setPrivacyFriendList] = useState([]);

  const profileImage = useSelector(
    (state) => state?.user?.data?.profilePictureInfo?.file?.location
  );
  const postDetails = useSelector((state) => state?.post?.postDetail?.allBody);
  const [postData, setPostData] = useState({
    description: "",
    share: "",
    keys: [],
    fileIds: [],
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const showHandle = () => {
    setShowPopup(true);
    props.onHide();
  };
  const closeHandle = () => {
    setShowPopup(false);
    props.onShow();
    setSelectedFile(null);
  };

  const HandleClose = () => {
    props.onHide();
    setSelectedFile(null);
  };

  useEffect(() => {
    if (privacy === "includeFriends" || privacy === "excludeFriends") {
      setPostData({
        ...postData,
        privacy: privacy,
        privacyFriendList: privacyFriendList,
      });
    } else {
      setPostData({ ...postData, privacy: privacy });
    }
  }, [privacy, privacyFriendList]);

  useEffect(() => {
    setPostData(postDetails);

    if (count) {
      let images = [];
      postDetails?.filesInfo?.map((files) => {
        images.push({
          src: files.file.location,
          fileId: files._id,
          key: files.file.key,
        });
      });

      setImageAndId({ data: images });
    }

    setPostData({
      description: postDetails?.description,
      share: postDetails?.share,
      keys: imageKey,
      fileIds: imageFileIds,
    });
    setPrivacy(postDetails?.privacy);
    setPrivacyFriendList();
  }, [postDetails, imageKey, imageFileIds]);
  // console.log("props",props.postid)
  useEffect(() => {
    if (props.postid !== undefined) dispatch(getPostDetails(props.postid));
  }, [props.postid]);

  const deleteImageKey = (key, id) => {
    setCount(false);
    setImageAndId({
      ...imageAndId,
      data: imageAndId.data.filter((val) => val.fileId !== id),
    });
    setImageKey([...imageKey, key]);
    setImageFileIds([...imageFileIds, id]);
  };

  const deleteImage = (img, imgIndex) => {
    const newArr = selectedFile.filter((item, index) => {
      return index != imgIndex;
    });
    const showImageByPosts = postData?.file?.filter((item, index) => {
      return index != imgIndex;
    });
    setPostData(showImageByPosts);
    setSelectedFile(newArr);
  };

  const updatePostData = async (e) => {
    e.preventDefault();
    await updatePost(postData, props.postid);
    setPostData({ description: "", file: null });
    setSelectedFile(null);
    setPrivacyFriendList([]);
    dispatch(allPhotos());
    dispatch(allPostPhotos());
    props.refreshPostList();
    props.onHide();
  };

  return (
    <>
      <Modal {...props} size="lg" style={{ top: "10%" }}>
        <Modal.Header className="d-flex justify-content-between">
          <h5 className="modal-title" id="post-modalLabel">
            Edit Post
          </h5>
          <button
            type="button"
            className="btn btn-secondary lh-1"
            onClick={HandleClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updatePostData} encType="multipart/form-data">
            <div className="d-flex align-items-center">
              <div className="user-img">
                <Image
                  loading="lazy"
                  src={profileImage || user1}
                  alt="userimg"
                  className="avatar-60 rounded-circle img-fluid"
                  width={100}
                  height={100}
                />
              </div>
              <div className="post-text ms-3 w-100">
                <input
                  name="description"
                  type="text"
                  value={postData?.description || ""}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      description: e.target.value,
                    })
                  }
                  className="form-control rounded"
                  placeholder="Write something here..."
                  style={{ border: "none" }}
                />
              </div>
            </div>
            <hr />

            <div className="row gap-2">
              {imageAndId?.data?.length > 0 ? (
                <>
                  {imageAndId.data.map((file, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          width: "15%",
                          border: "1px solid #000",
                          position: "relative",
                        }}
                      >
                        <Image
                          loading="lazy"
                          src={file.src}
                          alt="icon"
                          width={100}
                          height={100}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                        <div
                          onClick={() => deleteImageKey(file.key, file.fileId)}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "#000",
                            color: "#fff",
                            display: "flex",
                            borderRadius: "50%",
                          }}
                        >
                          <span
                            role="button"
                            className="material-symbols-outlined"
                          >
                            close
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : null}
              {selectedFile?.length > 0 ? (
                <>
                  {selectedFile.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        width: "15%",
                        border: "1px solid #d5d5dc",
                        position: "relative",
                      }}
                    >
                      <img
                        loading="lazy"
                        src={file.base64}
                        alt="icon"
                        width={100}
                        height={100}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                      <div
                        onClick={() => deleteImage(file, index)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "#000",
                          color: "#fff",
                          display: "flex",
                          borderRadius: "50%",
                        }}
                      >
                        <span
                          role="button"
                          className="material-symbols-outlined"
                        >
                          close
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
            {imageAndId?.data?.length > 0 || selectedFile?.length > 0 ? (
              <hr />
            ) : null}

            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
              <li className="col-md-6 mb-3 position-relative">
                <div className="bg-soft-primary rounded p-2 pointer me-3 ">
                  <Image
                    loading="lazy"
                    src={small1}
                    alt="icon"
                    className="img-fluid"
                  />
                  Photo/Video
                </div>
                <div style={{ position: "absolute", top: 0, opacity: 0 }}>
                  <FileBase64
                    multiple={true}
                    onDone={(files) => {
                      setSelectedFile(files);
                      const reqFiles = [];
                      for (var i = 0; i < files.length; i++) {
                        reqFiles.push(files[i].file);
                      }
                      setPostData({ ...postData, file: reqFiles });
                    }}
                  />
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link href="/"></Link>
                  <Image
                    loading="lazy"
                    src={small2}
                    alt="icon"
                    className="img-fluid"
                  />
                  Tag Friend
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link href="/"></Link>
                  <Image
                    loading="lazy"
                    src={small3}
                    alt="icon"
                    className="img-fluid"
                  />
                  Feeling/Activity
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link href="/"></Link>
                  <Image
                    loading="lazy"
                    src={small4}
                    alt="icon"
                    className="img-fluid"
                  />
                  Check in
                </div>
              </li>
              {/* <li className="col-md-6 mb-3">
              <div className="bg-soft-primary rounded p-2 pointer me-3">
                <Link href="/"></Link>
                <Image
                  loading="lazy"
                  src={small5}
                  alt="icon"
                  className="img-fluid"
                />
                Live Video
              </div>
            </li> */}
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link href="/"></Link>
                  <Image
                    loading="lazy"
                    src={small6}
                    alt="icon"
                    className="img-fluid"
                  />
                  Gif
                </div>
              </li>
              {/* <li className="col-md-6 mb-3">
              <div className="bg-soft-primary rounded p-2 pointer me-3">
                <Link href="/"></Link>
                <Image
                  loading="lazy"
                  src={small7}
                  alt="icon"
                  className="img-fluid"
                />
                Watch Party
              </div>
            </li>
            <li className="col-md-6 mb-3">
              <div className="bg-soft-primary rounded p-2 pointer me-3">
                <Link href="/"></Link>
                <Image
                  loading="lazy"
                  src={small8}
                  alt="icon"
                  className="img-fluid"
                />
                Play with Friends
              </div>
            </li> */}
            </ul>
            <hr />
            <div className="other-option">
              <div className="d-flex align-items-center justify-content-between">
                {/* <div className="d-flex align-items-center">
                <div className="user-img me-3">
                  <Image
                    loading="lazy"
                    src={user9}
                    alt="userimg"
                    className="avatar-60 rounded-circle img-fluid"
                  />
                </div>
                <h6>Your Story</h6>
              </div> */}
                <div className="card-post-toolbar">
                  <Button variant="primary" onClick={showHandle}>
                    {privacy}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="d-block w-100 mt-3"
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showPopup}
        onHide={closeHandle}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Who can see your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              <div className="mb-3 ">
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="Public">Public</Form.Check.Label>
                  <Form.Check.Input
                    type="radio"
                    id="Public"
                    name="privacy"
                    checked={privacy === "public"}
                    value="public"
                    onChange={(e) => setPrivacy((prev) => e.target.value)}
                  />
                </Form.Check>
              </div>

              <div className="mb-3 ">
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="Friends">Friends</Form.Check.Label>
                  <Form.Check.Input
                    type="radio"
                    id="Friends"
                    name="privacy"
                    value="private"
                    checked={privacy === "private"}
                    onChange={(e) => setPrivacy((prev) => e.target.value)}
                  />
                </Form.Check>
              </div>
              <div className="mb-3 ">
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="only-me">
                    Onle me..
                  </Form.Check.Label>
                  <Form.Check.Input
                    type="radio"
                    name="privacy"
                    id="only-me"
                    value="onlyMe"
                    checked={privacy === "onlyMe"}
                    onChange={(e) => setPrivacy((prev) => e.target.value)}
                  />
                </Form.Check>
              </div>

              <div
                className="mb-3 "
                onClick={() => {
                  setModalShowFriendList({
                    show: true,
                    title: "friends-except",
                  }),
                    setShowPopup(false);
                }}
              >
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="friends-except">
                    Friends except...
                  </Form.Check.Label>
                  <Form.Check.Input
                    type="radio"
                    name="privacy"
                    id="friends-except"
                    value="includeFriends"
                    checked={privacy === "includeFriends"}
                    onChange={(e) => setPrivacy(e.target.value)}
                  />
                </Form.Check>
              </div>

              <div
                className="mb-3 "
                onClick={() => {
                  setModalShowFriendList({
                    show: true,
                    title: "specific-friends",
                  }),
                    setShowPopup(false);
                }}
              >
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="specific-friends">
                    Specific friend
                  </Form.Check.Label>
                  <Form.Check.Input
                    type="radio"
                    name="privacy"
                    id="specific-friends"
                    value="excludeFriends"
                    checked={privacy === "excludeFriends"}
                    onChange={(e) => setPrivacy(e.target.value)}
                  />
                </Form.Check>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandle}>
            Cancel
          </Button>
          <Button variant="primary" onClick={closeHandle}>
            Done
          </Button>
        </Modal.Footer>
        <ModalPop
          show={modalShowFriendList?.show}
          onHide={() => setModalShowFriendList({ show: false })}
          onShow={() => setShowPopup(true)}
          title={modalShowFriendList?.title}
          getfriends={setPrivacyFriendList}
        />
      </Modal>
    </>
  );
};

export default EditPost;
