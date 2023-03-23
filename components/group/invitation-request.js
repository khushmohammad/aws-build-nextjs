import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
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
    if (res?.success) {
      dispatch(groupInvitationList());
      setApiError(res?.message);
    } else {
      setApiError("Already did an action.");
    }
  };

  return (
    <div>
      {apiError && (
        <p
          style={{
            backgroundColor: "green",
            width: "50%",
            padding: "5px",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          {apiError && apiError}
        </p>
      )}
      {groupInvitations?.map((data, index) => {
        return (
          <Card key={index}>
            <Card.Body>
              <div className="iq-friend-request">
                <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                  <div>
                    <p>
                      <strong>
                        {data?.requesterData?.firstName}{" "}
                        {data?.requesterData?.lastName}
                      </strong>{" "}
                      invited you to join this group
                    </p>
                    <div className="d-flex align-items-center">
                      <div>
                        {data.groupInfo && (
                          <Image
                            className="rounded-circle"
                            src={
                              data?.groupInfo?.groupImageInfo?.file?.location ||
                              user1
                            }
                            alt="group-image"
                            height={60}
                            width={60}
                          />
                        )}
                      </div>
                      <div className="ms-3">
                        <h4 className="mb-0 ">{data?.groupInfo?.groupName}</h4>
                        <p className="mb-0">
                          {data?.groupInfo?.memberCount} Member
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => AcceptOrRejectReq(data?._id, "1")}
                      className="me-3 btn btn-primary rounded"
                    >
                      Join Request
                    </button>
                    <button
                      onClick={() => AcceptOrRejectReq(data?._id, "0")}
                      className="me-3 btn btn-secondary rounded"
                    >
                      Decline Request
                    </button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        );
      })}
      {groupInvitations?.length === 0 && (
        <div className="card-body text-center">
          <h5 className="card-title">No group invitation!</h5>
        </div>
      )}
    </div>
  );
}

export default GroupInvitation;
