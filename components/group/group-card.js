import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";

// images
import gi1 from "../../public/assets/images/page-img/gi-1.jpg";
import img1 from "../../public/assets/images/page-img/profile-bg1.jpg";

const GroupCard = ({ groups, message }) => {
  return (
    <div className="d-grid gap-3 d-grid-template-1fr-19">
      {groups &&
        groups?.map((group, index) => (
          <Card key={index} className="mb-0">
            <div className="top-bg-image">
              <Image src={img1} className="img-fluid w-100" alt="group-bg" />
            </div>
            <Card.Body className=" text-center">
              <div className="group-icon">
                <Image
                  src={group?.groupInfo?.groupImage?.file?.location || gi1}
                  alt="profile-img"
                  className="rounded-circle img-fluid avatar-120"
                  height={100}
                  width={100}
                />
              </div>
              <div className="group-info pt-3 pb-3">
                <h4 className="text-capitalize">
                  <Link href={`/groups/${group?.groupInfo?._id}`}>
                    {group?.groupInfo?.groupName}
                  </Link>
                </h4>
                <p>Lorem Ipsum data</p>
              </div>
              <div className="group-details d-inline-block pb-3">
                <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                  <li className="pe-3 ps-3">
                    <p className="mb-0">Post</p>
                    <h6>{group?.groupInfo?.totalPosts}</h6>
                  </li>
                  <li className="pe-3 ps-3">
                    <p className="mb-0">Member</p>
                    <h6>{group?.groupInfo?.groupMembers}</h6>
                  </li>
                </ul>
              </div>

              <Link
                href={`/groups/${group?.groupId}`}
                type="submit"
                className="btn btn-primary d-block w-100"
              >
                Visit
              </Link>
            </Card.Body>
          </Card>
        ))}
      {groups?.length === 0 || groups === undefined ? (
        <Card className="mb-0">
          <div className="card-body text-center">
            <h5 className="card-title">{message}</h5>
            <Link href="/groups/discover-groups" className="btn btn-primary">
              Discover Group
            </Link>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

export default GroupCard;
