import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user1 from "../../public/assets/images/user/25.png";
import { invitationAcceptAndDelineService } from "../../services/groups.service";
import { groupInvitationList } from "../../store/groups";

function GroupInvitation() {
  const [apiError, setApiError] = useState();
  const groupInvitations = useSelector((state) => state?.groups?.groupInvited);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(groupInvitationList());
  }, []);

  const AcceptOrRejectReq = async (invitationId, invitationAction) => {
    const res = await invitationAcceptAndDelineService(
      invitationId,
      invitationAction
    );
    if (res == true) {
      dispatch(groupInvitationList());
    } else {
      setApiError("Already did an action.");
    }
  };

  return (
    <div>
      {apiError && apiError}
      {groupInvitations?.map((data, index) => {
        return (
          <React.Fragment key={index}>
            <div className="iq-friend-request">
              <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {data.groupInfo && (
                    <Image
                      className="rounded-circle img-fluid"
                      src={
                        data.groupInfo?.groupImageInfo?.file?.location || user1
                      }
                      alt=""
                      height={53}
                      width={53}
                    />
                  )}
                  <div className="ms-3">
                    <h4 className="mb-0 ">{data?.groupInfo?.groupName}</h4>
                    <p className="mb-0">
                      {data?.groupInfo?.memberCount} Member
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    onClick={() => AcceptOrRejectReq(data?.userId, "1")}
                    className="me-3 btn btn-primary rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => AcceptOrRejectReq(data?.userId, "0")}
                    className="me-3 btn btn-secondary rounded"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {groupInvitations?.length === 0 && (
        <div className="card-body text-center">
          <h5 className="card-title">No Request Found!</h5>
        </div>
      )}
    </div>
  );
}

export default GroupInvitation;
