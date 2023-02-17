import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import FileBase64 from "react-filebase64";
import Image from "next/image";
import DatePicker from "react-datepicker";

// images
import img2 from "../../public/assets/images/page-img/profile-bg1.jpg";

import { createEventService } from "../../services/event.service";
import { getEvents } from "../../store/events";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const CreateEvent = (props) => {
  const [eventPicture, setEventPicture] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();

  const schema = yup
    .object({
      title: yup.string().required("Title is required"),
      location: yup.string().required("Location is required"),
      description: yup.string().required("Description is required"),
      // start: yup.string().required("Start Date is required"),
      // end: yup.string().required("End Date is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const createEvent = async (data) => {
    const res = await createEventService(data);
    return res;
  };

  const onSubmit = (data) => {
    register("eventPicture", { value: eventPicture || null });

    createEvent({ eventInfo: data }).then((res) => {
      if (res?.success === true) {
        setApiResponse(res?.message);
        setEventPicture("");
        dispatch(getEvents("hosting"));
        router.push("/events#pill-eventHosting");
        props.onHide();
        reset();
      }
    });
  };

  return (
    <Modal {...props} size="lg" style={{ top: "8%" }}>
      <Modal.Header className="d-flex justify-content-between">
        <h5 className="modal-title" id="post-modalLabel">
          Create An Event
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
            <Col sm="12">
              <Card>
                <Card.Body>
                  <div
                    className="profile-img-edit profile-img-bg-edit mb-2"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Image
                      className=""
                      src={eventPicture || img2}
                      alt="profile-pic"
                      layout="fill"
                      objectFit="cover"
                      style={{
                        border: "2px solid #f60000",
                        borderRadius: "15px",
                      }}
                      // blurDataURL={profileImage}
                      // placeholder="blur"
                    />
                    <div className="p-image d-flex justify-content-center align-items-center relative">
                      <div
                        style={{ position: "absolute", opacity: 0, right: 0 }}
                      >
                        <FileBase64
                          multiple={false}
                          onDone={(files) => {
                            // console.log("files onDone: ", files.base64);
                            setEventPicture(files.base64);
                          }}
                        />
                      </div>
                      <span
                        className="material-symbols-outlined upload-button text-white"
                        title="Edit"
                      >
                        edit
                      </span>
                    </div>
                  </div>
                  <Form
                    className="mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <Form.Floating className="mb-3">
                      <Form.Control
                        {...register("title")}
                        id="floatingInputCustom"
                        type="text"
                        placeholder="Event Title"
                        name="title"
                      />
                      <label htmlFor="floatingInputCustom">Event Title</label>
                      {errors.title && (
                        <div className="text-danger">
                          {errors.title.message}
                        </div>
                      )}
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        {...register("location")}
                        id="floatingInputCustom"
                        type="text"
                        placeholder="Location"
                        name="location"
                      />
                      <label htmlFor="floatingInputCustom">Location</label>
                      {errors.location && (
                        <div className="text-danger">
                          {errors.location.message}
                        </div>
                      )}
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        className="py-4"
                        as="textarea"
                        rows={4}
                        {...register("description")}
                        id="floatingInputCustom"
                        placeholder="Description"
                        name="description"
                      />
                      <label htmlFor="floatingInputCustom">Description</label>
                      {errors.description && (
                        <div className="text-danger">
                          {errors.description.message}
                        </div>
                      )}
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                      <Form.Select
                        {...register("backgroundColor")}
                        id="backgroundColor"
                      >
                        <option
                          defaultChecked
                          className="text-capitalize dot-option"
                          value="blue"
                        >
                          Business
                        </option>
                        <option
                          className="text-capitalize dot-option"
                          value="red"
                        >
                          Personal
                        </option>
                        <option
                          className="text-capitalize dot-option"
                          value="orange"
                        >
                          family
                        </option>
                        <option
                          className="text-capitalize dot-option"
                          value="green"
                        >
                          Holiday
                        </option>
                        <option
                          className="text-capitalize dot-option"
                          value="cyan"
                        >
                          ETC
                        </option>
                      </Form.Select>
                      <label htmlFor="privacyType">Label</label>
                    </Form.Floating>

                    <Row>
                      <Col>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Floating className="mb-3 ">
                          <Controller
                            name="start"
                            control={control}
                            render={({
                              field: { name, value, onChange, onBlur },
                            }) => (
                              <DatePicker
                                selected={value}
                                preventOpenOnFocus={true}
                                minDate={new Date()}
                                dateFormat="dd-MMM-yyyy h:mm aa"
                                placeholderText="dd-MMM-yyyy"
                                onBlur={onBlur}
                                showTimeInput
                                onChange={(date) => {
                                  onChange(date);
                                  onBlur();
                                }}
                                className="form-control"
                              />
                            )}
                          />
                          {/* {errors.start && (
                            <div className="text-danger">
                              {errors.start.message}
                            </div>
                          )} */}
                        </Form.Floating>
                      </Col>
                      <Col>
                        <Form.Label>End Date</Form.Label>
                        <Form.Floating className="mb-3 ">
                          <Controller
                            name="end"
                            control={control}
                            render={({
                              field: { name, value, onChange, onBlur },
                            }) => (
                              <DatePicker
                                selected={value}
                                preventOpenOnFocus={true}
                                minDate={new Date()}
                                dateFormat="dd-MMM-yyyy h:mm aa"
                                showTimeInput
                                placeholderText="dd-MMM-yyyy"
                                onBlur={onBlur}
                                onChange={(date) => {
                                  onChange(date);
                                  onBlur();
                                }}
                                className="form-control"
                              />
                            )}
                          />
                          {/* {errors.end && (
                            <div className="text-danger">
                              {errors.end.message}
                            </div>
                          )} */}
                        </Form.Floating>
                      </Col>
                    </Row>

                    <Form.Floating className="mb-3">
                      <Form.Select {...register("privacy")} id="privacy">
                        <option
                          defaultChecked
                          className="text-capitalize"
                          value="public"
                        >
                          Public
                        </option>
                        <option className="text-capitalize" value="private">
                          Private
                        </option>
                        <option className="text-capitalize" value="friends">
                          Friends
                        </option>
                      </Form.Select>
                      <label htmlFor="privacyType">Privacy</label>
                    </Form.Floating>
                    <Button
                      variant="primary"
                      type="submit"
                      className="float-end"
                    >
                      Create Event
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default CreateEvent;
