import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { userSchema } from "../../validations/userform";
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Form,
  Button,
  Nav,
} from "react-bootstrap";
import moment from "moment";

//image
import img1 from "../../public/assets/images/user/11.png";
import img2 from "../../public/assets/images/page-img/profile-bg1.jpg";

import Default from "../../layouts/default";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Uploader } from "../../components/ImageDropzone/Uploader";
import { getToken, updateUserData } from "../../services/user.service";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { CoverPicUploader } from "../../components/ImageDropzone/CoverPicUploader";
import {
  getStateData,
  getCityData,
} from "../../services/profile.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncSelect from "react-select/async";
import { clearEmpties, countriesList, getMaritalStatus } from "../../services/basic.services";
import _ from 'lodash'
import { loaderStatus } from '../../store/site/Loader'


const schema = yup.object({
  firstName: yup.string().required("firstname is required").min(3).max(20),
  lastName: yup.string().required("lastname is required").min(3).max(20),
  middleName: yup.string().max(20),
  country: yup.string().max(20),
  pinCode: yup.number().typeError('Pincode must be a number').nullable(true)
}).required();



const UserProfileEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state?.user?.data);
  const [profilePicModalShow, setProfilePicModalShow] = useState(false);
  const [coverPicModalShow, setCoverPicModalShow] = useState(false);
  const [relationStatus, setRelationStatus] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({ label: userProfileData?.userInfo?.countryInfo?.name, value: userProfileData?.userInfo?.countryInfo?.id });
  const [selectedState, setSelectedState] = useState({ label: userProfileData?.stateInfo?.name, value: userProfileData?.stateInfo?.id });
  const [selectedCity, setSelectedCity] = useState({ label: userProfileData?.cityInfo?.name, value: userProfileData?.cityInfo?.id });
  const [selectedDob, setSelectedDob] = useState(moment(userProfileData?.userInfo?.dateOfBirth).toDate());
  const [userGender, setUserGender] = useState(userProfileData?.userInfo?.gender);
  const [countriesDataArrayObj, setCountriesDataArrayObj] = useState();
  const [stateDataArrayObj, setStateDataArrayObj] = useState();
  const [cityDataArrayObj, setCityDataArrayObj] = useState();
  const [patchForData, setPatchForData] = useState('')




  const countryListOptions = async (inputValue) => {
    const countries = await countriesList(inputValue)
    setCountriesDataArrayObj(countries);
    return countries;
  };

  const getCityStateList = async (type = "", inputValue = "") => {
    if (type == "state") {
      const res = selectedCountry?.value && await getStateData(selectedCountry?.value, inputValue)
      setStateDataArrayObj(res)
      return res
    } else if (type = "city") {
      const res = selectedState?.value && await getCityData(selectedState?.value, inputValue)
      setCityDataArrayObj(res)
      return res
    }
  }



  const MaritalStatus = async () => {
    const data = await getMaritalStatus()
    setRelationStatus(data?.body);
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });








  const updateValue = (type, e) => {
    if (type == "state") {
      // setPatchForData({ ...patchForData, state: selectedState == '' ? null : e?.value?.toString() })
      getCityStateList("city", "")
    } else if (type == "country") {
      //  setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, country: selectedCountry == '' ? null : selectedCountry?.value?.toString() } })
      getCityStateList("state", "")
    }
    else if (type == "city") {
      // setPatchForData({ ...patchForData, city: selectedCity == '' ? null : e?.value?.toString() })
      getCityStateList("city", "")
    }
  }

  const handleDropDown = (e, dropdownsType) => {
    if (dropdownsType == "country") {
      setSelectedCountry(e)
      setSelectedState('')
      setSelectedCity('')
    } else if (dropdownsType == "state") {
      setSelectedState(e)
      setSelectedCity('')

    }
    else if (dropdownsType == "city") {
      setSelectedCity(e)
      // setPatchForData({ ...patchForData, city: selectedCity == '' ? null : selectedCity.value.toString() })
    }
    else if (dropdownsType == "dateOfBirth") {
      //const Dob = moment(e).format("DD-MMM-yyyy")
      setSelectedDob(e)
      setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, dateOfBirth: e } })
      // setPatchForData({ ...patchForData, dateOfBirth: e })
    }
  }


  // console.log(patchForData,"patchForData");
  const onSubmit = async () => {

    dispatch(loaderStatus(true))
    const res = await updateUserData(patchForData)
    if (res.status == 200) {
      router.push('/user/user-profile')
      dispatch(loaderStatus(false))
    }
  };


  useEffect(() => {
    updateValue("state", selectedState)
  }, [selectedState])

  useEffect(() => {
    updateValue("country", selectedCountry)


  }, [selectedCountry])

  useEffect(() => {
    updateValue("city", selectedCity)
  }, [selectedCity])

  useEffect(() => {
    countryListOptions('')
    MaritalStatus();
    getCityStateList("state", "")
    getCityStateList("city", "")
    setPatchForData('')
  }, []);

  //console.log(userProfileData, "userProfileData");
  return (
    <>
      <Uploader
        show={profilePicModalShow}
        onHide={() => setProfilePicModalShow(false)}
      />

      <CoverPicUploader
        show={coverPicModalShow}
        onHide={() => setCoverPicModalShow(false)}
      />
      <Default>
        <Container>
          <Tab.Container defaultActiveKey="first">
            <Row>
              <Col lg="12">
                <Card>
                  <Card.Body className="p-0">
                    <div>
                      <Nav
                        as="ul"
                        variant="pills"
                        className="iq-edit-profile row"
                      >
                        <Nav.Item as="li" className="col-md-3 p-0">
                          <Nav.Link eventKey="first" role="button">
                            Personal Information
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="col-md-3 p-0">
                          <Nav.Link eventKey="second" role="button">
                            Change Password
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="col-md-3 p-0">
                          <Nav.Link eventKey="third" role="button">
                            Email and SMS
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="col-md-3 p-0">
                          <Nav.Link eventKey="fourth" role="button">
                            Manage Contact
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={12}>
                {/* <div className="iq-edit-list-data"> */}
                <Tab.Content>
                  <Tab.Pane eventKey="first" className="fade show">
                    <Card className="edit-profile">
                      <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                          <h4 className="card-title">Personal Information</h4>
                        </div>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Form.Group className="form-group position-relative">
                            <Row className="profile-img-wrapper">
                              <Col md="6 position-absolute profile-img-edit-wrapper">
                                <div className="profile-img-edit">
                                  <Image
                                    className="profile-pic"
                                    src={userProfileData?.profilePictureInfo?.file?.location || img1}
                                    alt="profile-pic"
                                    height={150}
                                    width={150}
                                  // blurDataURL={profileImage}
                                  // placeholder="blur"
                                  />
                                  <div
                                    className="p-image d-flex justify-content-center align-items-center"
                                    onClick={() => setProfilePicModalShow(true)}
                                  >
                                    <span
                                      className="material-symbols-outlined upload-button text-white"
                                      title="Edit"
                                    >
                                      edit
                                    </span>
                                  </div>
                                </div>
                              </Col>
                              <Col md="12 relative">
                                <div
                                  className="profile-img-edit profile-img-bg-edit"
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <Image
                                    className=""
                                    src={userProfileData?.coverPictureInfo?.file?.location || img2}
                                    alt="profile-pic"
                                    height={150}
                                    width={150}
                                    style={{
                                      width: "100%",
                                    }}
                                  // blurDataURL={profileImage}
                                  // placeholder="blur"
                                  />
                                  <div
                                    className="p-image d-flex justify-content-center align-items-center"
                                    onClick={() => setCoverPicModalShow(true)}
                                  >
                                    <span
                                      className="material-symbols-outlined upload-button text-white"
                                      title="Edit"
                                    >
                                      edit
                                    </span>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Form.Group>
                          <Row className=" p-4">
                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                {...register("firstName")}
                                type="text"
                                defaultValue={userProfileData?.userInfo?.firstName}
                                className="form-control"
                                id="firstName"
                                placeholder="firstName"
                                onChange={(e) => setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, firstName: e.target.value == '' ? null : e.target.value } })}

                              />
                              <Form.Label
                                htmlFor="firstName"
                                className="form-label"
                              >
                                First Name
                              </Form.Label>

                              <p style={{ color: "red" }}>
                                {errors?.firstName?.message}{" "}
                              </p>
                            </Form.Floating>

                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                {...register("middleName")}
                                type="text"
                                defaultValue={userProfileData?.userInfo.middleName}
                                className="form-control"
                                id="middleName"
                                placeholder="middleName"
                                onChange={(e) => setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, middleName: e.target.value == '' ? null : e.target.value } })}

                              />
                              <Form.Label
                                htmlFor="middleName"
                                className="form-label"
                              >
                                Middle Name
                              </Form.Label>
                              <p style={{ color: "red" }}>
                                {errors?.middleName?.message}
                              </p>
                            </Form.Floating>

                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                {...register("lastName")}
                                type="text"
                                defaultValue={userProfileData?.userInfo?.lastName}
                                className="form-control"
                                id="lastName"
                                placeholder="lName"

                                onChange={(e) => setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, lastName: e.target.value == '' ? null : e.target.value } })}


                              />
                              <Form.Label
                                htmlFor="lastName"
                                className="form-label"
                              >
                                Last Name
                              </Form.Label>
                              <p style={{ color: "red" }}>
                                {errors?.lastName?.message}
                              </p>
                            </Form.Floating>
                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                {...register("nickName")}
                                type="text"
                                defaultValue={userProfileData?.nickName}
                                className="form-control"
                                id="nickname"
                                placeholder="nick name"
                                onChange={(e) => setPatchForData({ ...patchForData, nickName: e.target.value == '' ? null : e.target.value })}


                              />
                              <Form.Label
                                htmlFor="lname"
                                className="form-label"
                              >
                                Nick Name
                              </Form.Label>
                            </Form.Floating>
                            <Form.Floating className="form-group col-sm-12">
                              <Form.Control
                                {...register("profileDescription")}
                                type="text"
                                defaultValue={userProfileData?.profileDescription}
                                className="form-control"
                                id="profileDescription"
                                placeholder="Profile Description"
                                onChange={(e) => setPatchForData({ ...patchForData, profileDescription: e.target.value == '' ? null : e.target.value })}


                              />
                              <Form.Label
                                htmlFor="profileDescription"
                                className="form-label"
                              >
                                Profile Description
                              </Form.Label>
                            </Form.Floating>

                            <Form.Group className="form-group col-sm-6">
                              <Form.Label className="form-label d-block">
                                Gender
                              </Form.Label>
                              <fieldset
                                className="form-group"
                              // value={user.userInfo.gender}
                              // checked={user.userInfo.gender}
                              // onChange={onChange}
                              >
                                <div>
                                  <div className="form-check custom-radio form-check-inline">
                                    <input
                                      type="radio"
                                      id="male"
                                      name="gender"
                                      value="Male"
                                      {...register("userInfo.gender")}
                                      className="form-check-input"
                                      checked={userGender == "Male"}
                                      onChange={(e) => { setUserGender(e.target.value), setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, gender: e.target.value } }) }}

                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="male"
                                    >
                                      Male
                                    </label>
                                  </div>
                                  <div className="form-check custom-radio form-check-inline">
                                    <input
                                      type="radio"
                                      id="female"
                                      name="gender"
                                      value="Female"
                                      {...register("userInfo.gender")}
                                      className="form-check-input"
                                      checked={userGender == "Female"}
                                      onChange={(e) => { setUserGender(e.target.value), setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, gender: e.target.value } }) }}



                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="female"
                                    >
                                      Female
                                    </label>
                                  </div>
                                  <div className="form-check custom-radio form-check-inline">
                                    <input
                                      type="radio"
                                      id="other"
                                      name="gender"
                                      value="Other"
                                      {...register("userInfo.gender")}
                                      className="form-check-input"
                                      checked={userGender == "Other"}
                                      onChange={(e) => { setUserGender(e.target.value), setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, gender: e.target.value } }) }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="other"
                                    >
                                      Other
                                    </label>
                                  </div>
                                </div>
                              </fieldset>

                            </Form.Group>
                            <Form.Group className="form-group col-sm-6 form-floating date-input mt-3">
                              <Form.Label htmlFor="dob" className="form-label">
                                Date Of Birth
                              </Form.Label>
                              <Controller
                                control={control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                  <DatePicker
                                    selected={selectedDob}
                                    {...field}
                                    preventOpenOnFocus={true}
                                    dateFormat="dd-MMM-yyyy"
                                    placeholderText="DD-MMM-YYYY"
                                    // onBlur={onChange}
                                    onChange={(e) => handleDropDown(e, "dateOfBirth")}
                                    className="form-control"
                                    id="dob"
                                  />
                                )}
                              />
                            </Form.Group>
                            <Form.Floating className="form-group col-sm-6">
                              {/* {userProfileData?.maritalStatusInfo?._id} */}
                              {relationStatus &&

                                <Form.Select
                                  {...register("maritalStatus")}
                                  // defaultValue={"63a573a698c4e4579c299d37"}
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={(e) => setPatchForData({ ...patchForData, maritalStatus: e.target.value == '' ? null : e.target.value })}
                                >
                                  <option value="">Select Status</option>
                                  {relationStatus &&
                                    relationStatus.map((rel) => {
                                      return (
                                        <option selected={userProfileData?.maritalStatusInfo?._id == rel._id ? true : false} key={rel._id} value={rel._id}>
                                          {rel.dropdownValue}
                                        </option>
                                      );
                                    })}
                                </Form.Select>
                              }
                              <Form.Label className="form-label">
                                Marital Status
                              </Form.Label>
                            </Form.Floating>

                            <div className="position-relative form-group col-sm-6 ">

                              {countriesDataArrayObj && selectedCountry &&
                                (
                                  <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                      <AsyncSelect
                                        {...field}
                                        defaultOptions={countriesDataArrayObj}
                                        loadOptions={countryListOptions}
                                        classNames="form-select"
                                        id="floatingSelect"
                                        value={selectedCountry}
                                        onChange={(e) => { handleDropDown(e, "country"), setPatchForData({ ...patchForData, userInfo: { ...patchForData.userInfo, country: selectedCountry == '' ? null : e?.value?.toString() } }) }}
                                      // defaultInputValue={{ value: 101, label: "sdjfl" }}

                                      />
                                    )}
                                  />
                                )}

                              <label
                                style={{
                                  position: "absolute",
                                  top: "-16px",
                                  left: "11px",
                                  zIndex: "1",
                                  background: "rgb(255, 255, 255)",
                                  padding: "0px 6px",
                                  width: "auto",
                                  height: "auto",
                                }}
                                htmlFor="floatingSelect"
                              >
                                Country
                              </label>
                            </div>


                            <div className="position-relative  form-group col-sm-6 mt-3">


                              <div>
                                <AsyncSelect
                                  defaultOptions={stateDataArrayObj}
                                  loadOptions={(e) => getCityStateList("state", e)}
                                  classNames="form-select"
                                  id="floatingSelect"
                                  value={selectedState}
                                  onChange={(e) => { handleDropDown(e, "state"), setPatchForData({ ...patchForData, state: e?.value?.toString() }) }}

                                />

                              </div>

                              <Form.Label style={{
                                position: "absolute",
                                top: "-16px",
                                left: "11px",
                                zIndex: "1",
                                background: "rgb(255, 255, 255)",
                                padding: "0px 6px",
                                width: "auto",
                                height: "auto",
                              }} className="form-label">
                                State
                              </Form.Label>
                            </div>
                            <div className="position-relative  form-group col-sm-6 mt-3 ">


                              <div>
                                <AsyncSelect
                                  defaultOptions={cityDataArrayObj}
                                  loadOptions={(e) => getCityStateList("city", e)}
                                  classNames="form-select"
                                  id="floatingSelect"
                                  value={selectedCity}
                                  onChange={(e) => { handleDropDown(e, "city"), setPatchForData({ ...patchForData, city: e?.value?.toString() }) }}
                                // defaultInputValue={{ value: 101, label: "sdjfl" }}

                                />

                              </div>

                              <Form.Label style={{
                                position: "absolute",
                                top: "-16px",
                                left: "11px",
                                background: "rgb(255, 255, 255)",
                                padding: "0px 6px",
                                width: "auto",
                                height: "auto",
                              }} className="form-label">
                                City
                              </Form.Label>
                            </div>

                            <Form.Floating className="mb-3 mt-3">
                              <Form.Control
                                className="form-control"
                                {...register("address")}
                                style={{ lineHeight: "32px" }}
                                placeholder="Entere Address"
                                as="textarea"
                                rows={5}
                                onChange={(e) => setPatchForData({ ...patchForData, address: e.target.value == '' ? null : e.target.value })}

                                defaultValue={userProfileData?.address}
                              />
                              <Form.Label>Address</Form.Label>
                            </Form.Floating>

                            <Form.Floating className="form-group col-sm-6 mt-3">
                              <Form.Control
                                // {...register("city")}
                                {...register("pinCode")}

                                type="text"
                                defaultValue={userProfileData?.pinCode == null ? 0 : userProfileData?.pinCode}
                                className="form-control"
                                id="cname"
                                placeholder="Atlanta"
                                onChange={(e) => setPatchForData({ ...patchForData, pinCode: e.target.value == '' ? null : e.target.value })}

                              />
                              <Form.Label
                                htmlFor="cname"
                                className="form-label"

                              >
                                Pincode
                              </Form.Label>
                              <p style={{ color: "red" }}>
                                {errors.pinCode?.message}
                              </p>
                            </Form.Floating>
                          </Row>
                          <div className="p-4 pt-0">

                            <Button
                              type="submit"
                              className={`btn btn-primary me-2 ${patchForData == '' ? 'disabled' : ''} `}
                            >
                              Submit
                            </Button>
                            <Link href="/user/user-profile" type="button" className="btn bg-soft-danger">
                              Cancel
                            </Link>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second" className="fade show">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h4 className="card-title">Change Password</h4>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Floating className="form-group">
                            <Form.Control
                              type="Password"
                              className="form-control"
                              id="cpass"
                              defaultValue=""
                            />
                            <Form.Label htmlFor="cpass" className="form-label">
                              Current Password
                            </Form.Label>
                            <Link
                              href="/auth/forgot-password"
                              className="float-end"
                            >
                              Forgot Password
                            </Link>
                          </Form.Floating>
                          <Form.Floating className="form-group">
                            <Form.Control
                              type="Password"
                              className="form-control"
                              id="npass"
                              defaultValue=""
                            />
                            <Form.Label htmlFor="npass" className="form-label">
                              New Password
                            </Form.Label>
                          </Form.Floating>
                          <Form.Floating className="form-group">
                            <Form.Control
                              type="Password"
                              className="form-control"
                              id="vpass"
                              defaultValue=""
                            />
                            <Form.Label htmlFor="vpass" className="form-label">
                              Confirm Password
                            </Form.Label>
                          </Form.Floating>
                          <Button
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            Submit
                          </Button>
                          <Button type="reset" className="btn bg-soft-danger">
                            Cancel
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third" className="fade show">
                    <Card>
                      <Card.Header className="card-header d-flex justify-content-between">
                        <div className="header-title">
                          <h4 className="card-title">Email and SMS</h4>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Group className="form-group row align-items-center">
                            <Form.Label
                              className="col-md-3"
                              htmlFor="emailnotification"
                            >
                              Email Notification
                            </Form.Label>
                            <Form.Check className="col-md-9 form-check form-switch">
                              <Form.Check.Input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked11"
                                defaultChecked
                              />
                              <Form.Check.Label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckChecked11"
                              >
                                Checked switch checkbox input
                              </Form.Check.Label>
                            </Form.Check>
                          </Form.Group>
                          <Form.Group className="form-group row align-items-center">
                            <Form.Label
                              className="col-md-3"
                              htmlFor="smsnotification"
                            >
                              SMS Notification
                            </Form.Label>
                            <Form.Check className="col-md-9 form-check form-switch">
                              <Form.Check.Input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked12"
                                defaultChecked
                              />
                              <Form.Check.Label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckChecked12"
                              >
                                Checked switch checkbox input
                              </Form.Check.Label>
                            </Form.Check>
                          </Form.Group>
                          <Form.Group className="form-group row align-items-center">
                            <Form.Label className="col-md-3" htmlFor="npass">
                              When To Email
                            </Form.Label>
                            <Col md="9">
                              <Form.Check className="form-check">
                                <Form.Check.Input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="flexCheckDefault12"
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault12"
                                >
                                  You have new notifications.
                                </Form.Check.Label>
                              </Form.Check>
                              <Form.Check className="form-check d-block">
                                <Form.Check.Input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="email02"
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="email02"
                                >
                                  You're sent a direct message
                                </Form.Check.Label>
                              </Form.Check>
                              <Form.Check className="form-check d-block">
                                <Form.Check.Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="email03"
                                  defaultChecked
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="email03"
                                >
                                  Someone adds you as a connection
                                </Form.Check.Label>
                              </Form.Check>
                            </Col>
                          </Form.Group>
                          <Form.Group className="form-group row align-items-center">
                            <Form.Label className="col-md-3" htmlFor="npass">
                              When To Escalate Emails
                            </Form.Label>
                            <Col md="9">
                              <Form.Check className="form-check">
                                <Form.Check.Input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="email04"
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="email04"
                                >
                                  Upon new order.
                                </Form.Check.Label>
                              </Form.Check>
                              <Form.Check className="form-check d-block">
                                <Form.Check.Input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="email05"
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="email05"
                                >
                                  New membership approval
                                </Form.Check.Label>
                              </Form.Check>
                              <Form.Check className="form-check d-block">
                                <Form.Check.Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="email06"
                                  defaultChecked
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="email06"
                                >
                                  Member registration
                                </Form.Check.Label>
                              </Form.Check>
                            </Col>
                          </Form.Group>
                          <Button
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            Submit
                          </Button>
                          <Button type="reset" className="btn bg-soft-danger">
                            Cancel
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth" className="fade show">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                          <h4 className="card-title">Manage Contact</h4>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Form.Floating className="form-group">
                            <Form.Control
                              {...register("phoneNumber")}
                              name="phoneNumber"
                              type="text"
                              className="form-control"
                              id="cno"
                              defaultValue={userProfileData?.phoneNumber}
                              onChange={(e) => setPatchForData({ ...patchForData, phoneNumber: e.target.value })}
                            />
                            <Form.Label htmlFor="cno" className="form-label">
                              Contact Number
                            </Form.Label>
                          </Form.Floating>

                          <Form.Floating className="form-group">
                            <Form.Control
                              type="text"
                              className="form-control"
                              id="url"
                              {...register("siteUrl")}
                              name="siteUrl"
                              defaultValue={userProfileData?.siteUrl}
                              onChange={(e) => setPatchForData({ ...patchForData, siteUrl: e.target.value })}
                            />
                            <Form.Label htmlFor="url" className="form-label">
                              Site Url
                            </Form.Label>
                          </Form.Floating>
                          <Button
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            Submit
                          </Button>
                          <Button type="reset" className="btn bg-soft-danger">
                            Cancel
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
                {/* </div> */}
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </Default>
    </>
  );
};

export default UserProfileEdit;

