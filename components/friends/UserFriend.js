import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "../Card";
import { useSelector } from "react-redux";
import user1 from "../../public/assets/images/user/25.png";

const UserFriend = () => {
  const userFriendList = useSelector(
    (state) => state?.friends?.friendList?.friendsList
  );

  return (
    <Card>
      <div className="card-header d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Friends</h4>
        </div>
        <div className="card-header-toolbar d-flex align-items-center">
          <p className="m-0">
            <Link href="/friends/find-friend">Add New</Link>
          </p>
        </div>
      </div>
      <Card.Body>
        <ul className="profile-img-gallary p-0 m-0 list-unstyled">
          {userFriendList&&userFriendList.map((data, index) => (
            <li key={index}>
              <Link href={`/friends/${data?._id}`}>
                <Image
                  loading="lazy"
                  src={
                    data.profileInfo?.profilePictureInfo?.file?.location ||
                    user1
                  }
                  alt="gallary"
                  className="img-fluid"
                  height={100}
                  width={100}
                />
                <h6 className="mt-2 text-center">
                  {data?.firstName} {data?.lastName}
                </h6>
              </Link>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default UserFriend;
