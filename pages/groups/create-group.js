import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Card, Container } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { createGroup } from "../../services/groups.service";
import Image from "next/image";
import FileBase64 from "react-filebase64";
import small1 from "../../public/assets/images/small/07.png";
import Default from "../../layouts/default";
import { useDispatch, useSelector } from "react-redux";
import { getGroupPrivacyKeys } from "../../store/groups";
import Head from "next/head";

const CreateGroup = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const dispatch = useDispatch();

  const groupPrivacy = useSelector((state) => state?.groups?.groupPrivacy);

  const schema = yup
    .object({
      groupName: yup.string().required("groupname is required").max(75),
      privacyType: yup.string().required(),
    })
    .required();

  //form validate and config
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getGroupPrivacyKeys());
  }, []);

  const onSubmit = (data) => {
    let trimmedGroupName = data.groupName.trimStart();

    const payload = {
      groupName: trimmedGroupName,
      privacyTypeId: data.privacyType,
      file: selectedFile,
    };

    createGroup(payload)
      .then((res) => console.log("response", res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Head>
        <title>Create Group</title>
      </Head>

      <center>
        <Default>
          <Container>
            <Card style={{ width: "900px", height: "300px", padding: "20px" }}>
              <Form
                className="mt-4"
                style={{ height: "200px", width: "800px" }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Form.Floating className="mb-3" style={{ textAlign: "left" }}>
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
                <Form.Floating className="mb-3">
                  <Form.Select {...register("privacyType")} id="privacyType">
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
                {selectedFile[0] ? (
                  <div
                    style={{
                      width: "15%",
                      border: "1px dotted #000",
                      position: "relative",
                    }}
                  >
                    <img
                      loading="lazy"
                      src={selectedFile[0].base64}
                      alt="icon"
                      width={100}
                      height={100}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "#000",
                        color: "#fff",
                        display: "flex",
                        borderRadius: "50%",
                      }}
                    >
                      close
                    </div>
                  </div>
                ) : null}
                <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                  <li className="col-md-6 mb-3 position-relative">
                    <div className="bg-soft-primary rounded p-2 pointer me-3 ">
                      <Image
                        loading="lazy"
                        src={small1}
                        alt="icon"
                        className="img-fluid"
                      />
                      Photo
                    </div>
                    <div style={{ position: "absolute", top: 0, opacity: 0 }}>
                      <FileBase64
                        multiple={true}
                        onDone={(files) => {
                          console.log("files onDone: ", files);
                          setSelectedFile(files[0].file);
                          const reqFiles = [];
                          for (var i = 0; i < files.length; i++) {
                            reqFiles.push(files[i].file);
                            // console.log("reqFile: ", reqFiles);
                          }
                        }}
                      />
                    </div>
                  </li>
                </ul>
                <center>
                  <div className="d-inline-block w-100">
                    <button
                      type="submit"
                      disabled={!isDirty || !isValid ? true : false}
                      className="btn btn-primary float-end"
                    >
                      Create Group
                    </button>
                  </div>
                </center>
              </Form>
            </Card>
          </Container>
        </Default>
      </center>
    </div>
  );
};

export default CreateGroup;