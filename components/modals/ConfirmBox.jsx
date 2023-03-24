import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
  groupActionService,
  leaveGroupService,
} from "../../services/groups.service";
import { allJoinedGroupList, getAllGroupsList } from "../../store/groups";

function ConfirmBox(props) {
  const [reason, setReason] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const leaveGroup = async () => {
    let data = {
      memberRemoveByAdmin: false,
      memberId: props.memberid,
    };
    const res = await leaveGroupService(props.groupid, data);
    console.log(res);
    if (res?.success) {
      props.onHide();
      dispatch(getAllGroupsList(1));
      dispatch(allJoinedGroupList());
      router.push("/groups/discover-groups");
    }
  };

  const deleteGroup = async () => {
    const res = await groupActionService(props.groupid, {
      action: "Delete",
      actionData: {
        reason: reason,
        pauseTime: new Date(),
      },
    });
    if (res?.success) {
      props.onHide();
      dispatch(getAllGroupsList(1));
      dispatch(allJoinedGroupList());
      router.push("/groups/discover-groups");
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4> {props?.message || "Message not found"}</h4>
        </Modal.Title>
      </Modal.Header>
      {props.groupid && !props.memberid && (
        <Modal.Body>
          <Form>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="Reason"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <label htmlFor="floatingInputCustom">Reason</label>
            </Form.Floating>
          </Form>
        </Modal.Body>
      )}
      <Modal.Footer>
        {props?.memberid && <Button onClick={leaveGroup}>Leave</Button>}
        {props?.groupid && !props.memberid && (
          <Button onClick={deleteGroup}>Delete</Button>
        )}
        <Button onClick={props.onHide}>
          {props.groupid ? "Cancel" : "Close"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmBox;
