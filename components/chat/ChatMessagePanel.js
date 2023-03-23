import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import user5 from "../../public/assets/images/user/25.png";
import CustomToggle from "./../dropdowns";
import MessageView from "./MessageView";

import { io } from "socket.io-client";
import {
  checkUserTypeForChat,
  getMesasgesByreceiverId,
} from "../../services/chat.socket";
import { useRouter } from "next/router";
import SendMessageInput from "./SendMessageInput";
import { CONSTANTS } from "../../public/constant/constants";

const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_CONNECTION);

const ChatMessagePanel = (props) => {
  const friendsList = useSelector((state) => state?.friends?.friendList?.list);
  const [show2, setShow2] = useState("");
  const router = useRouter();

  const queryParam = router?.query?.chatId;

  const chatId = (queryParam && queryParam.split("-")[0]) || null;

  const user = useSelector((state) => state.user.data);
  const joinedGroupList = useSelector((state) => state?.groups?.joinedGroup);

  // socket start

  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState({});
  // state for scrolling
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState("loading");

  const senderUserId = user?.userInfo?._id || null;

  const [objParams, setObjParams] = useState();

  const checkType = async () => {
    try {
      const res = chatId && (await checkUserTypeForChat(chatId));

      const type = res?.data?.body?.chatType;

      type &&
        setObjParams({
          receiverId: type == CONSTANTS.MEMBER ? chatId || "" : "",
          groupId: type == CONSTANTS.GROUP ? chatId || "" : "",
          helpId: type == CONSTANTS.HELP ? chatId || "" : "",
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkType();
  }, [chatId || ""]);

  const JoinRoom = {
    senderId: senderUserId,
    ...objParams,
  };

  const joinSocket = async () => {
    const res = await socket.emit("joinSocket", JoinRoom);

    if (res.connected == true) {
      getCurrentMessages();
      socket.on("getMessage", (data) => {
        const newMsg = {
          _id: data.messageId,
          message: data.message,
          senderId: data.senderId,
          createdAt: data.createdAt,
        };
        setNewMessages(newMsg);
      });
    }
  };
  useEffect(() => {
    chatId && joinSocket();
  }, [objParams]);

  const getCurrentMessages = async () => {
    try {
      const result = await getMesasgesByreceiverId(objParams, page, limit);
      if (result && result?.status === 200) {
        // result?.data?.body != "" && setMessages(prev => [...prev, result?.data?.body?.data])
        result?.data?.body?.data?.length != undefined
          ? setMessages(result?.data?.body?.data)
          : setMessages("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async (NewMessage) => {
    const SendMesageToUserOBj = {
      senderId: senderUserId,
      ...objParams,
      message: NewMessage,
    };

    socket.emit(CONSTANTS.SENDMESSAGE, SendMesageToUserOBj);
    socket.on(CONSTANTS.GETMESSAGE, (data) => {
      const newMsg = {
        _id: data.messageId,
        message: data.message,
        senderId: data.senderId,
        createdAt: new Date().toJSON(),
      };

      setNewMessages(newMsg);
    });
  };

  useEffect(() => {
    messages && setMessages([...messages, newMessages]);
  }, [newMessages]);

  // Delete Message with socket

  const [isDeleted, setIsDeleted] = useState("");

  const deleteMessage = async (messageId) => {
    const deleteMesageOBj = {
      userId: senderUserId,
      ...objParams,
      messageIds: messageId,
    };
    socket.emit("deleteMessage", deleteMesageOBj);
    hideMessage();
  };

  const hideMessage = async () => {
    await socket.on("messagesDeleted", (deleteData) => {
      deleteData.messageIds[0] &&
        setIsDeleted((prev) => ({ ...prev, [deleteData.messageIds[0]]: true }));
    });
  };
  //  console.log(isDeleted, "isDeleted")
  useEffect(() => {
    hideMessage();
  }, [socket]);

  // Message Scrolling

  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    page !== 1 && getOldMessageOnScroll();
  }, [page]);

  const handleScroll = async () => {
    if (divRef.current.scrollTop === 0) {
      setPage((prev) => prev + 1);
    }
  };

  const getOldMessageOnScroll = async () => {
    setLoading("Loading");
    try {
      const result =
        objParams && (await getMesasgesByreceiverId(objParams, page, limit));
      if (result && result?.status === 200) {
        result?.data?.body?.data?.length == 0
          ? ""
          : Array.isArray(result?.data?.body?.data)
          ? setMessages([...result?.data?.body?.data, ...messages])
          : "";
        setLoading("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {friendsList &&
        friendsList.map((data, index) => {
          return (
            <Tab.Pane
              eventKey={`${data._id}`}
              className={`fade show`}
              key={index}
            >
              <div className="chat-head">
                <div className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
                  <div className="d-flex align-items-center">
                    <div
                      onClick={props.ChatSidebar}
                      className="d-lg-none  sidebar-toggle chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                    >
                      <span className="material-symbols-outlined">menu</span>
                    </div>

                    <div className="avatar chat-user-profile m-0 me-3">
                      <Image
                        loading="lazy"
                        src={
                          data?.profileInfo?.profilePictureInfo?.file
                            ?.location || user5
                        }
                        height={100}
                        width={100}
                        alt="avatar"
                        className="avatar-50 "
                        onClick={() => setShow2("true")}
                      />
                      <span className="avatar-status">
                        <i className="material-symbols-outlined text-success  md-14 filled">
                          circle
                        </i>
                      </span>
                    </div>
                    <Link href={`user/${data?._id}`}>
                      <h5 className="mb-0">
                        {data?.firstName} {data?.lastName}
                      </h5>
                    </Link>
                  </div>
                  <div
                    className={`chat-user-detail-popup scroller ${
                      show2 === "true" ? "show" : ""
                    }`}
                  >
                    <div className="user-profile">
                      <Button
                        type="submit"
                        onClick={props.ChatSidebarClose}
                        variant=" close-popup p-3"
                      >
                        <i
                          className="material-symbols-outlined md-18"
                          onClick={() => setShow2("false")}
                        >
                          close
                        </i>
                      </Button>
                      <div className="user mb-4  text-center">
                        <Link className="avatar m-0" href="">
                          <Image
                            loading="lazy"
                            src={
                              data?.profileInfo?.profilePictureInfo?.file
                                ?.location || user5
                            }
                            height={100}
                            width={100}
                            alt="avatar"
                          />
                        </Link>
                        <div className="user-name mt-4">
                          <h4>
                            {data?.firstName} {data?.lastName}
                          </h4>
                        </div>
                        <div className="user-desc">
                          <p>Cape Town, RSA</p>
                        </div>
                      </div>
                      <hr />
                      <div className="chatuser-detail text-left mt-4">
                        <Row>
                          <Col md="6" className="col-6  title">
                            Bni Name:
                          </Col>
                          <Col md="6" className="col-6  text-right">
                            Bni
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col md="6" className="col-6 title">
                            Tel:
                          </Col>
                          <Col md="6" className="col-6 text-right">
                            072 143 9920
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col md="6" className="col-6 title">
                            Date Of Birth:
                          </Col>
                          <Col md="6" className="col-6 text-right">
                            July 12, 1989
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col md="6" className="col-6 title">
                            Gender:
                          </Col>
                          <Col md="6" className="col-6 text-right">
                            Male
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col md="6" className="col-6 title">
                            Language:
                          </Col>
                          <Col md="6" className="col-6 text-right">
                            Engliah
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className="chat-header-icons d-flex">
                    <Link
                      href="/"
                      className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                    >
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                    </Link>

                    <Link
                      href="#"
                      className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                    >
                      <i className="material-symbols-outlined md-18">delete</i>
                    </Link>
                    <Dropdown
                      className="bg-soft-primary d-flex justify-content-center align-items-center"
                      as="span"
                    >
                      <Dropdown.Toggle
                        as={CustomToggle}
                        variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                      >
                        more_vert
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-right">
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          href="#"
                        >
                          <i className="material-symbols-outlined md-18 me-1">
                            push_pin
                          </i>
                          Pin to top
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          href="#"
                        >
                          <i className="material-symbols-outlined md-18 me-1">
                            delete_outline
                          </i>
                          Delete chat
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          href="#"
                        >
                          <i className="material-symbols-outlined md-18 me-1">
                            watch_later
                          </i>
                          Block
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="chat-content scroller " ref={divRef}>
                {loading}
                <ChatContent
                  messages={messages}
                  isDeleted={isDeleted}
                  deleteMessage={deleteMessage}
                  senderUserId={senderUserId}
                />
              </div>
              <SendMessageInput sendMsg={(e) => sendMessage(e)} />
            </Tab.Pane>
          );
        })}

      {/* group chat panel */}
      <>
        {joinedGroupList &&
          joinedGroupList.map((data, index) => {
            return (
              <Tab.Pane
                eventKey={`${data?.groupId}`}
                className={`fade show`}
                key={index}
              >
                <div className="chat-head">
                  <div className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
                    <div className="d-flex align-items-center">
                      <div
                        onClick={props.ChatSidebar}
                        className="d-lg-none  sidebar-toggle chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                      >
                        <span className="material-symbols-outlined">menu</span>
                      </div>

                      <div className="avatar chat-user-profile m-0 me-3">
                        <Image
                          loading="lazy"
                          src={
                            data?.groupInfo?.groupImage?.file?.location || user5
                          }
                          height={100}
                          width={100}
                          alt="avatar"
                          className="avatar-50 "
                          onClick={() => setShow2("true")}
                        />
                        <span className="avatar-status">
                          <i className="material-symbols-outlined text-success  md-14 filled">
                            circle
                          </i>
                        </span>
                      </div>
                      <Link href={`groups/${data?._id}`}>
                        <h5 className="mb-0">{data?.groupInfo?.groupName}</h5>
                      </Link>
                    </div>
                    <div
                      className={`chat-user-detail-popup scroller ${
                        show2 === "true" ? "show" : ""
                      }`}
                    >
                      <div className="user-profile">
                        <Button
                          type="submit"
                          onClick={props.ChatSidebarClose}
                          variant=" close-popup p-3"
                        >
                          <i
                            className="material-symbols-outlined md-18"
                            onClick={() => setShow2("false")}
                          >
                            close
                          </i>
                        </Button>
                        <div className="user mb-4  text-center">
                          <Link className="avatar m-0" href="">
                            <Image
                              loading="lazy"
                              src={
                                data?.profileInfo?.profilePictureInfo?.file
                                  ?.location || user5
                              }
                              height={100}
                              width={100}
                              alt="avatar"
                            />
                          </Link>
                          <div className="user-name mt-4">
                            <h4>
                              {data?.firstName} {data?.lastName}
                            </h4>
                          </div>
                          <div className="user-desc">
                            <p>Cape Town, RSA</p>
                          </div>
                        </div>
                        <hr />
                        <div className="chatuser-detail text-left mt-4">
                          <Row>
                            <Col md="6" className="col-6  title">
                              Bni Name:
                            </Col>
                            <Col md="6" className="col-6  text-right">
                              Bni
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col md="6" className="col-6 title">
                              Tel:
                            </Col>
                            <Col md="6" className="col-6 text-right">
                              072 143 9920
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col md="6" className="col-6 title">
                              Date Of Birth:
                            </Col>
                            <Col md="6" className="col-6 text-right">
                              July 12, 1989
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col md="6" className="col-6 title">
                              Gender:
                            </Col>
                            <Col md="6" className="col-6 text-right">
                              Male
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col md="6" className="col-6 title">
                              Language:
                            </Col>
                            <Col md="6" className="col-6 text-right">
                              Engliah
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                    <div className="chat-header-icons d-flex">
                      <Link
                        href="/"
                        className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                      >
                        <span className="material-symbols-outlined">
                          arrow_back
                        </span>
                      </Link>

                      <Link
                        href="#"
                        className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                      >
                        <i className="material-symbols-outlined md-18">
                          delete
                        </i>
                      </Link>
                      <Dropdown
                        className="bg-soft-primary d-flex justify-content-center align-items-center"
                        as="span"
                      >
                        <Dropdown.Toggle
                          as={CustomToggle}
                          variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                        >
                          more_vert
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right">
                          <Dropdown.Item
                            className="d-flex align-items-center"
                            href="#"
                          >
                            <i className="material-symbols-outlined md-18 me-1">
                              push_pin
                            </i>
                            Pin to top
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="d-flex align-items-center"
                            href="#"
                          >
                            <i className="material-symbols-outlined md-18 me-1">
                              delete_outline
                            </i>
                            Delete chat
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="d-flex align-items-center"
                            href="#"
                          >
                            <i className="material-symbols-outlined md-18 me-1">
                              watch_later
                            </i>
                            Block
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="chat-content scroller" ref={divRef}>
                  <ChatContent
                    messages={messages}
                    isDeleted={isDeleted}
                    deleteMessage={deleteMessage}
                    senderUserId={senderUserId}
                  />
                </div>
                <SendMessageInput sendMsg={(e) => sendMessage(e)} />
              </Tab.Pane>
            );
          })}
      </>
    </>
  );
};

const ChatContent = (props) => {
  const ref = React.createRef();

  useEffect(() => {
    ref.current.scrollIntoViewIfNeeded();
  }, []);

  return (
    <>
      {props.messages &&
        props.messages.length !== 0 &&
        props.messages.map((message, index) => {
          return (
            <React.Fragment key={index}>
              {props.isDeleted[message._id] === true ? (
                ""
              ) : (
                <div
                  className={`chat ${
                    message.senderId === props.senderUserId
                      ? "d-flex other-user "
                      : "chat-left"
                  } align-items-center my-3`}
                >
                  <MessageView data={message} />

                  <Dropdown
                    className="d-flex justify-content-center align-items-center"
                    as="span"
                  >
                    <Dropdown.Toggle
                      as={CustomToggle}
                      variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                    >
                      more_vert
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Dropdown.Item
                        className="d-flex align-items-center"
                        href="#"
                        onClick={() => props.deleteMessage(message._id)}
                      >
                        <i className="material-symbols-outlined md-18 me-1">
                          delete
                        </i>
                        Delete{" "}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </React.Fragment>
          );
        })}
      <div id="box" ref={ref} />
    </>
  );
};

export default ChatMessagePanel;
