import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Image from "next/image";
import user5 from "../../public/assets/images/user/25.png";

const ModalPop = (props) => {
  const [query, setQuery] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [userIdArr, setUserIdArr] = useState([]);

  const friendList = useSelector(
    (state) => state?.friends?.friendList?.friendsList
  );

  useEffect(() => {
    props.getfriends(userIdArr);
  }, [userIdArr]);

  const handleAdd = (event, id) => {
    setUserInfo((prev) =>
      Boolean(!prev[id]) ? { ...prev, [id]: true } : { ...prev, [id]: false }
    );
    userInfo[id] == true
      ? setUserIdArr(userIdArr.filter((item) => item !== id))
      : setUserIdArr([...userIdArr, id]);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <div style={{ position: "sticky", top: "0", padding: "10px 15px" }}>
        <input
          type="text"
          placeholder="Search friends..."
          onChange={(e) => setQuery(e.target.value)}
          className="text search-input form-control bg-soft-primary  d-none d-lg-block p-2 "
        />

        <h4 className="m-2">Friends</h4>
      </div>
      <Modal.Body
        style={{
          maxHeight: "calc(100vh - 510px)",
          overflowY: "auto",
          minHeight: "490px",
        }}
      >
        {friendList &&
          friendList
            ?.filter((data) => data?.firstName.toLowerCase().includes(query))
            ?.map((data, index) => {
              return (
                <Card.Body key={index}>
                  <ul className="request-list list-inline m-0 p-0">
                    <li className="d-flex align-items-center  justify-content-between flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <Image
                          src={
                            data?.profileInfo?.profilePictureInfo?.file
                              ?.location || user5
                          }
                          alt="story-img"
                          className="rounded-circle avatar-40"
                          height={100}
                          width={100}
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="text-capitalize">
                          {data?.firstName} {data?.lastName}
                        </h6>
                        <p className="mb-0">40 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <div className="confirm-click-btn"></div>
                        {props.title == "friends-except" ? (
                          <Button
                            href="#"
                            onClick={(e) =>
                              handleAdd(e, data?.profileInfo?._id)
                            }
                            className="btn btn-secondary rounded"
                            data-extra-toggle="delete"
                            data-closest-elem=".item"
                          >
                            {userInfo[data?.profileInfo?._id] == true
                              ? "removed"
                              : "remove"}
                          </Button>
                        ) : (
                          <Button
                            href="#"
                            onClick={(e) =>
                              handleAdd(e, data?.profileInfo?._id)
                            }
                            className="btn btn-secondary rounded"
                            data-extra-toggle="delete"
                            data-closest-elem=".item"
                          >
                            {userInfo[data?.profileInfo?._id] == true
                              ? "Added"
                              : "Add"}
                          </Button>
                        )}
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              );
            })}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide(), props.onShow();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPop;
