import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup
  .object({
    messageInput: yup.string().required("Please write something"),
  })
  .required();

const SendMessageInput = ({ sendMsg }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
      sendMsg(data.messageInput);
      reset();
    };
  
    return (
      <>
        <div className="chat-footer p-3 bg-white">
          <form
            className="d-flex align-items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Control
              {...register("messageInput")}
              type="text"
              className="me-3"
              placeholder="Type your message"
            />
            <Button type="submit" variant="primary d-flex align-items-center">
              <i className="far fa-paper-plane" aria-hidden="true"></i>
              <span className="d-sm-block ms-1">Send</span>
            </Button>
          </form>
          {errors.messageInput && (
            <div className=" pc-3 text-danger">{errors.messageInput.message}</div>
          )}
        </div>
      </>
    );
  };

export default SendMessageInput;
