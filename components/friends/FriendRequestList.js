import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import user1 from "../../public/assets/images/user/1.jpg";
import { AcceptAndRejectfriendRequest } from '../../services/friends.service';
import { getAllFriendsRequestsList } from '../../store/friends/friendsRequests';


function FriendRequestList() {

    const [apiError, setApiError] = useState();
    const friendRequestList = useSelector((state) => state?.friendsRequests?.FriendsRequests)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllFriendsRequestsList())
    }, [])
    const AcceptOrRejectReq = async (reqId, requestStatus) => {
        // console.log(reqId, "reqId");
        const res = await AcceptAndRejectfriendRequest(reqId, requestStatus);
        // console.log(res, "res");       
        if (res == true) {
            dispatch(getAllFriendsRequestsList())
            if (requestStatus == "accepted") {
                setApiError("Request Accepted");
            } else {
                setApiError("Request Rejected");
            }
        } else {
            setApiError("Request is not Accepted or Rejected,please try again later");
        }
        // setFriendReq(friendRequestList)
    };


    return (
        <div>
            {apiError && apiError}

            {friendRequestList &&
                friendRequestList.map((data, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="iq-friend-request">
                                <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        {data.friendRequestBy &&
                                            <Image
                                                className="rounded-circle img-fluid"
                                                src={data.friendRequestBy?.profilePictureInfo?.file?.location || user1}
                                                alt=""
                                                height={53}
                                                width={53}
                                            />
                                        }
                                        <div className="ms-3">
                                            <h6 className="mb-0 "> {data.friendRequestBy &&
                                                `${data.friendRequestBy.userInfo.firstName}   ${data.friendRequestBy.userInfo.lastName} `}</h6>
                                            <p className="mb-0">40 friends</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button

                                            onClick={() =>
                                                AcceptOrRejectReq(data?.userId, "accepted")
                                            }
                                            className="me-3 btn btn-primary rounded"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() =>
                                                AcceptOrRejectReq(data?.userId, "rejected")
                                            }
                                            className="me-3 btn btn-secondary rounded"
                                        >
                                            Delete Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            {friendRequestList && friendRequestList.length === 0 && (
                <div className="card-body text-center">
                    <h5 className="card-title">No Request Found!</h5>
                </div>
            )}
        </div>
    )
}

export default FriendRequestList