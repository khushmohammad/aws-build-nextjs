import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user5 from "../../public/assets/images/user/05.jpg";

import Image from "next/image";
import { groupJoinRequestLists } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoById } from "../../store/profile";
import { groupJoinAcceptAndDeclineService } from "../../services/groups.service";

const GroupJoinRequest = (props) => {
  const [memberId, setMemberId] = useState([]);

  const userDetail = useSelector((state) => state?.user?.userProfileDetail);

  const joinRequestList = useSelector(
    (state) => state?.groups?.joinRequestList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    groupJoinRequestLists(props.groupid);

    joinRequestList?.map((request) => {
      if (memberId?.includes(request.memberId) === false) {
        setMemberId([...memberId, request.memberId]);
      }
    });
  }, [props.groupid]);

  useEffect(() => {
    if (memberId.length !== 0) dispatch(getUserInfoById(memberId));
  }, [joinRequestList]);

  const AcceptOrRejectReq = async (invitationId, invitationAction) => {
    const res = await groupJoinAcceptAndDeclineService(
      invitationId,
      invitationAction
    );
    console.log(res);
    if (res === true) {
      groupJoinRequestLists(props.groupid);
    } else {
      setApiError("Already did an action.");
    }
  };

  return (
    <Modal {...props} size="lg" style={{ top: "8%" }}>
      <Modal.Header className="d-flex justify-content-between">
        <h5 className="modal-title" id="post-modalLabel">
          Member Requests
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
              {joinRequestList?.map((request, index) => (
                <Card key={index}>
                  <Card.Body>
                    <ul className="request-list list-inline m-0 p-0">
                      <li className="d-flex align-items-center  justify-content-between flex-wrap m-0 p-0">
                        <div className="user-img img-fluid flex-shrink-0">
                          <Image
                            src={
                              (userDetail &&
                                userDetail[index]?.profilePictureInfo?.file
                                  ?.location) ||
                              user5
                            }
                            alt="story-img"
                            className="rounded-circle avatar-60"
                            height={100}
                            width={100}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h4>
                            {userDetail &&
                              userDetail[index]?.userInfo?.firstName}{" "}
                            {userDetail &&
                              userDetail[index]?.userInfo?.lastName}
                          </h4>
                          <p className="mb-0" style={{ color: "#777d74" }}>
                            Requested a few second ago
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <button
                            onClick={() => AcceptOrRejectReq(request?._id, "1")}
                            className="me-3 btn btn-primary rounded"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => AcceptOrRejectReq(request?._id, "0")}
                            className="me-3 btn btn-secondary rounded"
                          >
                            Decline
                          </button>
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
              {(joinRequestList === undefined ||
                joinRequestList.length === 0) && (
                <div className="card-body text-center">
                  <h5 className="card-title">No Request Found!</h5>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default GroupJoinRequest;
