import { Row, Col, Container, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import Default from "../../../layouts/default";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

//validate the input field using yup
const schema = yup.object({
  groupName: yup.string().required("groupname is required"),
  groupDesc: yup.string().required("group description is required"),
});

const GroupSetting = () => {
  const groupPrivacy = useSelector((state) => state?.groups?.groupPrivacy);
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Default>
        <Head>
          <title>Group Setting</title>
        </Head>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Group Setting</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Floating className>
                      <Form.Control
                        {...register("groupName")}
                        id="floatingInputCustom"
                        type="text"
                        placeholder="Group Name"
                        name="groupName"
                      />
                      <label htmlFor="floatingInputCustom">Group Name</label>
                      {errors.groupName && (
                        <div style={{ textAlign: "left", color: "red" }}>
                          {errors?.groupName?.message}
                        </div>
                      )}
                    </Form.Floating>
                    <Form.Floating className="mb-3 mt-3">
                      <Form.Control
                        className="form-control"
                        {...register("groupDEsc")}
                        style={{ lineHeight: "50px", overflow: "hidden" }}
                        placeholder="Enter group description"
                        as="textarea"
                        rows={3}
                        cols={10}
                        // defaultValue={userProfileData.address}
                      />
                      <Form.Label>Group-description</Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Select
                        {...register("privacyType")}
                        id="privacyType"
                      >
                        {groupPrivacy?.map((privacy) => (
                          <option
                            className="text-capitalize"
                            key={privacy._id}
                            value={privacy._id}
                          >
                            {privacy.dropdownValue}
                          </option>
                        ))}
                      </Form.Select>
                      <label htmlFor="privacyType">Privacy</label>
                      {errors.privacyType && (
                        <div className="text-danger">
                          {errors.privacyType.message}
                        </div>
                      )}
                    </Form.Floating>
                  </Form>
                  <div className="d-flex justify-content-end ">
                    <div className="d-inline-block ">
                      <button
                        type="submit"
                        className="btn btn-soft-primary mx-3"
                      >
                        Cancle
                      </button>
                    </div>

                    <div className="d-inline-block ">
                      <button
                        type="submit"
                        className="btn btn-primary "
                      >
                        update
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default GroupSetting;
