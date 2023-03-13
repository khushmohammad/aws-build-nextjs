import React, { useEffect } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user5 from "../../public/assets/images/user/25.png";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { groupMemberList } from "../../store/groups";
import { useState } from "react";
import { getUserInfoById } from "../../store/profile";
import { getUserDetailsByUserId } from "../../services/user.service";
import { leaveGroupService } from "../../services/groups.service";

const GroupMemeber = (props) => {
  const [page, setPage] = useState(1);
  let [memberId, setMemberId] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const dispatch = useDispatch();
  let limit = 4;

  const members = useSelector((state) => state?.groups?.groupMember);

  // const userDetail = useSelector((state) => state?.user?.userProfileDetail);

  const groupPrivilege = useSelector(
    (state) => state?.groups?.groupPrivilege?.canGroupBeDeleted
  );

  const memberList = () => {
    if (props.groupid !== undefined) {
      dispatch(
        groupMemberList({
          limit: limit,
          pageNumber: page,
          groupId: props.groupid,
        })
      );
    }
  };

  useEffect(() => {
    memberList();

    let getmember = [];

    members &&
      members?.memberList?.map(async (data) => {
        getmember.push(data.memberId);
      });
    setMemberId(getmember);
    window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, []);

  const getMemberDetails = async () => {
    const res = await getUserDetailsByUserId(memberId);
    setUserDetail(res);
  };

  useEffect(() => {
    if (memberId && memberId.length !== 0) getMemberDetails();
  }, [members, memberId]);

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;

    if (userScrollHeight >= windowBottomHeight) {
      memberList();
    }
  };

  const removeMember = async (userID) => {
    let data = {
      memberRemoveByAdmin: true,
      memberId: userID,
    };
    const res = await leaveGroupService(props.groupid, data);
    console.log(res);
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
              {members &&
                userDetail !== null &&
                members?.memberList?.map((member, index) => (
                  <Card key={index}>
                    <Card.Body>
                      <ul className="request-list list-inline m-0 p-0">
                        <li className="d-flex align-items-center justify-content-between flex-wrap p-0 m-0">
                          <div className="user-img img-fluid flex-shrink-0">
                            <Image
                              src={
                                userDetail[index]?.profilePictureInfo?.file
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
                              {userDetail[index]?.userInfo?.firstName}{" "}
                              {userDetail[index]?.userInfo?.lastName}
                            </h5>
                            <p className="mb-0">
                              {member?.groupRoleInfo?.dropdownValue}
                            </p>
                          </div>
                          <div className="d-flex align-items-center mt-2 mt-md-0">
                            <div className="confirm-click-btn">
                              <Button
                                href={`/user/${member?.memberId}`}
                                className="me-3 btn btn-primary rounded confirm-btn"
                              >
                                Visit Profile
                              </Button>
                            </div>
                            {groupPrivilege && (
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
                      <Link href="#" className="me-3 btn btn-primary">
                        View More Request
                      </Link>
                    </li> */}
                      </ul>
                    </Card.Body>
                  </Card>
                ))}
            </Col>
            {members?.length === 0 || members === undefined ? (
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
