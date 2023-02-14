import { Row, Col, Container, Form, Button } from "react-bootstrap";

import img1 from "../../../public/assets/images/page-img/profile-bg1.jpg";
import Card from "../../../components/Card";
import Default from "../../../layouts/default";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateGroup } from "../../../services/groups.service";
import Link from "next/link";
import { GroupPicUploader } from "../../../components/ImageDropzone/GroupPicUploader";
//validate the input field using yup
const schema = yup.object({
  groupName: yup.string().required("groupname is required"),
  groupDescription: yup.string().required("group description is required"),
});

const GroupSetting = () => {
  const [groupPicModalShow, setGroupPicModalShow] = useState(false);
  const privacyTypeId = useSelector((state) => state?.groups?.groupPrivacy);
  const router = useRouter();
  const { groupid } = router.query;
  const user = useSelector((state) => state.user.data);

  const groupData = useSelector((state) => state?.groups?.groupInfo);

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

  const handleClick = () => {
    router.push(`/groups/${groupid}`);
  };
  const onSubmit = async (data) => {
    const payload = { ...data, isGroupImageRemoved: false };
    await updateGroup(payload, groupid).then((res) => {
      console.log(res);
      if (res?.success === true) {
        router.push(`/groups/${groupid}`);
      }
    });
  };
  return (
    <>
      <GroupPicUploader
        show={groupPicModalShow}
        onHide={() => setGroupPicModalShow(false)}
      />
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
                  <div
                    className="position-relative justify-content-center"
                    style={{ width: "100%", height: "250px" }}
                  >
                    <Image
                      loading="lazy"
                      src={user?.coverPictureInfo?.file?.location || img1}
                      alt="profile-bg"
                      className="rounded img-fluid"
                      layout="fill"
                      objectfit="contain"
                    />
                    <ul
                      className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0"
                      style={{ zIndex: "1" }}
                    >
                      <li onClick={() => setGroupPicModalShow(true)}>
                        <Link href="#" className="material-symbols-outlined">
                          photo_camera
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/user/user-account-setting"
                          className="material-symbols-outlined"
                        >
                          settings
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* <Form.Floating>
                      <div className="user-detail text-center mb-3">
                        <div
                          className="profile-img "
                          style={{ position: "relative" }}
                        >
                          <Image
                            loading="lazy"
                            // src={user?.profilePictureInfo?.file?.location || img2}
                            alt="profile-img1"
                            className="avatar-130 img-fluid"
                            width={100}
                            height={100}
                          />
                          <div
                            className="p-image d-flex justify-content-center align-items-center"
                            style={{ position: "absolute", left: "53%" }}
                            onClick={() => setProfilePicModalShow(true)}
                          >
                            <span className="material-symbols-outlined upload-button text-white">
                              photo_camera
                            </span>
                          </div>
                        </div>
                      </div>
                    </Form.Floating> */}
                    <Form.Floating className>
                      <Form.Control
                        id="groupname"
                        type="text"
                        placeholder="Group Name"
                        name="groupName"
                        defaultValue={groupData?.groupName}
                        {...register("groupName")}
                      />
                      <label htmlFor="groupname">Group Name</label>
                      {errors.groupName && (
                        <p style={{ textAlign: "left", color: "red" }}>
                          {errors?.groupName?.message}
                        </p>
                      )}
                    </Form.Floating>
                    <Form.Floating className="mb-3 mt-3">
                      <Form.Control
                        className="form-control"
                        {...register("groupDescription")}
                        style={{ lineHeight: "50px", overflow: "hidden" }}
                        placeholder="Enter group description"
                        as="textarea"
                        rows={3}
                        cols={10}
                      />
                      <Form.Label>Group-description</Form.Label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Select
                        {...register("privacyTypeId")}
                        id="privacyTypeId"
                      >
                        {privacyTypeId?.map((privacy) => (
                          <option
                            className="text-capitalize"
                            key={privacy._id}
                            value={privacy._id}
                          >
                            {privacy.dropdownValue}
                          </option>
                        ))}
                      </Form.Select>
                      <label htmlFor="privacyTypeId">Privacy</label>
                      {errors.privacyType && (
                        <div className="text-danger">
                          {errors.privacyType.message}
                        </div>
                      )}
                    </Form.Floating>
                    <div className="d-flex justify-content-end ">
                      <div className="d-inline-block ">
                        <button
                          type="submit"
                          className="btn btn-soft-primary mx-3"
                          onClick={handleClick}
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="d-inline-block ">
                        <button type="submit" className="btn btn-primary ">
                          update
                        </button>
                      </div>
                    </div>
                  </Form>
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
