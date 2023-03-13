import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Default from "../../layouts/default";
import { useDispatch, useSelector } from "react-redux";
import { getSystemResources } from "../../store/system-resource";
import { getIcSocialMediaInfo } from "../../services/profile.service";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUserDetails } from "../../store/profile";

const UserAccountSetting = () => {
  const dispatch = useDispatch();
  const socialSiteHandler = useSelector(
    (state) => state?.systemResource?.socialMediaHandler
  );

  const userInfo = useSelector((state) => state?.user?.data);

  useEffect(() => {
    dispatch(
      getSystemResources({
        action: { action: "read" },
        data: { actionData: { title: "SocialMediaHandler" } },
      })
    );
  }, []);

  console.log(userInfo?.socialMediaHandler, "userInfo");
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  const onSubmit = async (data) => {
    const formData =
      socialSiteHandler &&
      socialSiteHandler.map((elem, index) => {
        const result = {
          socialMediaId: elem._id,
          socialMediaLink: data[elem.name],
        };

        return result;
      });

    try {
      const res = formData && (await getIcSocialMediaInfo(formData));

      if (res.status == 200) {
        console.log("success", res);
        dispatch(getUserDetails());
      }
      console.log(res);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Default>
      <Container>
        <Row>
          <Col lg="6">
            <Card>
              <Card.Header className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Account Setting</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="acc-edit">
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="uname" className="form-label">
                        User Name:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="uname"
                        defaultValue="Bni@01"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="email" className="form-label">
                        Email Id:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        className="form-control"
                        id="email"
                        defaultValue="Bnijohn@gmail.com"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="altemail" className="form-label">
                        Alternate Email:
                      </Form.Label>
                      <Form.Control
                        type="email"
                        className="form-control"
                        id="altemail"
                        defaultValue="designtheme@gmail.com"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label className="d-block form-label">
                        Language Known:
                      </Form.Label>
                      <Form.Check className="form-check form-check-inline">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          id="english"
                          defaultChecked
                        />
                        <Form.Check.Label
                          className="form-check-label"
                          htmlFor="english"
                        >
                          English
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check form-check-inline">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          id="french"
                          defaultChecked
                        />
                        <Form.Check.Label
                          className="form-check-label"
                          htmlFor="french"
                        >
                          French
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check form-check-inline">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          id="hindi"
                        />
                        <Form.Check.Label
                          className="form-check-label"
                          htmlFor="hindi"
                        >
                          Hindi
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check form-check-inline">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          id="spanish"
                          defaultChecked
                        />
                        <Form.Check.Label
                          className="form-check-label"
                          htmlFor="spanish"
                        >
                          Spanish
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check form-check-inline">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          id="arabic"
                        />
                        <Form.Check.Label
                          className="form-check-label"
                          htmlFor="arabic"
                        >
                          Arabic
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-check form-check-inline">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          id="italian"
                        />
                        <Form.Check.Label
                          className="form-check-label"
                          htmlFor="italian"
                        >
                          Italian
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary me-2">
                      Submit
                    </Button>
                    <Button type="reset" className="btn bg-soft-danger">
                      Cancel
                    </Button>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {userInfo?.userInfo?.roleInfo?.dropdownValue ===
          "Integrating Coach" ? (
            <Col lg="6">
              <Card>
                <Card.Header className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Social Media</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="acc-edit">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      {socialSiteHandler &&
                        socialSiteHandler.map((elem, index) => {
                          const inputValue = userInfo?.socialMediaHandler.find(
                            (e) => e.socialMediaId == elem._id
                          );
                          // console.log(inputValue.socialMediaLink,"inputValue");
                          return (
                            <Form.Group className="form-group" key={index}>
                              <Form.Label
                                htmlFor={elem.name.toLowerCase()}
                                className="form-label"
                              >
                                {elem.name}:
                              </Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                id={elem.name.toLowerCase()}
                                defaultValue={`${inputValue.socialMediaLink}`}
                                {...register(elem.name)}
                              />
                            </Form.Group>
                          );
                        })}

                      <Button type="submit" className="btn btn-primary me-2">
                        Submit
                      </Button>
                      <Button type="reset" className="btn bg-soft-danger">
                        Cancel
                      </Button>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ) : null}
        </Row>
      </Container>
    </Default>
  );
};

export default UserAccountSetting;
