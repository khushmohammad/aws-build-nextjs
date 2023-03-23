import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import ConfirmPasswordModal from "../../components/popupModal/ConfirmPasswordModal";
import Default from "../../layouts/default";

import { privacySettingToggle } from "../../services/basic.service";
import { profileActivation } from "../../services/profile.service";

const UserPrivacySetting = () => {
  //popup modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const privacySetting = useSelector((state) => state?.user?.data?.privacy);
  const [selectedOption, setSelectedOption] = useState(privacySetting);
  const [isSubmitted, setisSubmitted] = useState();
  const [profileActive, setProfileActive] = useState();
  const accountRemove = {
    deactivateAccount: true,
    deleteAccount: false,
  };
  const [selectedValue, setSelectedValue] = useState(accountRemove);
  const [isButtonToggled, setIsButtonToggled] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name == "deleteAccount") {
      setSelectedValue({
        deleteAccount: Boolean(value),
        deactivateAccount: false,
      });
    } else if (name == "deactivateAccount") {
      setSelectedValue({
        deleteAccount: false,
        deactivateAccount: Boolean(value),
      });
    }

    setIsButtonToggled(!isButtonToggled); // toggle the button state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await privacySettingToggle(selectedOption);
    console.log(res);

    if (res) {
      console.log(res);

      setisSubmitted({
        status: true,
        message: "Your Profile is updated Successfully",
        className: "success",
      });

      setTimeout(() => {
        setisSubmitted("");
      }, 2000);
    }
  };

  const profileActivationSubmit = async (event) => {
    event.preventDefault();
    const data = { activationProfileStatus: profileActive };
    const response = await profileActivation(data);
    console.log("response", response);
    setProfileActive();
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    privacySetting && setSelectedOption(privacySetting);
  }, [privacySetting]);

  const [confirmModalShow, setConfirmModalShow] = React.useState(false);

  const handleModal = () => {
    setIsButtonToggled((prev) => !prev);
    setConfirmModalShow(true);
    setShow(false);
  };

  return (
    <Default>
      <Container>
        <Row>
          <Col lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Privacy Setting</h4>
                </div>
              </Card.Header>
              <Card.Body>
                {isSubmitted?.status && (
                  <div
                    className={`alert alert-${isSubmitted.className}`}
                    role="alert"
                  >
                    {isSubmitted.message}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="acc-privacy">
                    <hr />
                    <div className="data-privacy">
                      <h4 className="mb-2"> Lock Your Profile </h4>
                      <Form.Check className="me-4">
                        <Form.Check.Input
                          type="radio"
                          name="option"
                          value="public"
                          checked={selectedOption === "public"}
                          onChange={handleOptionChange}
                          id="public"
                        />{" "}
                        <Form.Check.Label htmlFor="public" className="pl-2">
                          Public
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check>
                        <Form.Check.Input
                          type="radio"
                          name="option"
                          value="private"
                          checked={selectedOption === "private"}
                          onChange={handleOptionChange}
                          id="friend"
                        />{" "}
                        <Form.Check.Label htmlFor="friend" className="pl-2">
                          Friend
                        </Form.Check.Label>
                      </Form.Check>

                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English.
                      </p>
                    </div>
                    <hr />

                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </Card.Body>
              <Card.Body>
                {isSubmitted?.status && (
                  <div
                    className={`alert alert-${isSubmitted.className}`}
                    role="alert"
                  >
                    {isSubmitted.message}
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    profileActivationSubmit(e);
                  }}
                >
                  <div className="acc-privacy">
                    <hr />
                    <div className="data-privacy">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h4 className="mb-2">Deactivation and deletion</h4>

                          <p>
                            Temporarily deactivate or permanently delete your
                            account.
                          </p>
                        </div>
                        <Button variant="link" onClick={handleShow}>
                          view
                        </Button>
                      </div>
                    </div>

                    {/* <button className="btn btn-primary" type="submit">
                      Submit
                    </button> */}
                  </div>
                </form>

                <>
                  <Modal
                    show={show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    animation={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <div className="d-flex flex-column">
                          <span>
                            <strong>
                              Deactivating or deleting your account
                            </strong>
                          </span>
                          <span
                            style={{ fontSize: "14px", lineHeight: "normal" }}
                          >
                            If you want to take a break from IWL, you can
                            deactivate your account. If you want to permanently
                            delete your IWL account, let us know
                          </span>
                        </div>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Check className="me-4">
                        <Form.Check.Input
                          type="radio"
                          name="deactivateAccount"
                          id="deactivateAccount"
                          value={selectedValue.deactivateAccount}
                          checked={selectedValue.deactivateAccount === true}
                          onChange={(e) => handleChange(e)}
                        />

                        <Form.Check.Label
                          htmlFor="deactivateAccount"
                          className="pl-2"
                        >
                          <div className="d-flex flex-column">
                            <span style={{ fontSize: "16px" }}>
                              Deactivate Account
                            </span>
                            <span>
                              <strong>This can be temporary</strong>
                            </span>
                            <span>
                              Your account will be disabled and your name and
                              photos will be removed from most things you've
                              shared. You 'll be able to continue using
                            </span>
                            <hr></hr>
                          </div>
                        </Form.Check.Label>
                      </Form.Check>

                      <Form.Check className="me-4">
                        <Form.Check.Input
                          type="radio"
                          name="deleteAccount"
                          id="deleteAccount"
                          value={selectedValue.deleteAccount}
                          checked={selectedValue.deleteAccount === true}
                          onChange={(e) => handleChange(e)}
                        />

                        <Form.Check.Label
                          htmlFor="deleteAccount"
                          className="pl-2"
                        >
                          <div className="d-flex flex-column">
                            <span style={{ fontSize: "16px" }}>
                              Delete Account
                            </span>
                            <span>
                              <strong>This is permanent</strong>
                            </span>
                            <span>
                              When you delete your IWL account, you won't be
                              able to retrieve the content or information that
                              you have shared on IWL. Your Messenger and all of
                              your messages will also be deleted.
                            </span>
                          </div>
                        </Form.Check.Label>
                      </Form.Check>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleModal}>
                        {isButtonToggled
                          ? "Continue with Account Deletion "
                          : "Continue with Account Deactivation "}
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <ConfirmPasswordModal
                    show={confirmModalShow}
                    onHide={() => setConfirmModalShow(false)}
                    showPrevModal={() => setShow(true)}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Default>
  );
};

export default UserPrivacySetting;
