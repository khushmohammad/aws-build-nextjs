import React, { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user from "../../public/assets/images/user.png";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { inviteMemberList } from "../../store/groups";
import { inviteFriend } from "../../services/groups.service";

const InviteFriend = (props) => {
  const [page, setPage] = useState(1);
  const [FriendList, setFriendList] = useState([]);
  const dispatch = useDispatch();
  const { inviteMember } = useSelector((state) => state?.groups);

  useEffect(() => {
    if (props.groupid) {
      dispatch(
        inviteMemberList({
          groupId: props.groupid,
          pageNumber: page,
          inviteKey: "All",
        })
      );
    }
  }, []);

  useEffect(() => {
    if (page && page == 1) {
      inviteMember?.length == 0
        ? setFriendList("")
        : setFriendList(inviteMember);
    } else {
      inviteMember?.length == 0
        ? ""
        : Array.isArray(inviteMember)
        ? setFriendList((prev) => [...prev, ...inviteMember])
        : "";
    }
  }, [inviteMember]);

  const inviteAFriend = async (memberId, groupId) => {
    const res = await inviteFriend(memberId, groupId);
    if (res?.success) {
      dispatch(
        inviteMemberList({
          groupId: props.groupid,
          pageNumber: 1,
          inviteKey: "All",
        })
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
                    {FriendList &&
                      FriendList.length !== 0 &&
                      FriendList?.map((data, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-center justify-content-between flex-wrap"
                        >
                          <div className="user-img img-fluid flex-shrink-0">
                            <Image
                              src={
                                data?.userInfo?.profilePictureInfo?.file
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
                              {data?.userInfo?.firstName}{" "}
                              {data?.userInfo?.lastName}
                            </h6>
                            {/* <p className="mb-0">40 friends</p> */}
                          </div>
                          <div className="d-flex align-items-center mt-2 mt-md-0">
                            <div className="confirm-click-btn">
                              <Button
                                disabled={
                                  data?.userInfo?.isMemberAlreadyInvited
                                }
                                onClick={() =>
                                  inviteAFriend(
                                    data?.userInfo?._id,
                                    props.groupid
                                  )
                                }
                                className="me-3 btn btn-primary rounded confirm-btn"
                              >
                                {data?.userInfo?.isMemberAlreadyInvited
                                  ? "Invited"
                                  : "Invite"}
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}

                    <li className="d-block text-center mb-0 pb-0">
                      <Button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="me-3 btn btn-primary"
                      >
                        View More
                      </Button>
                    </li>
                  </ul>
                  {FriendList && FriendList?.length === 0 && (
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
