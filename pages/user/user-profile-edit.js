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
import Select from "react-select";

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
import { getUserDetails, updateUserInfo } from "../../store/profile";
import { useRouter } from "next/router";
import { CoverPicUploader } from "../../components/ImageDropzone/CoverPicUploader";
import {
  getStateData,
  getCityData,
  getCountryData,
} from "../../services/profile.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncSelect from "react-select/async";

const schema = yup
  .object({
    firstName: yup.string().required("firstname is required").min(3).max(20),
    lastName: yup.string().required("lastname is required").min(3).max(20),
  })
  .required();

const UserProfileEdit = ({ countries }) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [userData, setUserData] = useState();

  const [profilePicModalShow, setProfilePicModalShow] = useState(false);
  const [coverPicModalShow, setCoverPicModalShow] = useState(false);
  // const [token,setToken] = useState();
  const [relationStatus, setRelationStatus] = useState([]);
  // const [countriesDataArrayObj, setCountriesDataArrayObj] = useState(countries)

  const [formdata, setFormdata] = useState({
    nickName: user.nickName ? user.nickName : null,
    profileDescription: user.profileDescription
      ? user.profileDescription
      : null,
    phoneNumber: user.phoneNumber ? user.phoneNumber : null,
    siteUrl: user.siteUrl ? user.siteUrl : null,
    address: user.address ? user.address : null,
    city: user.city ? user.city : null,
    state: user.stateInfo ? user.stateInfo.id : null,
    pinCode: user.pinCode ? user.pinCode : null,
    // professionalDetails: null,
    // schoolDetails: [],
    userInfo: {
      firstName: user.userInfo.firstName ? user.userInfo.firstName : null,
      middleName: user.userInfo.middleName ? user.userInfo.middleName : null,
      lastName: user.userInfo.lastName ? user.userInfo.lastName : null,
      gender: user.userInfo.gender,
      dateOfBirth: user.userInfo.dateOfBirth ? user.userInfo.dateOfBirth : "",
      country: user.userInfo.countryInfo ? user.userInfo.countryInfo.id : null,
    },
    // hobbies: `${user.hobbies && user.hobbies }`,
    maritalStatus: user.maritalStatusInfo ? user.maritalStatusInfo._id : null,
  });

  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  // console.log(("my form data:", formdata.userInfo.middleName))

  const handleCountry = async (e) => {
    await setFormdata({
      ...formdata,
      userInfo: { ...formdata.userInfo, country: e.target.value },
    });

    await getAllStates(e.target.value);
  };

  const handleState = async (e) => {
    await setFormdata({
      ...formdata,
      state: e.target.value == "" ? null : e.target.value,
    });

    await getAllCities(e.target.value);
  };

  // fetching all states
  const getAllStates = async (id) => {
    const states = await getStateData(id);
    setAllStates(states);
  };
  // Fetching all citites
  const getAllCities = async (id) => {
    const cities = await getCityData(id);
    setAllCities(cities);
  };
  // const [countryLabel,setCountryLabel] = useState({});

  // console.log("country: ",formdata.userInfo.country)

  // country list on search
  // const promiseOptions = async (inputValue) => {
  //   console.log("COUNTRY", inputValue);
  //   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/users/country/all/${inputValue}`)
  //   const countri = await res.data.body
  //   let newArrayOBj1 = []
  //   countri.forEach(element => {
  //     const data = { value: element._id, label: element.name }
  //     return newArrayOBj1.push(data)
  //   });
  //   setCountriesDataArrayObj(newArrayOBj1)
  //   return newArrayOBj1

  // }

  // const AccessToken = async () => {

  //   setToken(data);

  // }

  useEffect(() => {
    getAllStates(formdata.userInfo.country);
    getAllCities(formdata.state);
    // console.log("SELECTED DATE", moment(formdata.userInfo.dateOfBirth).format('DD-MMM-YYYY'));
    const MaritalStatus = async () => {
      const token = await getToken("/api/handler");
      // AccessToken();
      // console.log("TOKEN:", token.data);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/profiles/dropdowns/values/MaritalStatus`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setRelationStatus(data.body);
    };
    MaritalStatus();
  }, []);

  // console.log("FormData: ", formdata)
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onChange",
  //   defaultValues: userData,
  // });

  // const onSubmit = async () => {
  //   // const token = await axios.get("/api/handler");

  //   // await axios.patch(
  //   //   `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfile/update`,
  //   //   data,
  //   //   {
  //   //     headers: { authorization: `Bearer ${token}` },
  //   //   }
  //   // );
  //   // updateUserData(data);
  // };
  const [countriesDataArrayObj, setCountriesDataArrayObj] = useState();
  const [selectedCountriesDataArrayObj, setSelectedCountriesDataArrayObj] =
    useState({ value: 3, label: "ablc" });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log({ ...data, country: selectedCountriesDataArrayObj }, "dd");
  };

  const updatePersonalInfo = async (e) => {
    e.preventDefault();

    console.log("dd");

    // await dispatch(updateUserInfo(formdata));
    // await dispatch(getUserDetails());
    // Router.push("/user/user-profile-edit");
  };
  // console.log("formData state is a ", formdata.state);
  const promiseOptions = async (inputValue) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all/${inputValue}`
    );
    const countri = await res.data.body;
    let newArrayOBj1 = [];
    countri.forEach((element) => {
      const data = { value: element.id, label: element.name };
      return newArrayOBj1.push(data);
    });
    setCountriesDataArrayObj(newArrayOBj1);
    return newArrayOBj1;
  };

  const getSelectedCountryObj = async (countryId) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/users/country/${countryId}`
    );
    const selectedData = await res.data.body;
    console.log(selectedData, "res");

    setSelectedCountriesDataArrayObj({
      value: selectedData.id,
      label: selectedData.name,
    });

    //setCountriesDataArrayObj(newArrayOBj1);
  };

  useEffect(() => {
    formdata.userInfo.country &&
      getSelectedCountryObj(formdata.userInfo.country);
  }, []);

  const getCountry = async (inputValue) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all`
    );
    const countri = await res.data.body;
    let newArrayOBj1 = [];
    countri.forEach((element) => {
      const data = { value: element.id, label: element.name };
      return newArrayOBj1.push(data);
    });
    setCountriesDataArrayObj(newArrayOBj1);
  };
  useEffect(() => {
    getCountry();
  }, []);

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
                                    src={user?.profilePictureInfo?.file?.location || img1}
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
                                    src={user?.coverPictureInfo?.file?.location || img2}
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
                                defaultValue={formdata.userInfo.firstName}
                                className="form-control"
                                id="firstName"
                                placeholder="firstName"
                              />
                              <Form.Label
                                htmlFor="firstName"
                                className="form-label"
                              >
                                First Name
                              </Form.Label>

                              <p style={{ color: "red" }}>
                                {errors.firstName?.message}{" "}
                              </p>
                            </Form.Floating>

                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                // {...register("userInfo.lastName")}
                                type="text"
                                defaultValue={formdata.userInfo.middleName}
                                className="form-control"
                                id="middleName"
                                placeholder="middleName"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formdata,
                                    userInfo: {
                                      ...formdata.userInfo,
                                      middleName:
                                        e.target.value == ""
                                          ? null
                                          : e.target.value,
                                    },
                                  })
                                }
                              />
                              <Form.Label
                                htmlFor="middleName"
                                className="form-label"
                              >
                                Middle Name
                              </Form.Label>
                            </Form.Floating>

                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                {...register("lastName")}
                                type="text"
                                defaultValue={formdata.userInfo.lastName}
                                className="form-control"
                                id="lastName"
                                placeholder="lName"
                              // onChange={(e) =>
                              //   setFormdata({
                              //     ...formdata,
                              //     userInfo: {
                              //       ...formdata.userInfo,
                              //       lastName: e.target.value == "" ? null : e.target.value,
                              //     },
                              //   })
                              // }
                              />
                              <Form.Label
                                htmlFor="lastName"
                                className="form-label"
                              >
                                Last Name
                              </Form.Label>
                              <p style={{ color: "red" }}>
                                {errors.lastName?.message}
                              </p>
                            </Form.Floating>
                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                // {...register("userInfo.lastName")}
                                type="text"
                                defaultValue={formdata.nickName}
                                className="form-control"
                                id="nickname"
                                placeholder="nick name"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formdata,
                                    nickName:
                                      e.target.value == ""
                                        ? null
                                        : e.target.value,
                                  })
                                }
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
                                // {...register("userInfo.lastName")}
                                type="text"
                                defaultValue={formdata.profileDescription}
                                className="form-control"
                                id="nickname"
                                placeholder="Profile Description"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formdata,
                                    profileDescription:
                                      e.target.value == ""
                                        ? null
                                        : e.target.value,
                                  })
                                }
                              />
                              <Form.Label
                                htmlFor="lname"
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
                                      // id="male"
                                      name="gender"
                                      value="Male"
                                      checked={
                                        formdata.userInfo.gender == "Male" &&
                                        true
                                      }
                                      className="form-check-input"
                                      onChange={(e) =>
                                        setFormdata({
                                          ...formdata,
                                          userInfo: {
                                            ...formdata.userInfo,
                                            gender: e.target.value,
                                          },
                                        })
                                      }
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
                                      // id="female"
                                      name="gender"
                                      value="Female"
                                      checked={
                                        formdata.userInfo.gender == "Female" &&
                                        true
                                      }
                                      className="form-check-input"
                                      onChange={(e) =>
                                        setFormdata({
                                          ...formdata,
                                          userInfo: {
                                            ...formdata.userInfo,
                                            gender: e.target.value,
                                          },
                                        })
                                      }
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
                                      // id="other"
                                      name="gender"
                                      value="Other"
                                      checked={
                                        formdata.userInfo.gender == "Other" &&
                                        true
                                      }
                                      className="form-check-input"
                                      onChange={(e) =>
                                        setFormdata({
                                          ...formdata,
                                          userInfo: {
                                            ...formdata.userInfo,
                                            gender: e.target.value,
                                          },
                                        })
                                      }
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
                              {/* <Controller
                              control={control}
                              name="gender"
                              render={({ field: { onChange, value } }) => (
                                <fieldset
                                  className="form-group"
                                  value={value}
                                  checked={value}
                                  onChange={onChange}
                                >
                                  <div>
                                    <div className="form-check custom-radio form-check-inline">
                                      <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="1"
                                        className="form-check-input"
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
                                        value="2"
                                        className="form-check-input"
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
                                        value="3"
                                        className="form-check-input"
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
                              )}
                            /> */}
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6 form-floating date-input">
                              <Form.Label htmlFor="dob" className="form-label">
                                Date Of Birth
                              </Form.Label>
                              <DatePicker
                                selected={moment(
                                  formdata.userInfo.dateOfBirth
                                ).toDate()}
                                preventOpenOnFocus={true}
                                dateFormat="dd-MMM-yyyy"
                                placeholderText="DD-MMM-YYYY"
                                // onBlur={onChange}
                                onChange={(date) => {
                                  const formatedDate =
                                    moment(date).format("dd-MMM-yyyy");
                                  // console.log("date", formatedDate);
                                  setFormdata({
                                    ...formdata,
                                    userInfo: {
                                      ...formdata.userInfo,
                                      dateOfBirth: date,
                                    },
                                  });
                                  // onBlur();
                                }}
                                className="form-control"
                              />
                              {/* <Controller
                              name="userInfo.dateOfBirth"
                              control={control}
                              render={({
                                field: { name, value, onChange, onBlur },
                              }) => (
                                <DatePicker
                                  selected={value}
                                  preventOpenOnFocus={true}
                                  dateFormat="dd-MMM-yyyy"
                                  placeholderText="dd-MMM-yyyy"
                                  onBlur={onBlur}
                                  onChange={(date) => {
                                    onChange(date);
                                    // onBlur();
                                  }}
                                  className="form-control"
                                />
                              )}
                            /> */}
                            </Form.Group>
                            <Form.Floating className="form-group col-sm-6">
                              <Form.Select
                                // defaultValue={user.maritalStatusInfo? user.maritalStatusInfo:''}
                                value={formdata.maritalStatus}
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formdata,
                                    maritalStatus:
                                      e.target.value == ""
                                        ? null
                                        : e.target.value,
                                  })
                                }
                              >
                                <option value="">Select Status</option>
                                {relationStatus &&
                                  relationStatus.map((rel) => {
                                    return (
                                      <option key={rel._id} value={rel._id}>
                                        {rel.dropdownValue}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <Form.Label className="form-label">
                                Marital Status
                              </Form.Label>
                            </Form.Floating>

                            {/* <Form.Floating className="form-group col-sm-6">
                            <Form.Select
                              value={formdata.userInfo.country}
                              className="form-select"
                              aria-label="Default select example 3"
                              onChange={(e) => handleCountry(e)}
                            >
                              <option value="" >Select Country</option>
                              {countries?.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </Form.Select>


                            <Form.Label className="form-label">
                              Country
                            </Form.Label>
                          </Form.Floating> */}

                            <div className="form-floating form-group col-sm-6">
                              {countriesDataArrayObj &&
                                formdata.userInfo.country && (
                                  <>
                                    {console.log(
                                      formdata.userInfo.country,
                                      "sdfsfsdfd"
                                    )}
                                    <Controller
                                      name="country"
                                      control={control}
                                      render={({ field }) => (
                                        <AsyncSelect
                                          {...field}
                                          defaultOptions={countriesDataArrayObj}
                                          loadOptions={promiseOptions}
                                          classNames="form-select"
                                          id="floatingSelect"
                                          defaultValue={
                                            selectedCountriesDataArrayObj
                                          }
                                        // hideSelectedOptions={false}
                                        />
                                      )}
                                    />
                                  </>
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
                                for="floatingSelect"
                              >
                                Country
                              </label>
                            </div>

                            {/* <Form.Floating className="form-group col-sm-6">
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                // defaultValue={colourOptions[0]}
                                isDisabled={isDisabled}
                                isLoading={isLoading}
                                isClearable={isClearable}
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                name="color"
                                options={countries}
                              />
                          </Form.Floating> */}
                            {/* <Form.Floating className="form-group col-sm-6">
                              <AsyncSelect 
                                // value={formdata.userInfo.country}
                                // defaultInputValue={setCountryLabel}
                                defaultOptions={countriesDataArrayObj} 
                                loadOptions={promiseOptions} 
                                onChange={(selectedOptions ,e) => {
                                  setFormdata({
                                    ...formdata,
                                    userInfo:{
                                      ...formdata.userInfo, country:selectedOptions.value
                                    }
                                  }),
                                  setCountryLabel(selectedOptions.label)
                                }}
                              />
                            <Form.Label className="form-label">
                              Country:
                            </Form.Label>
                          </Form.Floating> */}
                            <Form.Floating className="form-group col-sm-6">
                              <Form.Select
                                value={formdata.state}
                                className="form-select"
                                aria-label="Default select example 4"
                                onChange={(e) => handleState(e)}
                              >
                                <option value="">Select State</option>
                                {allStates.map((ele) => {
                                  return (
                                    <option key={ele.id} value={ele.id}>
                                      {ele.name}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <Form.Label className="form-label">
                                State
                              </Form.Label>
                            </Form.Floating>
                            <Form.Floating className="form-group col-sm-6">
                              {/* <Form.Control
                              // {...register("city")}
                              type="text"
                              defaultValue={formdata.city}
                              className="form-control"
                              id="cname"
                              placeholder="Atlanta"
                              onChange={(e) =>
                                setFormdata({
                                  ...formdata,
                                  city: null,
                                })
                              }
                            />
                            <Form.Label htmlFor="cname" className="form-label">
                              City:
                            </Form.Label> */}
                              <Form.Select
                                value={formdata.city}
                                className="form-select"
                                aria-label="Default select example 4"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formdata,
                                    city:
                                      e.target.value == ""
                                        ? null
                                        : e.target.value,
                                  })
                                }
                              >
                                <option value="">Select City</option>
                                {allCities.map((ele) => {
                                  return (
                                    <option key={ele.id} value={ele.id}>
                                      {ele.name}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <Form.Label className="form-label">
                                City
                              </Form.Label>
                            </Form.Floating>
                            {/* <Form.Floating className="form-group col-sm-12"> */}
                            {/* <textarea
                              // as="textarea"
                              className="form-control"
                              rows={5}
                              
                              style={{ lineHeight: "32px" }}
                              placeholder=" 37 Cardinal Lane
                                                  Petersburg, VA 23803
                                                  United States of America
                                                  Zip Code: 85001"
                              onChange={(e) =>
                                setFormdata({
                                  ...formdata,
                                  address: e.target.value,
                                })
                              }
                            >{formdata.address}</textarea> */}
                            {/* <Form.Control as="textarea" rows={10}
                              className="form-control"

                              onChange={(e) =>
                                setFormdata({
                                  ...formdata,
                                  address: e.target.value,
                                })
                              }
                              style={{ lineHeight: "32px" }}
                              placeholder="enger"
                            >

                              dfdf
                            </Form.Control> */}
                            {/* <Form.Label className="form-label">
                              Address:
                            </Form.Label>
                          </Form.Floating> */}

                            <Form.Floating className="mb-3">
                              <Form.Control
                                className="form-control"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formdata,
                                    address:
                                      e.target.value == ""
                                        ? null
                                        : e.target.value,
                                  })
                                }
                                style={{ lineHeight: "32px" }}
                                placeholder="Entere Address"
                                as="textarea"
                                rows={5}
                                defaultValue={formdata.address}
                              />
                              <Form.Label>Address</Form.Label>
                            </Form.Floating>
                            <Form.Floating className="form-group col-sm-6">
                              <Form.Control
                                // {...register("city")}
                                type="text"
                                defaultValue={formdata.pinCode}
                                className="form-control"
                                id="cname"
                                placeholder="Atlanta"
                                onChange={(e) =>
                                  setFormdata({
                                    ...formdata,
                                    pinCode:
                                      e.target.value == ""
                                        ? null
                                        : e.target.value,
                                    Label,
                                  })
                                }
                              />
                              <Form.Label
                                htmlFor="cname"
                                className="form-label"
                              >
                                Pincode
                              </Form.Label>
                            </Form.Floating>
                          </Row>
                          <div className="p-4 pt-0">
                            <Button
                              type="submit"
                              className="btn btn-primary me-2"
                            >
                              Submit
                            </Button>
                            <Button type="reset" className="btn bg-soft-danger">
                              Cancel
                            </Button>
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
                        <Form onSubmit={updatePersonalInfo}>
                          <Form.Floating className="form-group">
                            <Form.Control
                              type="text"
                              className="form-control"
                              id="cno"
                              defaultValue={formdata.phoneNumber}
                              onChange={(e) =>
                                setFormdata({
                                  ...formdata,
                                  phoneNumber: e.target.value,
                                })
                              }
                            />
                            <Form.Label htmlFor="cno" className="form-label">
                              Contact Number
                            </Form.Label>
                          </Form.Floating>
                          {/* <Form.Floating className="form-group">
                          <Form.Control
                            
                            type="text"
                            className="form-control"
                            id="email"
                            value={formdata.userInfo.userName}
                            // onChange={(e) =>
                            //   setFormdata({
                            //     ...formdata,
                            //     userInfo: {
                            //       ...formdata.userInfo,
                            //       userName: e.target.value,
                            //     },
                            //   })
                            // }
                          />
                          <Form.Label htmlFor="email" className="form-label">
                            Username:
                          </Form.Label>
                        </Form.Floating> */}
                          <Form.Floating className="form-group">
                            <Form.Control
                              type="text"
                              className="form-control"
                              id="url"
                              defaultValue={formdata.siteUrl}
                              onChange={(e) =>
                                setFormdata({
                                  ...formdata,
                                  siteUrl: e.target.value,
                                })
                              }
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

export const getServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all`
  );
  const countries = await getCountryData();

  // const res = await axios.get(
  //   `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all`
  // );
  // const countries = await res.data.body;

  // let newArrayOBj1 = []

  // countries.forEach(element => {
  //   const data = { value: element.id, label: element.name }
  //   return newArrayOBj1.push(data)
  // });

  return {
    props: {
      countries,
    },
  };
};
