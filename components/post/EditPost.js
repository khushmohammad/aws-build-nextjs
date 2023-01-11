import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-filebase64";
import Link from "next/link";

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
import { updatePost } from "../../services/posts.service";
import { getPostDetails } from "../../store/post";
import { useRouter } from "next/router";

const EditPost = (props) => {
  const profileImage = useSelector((state) => state.user.profile_picture);
  const postDetails = useSelector((state) => state.post.postDetail);
  const [postData, setPostData] = useState({
    description: "",
    share: "",
    keys: [],
    fileIds: [],
  });

  const [imageKey, setImageKey] = useState([]);
  const [imageFileIds, setImageFileIds] = useState([]);
  const [imageAndId, setImageAndId] = useState({ data: [] });
  const [count, setCount] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

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
  }, [postDetails, imageKey, imageFileIds]);

  useEffect(() => {
    dispatch(getPostDetails(props.postid));
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

  // console.log("=============================", postData);

  const updatePostData = async (e) => {
    e.preventDefault();

    console.log("=============", postData);
    await updatePost(postData, props.postid);
    // router.reload(window.location.pathname);
  };

  return (
    <Modal {...props} size="lg" style={{ top: "10%" }}>
      <Modal.Header className="d-flex justify-content-between">
        <h5 className="modal-title" id="post-modalLabel">
          Edit Post
        </h5>
        <button
          type="button"
          className="btn btn-secondary lh-1"
          onClick={props.onHide}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={updatePostData} encType="multipart/form-data">
          <div className="d-flex align-items-center">
            <div className="user-img">
              <Image
                loading="lazy"
                src={profileImage}
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
                value={postData ? postData.description : ""}
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
          {imageAndId?.data?.length > 0 ? (
            <>
              <div className="row gap-2">
                {imageAndId.data.map((file, index) => {
                  // console.log("file+_++++++++++++++++++++++>", file);
                  return (
                    <div
                      key={index}
                      style={{
                        width: "15%",
                        border: "1px dotted #000",
                        position: "relative",
                      }}
                    >
                      <Image
                        loading="lazy"
                        src={file.src}
                        alt="icon"
                        width={100}
                        height={100}
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
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    role="button"
                  >
                    <span className="btn btn-primary">Friend</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu clemassName="dropdown-menu m-0 p-0">
                    <Dropdown.Item className="dropdown-item p-3" href="/">
                      <div className="d-flex align-items-top">
                        <i className="ri-save-line h4"></i>
                        <div className="data ms-2">
                          <h6>Public</h6>
                          {/* <p className="mb-0">Anyone on or off Facebook</p> */}
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item p-3" href="/">
                      <div className="d-flex align-items-top">
                        <i className="ri-close-circle-line h4"></i>
                        <div className="data ms-2">
                          <h6>Friends</h6>
                          {/* <p className="mb-0">Your Friend on facebook</p> */}
                        </div>
                      </div>
                    </Dropdown.Item>
                    {/* <Dropdown.Item className="dropdown-item p-3" href="/">
                      <div className="d-flex align-items-top">
                        <i className="ri-user-unfollow-line h4"></i>
                        <div className="data ms-2">
                          <h6>Friends except</h6>
                          <p className="mb-0">Don't show to some friends</p>
                        </div>
                      </div>
                    </Dropdown.Item> */}
                    <Dropdown.Item className="dropdown-item p-3" href="/">
                      <div className="d-flex align-items-top">
                        <i className="ri-notification-line h4"></i>
                        <div className="data ms-2">
                          <h6>Only Me</h6>
                          {/* <p className="mb-0">Only me</p> */}
                        </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPost;
