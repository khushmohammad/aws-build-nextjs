import { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

import { useDispatch } from "react-redux";

const GuestList = (props) => {
  return (
    <Modal {...props} size="lg" style={{ top: "8%" }}>
      <Modal.Header className="d-flex justify-content-between">
        <h5 className="modal-title" id="post-modalLabel">
          Guests
        </h5>
        <Button
          onClick={props.onHide}
          type="button"
          className="btn btn-secondary lh-1"
        >
          <span className="material-symbols-outlined">close</span>
        </Button>
      </Modal.Header>

      <Modal.Body style={{ height: "70vh", overflow: "scroll" }}>
        <Container>
          <Row>
            <Col sm="12">Hello</Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default GuestList;
