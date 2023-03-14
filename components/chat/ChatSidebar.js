import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Card, Form, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import user1 from "../../public/assets/images/user/25.png";
import ChatSidebarUserList from "./ChatSidebarUserList";

const ChatSidebarComponent = (props) => {
  const user = useSelector((state) => state.user.data);

  const [show1, setShow1] = useState("");

  return (
    <>
      <div className="chat-search pt-3 ps-3">
        <div className="d-flex align-items-center">
          <div className="chat-profile me-3">
            <Image
              loading="lazy"
              src={user?.coverPictureInfo?.file?.location || user1}
              height={100}
              width={100}
              alt="chat-user"
              className="avatar-60 "
              onClick={() => setShow1("true")}
            />
          </div>
          <div className="chat-caption">
            <Link href={`user/${user?.userInfo?._id}`}>
              <h5 className="mb-0">
                {" "}
                {user?.userInfo?.firstName} {user?.userInfo?.lastName}
              </h5>
            </Link>
            {/* <p className="m-0">Web Designer</p> */}
          </div>
          <div
            onClick={props.ChatSidebarClose}
            className="ms-auto d-lg-none"
            role={"button"}
          >
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
        <div
          id="user-detail-popup"
          className={`scroller ${show1 === "true" ? "show" : ""}`}
        >
          <div className="user-profile">
            <Button
              type="submit"
              onClick={props.ChatSidebarClose}
              variant=" close-popup p-3"
            >
              <i
                className="material-symbols-outlined md-18"
                onClick={() => setShow1("false")}
              >
                close
              </i>
            </Button>
            <div className="user text-center mb-4">
              <Link className="avatar m-0" href="">
                <Image
                  loading="lazy"
                  src={user?.coverPictureInfo?.file?.location || user1}
                  height={100}
                  width={100}
                  alt="avatar"
                />
              </Link>
              <div className="user-name mt-4">
                <h4 className="text-center">
                  {user?.userInfo?.firstName} {user?.userInfo?.lastName}
                </h4>
              </div>
              <div className="user-desc">
                {/* <p className="text-center">Web Designer</p> */}
              </div>
            </div>
            <hr />
            <div className="user-detail text-left mt-4 ps-4 pe-4">
              <h5 className="mt-4 mb-4">About</h5>
              <p>
                It is long established fact that a reader will be distracted bt
                the reddable.
              </p>
              <h5 className="mt-3 mb-3">Status</h5>
              <ul className="user-status p-0">
                <li className="mb-1">
                  <i className="ri-checkbox-blank-circle-fill text-success pe-1"></i>
                  <span>Online</span>
                </li>
                <li className="mb-1">
                  <i className="ri-checkbox-blank-circle-fill text-warning pe-1"></i>
                  <span>Away</span>
                </li>
                <li className="mb-1">
                  <i className="ri-checkbox-blank-circle-fill text-danger pe-1"></i>
                  <span>Do Not Disturb</span>
                </li>
                <li className="mb-1">
                  <i className="ri-checkbox-blank-circle-fill text-light pe-1"></i>
                  <span>Offline</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="chat-searchbar mt-4">
          <Form.Group className="form-group chat-search-data m-0">
            <input
              type="text"
              className="form-control round"
              id="chat-search"
              placeholder="Search"
            />
            <i className="material-symbols-outlined">search</i>
          </Form.Group>
        </div>
      </div>
      <div className="chat-sidebar-channel scroller mt-4 ps-3">
        <h5>Public Channels</h5>

        <ChatSidebarUserList />
      </div>
    </>
  );
};

export default ChatSidebarComponent;
