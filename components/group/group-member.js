import React, { useEffect } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user5 from "../../public/assets/images/user/25.png";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { groupMemberList } from "../../store/groups";
import { useState } from "react";
import {
  adminPromoteService,
  leaveGroupService,
} from "../../services/groups.service";

const GroupMemeber = (props) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  let limit = 4;

  const { groupMember } = useSelector((state) => state?.groups);

  const userID = useSelector((state) => state?.user?.data?.userInfo?._id);

  const groupPrivilege = useSelector(
    (state) => state?.groups?.groupPrivilege?.canGroupBeDeleted
  );

  useEffect(() => {
    if (props.groupid !== undefined) {
      dispatch(
        groupMemberList({
          limit: limit,
          pageNumber: page,
          groupId: props.groupid,
        })
      );
    }
  }, []);

  const removeMember = async (userID) => {
    let data = {
      memberRemoveByAdmin: true,
      memberId: userID,
    };
    const res = await leaveGroupService(props.groupid, data);
    console.log(res);
    if (res?.success) {
      dispatch(
        groupMemberList({
          limit: limit,
          pageNumber: page,
          groupId: props.groupid,
        })
      );
    }
  };

  const promoteOrDemote = async (action, memberId, groupId) => {
    let data = { action, memberId, groupId };
    const res = await adminPromoteService(data);
    console.log(res);
    if (res?.success) {
      dispatch(
        groupMemberList({
          limit: limit,
          pageNumber: page,
          groupId: props.groupid,
        })
      );
    }
  };

  return (
    <Modal {...props} size="lg" style={{ top: "8%" }}>
      <Modal.Header className="d-flex justify-content-between">
        <h5 className="modal-title" id="post-modalLabel">
          Group Members
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
              {groupMember &&
                groupMember.memberCount !== 0 &&
                groupMember?.memberList?.map((member, index) => (
                  <Card key={index}>
                    <Card.Body>
                      <ul className="request-list list-inline m-0 p-0">
                        <li className="d-flex align-items-center justify-content-between flex-wrap p-0 m-0">
                          <div className="user-img img-fluid flex-shrink-0">
                            <Image
                              src={
                                member?.memberInfo?.profilePictureInfo?.file
                                  ?.location || user5
                              }
                              alt="story-img"
                              className="rounded-circle avatar-40"
                              height={100}
                              width={100}
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5>
                              {member?.memberInfo?.firstName}{" "}
                              {member?.memberInfo?.lastName}
                            </h5>
                            <p className="mb-0">{member?.groupRole}</p>
                          </div>
                          <div className="d-flex align-items-center mt-2 mt-md-0">
                            {userID !== member?.memberId &&
                              member?.memberId !==
                                member?.groupInfo?.groupCreator &&
                              member?.memberInfo?.userRole ===
                                "Integrating Coach" && (
                                <div className="confirm-click-btn">
                                  {member?.groupRole === "Group Admin" ? (
                                    <Button
                                      onClick={() =>
                                        promoteOrDemote(
                                          0,
                                          member?.memberId,
                                          member?.groupId
                                        )
                                      }
                                      className="me-3 btn btn-primary rounded confirm-btn"
                                    >
                                      Demote to member
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        promoteOrDemote(
                                          1,
                                          member?.memberId,
                                          member?.groupId
                                        )
                                      }
                                      className="me-3 btn btn-primary rounded confirm-btn"
                                    >
                                      Promote to admin
                                    </Button>
                                  )}
                                </div>
                              )}
                            <div className="confirm-click-btn">
                              <Button
                                href={
                                  userID === member?.memberId
                                    ? `/user/user-profile`
                                    : `/friends/${member?.memberId}`
                                }
                                className="me-3 btn btn-primary rounded confirm-btn"
                              >
                                Visit Profile
                              </Button>
                            </div>
                            {groupPrivilege && userID !== member?.memberId && (
                              <Button
                                onClick={() => removeMember(member?.memberId)}
                                className="btn btn-secondary rounded"
                                data-extra-toggle="delete"
                                data-closest-elem=".item"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        </li>

                        {/* <li className="d-block text-center mb-0 pb-0">
                          <Button className="me-3 btn btn-primary">
                            View More
                          </Button>
                        </li> */}
                      </ul>
                    </Card.Body>
                  </Card>
                ))}
            </Col>
            {groupMember?.memberCount === 0 || groupMember === undefined ? (
              <Card className="mb-0">
                <div className="card-body text-center">
                  <h5 className="card-title">No members in this group!</h5>
                </div>
              </Card>
            ) : null}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default GroupMemeber;
