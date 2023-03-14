import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import user1 from "../../public/assets/images/user/25.png";

const MessageView = ({ data }) => {
  const user = useSelector((state) => state.user.data);

  return (
    <>
      <div className="chat-user">
        <Link className="avatar m-0" href="">
          <Image
            loading="lazy"
            src={user?.coverPictureInfo?.file?.location || user1}
            height={100}
            width={100}
            alt="avatar"
            className="avatar-35 "
          />
        </Link>
        <span className="chat-time mt-1">
          <p className="mb-0 text-primary">
            {(data && moment(data.createdAt).fromNow()) || ""}
          </p>
        </span>
      </div>
      <div className="chat-detail m-2">
        <div className="chat-message m-0">
          <p>{data.message}</p>
          {/* <p className='' >{data._id}</p> */}
        </div>
      </div>
      <span role="button" className="material-symbols-outlined"></span>
    </>
  );
};

export default MessageView;
