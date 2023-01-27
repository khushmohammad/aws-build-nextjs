import Link from "next/link";
import React, { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user from "../../public/assets/images/user.png";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFriendList } from "../../store/friends";
import { inviteFriendOnGroup } from "../../services/groups.service";

const InviteFriend = (props) => {
  const [isInvited, setIsInvited] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriendList());
  }, []);

  const friends = useSelector((state) => state?.friends?.friendList);

  const inviteAFriend = async (friendId, groupId) => {
    const res = await inviteFriendOnGroup(friendId, groupId);
    if (res?.data?.success) {
      setIsInvited((prev) =>
        Boolean(!prev[friendId])
          ? { ...prev, [friendId]: true }
          : { ...prev, [friendId]: false }
      );
    }
  };

  return (
    <Modal {...props} size="lg" style={{ top: "8%" }}>
      <Modal.Header className="d-flex justify-content-between">
        <h5 className="modal-title" id="post-modalLabel">
          Invite friends
        </h5>
        <button
          type="button"
          className="btn btn-secondary lh-1"
          onClick={props.onHide}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </Modal.Header>
      <Modal.Body style={{ height: "70vh", overflow: "scroll" }}>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Body>
                  <ul className="request-list list-inline m-0 p-0">
                    {friends?.friendsList?.map((friend, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-center  justify-content-between flex-wrap"
                      >
                        <div className="user-img img-fluid flex-shrink-0">
                          <Image
                            src={
                              friend?.profileInfo?.profilePictureInfo?.file
                                ?.location || user
                            }
                            alt="user-img"
                            className="rounded-circle avatar-40"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>
                            {friend?.firstName} {friend?.lastName}
                          </h6>
                          {/* <p className="mb-0">40 friends</p> */}
                        </div>
                        <div className="d-flex align-items-center mt-2 mt-md-0">
                          {isInvited[friend?._id] ? (
                            <div className="confirm-click-btn">
                              <Button
                                // onClick={() =>
                                //   inviteAFriend(friend?._id, props.groupId)
                                // }
                                className="me-3 btn btn-soft-primary rounded confirm-btn"
                              >
                                Invited
                              </Button>
                            </div>
                          ) : (
                            <div className="confirm-click-btn">
                              <Button
                                onClick={() =>
                                  inviteAFriend(friend?._id, props.groupId)
                                }
                                className="me-3 btn btn-primary rounded confirm-btn"
                              >
                                Invite
                              </Button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}

                    {/* <li className="d-block text-center mb-0 pb-0">
                      <Link href="#" className="me-3 btn btn-primary">
                        View More Request
                      </Link>
                    </li> */}
                  </ul>
                  {friends && friends?.friendsList.length === 0 && (
                    <div className="card-body text-center">
                      <h5 className="card-title">No Friend Found!</h5>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default InviteFriend;
