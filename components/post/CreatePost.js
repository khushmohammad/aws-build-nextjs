import Image from "next/image";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { Card, Dropdown, Modal, Button } from "react-bootstrap";
import FileBase64 from "react-filebase64";
import { FaUserFriends } from "react-icons/fa";
import ModalPop from "../popupModal/ModalPop.js";
// images
import user1 from "../../public/assets/images/user/1.jpg";
import small07 from "../../public/assets/images/small/07.png";
import small08 from "../../public/assets/images/small/08.png";
import small09 from "../../public/assets/images/small/09.png";
import small1 from "../../public/assets/images/small/07.png";
import small2 from "../../public/assets/images/small/08.png";
import small3 from "../../public/assets/images/small/09.png";
import small4 from "../../public/assets/images/small/10.png";
import small5 from "../../public/assets/images/small/11.png";
import small6 from "../../public/assets/images/small/12.png";
import small7 from "../../public/assets/images/small/13.png";
import small8 from "../../public/assets/images/small/14.png";
import user9 from "../../public/assets/images/user/1.jpg";
import CustomToggle from "../dropdowns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createPost, getAllFeeds } from "../../services/posts.service";
import { useRouter } from "next/router";
import { getAllFeedsList } from "../../store/post/allFeeds";
import { createGroupPost } from "../../services/groups.service.js";

const CreatePost = (props) => {
  const [postData, setPostData] = useState({ description: "" });
  const [modalShowFriendList, setModalShowFriendList] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectedFile("");
    setPostData("");
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

  // console.log("path: ", router.pathname);
  const submitPost = async (e) => {
    e.preventDefault();
    if (router.pathname === "/groups/[groupId]") {
      await createGroupPost(postData, props.groupId).then((res) => {
        setPostData({ description: "", file: null });
        handleClose();
      });
    } else {
      await createPost(postData).then((res) => {
        setPostData({ description: "", file: null });
        handleClose();
      });
    }
    props.refreshPostList();
  };

  const deleteImageKey = (img, imgIndex) => {
    const newArr = selectedFile.filter((item, index) => {
      return index != imgIndex;
    });
    const showImageByPosts = postData?.file?.filter((item,index)=>{
      return index!=imgIndex
    })
    setPostData(showImageByPosts)
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
            <Image
              loading="lazy"
              src={user?.profilePictureInfo?.file?.location || user1}
              alt="userimg"
              className="avatar-60 rounded-circle"
              height={100}
              width={100}
            />
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
            className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2"
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
            className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2"
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
            className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3"
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
          <li className="bg-soft-primary rounded p-2 pointer text-center">
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
                  <Dropdown.Item onClick={handleShow} href="">
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
          <form onSubmit={submitPost} encType="multipart/form-data">
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
                <input
                  name="description"
                  type="text"
                  autoFocus
                  value={postData?.description}
                  onChange={(e) =>
                    setPostData({ ...postData, description: e.target.value })
                  }
                  className="form-control rounded"
                  placeholder="Write something here..."
                  style={{ border: "none" }}
                />
              </div>
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
                      {/* {console.log(file, "file")} */}
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
                      // console.log("files onDone: ", files);
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
                <div className="card-post-toolbar">
                  <>
                    <Button variant="primary" onClick={showHandle}>
                      Public
                    </Button>
                  </>

                  {/* <Dropdown> */}
                  {/* <Dropdown.Toggle
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="button"
                    >
                      <span className="btn btn-primary">
                        <FaUserFriends
                          style={{ fontSize: "1.5em" }}
                          onClick={()=>{console.log("hello friends chail")}}
                        />
                      </span>
                      
                    </Dropdown.Toggle> */}

                  {/* <Dropdown.Menu clemassName="dropdown-menu m-0 p-0">
                        <Dropdown.Item className="dropdown-item p-3">
                          <div className="d-flex align-items-top">
                            <i className="ri-save-line h4"></i>
                            <div className="data ms-2">
                              <h6>Public</h6> */}
                  {/* <p className="mb-0">Anyone on or off Facebook</p> */}
                  {/* </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item p-3">
                          <div className="d-flex align-items-top">
                            <i className="ri-close-circle-line h4"></i>
                            <div className="data ms-2">
                              <h6>Friends</h6>
                              {/* <p className="mb-0">Your Friend on facebook</p> */}
                  {/* </div>
                          </div>
                        </Dropdown.Item>  */}
                  {/* <Dropdown.Item className="dropdown-item p-3" href="/">
                      <div className="d-flex align-items-top">
                        <i className="ri-user-unfollow-line h4"></i>
                        <div className="data ms-2">
                          <h6>Friends except</h6>
                          <p className="mb-0">Don't show to some friends</p>
                        </div>
                      </div>
                    </Dropdown.Item> */}
                  {/* <Dropdown.Item className="dropdown-item p-3">
                          <div className="d-flex align-items-top">
                            <i className="ri-notification-line h4"></i>
                            <div className="data ms-2">
                              <h6>Only Me</h6> */}
                  {/* <p className="mb-0">Only me</p> */}
                  {/* </div>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu> */}

                  {/* </Dropdown> */}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="d-block w-100 mt-3"
            >
              Post
            </Button>
          </form>
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
                  <Form.Check.Label htmlFor="Public">{`Public`}</Form.Check.Label>
                  <Form.Check.Input
                    type={`radio`}
                    id="Public"
                    name="group-1"
                    defaultChecked
                  />

                  <Form.Control.Feedback type="valid">
                    You did it!
                  </Form.Control.Feedback>
                </Form.Check>
              </div>

              <div className="mb-3 ">
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="Friends">{`Friends`}</Form.Check.Label>
                  <Form.Check.Input type="radio" id="Friends" name="group-1" />

                  {/* <Form.Control.Feedback type="valid">
                    You did it!
                  </Form.Control.Feedback> */}
                </Form.Check>
              </div>
              <div className="mb-3 ">
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="only-me">{`Onle me..`}</Form.Check.Label>
                  <Form.Check.Input
                    type={`radio`}
                    name="group-1"
                    id="only-me"
                  />

                  {/* <Form.Control.Feedback type="valid">
                    You did it!
                  </Form.Control.Feedback> */}
                </Form.Check>
              </div>

              <div
                className="mb-3 "
                onClick={() => {
                  setModalShowFriendList(true), setShowPopup(false);
                }}
              >
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="friends-except">{`Friends except..`}</Form.Check.Label>
                  <Form.Check.Input
                    type="radio"
                    name="group-1"
                    id="friends-except"
                  />

                  <Form.Control.Feedback>You did it!</Form.Control.Feedback>
                </Form.Check>
              </div>

              <div
                className="mb-3 "
                onClick={() => {
                  setModalShowFriendList(true), setShowPopup(false);
                }}
              >
                <Form.Check className="d-block text-start fs-4" reverse>
                  <Form.Check.Label htmlFor="specific-friends">{`Specific friend`}</Form.Check.Label>
                  <Form.Check.Input
                    type={`radio`}
                    name="group-1"
                    id="specific-friends"
                  />

                  {/* <Form.Control.Feedback type="valid">
                    You did it!
                  </Form.Control.Feedback> */}
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
        show={modalShowFriendList}
        onHide={() => setModalShowFriendList(false)}
        closeHandle={() => setShowPopup(true)}
      />
    </Card>
  );
};

export default CreatePost;
