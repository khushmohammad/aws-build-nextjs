import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Auth from "../../../layouts/auth";
const MailId = () => {
  const [apiError, setApiError] = useState(null);
  const { query } = useRouter();

  const { uuid } = query;
  // console.log("uuid", uuid);

  const verifyEmail = async () => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/users/verification//email/signup/${uuid}`
      );
    } catch (err) {
      setApiError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (uuid !== undefined) {
      verifyEmail();
    }
  }, [uuid]);

  return (
    <Auth>
      <div className="">
        {!apiError ? (
          <>
            <div className="sign-in-from justify-content-center align-items-start d-flex flex-column mt-lg-5 pt-lg-5">
              <h1 className="my-3 h2">
                Your Email has been verified successfully.
              </h1>
              <h2 className="h4 mb-4">
                Your account will be activated within next 24 hours.
              </h2>
              <Link className="btn btn-primary mt-3" href="/">
                <span className="d-flex align-items-center">
                  <i className="material-symbols-outlined md-18 me-1">home</i>
                  Back to Home
                </span>
              </Link>
            </div>
          </>
        ) : (
          <h1 className="mb-4 text-5xl font-medium leading-tight">
            {apiError}
          </h1>
        )}
      </div>
    </Auth>
  );
};

export default MailId;
