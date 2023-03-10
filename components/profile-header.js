import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const ProfileHeader = (props) => {
  const router = useRouter();

  const groupPrivilege = useSelector(
    (state) => state?.groups?.groupPrivilege?.canGroupBeDeleted
  );

  return (
    <>
      <div className="header-for-bg">
        <div className="background-header position-relative">
          <Image
            src={props.img}
            className="img-fluid w-100"
            alt="header-bg"
            height={400}
            width={900}
          />
          <div className="title-on-header">
            {props.title && (
              <div className="data-block">
                <h2>{props.title}</h2>
              </div>
            )}
          </div>
          {groupPrivilege ? (
            <>
              {router.pathname === "/groups/[groupId]" ? (
                <div
                  className="position-absolute"
                  style={{ right: "20%", bottom: "10px" }}
                >
                  <Link
                    href={`/groups/group-setting/${props.groupid}`}
                    className="btn btn-primary"
                  >
                    Group Setting
                  </Link>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ProfileHeader;
