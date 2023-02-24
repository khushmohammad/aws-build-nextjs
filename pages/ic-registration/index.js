import { Form, Container, Button, Card } from "react-bootstrap";
import Default from "../../layouts/default";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { registerIcUser } from "../../services/groups.service";
import Head from "next/head";
import user2 from "../../public/assets/images/user/25.png";
import { useDispatch, useSelector } from "react-redux";
const FILE_SIZE = 200480;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/pdf", "image/png"];

//validate the input field using yup
const schema = yup.object().shape({
  question1: yup.string().required("question  1 is required").min(5).max(500),
  question2: yup.string().required("question  2 is required").min(5).max(500),
  question3: yup.string().required("question  3 is required").min(5).max(500),
  document1: yup
    .mixed()
    .test("required", "please select a file", (value) => {
      return value && value.length;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      return SUPPORTED_FORMATS.includes(value && value[0]?.type);
    })
    .test("fileSize", "File too large", (value) => {
      //console.log(value[0].size, value[0].size <= FILE_SIZE,FILE_SIZE,"fhfhhf");
      return value[0]?.size <= FILE_SIZE;
    }),

  document2: yup
    .mixed()
    .test("required", "please select a file", (value) => {
      return value && value.length;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      //console.log(value[0].type,SUPPORTED_FORMATS.includes(value[0].type));
      return SUPPORTED_FORMATS.includes(value && value[0]?.type);
    })
    .test("fileSize", "File too large", (value) => {
      //console.log(value[0].size, value[0].size <= FILE_SIZE,FILE_SIZE,"fhfhhf");
      return value[0]?.size <= FILE_SIZE;
    }),
  document3: yup
    .mixed()
    .test("required", "please select a file", (value) => {
      return value && value.length;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      //console.log(value[0].type,SUPPORTED_FORMATS.includes(value[0].type));
      return SUPPORTED_FORMATS.includes(value && value[0]?.type);
    })
    .test("fileSize", "File too large", (value) => {
      //console.log(value[0].size, value[0].size <= FILE_SIZE,FILE_SIZE,"fhfhhf");
      return value[0]?.size <= FILE_SIZE;
    }),

  checked: yup.bool().oneOf([true], "Checkbox selection is required"),
});

const IcRegistrationForm = () => {
  const [user, setUser] = useState(null);
  //const [document, setDocument] = useState([]);
  const [isSubmitted, setisSubmitted] = useState();
  //declaring useForm
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

  const {
    userInfo,
    profilePictureInfo,
    userInfo: { roleInfo },
  } = useSelector((state) => state?.user?.data);

  const onSubmit = async (data, e) => {
    const res = await registerIcUser(data);

    if (res) {
      setisSubmitted({
        status: true,
        message: "IC Registration Successful",
        className: "success",
      });
    } else {
      setisSubmitted({
        status: true,
        message: "IC Registration Failed",
        className: "danger",
      });
    }

    reset();
  };

  return (
    <Default>
      <Head>
        <title>IC-Registration</title>
      </Head>
      <Container>
        <Card>
          <div
            id="content-page"
            className="content-page"
            style={{
              padding: "1rem 0.5rem 1rem 0.5rem",
              minHeight: "fit-content",
            }}
          >
            {/* <Container> */}
            {isSubmitted?.status && (
              <div
                className={`alert alert-${isSubmitted.className}`}
                role="alert"
              >
                {isSubmitted.message}
              </div>
            )}

            <div className="user-post-data">
              <div className="d-flex justify-content-between">
                <div className="me-3">
                  {profilePictureInfo && (
                    <Image
                      className="rounded-circle img-fluid"
                      src={profilePictureInfo?.file?.location || user2}
                      alt=""
                      height={53}
                      width={53}
                    />
                  )}
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="mb-0 d-inline-block">
                        {" "}
                        {userInfo &&
                          `${userInfo.firstName}   ${userInfo.lastName} `}
                      </h5>

                      <p className="mb-0 text-primary">
                        {roleInfo && roleInfo.dropdownValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <Form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label htmlFor="question-first">
                  <strong>Why do you want to join this group ?</strong>
                </Form.Label>
                <Form.Control
                  id="question-first"
                  as="textarea"
                  name="question1"
                  placeholder="Answer of First Question..."
                  rows={2}
                  {...register("question1")}
                />
                {errors && (
                  <p style={{ color: "red" }} className="errorMsg">
                    {errors?.question1?.message}
                  </p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="question-second">
                  <strong>Why do you want to join this group ?</strong>
                </Form.Label>
                <Form.Control
                  id="question-second"
                  as="textarea"
                  rows={2}
                  name="question2"
                  placeholder="Answer of Second Question..."
                  {...register("question2")}
                />
                {errors && (
                  <p style={{ color: "red" }} className="errorMsg">
                    {errors?.question2?.message}
                  </p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="question-third">
                  <strong>Why do you want to join this group ?</strong>
                </Form.Label>
                <Form.Control
                  id="question-third"
                  as="textarea"
                  className="form-control"
                  rows={2}
                  name="question3"
                  placeholder="Answer of third question..."
                  {...register("question3")}
                />
                {errors && (
                  <p style={{ color: "red" }} className="errorMsg">
                    {errors?.question3?.message}
                  </p>
                )}
              </Form.Group>

              {/* 
             files for form */}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>document 1</Form.Label>
                <Form.Control
                  type="file"
                  name="document1"
                  // htmlFor ="doc-first"
                  // id="doc-first"
                  {...register("document1")}
                />

                {errors && (
                  <p style={{ color: "red" }} className="errorMsg">
                    {errors?.document1?.message}
                  </p>
                )}
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>document 2</Form.Label>
                <Form.Control
                  type="file"
                  name="document2"
                  {...register("document2")}
                />
                {errors && (
                  <p style={{ color: "red" }} className="errorMsg">
                    {errors?.document2?.message}
                  </p>
                )}
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>document 3</Form.Label>
                <Form.Control
                  ref={register}
                  type="file"
                  name="document3"
                  {...register("document3")}
                />
                {errors && (
                  <p style={{ color: "red" }} className="errorMsg">
                    {errors?.document3?.message}
                  </p>
                )}
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  className="shadow-none"
                >
                  <option>--Annual plan options--</option>
                  <option value="1">Can create upto One groups</option>
                  <option value="2">Can create upto Two groups</option>
                  <option value="3">Can create upto Three groups</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Check
                  label="Terms and conditions"
                  name="checked"
                  type="checkbox"
                  inline
                  {...register("checked")}
                />
                {errors && (
                  <p style={{ color: "red" }} className="errorMsg">
                    {errors?.checked?.message}
                  </p>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ float: "right" }}
              >
                submit
              </Button>
            </Form>
            {/* </Container> */}
          </div>
        </Card>
      </Container>
    </Default>
  );
};
export default IcRegistrationForm;
