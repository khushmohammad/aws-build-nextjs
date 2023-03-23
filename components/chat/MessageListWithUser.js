import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';
import user1 from "../../public/assets/images/user/25.png";

const MessageListWithUser = () => {

    const friendsList = useSelector(
        (state) => state?.friends?.friendList?.list
      );

      

  return (
    <>
    {friendsList &&
      friendsList.map((userData, index) => {
        return (
          <Link
            href={`/chat?chatId=${userData?._id}`}
            className="iq-sub-card"
            key={index}
          >
            <div className="d-flex  align-items-center">
              <div className="">
                <Image
                  className="avatar-40 rounded"
                  src={
                    userData?.profileInfo?.profilePictureInfo?.file
                      ?.location || user1
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
              <div className=" w-100 ms-3">
                <h6 className="mb-0 ">
                  {userData?.firstName || ""} {userData?.lastName || ""}
                </h6>
                <small className="float-left font-size-12">13 Jun</small>
              </div>
            </div>
          </Link>
        );
      })}

    <div className="text-center iq-sub-card">
      <Link href="/chat" className=" btn text-primary w-100">
        View All
      </Link>
    </div>
  </>
  )
}

export default MessageListWithUser