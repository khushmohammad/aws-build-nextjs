import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";

// img
import icon8 from "../public/assets/images/icon/08.png";
import icon9 from "../public/assets/images/icon/09.png";
import icon10 from "../public/assets/images/icon/10.png";
import icon11 from "../public/assets/images/icon/11.png";
import icon12 from "../public/assets/images/icon/12.png";
import icon13 from "../public/assets/images/icon/13.png";
import { userPostshare } from "../services/posts.service";
// import { Link } from 'react-router-dom'

const ShareOffcanvas = ({ sharePostId, refreshpostlistshare, share }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sharePost = async () => {
    ///console.log(sharePostId, "sharePostId")
    const res = await userPostshare(sharePostId);
    // console.log(res, "res")
    if (res.status == 200) {
      // console.log(res, "res")

      refreshpostlistshare();
      handleClose();
    }
  };

  return (
    <>
      <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
        <Link
          href="#"
          onClick={handleShow}
          className="d-flex align-items-center"
        >
          <span className="material-symbols-outlined md-18">share</span>
          <span className="ms-1">{share.length} Share</span>
        </Link>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Share</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-wrap align-items-center">
            <div className="text-center me-3 mb-3" onClick={sharePost}>
              <span className="material-symbols-outlined">
                google_plus_reshare
              </span>
              <h6>Share now (Friends)</h6>
            </div>
            <div className="text-center me-3 mb-3">
              <Image src={icon8} className="img-fluid rounded mb-2" alt="" />
              <h6>Facebook</h6>
            </div>
            <div className="text-center me-3 mb-3">
              <Image src={icon9} className="img-fluid rounded mb-2" alt="" />
              <h6>Twitter</h6>
            </div>
            <div className="text-center me-3 mb-3">
              <Image src={icon10} className="img-fluid rounded mb-2" alt="" />
              <h6>Instagram</h6>
            </div>
            <div className="text-center me-3 mb-3">
              <Image src={icon11} className="img-fluid rounded mb-2" alt="" />
              <h6>Google Plus</h6>
            </div>
            <div className="text-center me-3 mb-3">
              <Image src={icon13} className="img-fluid rounded mb-2" alt="" />
              <h6>In</h6>
            </div>
            <div className="text-center me-3 mb-3">
              <Image src={icon12} className="img-fluid rounded mb-2" alt="" />
              <h6>YouTube</h6>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default ShareOffcanvas;
