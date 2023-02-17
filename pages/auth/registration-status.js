import Auth from "../../layouts/auth";

const RegistrationStatus = () => {
  return (
    <Auth>
      <div className="container flex flex-col m-12 m-auto mt-40 text-center"></div>
      <div className="sign-in-from justify-content-center align-items-start d-flex flex-column mt-lg-5 pt-lg-5">
        <div className="d-flex justify-content-center mb-4 w-100">
          <svg
            style={{ width: "20%" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-24 h-24 text-sky-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h1 className="my-3">Signup Successfull</h1>
        <h2 className="h4">
          Please check your mail for a link to verify your email address.{" "}
        </h2>
        <h2 className="h4 mb-4">
          Once verified, You will be able to continue.
        </h2>
        <p className="text-zinc-400 h4">
          Did not recieve an email?{" "}
          {/* <a className="text-blue-500 underline" href="#">
            Resend
          </a> */}
        </p>
      </div>
    </Auth>
  );
};

export default RegistrationStatus;
