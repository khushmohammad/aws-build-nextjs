import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

function ModalPop(props) {
  const [toggle, setToggle] = useState(false);
  const friendsList = useSelector(
    (state) => state?.friends?.friendList?.friendsList
  );
  const [friendListState, setFriendListState] = useState([]);
  const GetFriendList = async () => {
    // const friendsWithDetails = await getFriendListWithUserData(friendsList);
    // console.log(friendsWithDetails, "friendsWithDetails")
    setFriendListState(friendsList);
  };

  useEffect(() => {
    GetFriendList();
  }, [friendsList]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {friendListState &&
          friendListState.map((userData, index) => {
            return (
              <React.Fragment key={index}>
                {userData && (
                  <Card className=" card-block card-stretch card-height">
                    <Card.Body className=" profile-page p-0">
                      <div className="profile-header-image">
                        <div className="profile-info p-4 float-right">
                          <div className="user-detail">
                            <div className="d-flex flex-wrap justify-content-between align-items-start ">
                              <div className="profile-detail d-flex ">
                                <div className="rounded-circle p-1">
                                  {userData && (
                                    <Image
                                      className="user-img img-fluid flex-shrink-0"
                                      src={
                                        userData?.profileInfo
                                          ?.profilePictureInfo?.file?.location
                                      }
                                      alt=""
                                      height={60}
                                      width={60}
                                    />
                                  )}
                                </div>
                                <div className="user-data-block">
                                  <h4>
                                    <Link href={`${userData?._id}`}>
                                      {userData?.firstName} {userData?.lastName}
                                    </Link>
                                  </h4>
                                  <h6>@designer</h6>
                                </div>
                              </div>
                              {props.title === "specific-friends" ? (
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={() => setToggle(!toggle)}
                                >
                                  {toggle ? "Added" : "Add"}
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={() => setToggle(!toggle)}
                                >
                                  {toggle ? "Removed" : "Remove"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </React.Fragment>
            );
          })}

        {Array.isArray(friendsList) && friendsList.length === 0 && (
          <Col>
            <div>
              <p className="p-3 bg-danger text-alert text-center">
                No user found!
              </p>
            </div>
          </Col>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide(), props.closeHandle();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPop;
