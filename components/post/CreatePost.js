import Image from "next/image";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { Card, Dropdown, Modal, Button } from "react-bootstrap";
import FileBase64 from "react-filebase64";
import ModalPop from "../popupModal/ModalPop.js";

// images
import user1 from "../../public/assets/images/user/25.png";
import small07 from "../../public/assets/images/small/07.png";
import small08 from "../../public/assets/images/small/08.png";
import small09 from "../../public/assets/images/small/09.png";
import small1 from "../../public/assets/images/small/07.png";
import small2 from "../../public/assets/images/small/08.png";
import small3 from "../../public/assets/images/small/09.png";
import small6 from "../../public/assets/images/small/12.png";

import CustomToggle from "../dropdowns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../services/posts.service";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { allPhotos } from "../../store/profile/index.js";
import { allPostPhotos } from "../../store/post/index.js";

const CreatePost = (props) => {
  const [postData, setPostData] = useState({
    description: "",
  });
  const [modalShowFriendList, setModalShowFriendList] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  const [privacyFriendList, setPrivacyFriendList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const showHandle = () => {
    setShowPopup(true);
    setShow(false);
  };
  const closeHandle = () => {
    setShowPopup(false);
    setShow(true);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.data);

  useEffect(() => {
    if (privacy === "includeFriends" || privacy === "excludeFriends") {
      if (privacyFriendList.length !== 0) {
        setPostData({
          ...postData,
          privacy: privacy,
          privacyFriendList: privacyFriendList,
        });
      }
    } else {
      setPostData({ ...postData, privacy: privacy });
    }
  }, [privacy, privacyFriendList]);

  useEffect(() => {
    if (router.pathname === "/groups/[groupId]") {
      setPostData({ ...postData, groupId: props.groupId });
    }
  }, [props.groupId]);

  useEffect(() => {
    if (router.pathname === "/user/[id]") {
      setPostData({ ...postData, userId: props.userId });
    }
  }, [props.userId]);

  useEffect(() => {
    checkValidation();
  }, [postData]);

  const checkValidation = () => {
    console.log(postData?.description?.length, "postData");
    if (postData?.description?.length > 1600) {
      setErrorMessage("Text exceeds 1600 characters");
      setIsLoading(true);
    } else {
      setErrorMessage(null);
      setIsLoading(false);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await createPost(postData).then((res) => {
      setPostData({
        description: "",
        file: null,
      });
      setPrivacy("public");
      setSelectedFile(null);
      dispatch(allPhotos());
      dispatch(allPostPhotos());
      setIsLoading(false);
      handleClose();
      props.refreshpostlist();
    });
  };

  const deleteImageKey = (img, imgIndex) => {
    const newArr = selectedFile.filter((item, index) => {
      return index != imgIndex;
    });
    const showImageByPosts = postData?.file?.filter((item, index) => {
      return index != imgIndex;
    });
    setPostData(showImageByPosts);
    setSelectedFile(newArr);
  };
  return (
    <Card id="post-modal-data">
      <div className="card-header d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Create Post</h4>
        </div>
      </div>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="user-img">
            <Link href="/user/user-profile">
              <Image
                loading="lazy"
                src={user?.profilePictureInfo?.file?.location || user1}
                alt="userimg"
                className="avatar-60 rounded-circle"
                height={100}
                width={100}
              />
            </Link>
          </div>
          <form className="post-text ms-3 w-100 " onClick={handleShow}>
            <input
              maxLength="0"
              type="text"
              className="form-control rounded"
              placeholder="Write something here..."
              style={{ border: "none" }}
            />
          </form>
        </div>
        <hr />

        <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
          <li
            className="btn bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2"
            role="button"
            onClick={handleShow}
          >
            <Image
              loading="lazy"
              src={small07}
              alt="icon"
              className="img-fluid me-2"
            />
            Photo/Video
          </li>
          <li
            className="btn bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2"
            role="button"
            onClick={handleShow}
          >
            <Image
              loading="lazy"
              src={small08}
              alt="icon"
              className="img-fluid me-2"
            />
            Tag Friend
          </li>
          <li
            className="btn bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3"
            role="button"
            onClick={handleShow}
          >
            <Image
              loading="lazy"
              src={small09}
              alt="icon"
              className="img-fluid me-2"
            />
            Feeling/Activity
          </li>
          <li className="btn bg-soft-primary rounded p-2 pointer text-center">
            <div className="card-header-toolbar d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="post-option">
                  <span className="material-symbols-outlined">more_horiz</span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className=" dropdown-menu-right"
                  aria-labelledby="post-option"
                >
                  {/* <Dropdown.Item onClick={handleShow} href="">
                    Check in
                  </Dropdown.Item> */}
                  {/* <Dropdown.Item onClick={handleShow} href="">
                    Live Video
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={handleShow} href="#">
                    Gif
                  </Dropdown.Item>
                  {/* <Dropdown.Item onClick={handleShow} href="">
                    Watch Party
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleShow} href="">
                    Play with Friend
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
        </ul>
      </Card.Body>
      <Modal show={show} onHide={handleClose} size="lg" style={{ top: "10%" }}>
        <Modal.Header className="d-flex justify-content-between">
          <h5 className="modal-title" id="post-modalLabel">
            Create Post
          </h5>
          <button
            type="button"
            className="btn btn-secondary lh-1"
            onClick={handleClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitPost} encType="multipart/form-data">
            <div className="d-flex align-items-center">
              <div className="user-img">
                <Image
                  loading="lazy"
                  src={user?.profilePictureInfo?.file?.location || user1}
                  alt="userimg"
                  className="avatar-60 rounded-circle img-fluid"
                  width={100}
                  height={100}
                />
              </div>
              <div className="post-text ms-3 w-100">
                {/* <input
                  name="description"
                  type="text"
                  autoFocus
                  value={postData?.description}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      description: e.target.value,
                    });
                  }}
                  className="form-control rounded"
                  placeholder="Write something here..."
                  style={{ border: "none" }}
                /> */}
                <div
                  contentEditable="true"
                  onInput={(e) => {
                    setPostData({
                      ...postData,
                      description: e.target.innerText,
                    });
                  }}
                >
                  {postData?.description === "" && (
                    <span style={{ color: "#848484" }}>
                      Write something here...
                    </span>
                  )}
                </div>
              </div>

              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
            </div>
            <hr />
            {selectedFile?.length > 0 ? (
              <>
                <div className="row gap-2">
                  {selectedFile.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        width: "15%",
                        border: "1px solid #d5d5dc",
                        position: "relative",
                      }}
                    >
                      {file?.type.startsWith("image") ? (
                        <img
                          loading="lazy"
                          src={file.base64}
                          alt="icon"
                          width={100}
                          height={100}
                          style={{
                            objectfit: "contain",
                          }}
                        />
                      ) : (
                        <video
                          loading="lazy"
                          src={file.base64}
                          alt="icon"
                          width={100}
                          height={100}
                          style={{
                            objectfit: "contain",
                          }}
                        />
                      )}

                      <div
                        onClick={() => deleteImageKey(file, index)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "#000000",
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
                </div>
                <hr />
              </>
            ) : null}

            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
              <li className="col-md-6 mb-3 position-relative">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Image
                    loading="lazy"
                    src={small1}
                    alt="icon"
                    className="img-fluid"
                  />
                  Photo/Video
                </div>
                <div
                  style={{ position: "absolute", top: 0, opacity: 0 }}
                  role="button"
                >
                  <FileBase64
                    multiple={true}
                    onDone={(files) => {
                      setSelectedFile(files);
                      const reqFiles = [];
                      for (var i = 0; i < files.length; i++) {
                        reqFiles.push(files[i].file);
                        // console.log("reqFile: ", reqFiles);
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
              {/* <li className="col-md-6 mb-3">
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
              </li> */}
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
                {router.pathname !== "/groups/[groupId]" ? (
                  <div className="card-post-toolbar">
                    <Button variant="primary" onClick={showHandle}>
                      {privacy}
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
            <Button
              disabled={isLoading ? true : false}
              type="submit"
              variant="primary"
              className="d-block w-100 mt-3"
            >
              {isLoading ? "Post" : "Post"}
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
                    name="group-1"
                    checked={privacy === "public"}
                    value="public"
                    onChange={(e) => setPrivacy(e.target.value)}
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
                    value="friends"
                    checked={privacy === "friends"}
                    onChange={(e) => setPrivacy(e.target.value)}
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
                    onChange={(e) => setPrivacy(e.target.value)}
                  />
                </Form.Check>
              </div>

              <div
                className="mb-3 "
                onClick={() => {
                  setModalShowFriendList({
                    show: true,
                    title: "Friends-except",
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
                    title: "Specific-friends",
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
      </Modal>
      <ModalPop
        show={modalShowFriendList?.show}
        onHide={() => setModalShowFriendList({ show: false })}
        onShow={() => setShowPopup(true)}
        title={modalShowFriendList?.title}
        getfriends={setPrivacyFriendList}
      />
    </Card>
  );
};

export default CreatePost;
