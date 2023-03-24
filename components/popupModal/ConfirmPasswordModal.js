import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user2 from "../../public/assets/images/user/25.png";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Container, Modal, Form, Button, Nav } from "react-bootstrap";
import {
  profileDeactivation,
  profileDelete,
} from "../../services/profile.service";
import { signOut } from "next-auth/react";

const schema = yup.object({
  password: yup.string().required("Password is required"),
});

const ConfirmPasswordModal = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("<<<data>>>", data);
    const { onHide, showPrevModal, selectedValue, setSelectedValue } = props;
    console.log(
      "selectedValue.deactiveAccount",
      selectedValue.deactivateAccount,
      "password",
      data.password.length
    );
    console.log(
      "selectedValue.deleteAccount",
      selectedValue.deleteAccount,
      "password",
      data.password.length
    );
    if (selectedValue.deactivateAccount && data?.password?.length > 0) {
      try {
        const res = await profileDeactivation({
          activationProfileStatus: false,
          password: data.password,
        });
        console.log("response deactive", res);
        if (res.status === 200) {
          reset();
          setSelectedValue({
            deactivateAccount: true,
            deleteAccount: false,
          });
          onHide();
          showPrevModal();
          setErrorMessage("");
        }
      } catch (err) {
        if (err.response.status === 401) {
          setErrorMessage(err.response.data.message);
        }
      }
    } else if (selectedValue.deleteAccount && data?.password?.length > 0) {
      try {
        const res = await profileDelete({
          deleteProfileStatus: true,
          password: data.password,
        });
        if (res.status === 200) {
          reset();
          setSelectedValue({
            deactivateAccount: true,
            deleteAccount: false,
          });
          signOut();
        }
        console.log("response delete", res);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          setErrorMessage(err.response.data.message);
        }
      }
    }
  };

  const {
    userInfo,
    profilePictureInfo,
    // userInfo: { roleInfo },
  } = useSelector((state) => state?.user?.data);

  const handleClose = () => {
    props.onHide();
    props.showPrevModal();
  };

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title> Please enter your password to continue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                    {userInfo &&
                      `${userInfo.firstName}   ${userInfo.lastName} `}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        The page you are trying to visit requires you to re-enter your password
      </Modal.Body>
      <Container>
        <Form>
          <Form.Floating>
            <Form.Control
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
            <span
              role="button"
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="icon cursor-pointer material-symbols-outlined material-icons-outlined position-absolute top-50 pwd-icon translate-middle-y"
            >
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </Form.Floating>
          {console.log("<<<------------>>>", errors.password)}
          {(errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )) ||
            (errorMessage ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : null)}

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
};

export default ConfirmPasswordModal;
