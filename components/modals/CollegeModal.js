import React, { useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { updateUserData } from '../../services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../store/profile';
const schema = yup.object({
  profession: yup.string().required(),
  company: yup.string().required()

}).required();

const CollegeModal = ({ show, heading, onHide, EditProfessionIndex }) => {

  const user = useSelector((state) => state?.user?.data);

  const ProfessionalDetails = user?.professionalDetails || [];

  const dispatch = useDispatch()
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (ProfessionalDetails) {

      setValue("profession", ProfessionalDetails[EditProfessionIndex]?.profession)
      setValue("company", ProfessionalDetails[EditProfessionIndex]?.company)
    }
  }, [EditProfessionIndex]);




  const onSubmit = async (data) => {
    if (EditProfessionIndex !== "") {

      const EditProfessionObj = ProfessionalDetails.map((element, index) => {
        if (index == EditProfessionIndex) {
          element = data
        }
        return element
      });

      const professionalDetailsObj = EditProfessionObj && { professionalDetails: EditProfessionObj }
      const res = await updateUserData(professionalDetailsObj);
      if (res.status == 200) {
        dispatch(getUserDetails())
        reset()
        onHide()
      }
    }
    else {

      const professionalDetailsObj = ProfessionalDetails && { professionalDetails: [...ProfessionalDetails, data] }
      const res = await updateUserData(professionalDetailsObj);
      if (res.status == 200) {
        dispatch(getUserDetails())
        reset()
        onHide()
      }
    }

  }

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
        <Modal.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Professional Skill</Form.Label>
                  <Form.Control  {...register("profession")} type="text" placeholder="Enter skill name" />
                  <p className='text-danger' I>{errors.profession?.message}</p>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Company/Org. Name</Form.Label>
                  <Form.Control {...register("company")} type="text" placeholder="Enter company/org. name" />
                  <p className='text-danger'>{errors.company?.message}</p>

                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button onClick={onHide} variant="outline-primary">Close</Button>
              <Button type='submit'  >Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default CollegeModal