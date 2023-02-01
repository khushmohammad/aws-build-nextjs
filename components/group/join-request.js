import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user5 from "../../public/assets/images/user/05.jpg";

import Image from "next/image";
import { groupJoinRequestLists } from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoById } from "../../store/profile";
import { getUserDetailsByUserId } from "../../services/user.service";

const GroupJoinRequest = (props) => {
  const [memberId, setMemberId] = useState([]);

  const joinRequestList = useSelector(
    (state) => state?.groups?.joinRequestList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    groupJoinRequestLists(props.groupid);

    joinRequestList?.map((request) => {
      setMemberId(() => {
        [...memberId, request.memberId];
      });
    });
  }, [props.groupid]);

  const getMemberProfile = async () => {
    await getUserDetailsByUserId(["63c823c20fbe6ab10f67d52a"]);
  };

  // useEffect(() => {
  // dispatch(getUserInfoById(memberId));
  // getMemberProfile();
  // }, [joinRequestList]);

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
              {joinRequestList?.map((request, index) => {
                return (
                  <Card key={index}>
                    <Card.Body>
                      <ul className="request-list list-inline m-0 p-0">
                        <li className="d-flex align-items-center  justify-content-between flex-wrap">
                          <div className="user-img img-fluid flex-shrink-0">
                            <Image
                              src={user5}
                              alt="story-img"
                              className="rounded-circle avatar-40"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>Jaques Amole</h6>
                            <p className="mb-0">40 friends</p>
                          </div>
                          <div className="d-flex align-items-center mt-2 mt-md-0">
                            <div className="confirm-click-btn">
                              <Button
                                // href=""
                                className="me-3 btn btn-primary rounded confirm-btn"
                              >
                                Visit Profile
                              </Button>
                            </div>
                            <Button
                              href="#"
                              // onClick={questionAlert}
                              className="btn btn-secondary rounded"
                              data-extra-toggle="delete"
                              data-closest-elem=".item"
                            >
                              Remove
                            </Button>
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
                );
              })}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default GroupJoinRequest;
