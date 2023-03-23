import Image from "next/image";
import React from "react";
import { Card, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import user5 from "../../public/assets/images/user/25.png";

const ChatSidebarUserList = () => {
  const friendsList = useSelector((state) => state?.friends?.friendList?.list);
  const joinedGroupList = useSelector((state) => state?.groups?.joinedGroup);

  return (
    <>
      <Nav as="ul" variant="pills" className="iq-chat-ui nav flex-column">
        <h5>Friends</h5>

        {!friendsList || friendsList.length < 1 ? (
          <NoFoundCard message={"No User Found!"} />
        ) : (
          friendsList &&
          friendsList.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <UserList
                  id={data._id}
                  profileImage={
                    data?.profileInfo?.profilePictureInfo?.file?.location
                  }
                  name={data?.firstName + " " + data?.lastName}
                  
                />
              </React.Fragment>
            );
          })
        )}
        <h5>Groups</h5>

        {!joinedGroupList || joinedGroupList.length < 1 ? (
          <NoFoundCard message={"No User Found!"} />
        ) : (
          joinedGroupList &&
          joinedGroupList.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <UserList
                  id={data?.groupId}
                  profileImage={data?.groupInfo?.groupImage?.file?.location}
                  name={data?.groupInfo?.groupName}
                  
                />
              </React.Fragment>
            );
          })
        )}
      </Nav>
    </>
  );
};

const UserList = (props) => {
  const { id, profileImage, name } = props;
  return (
    <Nav.Item as="li">
      <Nav.Link eventKey={`${id}`}>
        <div className="d-flex align-items-center">
          <div className="avatar mx-2">
            <Image
              loading="lazy"
              src={profileImage || user5}
              alt="chatuserimage"
              className="avatar-50 "
              height={100}
              width={100}
            />
            <span className="avatar-status">
              <i className="material-symbols-outlined text-success  md-14 filled">
                circle
              </i>
            </span>
          </div>
          <div className="chat-sidebar-name">
            <h6 className="mb-0">{name || ""}</h6>
            {/* <span>Lorem Ipsum is</span> */}
          </div>
          <div className="chat-meta float-right text-center mt-2 me-1">
            <div className="chat-msg-counter bg-primary text-white">20</div>
            <span className="text-nowrap">05 min</span>
          </div>
        </div>
      </Nav.Link>
    </Nav.Item>
  );
};

const NoFoundCard = ({ message }) => {
  return (
    <Card>
      <Card.Body>{message || "No User Found!"}</Card.Body>
    </Card>
  );
};

export default ChatSidebarUserList;
