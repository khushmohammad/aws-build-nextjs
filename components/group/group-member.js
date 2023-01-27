import Link from "next/link";
import React from "react";
import { Card, Col, Container, Modal, Row } from "react-bootstrap";

// images
import user5 from "../../public/assets/images/user/05.jpg";

import Image from "next/image";

const GroupMemeber = (props) => {
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
              <Card>
                {/* <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Friend Request</h4>
                  </div>
                </Card.Header> */}
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
                          <Link
                            href=""
                            className="me-3 btn btn-primary rounded confirm-btn"
                          >
                            Visit Profile
                          </Link>
                        </div>
                        <Link
                          href=""
                          // onClick={questionAlert}
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                        >
                          Remove
                        </Link>
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
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default GroupMemeber;
