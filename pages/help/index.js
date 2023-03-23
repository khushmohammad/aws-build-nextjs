import React, { useState } from "react";
import Default from "../../layouts/default";
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getHelpApi } from "../../services/help.service";

const schema = yup
  .object({
    preference: yup.string().required(),
    secretIdentity: yup.bool(),
    description: yup.string().required("Description is a required field"),
  })
  .required();
function index() {
  //  secretIdentity: yup.bool().test('is boolean',
  // 'Please enter true',
  // (value) => value === true),

  const [errorsApi, setErrorsApi] = useState();
  const [checked, setChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await getHelpApi(data);
      setSuccessMessage("Help created successfully");
      reset()
    } catch (err) {
      setErrorsApi(err.response.data.errors);
    }
  };

  return (
    <Default>
      <Container>
        <Row>
          <Col sm={9} className="ms-auto">
            {errorsApi && (
              <Card bg="danger">
                <Card.Body>{errorsApi}</Card.Body>
              </Card>
            )}
            {successMessage && (
              <Card bg="success">
                <Card.Body>{successMessage}</Card.Body>
              </Card>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="preference">
                <Form.Label>Enter Preference</Form.Label>
                <Form.Select {...register("preference")}>
                  <option value={"Integrating Coach"}>IC</option>
                  <option value={"Member"}>Member</option>
                </Form.Select>
                <p>{errors.preference?.message}</p>
              </Form.Group>             
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Enter description</Form.Label>
                <Form.Control
                  {...register("description")}
                  type="text"
                  placeholder="Enter description"
                />
                <p className="text-danger mt-2">
                  {errors.description?.message}
                </p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  onChange={() => setChecked(!checked)}
                  {...register("secretIdentity")}
                  defaultChecked={checked}
                  type="checkbox"
                  label="Enter Secret Identity"
                />
                <p>{errors.secretIdentity?.message}</p>
              </Form.Group>

              <Button variant="primary" type="submit">
                Click Here For Raise Help
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Default>
  );
}

export default index;
