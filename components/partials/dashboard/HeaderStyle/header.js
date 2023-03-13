import React, { useEffect, useState } from "react";
import {
  Navbar,
  Dropdown,
  Nav,
  Form,
  Card,
  Container,
  Offcanvas,
  Modal,
  CloseButton,
} from "react-bootstrap";

//image
import user1 from "../../../../public/assets/images/user/25.png";


//Componets
import { useRouter } from "next/router";
import CustomToggle from "../../../dropdowns";
import { DropdownMenu } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import FriendRequestList from "../../../friends/FriendRequestList";
import NotificationList from "../../../notification/NotificationList";
import { searchMemberByFullName } from "../../../../services/profile.service";
import { ModeAction } from "../../../../store/mode/mode";

const Header = () => {
  const [theme_scheme_color, setTheme_scheme_color] = useState(false);

  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ModeAction(theme_scheme_color));
  }, [theme_scheme_color]);

  //implement refex state
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state?.user?.data);

  const LogedInUserName =
    user &&
    `${user?.userInfo?.firstName}  ${user?.userInfo?.lastName.substring(
      0,
      2
    )}...`;

  const friendRequestList = useSelector(
    (state) => state?.friendsRequests?.FriendsRequests
  );

  //handlechange the function when we search the things
  const handleChange = async (event) => {
    setSearchResults("");

    const { value } = event.target;

    const res = await searchMemberByFullName(value);
    console.log(res);

    if (value.trim() === "") {
      setSearchResults([]);
    }
    const regex = new RegExp(value, "i");
    const filteredResults = res?.filter((item) => regex.test(item.fullName));
    setSearchResults(filteredResults);
  };

  return (
    <>
      <div className="iq-top-navbar">
        <Nav
          expand="lg"
          variant="light"
          className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0"
        >
          <Container fluid className="navbar-inner">
            <div className="d-flex align-items-center gap-3">
              <Link
                href="/"
                className="d-flex align-items-center gap-2 iq-header-logo d-none d-lg-flex iq-logo-none"
              >
                <svg
                  width="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z"
                    fill="currentColor"
                  />
                </svg>

                <h3
                  className="logo-title d-none d-sm-block"
                  data-setting="app_name"
                >
                  IWL
                </h3>
              </Link>
              <Link
                href="#"
                className="sidebar-toggle"
                data-toggle="sidebar"
                data-active="true"
                onClick={minisidebar}
              >
                <div className="icon material-symbols-outlined iq-burger-menu">
                  menu
                </div>
              </Link>
            </div>
            <div className="d-block d-lg-none">
              <Link
                href="/"
                className="d-flex align-items-center gap-2 iq-header-logo"
              >
                <svg
                  width="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z"
                    fill="currentColor"
                  />
                </svg>
                <h3
                  className="logo-title d-none d-sm-block"
                  data-setting="app_name"
                >
                  IWL
                </h3>
              </Link>
            </div>
            <div className="iq-search-bar device-search position-relative">
              <form
                className="searchbox"
                onClick={handleShow}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalFullscreenSm"
              >
                <Link className="search-link d-none d-lg-block" href="">
                  <span className="material-symbols-outlined">search</span>
                </Link>
                <Form.Control
                  type="text"
                  className="text search-input form-control bg-soft-primary  d-none d-lg-block"
                  placeholder="Search here..."
                  defaultValue={searchTerm}
                  onChange={(e) => {
                    handleChange(e), setSearchTerm(e.target.value);
                  }}
                />

                <Link
                  className="d-lg-none d-flex"
                  href="/"
                  onClick={handleShow}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalFullscreenSm"
                >
                  <span className="material-symbols-outlined">search</span>
                </Link>
              </form>
              {show ? (
                <div
                  onClick={handleClose}
                  className="search-modal position-absolute modal bg-white show fade"
                >
                  <div className="modal-dialog m-0">
                    <div className="modal-content">
                      <Modal.Header className="py-2">
                        <div className="d-flex align-items-center justify-content-between d-lg-none w-100">
                          <Form
                            className="searchbox w-50"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreenSm"
                            onClick={handleShow}
                          >
                            <Link className="search-link" href="/">
                              <span className="material-symbols-outlined">
                                search
                              </span>
                            </Link>

                            <Form.Control
                              type="text"
                              className="text search-input bg-soft-primary"
                              placeholder="Search here..."
                            />
                          </Form>

                          <Link
                            href="/"
                            className="material-symbols-outlined text-dark"
                            onClick={handleClose}
                          >
                            close
                          </Link>
                        </div>
                        <div className="d-none d-lg-flex align-items-center justify-content-between w-100">
                          <h4
                            className="modal-title"
                            id="exampleModalFullscreenLabel"
                          >
                            Recent
                          </h4>
                          <a className="text-dark" href="javascript:void(0)">
                            Clear All
                          </a>
                        </div>
                      </Modal.Header>
                      <Modal.Body className="p-0">
                        <div className="d-flex d-lg-none align-items-center justify-content-between w-100 p-3 pb-0">
                          <h5 className=" h4" id="exampleModalFullscreenLabel">
                            Recent
                          </h5>

                          <Link href="/" className="text-dark">
                            Clear All
                          </Link>
                        </div>
                        {searchResults && searchResults.length > 0 && (
                          <div style={{ height: "200px", overflow: "auto" }}>
                            <ul
                              style={{
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              {searchResults.map((item) => (
                                <div
                                  className="d-flex align-items-center border-bottom search-hover py-2 px-3"
                                  onClick={() =>
                                    router.push(`/user/${item._id}`)
                                  }
                                >
                                  <div className="flex-shrink-0">
                                    <Image
                                      className="align-self-center img-fluid avatar-50 rounded-pill"
                                      src={
                                        item?.profileInfo?.profilePictureInfo[0]
                                          ?.file?.location || user1
                                      }
                                      alt=""
                                      loading="lazy"
                                      height={400}
                                      width={900}
                                    />
                                  </div>

                                  <div className="d-flex flex-column ms-3">
                                    <Link href="/" className="h5">
                                      {item.fullName}
                                    </Link>

                                    {/* <span>Paige001</span> */}
                                  </div>

                                  <div className="d-flex align-items-center ms-auto">
                                    <Link
                                      href="/"
                                      className="me-3 d-flex align-items-center"
                                    >
                                      {/* <small>Follow</small> */}
                                    </Link>

                                    {/* <Link
                                    href="/"
                                      className="material-symbols-outlined text-dark"
                                    >
                                      close
                                    </Link> */}
                                  </div>
                                </div>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Modal.Body>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className={`offcanvas offcanvas-end iq-profile-menu-responsive ${show1 === true ? "show" : ""
                } `}
              tabIndex="-1"
              id="offcanvasBottom"
              style={{ visibility: `${show1 === true ? "visible" : "hidden"}` }}
            >
              <Offcanvas.Header>
                <h5 id="offcanvasRightLabel">General Setting</h5>
                <CloseButton onClick={() => setShow1(false)} />
                {/* <Button type="button" className="btn-close text-reset"></Button> */}
              </Offcanvas.Header>
              <Offcanvas.Body className="pt-0">
                <ul className="navbar-nav navbar-list">
                  <Nav.Item as="li">
                    <a href="#" className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        value={theme_scheme_color}
                        name="theme_scheme"
                        onClick={() =>
                          setTheme_scheme_color((prevState) => !prevState)
                        }
                      />
                      <label htmlFor="checkbox" className="checkbox-label">
                        <span className="icon-moon material-symbols-outlined">
                          dark_mode
                        </span>
                        <span className="icon-sun material-symbols-outlined">
                          light_mode
                        </span>
                        <span className="ball"></span>
                      </label>
                    </a>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link href="/" className="d-flex align-items-center">
                      <i className="material-symbols-outlined">home</i>
                      {/* <span className="mobile-text d-lg-none ms-3">Home</span> */}
                    </Link>
                  </Nav.Item>

                  <Dropdown as="li" className="nav-item d-none d-lg-block">
                    <Dropdown.Toggle
                      href="/"
                      as={CustomToggle}
                      variant="d-flex align-items-center"
                    >
                      <span className="material-symbols-outlined">group</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="sub-drop sub-drop-large"
                      style={{ inset: "75px 0px auto auto" }}
                    >
                      <Card className="shadow-none m-0">
                        <Card.Header className="d-flex justify-content-between bg-primary">
                          <div className="header-title">
                            <h5 className="mb-0 text-white">Friend Request</h5>
                          </div>
                          <small className="badge  bg-light text-dark ">
                            {friendRequestList && friendRequestList.length}
                          </small>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <FriendRequestList />
                        </Card.Body>
                      </Card>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Nav.Item as="li" className="d-lg-none">
                    <Link
                      href="/dashboard/app/friend-request"
                      className="d-flex align-items-center"
                    >
                      <span className="material-symbols-outlined">group</span>
                      <span className="mobile-text  ms-3">Friend Request</span>
                    </Link>
                  </Nav.Item>
                  <NotificationList />
                  <Nav.Item as="li" className="d-lg-none">
                    <Link
                      href="/dashboard/app/notification"
                      className="d-flex align-items-center"
                    >
                      <i className="material-symbols-outlined">notifications</i>
                      <span className="mobile-text  ms-3">Notifications</span>
                    </Link>
                  </Nav.Item>
                  <Dropdown as="li" className="nav-item d-none d-lg-block">
                    <Dropdown.Toggle
                      href="#"
                      as={CustomToggle}
                      variant="d-flex align-items-center"
                    >
                      <i className="material-symbols-outlined">mail</i>
                      <span className="mobile-text d-lg-none ms-3">
                        Message
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="sub-drop"
                      style={{ inset: "75px 0px auto auto" }}
                    >
                      <Card className="shadow-none m-0">
                        <Card.Header className="d-flex justify-content-between bg-primary">
                          <div className="header-title bg-primary">
                            <h5 className="mb-0 text-white">All Message</h5>
                          </div>
                          <small className="badge bg-light text-dark">4</small>
                        </Card.Header>
                        <Card.Body className="p-0 ">
                          <MessageListWithUser />
                        </Card.Body>
                      </Card>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Nav.Item as="li" className="d-lg-none">
                    <Link
                      href="/app/chat"
                      className="dropdown-toggle d-flex align-items-center"
                    >
                      <i className="material-symbols-outlined">mail</i>
                      <span className="mobile-text  ms-3">Message</span>
                    </Link>
                  </Nav.Item>
                  <Dropdown as="li" className="nav-item d-none d-lg-block">
                    <Dropdown.Toggle
                      href="#"
                      as={CustomToggle}
                      variant="d-flex align-items-center position-relative"
                    >
                      <Image
                        src={user?.profilePictureInfo?.file?.location || user1}
                        className="img-fluid rounded-circle me-0"
                        alt="user"
                        height={100}
                        width={100}
                      // blurDataURL={profileImage}
                      // placeholder="blur"
                      />
                      <i className="material-symbols-outlined profile-drop-down">
                        expand_more
                      </i>

                    </Dropdown.Toggle>
                    <Dropdown.Menu className="sub-drop caption-menu">
                      <Card className="shadow-none m-0">
                        <Card.Header>
                          <div className="header-title">
                            <h5 className="mb-0 ">
                              Hello {LogedInUserName && LogedInUserName}
                            </h5>
                          </div>
                        </Card.Header>
                        <Card.Body className="p-0 ">
                          <Link
                            href="/user/user-profile"
                            className="d-flex align-items-center iq-sub-card border-0"
                          >
                            <span className="material-symbols-outlined">
                              line_style
                            </span>
                            <div className="ms-3">
                              <div className="mb-0 h6">My Profile</div>
                            </div>
                          </Link>
                          <Link
                            href="/user/user-profile-edit"
                            className="d-flex align-items-center iq-sub-card border-0"
                          >
                            <span className="material-symbols-outlined">
                              edit_note
                            </span>
                            <div className="ms-3">
                              <div className="mb-0 h6">Edit Profile</div>
                            </div>
                          </Link>
                          <Link
                            href="/user/user-account-setting"
                            className="d-flex align-items-center iq-sub-card border-0"
                          >
                            <span className="material-symbols-outlined">
                              manage_accounts
                            </span>
                            <div className="ms-3">
                              <div className="mb-0 h6">Account settings</div>
                            </div>
                          </Link>
                          <Link
                            href="/user/user-privacy-setting"
                            className="d-flex align-items-center iq-sub-card border-0"
                          >
                            <span className="material-symbols-outlined">
                              lock
                            </span>
                            <div className="ms-3">
                              <div className="mb-0 h6">Privacy Settings</div>
                            </div>
                          </Link>
                          <Link
                            href=""
                            onClick={() => signOut()}
                            className="d-flex align-items-center iq-sub-card"
                          >
                            <span className="material-symbols-outlined">
                              login
                            </span>
                            <div className="ms-3">
                              <div className="mb-0 h6">Logout</div>
                            </div>
                          </Link>

                        </Card.Body>
                      </Card>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Nav.Item as="li" className="d-lg-none">
                    <Link
                      href="/user/user-profile"
                      className="dropdown-toggle d-flex align-items-center"
                    >
                      <span className="material-symbols-outlined">person</span>
                      <span className="mobile-text  ms-3">Profile</span>
                    </Link>
                  </Nav.Item>
                </ul>
              </Offcanvas.Body>
            </div>
          </Container>
        </Nav>
      </div>
    </>
  );
};

const MessageListWithUser = () => {
  const friendsList = useSelector(
    (state) => state?.friends?.friendList?.list
  );

  return (
    <>
      {friendsList &&
        friendsList.map((userData, index) => {
          return (
            <Link
              href={`/chat?chatId=${userData?._id}`}
              className="iq-sub-card"
              key={index}
            >
              <div className="d-flex  align-items-center">
                <div className="">
                  <Image
                    className="avatar-40 rounded"
                    src={
                      userData?.profileInfo?.profilePictureInfo?.file
                        ?.location || user1
                    }
                    alt="profile-bg"
                    height={100}
                    width={100}
                    style={{
                      maxHeight: "150px",
                      objectfit: "cover",
                    }}
                    loading="lazy"
                  />
                </div>
                <div className=" w-100 ms-3">
                  <h6 className="mb-0 ">
                    {userData?.firstName || ""} {userData?.lastName || ""}
                  </h6>
                  <small className="float-left font-size-12">13 Jun</small>
                </div>
              </div>
            </Link>
          );
        })}

      <div className="text-center iq-sub-card">
        <Link href="/chat" className=" btn text-primary w-100">
          View All
        </Link>
      </div>
    </>
  );
};

export default Header;
