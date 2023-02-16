import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Row, Col, Form, Tab, Nav, Button, Dropdown } from 'react-bootstrap'
import Card from '../../components/Card'
import CustomToggle from '../../components/dropdowns'
import Image from 'next/image'
//img
import user1 from '../../public/assets/images/user/1.jpg'
import user5 from '../../public/assets/images/user/05.jpg'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { io } from "socket.io-client";
import { getMesasgesByreceiverId } from '../../services/chat.socket'
import { getPostTime } from '../../services/time.service'
import { getUserDetailsByUserId } from '../../services/user.service'
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_CONNECTION);

const schema = yup.object({
    messageInput: yup.string().required("Please write something")
}).required();

const Chat = () => {
    const router = useRouter()
    const [show1, setShow1] = useState('')
    const [show2, setShow2] = useState('')
    const chatId = router?.query?.chatId
    const user = useSelector((state) => state.user.data);
    const friendsList = useSelector((state) => state?.friends?.friendList?.friendsList)
    const [key, setKey] = useState('start')


    // <<<<>>>> socket start
    //const socket = useRef(); 
    const [messages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState({})

    const receiverUserId = chatId
    const senderUserId = user?.userInfo._id
    const JoinRoom = { senderId: senderUserId, receiverId: receiverUserId }
    useEffect(() => {
        joinSocket()
    }, [chatId || '']);

    const getCurrentMessages = async () => {
        const result = await getMesasgesByreceiverId(receiverUserId)
        //  console.log(result, "result");
        if (result && result?.status === 200) {
            // result?.data?.body != "" && setMessages(prev => [...prev, result?.data?.body?.data])
            result?.data?.body?.data?.length != undefined ? setMessages(result?.data?.body?.data) : setMessages('')
        }
    }


    const joinSocket = async () => {
        const res = await socket.emit("joinSocket", JoinRoom);


        if (res.connected == true) {
            receiverUserId && getCurrentMessages(receiverUserId)
            socket.on("getMessage", (data) => {
                //  console.log(data, "data");
                const newMsg = { message: data.message, senderId: data.senderId }
                setNewMessages(newMsg)

            })
        }
        console.log(res, "res");
    }




    const sendMessage = async (NewMessage) => {
        const SendMesageToUserOBj = { senderId: senderUserId, receiverId: receiverUserId, message: NewMessage }

        socket.emit("sendMessage", SendMesageToUserOBj);
        socket.on("getMessage", (data) => {
            //  console.log(data, "data");
            const newMsg = { message: data.message, senderId: data.senderId }
            setNewMessages(newMsg)

        })
    };


    // const userDetails = async (senderId) => {
    //     const res = await getUserDetailsByUserId([senderId])
    //     console.log(res);
    // }
    useEffect(() => {
        messages && setMessages([...messages, newMessages])
        // userDetails(newMessages.senderId)
    }, [newMessages])

    // console.log(newMessages, "newMessages");


    // console.log(messages, "messages");

    // <<<<<>>>>>>>>> close Socket




    const ChatSidebar = () => {
        document.getElementsByClassName('scroller')[0].classList.add('show')
    }
    const ChatSidebarClose = () => {
        document.getElementsByClassName('scroller')[0].classList.remove('show')
    }

    const changeRoom = (tab) => {
        setKey(tab)
        router.push(`/chat?chatId=${tab}`)
    }
    useEffect(() => {
        chatId ? setKey(chatId) : setKey("start")
    }, [chatId])

    const getRoomId = () => {
        //alert("sdf")
        console.log("user changed")
    }

    let scrollToView = document.getElementById("box");

    useEffect(() => {
        scrollToView != null ? scrollToView?.scrollIntoView() : ""
    }, [messages])



    return (
        <>
            {/* <button onClick={() => pushmesage("me")}> send me</button>
            <button onClick={() => pushmesage("other")}> send test mesage</button>
            <button onClick={() => sendMessage("sdfsdfdslfj")}> send test mesage</button> */}

            <Tab.Container id="left-tabs-example" activeKey={key}
                onSelect={(k) => changeRoom(k)}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Body className="chat-page p-0">
                                <div className="chat-data-block">
                                    <Row>
                                        <Col lg="3" className="chat-data-left scroller">
                                            <div className="chat-search pt-3 ps-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="chat-profile me-3"  >
                                                        <Image loading="lazy" src={user?.coverPictureInfo?.file?.location || user1} height={100} width={100} alt="chat-user" className="avatar-60 " onClick={() => setShow1('true')} />
                                                    </div>
                                                    <div className="chat-caption">
                                                        <h5 className="mb-0">  {user.userInfo.firstName} {user.userInfo.lastName}</h5>
                                                        {/* <p className="m-0">Web Designer</p> */}
                                                    </div>
                                                    <div onClick={ChatSidebarClose} className="ms-auto d-lg-none" role={"button"}>
                                                        <span className="material-symbols-outlined">
                                                            close
                                                        </span>
                                                    </div>
                                                </div>
                                                <div id="user-detail-popup" className={`scroller ${show1 === 'true' ? 'show' : ''}`}>
                                                    <div className="user-profile">
                                                        <Button type="submit" onClick={ChatSidebarClose} variant=" close-popup p-3"><i className="material-symbols-outlined md-18" onClick={() => setShow1('false')}>close</i></Button>
                                                        <div className="user text-center mb-4">
                                                            <Link className="avatar m-0" href="">
                                                                <Image loading="lazy" src={user?.coverPictureInfo?.file?.location || user1} height={100} width={100} alt="avatar" />
                                                            </Link>
                                                            <div className="user-name mt-4">
                                                                <h4 className="text-center">{user.userInfo.firstName} {user.userInfo.lastName}</h4>
                                                            </div>
                                                            <div className="user-desc">
                                                                {/* <p className="text-center">Web Designer</p> */}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="user-detail text-left mt-4 ps-4 pe-4">
                                                            <h5 className="mt-4 mb-4">About</h5>
                                                            <p>It is long established fact that a reader will be distracted bt the reddable.</p>
                                                            <h5 className="mt-3 mb-3">Status</h5>
                                                            <ul className="user-status p-0">
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-success pe-1"></i><span>Online</span></li>
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-warning pe-1"></i><span>Away</span></li>
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-danger pe-1"></i><span>Do Not Disturb</span></li>
                                                                <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-light pe-1"></i><span>Offline</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="chat-searchbar mt-4">
                                                    <Form.Group className="form-group chat-search-data m-0">
                                                        <input type="text" className="form-control round" id="chat-search" placeholder="Search" />
                                                        <i className="material-symbols-outlined">
                                                            search
                                                        </i>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="chat-sidebar-channel scroller mt-4 ps-3">
                                                <h5 >Public Channels</h5>

                                                <Nav as="ul" variant="pills" className="iq-chat-ui nav flex-column">
                                                    {friendsList && friendsList.map((data, index) => {
                                                        return (

                                                            <Nav.Item as="li" key={index} onClick={getRoomId}>
                                                                <Nav.Link eventKey={data._id} >
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar mx-2">
                                                                            <Image loading="lazy" src={data?.profileInfo?.profilePictureInfo
                                                                                ?.file?.location || user5} alt="chatuserimage" className="avatar-50 " height={100}
                                                                                width={100} />
                                                                            <span className="avatar-status"><i className="material-symbols-outlined text-success  md-14 filled">circle</i></span>
                                                                        </div>
                                                                        <div className="chat-sidebar-name">
                                                                            <h6 className="mb-0">{data?.firstName}{" "}  {data?.lastName}</h6>
                                                                            {/* <span>Lorem Ipsum is</span> */}
                                                                        </div>
                                                                        {/* <div className="chat-meta float-right text-center mt-2 me-1">
                                                                            <div className="chat-msg-counter bg-primary text-white">20</div>
                                                                            <span className="text-nowrap">05 min</span>
                                                                        </div> */}
                                                                    </div>
                                                                </Nav.Link>
                                                            </Nav.Item>

                                                        )
                                                    })}

                                                </Nav>
                                            </div>
                                        </Col>
                                        <Col lg={9} className=" chat-data p-0 chat-data-right">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="start" className="tab-pane fade show" id="default-block" role="tabpanel">
                                                    <div className="chat-start">
                                                        <span className="iq-start-icon text-primary"><i className="material-symbols-outlined md-42">sms</i></span>
                                                        <Button id="chat-start" onClick={ChatSidebar} bsPrefix="btn bg-white mt-3" className=''>Start Conversation!</Button>
                                                    </div>
                                                </Tab.Pane>
                                                {friendsList && friendsList.map((data, index) => {

                                                    return (

                                                        <Tab.Pane eventKey={data._id} className={`fade show`} key={index}>

                                                            <div className="chat-head">
                                                                <div className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
                                                                    <div className="d-flex align-items-center">
                                                                        <div onClick={ChatSidebar} className="d-lg-none  sidebar-toggle chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                            <span className="material-symbols-outlined">
                                                                                menu
                                                                            </span>
                                                                        </div>

                                                                        <div className="avatar chat-user-profile m-0 me-3">
                                                                            <Image loading="lazy" src={data?.profileInfo?.profilePictureInfo
                                                                                ?.file?.location || user5} height={100} width={100} alt="avatar" className="avatar-50 " onClick={() => setShow2('true')} />
                                                                            <span className="avatar-status"><i className="material-symbols-outlined text-success  md-14 filled">circle</i></span>
                                                                        </div>
                                                                        <h5 className="mb-0">{data?.firstName}{" "}  {data?.lastName}</h5>
                                                                    </div>
                                                                    <div className={`chat-user-detail-popup scroller ${show2 === 'true' ? 'show' : ''}`}>
                                                                        <div className="user-profile">
                                                                            <Button type="submit" onClick={ChatSidebarClose} variant=" close-popup p-3"><i className="material-symbols-outlined md-18" onClick={() => setShow2('false')}>close</i></Button>
                                                                            <div className="user mb-4  text-center">
                                                                                <Link className="avatar m-0" href="">
                                                                                    <Image loading="lazy" src={data?.profileInfo?.profilePictureInfo
                                                                                        ?.file?.location || user5} height={100} width={100} alt="avatar" />
                                                                                </Link>
                                                                                <div className="user-name mt-4">
                                                                                    <h4>{data?.firstName}{" "}  {data?.lastName}</h4>
                                                                                </div>
                                                                                <div className="user-desc">
                                                                                    <p>Cape Town, RSA</p>
                                                                                </div>
                                                                            </div>
                                                                            <hr />
                                                                            <div className="chatuser-detail text-left mt-4">
                                                                                <Row>
                                                                                    <Col md="6" className="col-6  title">Bni Name:</Col>
                                                                                    <Col md="6" className="col-6  text-right">Bni</Col>
                                                                                </Row>
                                                                                <hr />
                                                                                <Row>
                                                                                    <Col md="6" className="col-6 title">Tel:</Col>
                                                                                    <Col md="6" className="col-6 text-right">072 143 9920</Col>
                                                                                </Row>
                                                                                <hr />
                                                                                <Row>
                                                                                    <Col md="6" className="col-6 title">Date Of Birth:</Col>
                                                                                    <Col md="6" className="col-6 text-right">July 12, 1989</Col>
                                                                                </Row>
                                                                                <hr />
                                                                                <Row>
                                                                                    <Col md="6" className="col-6 title">Gender:</Col>
                                                                                    <Col md="6" className="col-6 text-right">Male</Col>
                                                                                </Row>
                                                                                <hr />
                                                                                <Row>
                                                                                    <Col md="6" className="col-6 title">Language:</Col>
                                                                                    <Col md="6" className="col-6 text-right">Engliah</Col>
                                                                                </Row>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="chat-header-icons d-flex">
                                                                        {/* <Link href="#" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                            <i className="material-symbols-outlined md-18">phone</i>
                                                                        </Link>
                                                                        <Link href="#" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                            <i className="material-symbols-outlined md-18">videocam</i>
                                                                        </Link> */}
                                                                        <Link href="/" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                            <span className="material-symbols-outlined">
                                                                                arrow_back
                                                                            </span>
                                                                        </Link>

                                                                        <Link href="#" className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center">
                                                                            <i className="material-symbols-outlined md-18">delete</i>
                                                                        </Link>
                                                                        <Dropdown className="bg-soft-primary d-flex justify-content-center align-items-center" as="span">
                                                                            <Dropdown.Toggle as={CustomToggle} variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show">
                                                                                more_vert
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu className="dropdown-menu-right">
                                                                                <Dropdown.Item className="d-flex align-items-center" href="#"><i className="material-symbols-outlined md-18 me-1">push_pin</i>Pin to top</Dropdown.Item>
                                                                                <Dropdown.Item className="d-flex align-items-center" href="#"><i className="material-symbols-outlined md-18 me-1">delete_outline</i>Delete chat</Dropdown.Item>
                                                                                <Dropdown.Item className="d-flex align-items-center" href="#"><i className="material-symbols-outlined md-18 me-1">watch_later</i>Block</Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="chat-content scroller" >

                                                                {messages && messages.length !== 0 && (messages).map((data, index) => {


                                                                    return (
                                                                        <React.Fragment key={index}>
                                                                            {data && <div className={`chat ${data.senderId === senderUserId ? 'd-flex other-user' : 'chat-left'}`}>
                                                                                <div className="chat-user">
                                                                                    <Link className="avatar m-0" href="">
                                                                                        <Image loading="lazy" src={user?.coverPictureInfo?.file?.location || user1} height={100} width={100} alt="avatar" className="avatar-35 " />
                                                                                    </Link>
                                                                                    <span className="chat-time mt-1">
                                                                                        <p className="mb-0 text-primary">
                                                                                            {/* {data && getPostTime(data.createdAt) || ""} */}
                                                                                            6:45
                                                                                        </p>
                                                                                    </span>
                                                                                </div>
                                                                                <div className="chat-detail">
                                                                                    <div className="chat-message">
                                                                                        <p>{data.message}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>}
                                                                        </React.Fragment>
                                                                    )
                                                                })}
                                                                <div id="box" />

                                                            </div>

                                                            <SendMessageInput sendMsg={(e) => sendMessage(e)} />

                                                        </Tab.Pane>

                                                    )
                                                })}


                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}


const SendMessageInput = ({ sendMsg }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        sendMsg(data.messageInput)
        reset()
    };

    return (
        <>

            <div className="chat-footer p-3 bg-white">

                <form className="d-flex align-items-center" onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="chat-attagement d-flex">
        <Link href="#"><i className="far fa-smile pe-3" aria-hidden="true"></i></Link>
        <Link href="#"><i className="fa fa-paperclip pe-3" aria-hidden="true"></i></Link>
    </div> */}

                    <Form.Control {...register("messageInput")} type="text" className="me-3" placeholder="Type your message" />
                    <Button type="submit" variant="primary d-flex align-items-center"><i className="far fa-paper-plane" aria-hidden="true"></i><span className="d-sm-block ms-1">Send</span></Button>
                </form>
                {errors.messageInput && (
                    <div className=" pc-3 text-danger">{errors.messageInput.message}</div>
                )}
            </div>
        </>
    )
}
export default Chat;    