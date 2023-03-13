import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { updateUserData } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../store/profile";
import moment from "moment";

const schema = yup
  .object({
    degree: yup.string().required(),
    schoolName: yup.string().required(),
    startYear: yup.string().required(),
    endYear: yup.string().required(),
  })
  .required();
const CollegeModal = ({ show, heading, onHide, EditSchoolDetailsIndex }) => {
  const user = useSelector((state) => state?.user?.data);
  const schoolDetails = user?.schoolDetails || [];
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {

    if (schoolDetails && schoolDetails) {
      // console.log(new Date(schoolDetails[EditSchoolDetailsIndex]?.startYear).toISOString().substring(0, 10))
      setValue("degree", schoolDetails[EditSchoolDetailsIndex]?.degree);
      setValue("schoolName", schoolDetails[EditSchoolDetailsIndex]?.schoolName);
      schoolDetails[EditSchoolDetailsIndex]?.startYear &&
        setValue(
          "startYear", moment(schoolDetails[EditSchoolDetailsIndex]?.startYear).toDate(),


        );
      schoolDetails[EditSchoolDetailsIndex]?.endYear &&
        setValue(
          "endYear", moment(schoolDetails[EditSchoolDetailsIndex]?.endYear).toDate()

        );
    }
  }, [EditSchoolDetailsIndex]);
  const onSubmit = async (data) => {
    if (EditSchoolDetailsIndex !== "") {
      const EditProfessionObj = schoolDetails.map((element, index) => {
        if (index == EditSchoolDetailsIndex) {
          element = data;
        }
        return element;
      });
      const schoolDetailsObj = EditProfessionObj && {
        schoolDetails: EditProfessionObj,
      };
      const res = await updateUserData(schoolDetailsObj);
      if (res.status == 200) {
        dispatch(getUserDetails());
        reset();
        onHide();
      }
    } else {
      const schoolDetailsObj = schoolDetails && {
        schoolDetails: [...schoolDetails, data],
      };
      const res = await updateUserData(schoolDetailsObj);
      if (res.status == 200) {
        dispatch(getUserDetails());
        reset();
        onHide();
      }
    }
  };
  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
        // style={{ maxHeight: "300px", overflowY: "auto", overflow: "hidden" }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>degree </Form.Label>
                  <Form.Control
                    {...register("degree")}
                    type="text"
                    placeholder="Enter degree name"
                  />
                  <p className="text-danger" I>
                    {errors.degree?.message}
                  </p>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Org. Name</Form.Label>
                  <Form.Control
                    {...register("schoolName")}
                    type="text"
                    placeholder="Enter org. name"
                  />
                  <p className="text-danger">{errors.schoolName?.message}</p>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>startYear</Form.Label>
                  {/* <Form.Control
                    {...register("startYear")}
                    type="date"
                    placeholder="Enter startYear"
                  /> */}

                  <Controller
                    name="startYear"
                    control={control}
                    render={({ field: { name, value, onChange, onBlur } }) => (
                      <DatePicker
                        className="form-control"
                        selected={value}
                        preventOpenOnFocus={true}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="dd-MMM-yyyy"
                        onBlur={onBlur}
                        onChange={(date) => {
                          onChange(date);
                          onBlur();
                        }}
                      />
                    )}
                  />
                  <p className="text-danger">{errors.startYear?.message}</p>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>endYear</Form.Label>
                  {/* <Form.Control
                    {...register("endYear")}
                    type="date"
                    placeholder="Enter endYear"
                  /> */}

                  <Controller
                    name="endYear"
                    control={control}
                    render={({ field: { name, value, onChange, onBlur } }) => (
                      <DatePicker
                        className="form-control"
                        selected={value}
                        preventOpenOnFocus={true}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="dd-MMM-yyyy"
                        onBlur={onBlur}
                        onChange={(date) => {
                          onChange(date);
                          onBlur();
                        }}
                      />
                    )}
                  />
                  <p className="text-danger">{errors.endYear?.message}</p>
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button onClick={() => { onHide() }} variant="outline-primary">
                Close
              </Button>
              <Button type="submit">Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CollegeModal;
