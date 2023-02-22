import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

//image
import user1 from "../../../../public/assets/images/user/25.png";

const RightSidebar = () => {
  const minirightsidebar = () => {
    document.getElementById("rightSidebar").classList.toggle("right-sidebar");
    document.body.classList.toggle("right-sidebar-close");
  };

  const friendsList = useSelector(
    (state) => state?.friends?.friendList?.friendsList
  );
  console.log(friendsList, "friendsList")

  return (
    <>
      {(friendsList && friendsList.length > 0)
        &&
        <div className="right-sidebar-mini" id="rightSidebar">
          <div className="right-sidebar-panel p-0">
            <Card className="shadow-none">
              <Card.Body className="p-0">
                <div className="media-height p-3" data-scrollbar="init">
                  {friendsList &&
                    friendsList.map((userData, index) => {
                      return (
                        <Link
                          href={`chat?chatId=${userData?._id}`}
                          key={index}
                        >
                          <div className="d-flex align-items-center mb-4">
                            <div className="iq-profile-avatar status-online">
                              <Image
                                className="rounded-circle avatar-50"
                                src={
                                  userData?.profileInfo?.profilePictureInfo
                                    ?.file?.location || user1
                                }
                                alt="profile-bg"
                                height={100}
                                width={100}
                                style={{
                                  maxHeight: "150px",
                                  objectfit: "cover",
                                }}
                                loading="lazy"
                              />
                            </div>
                            <div className="ms-3">
                              <h6 className="mb-0">
                                {userData?.firstName || ""}{" "}
                                {userData?.lastName || ""}
                              </h6>
                              <p className="mb-0">6:45</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
                <div
                  className="right-sidebar-toggle bg-primary text-white mt-3 d-flex"
                  onClick={minirightsidebar}
                >
                  <span className="material-symbols-outlined">chat</span>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      }
    </>
  );
};

export default RightSidebar;
