import Link from "next/link";
import Auth from "../../../layouts/auth";
const Reset = () => {
  return (
    <Auth>
      <div className="sign-in-from justify-content-center align-items-start d-flex flex-column mt-lg-5 pt-lg-5">
        <h1 className="my-3 h2">
          Link has been sent to your registered email address.
        </h1>
        <h2 className="h4 mb-4">Check your mail to reset password</h2>
        <Link className="btn btn-primary mt-3" href="/">
          <span className="d-flex align-items-center">
            <i className="material-symbols-outlined md-18 me-1">home</i>Back to
            Home
          </span>
        </Link>
      </div>
    </Auth>
  );
};

export default Reset;
