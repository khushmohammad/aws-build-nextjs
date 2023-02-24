import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Auth from "../../layouts/auth";
import ReCAPTCHA from "react-google-recaptcha";

const schema = yup
  .object({
    userName: yup.string().required("Email is required").email(),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  const [ShowPage, setShowPage] = useState(null);
  const [ApiError, setApiError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [verified, setVerified] = useState(false);
  const [remember, setRemember] = useState(true);

  const router = useRouter();

  //config form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onChangeValue = (value) => {
    setVerified(true);
  };
  //check valid user
  const GetSession = async () => {
    const session = await getSession();
    if (session) {
      router.push("/");
    } else {
      setShowPage(true);
    }
  };

  useEffect(() => {
    GetSession();
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
    handleClick(data);
  };

  const handleClick = async (data) => {
    const userdata = JSON.stringify(data);
    console.log("data::", userdata);
    try {
      const res = await signIn("credentials", {
        userdata,
        redirect: false,
        callbackUrl: "/",
      });

      if (res.ok) {
        router.push("/");
      } else {
        setApiError("Invalid User Name or Password");
      }
    } catch (err) {
      setApiError(`Something went wrong in api`);
    }
  };

  const loginWithProvider = async (loginProvider) => {
    await signIn(loginProvider, {
      callbackUrl: "http://localhost:3000/auth/lock-screen",
    });
  };

  return (
    <>
      {/* {JSON.stringify(process.env.NEXT_PUBLIC_API_PATH)} */}
      {ShowPage && ShowPage ? (
        <Auth>
          <div className="sign-in-from">
            <h1 className="mb-0">Login</h1>
            {/* <p>Enter your email address and password to access admin panel.</p> */}
            {ApiError && ApiError ? (
              <div className="p-2 my-2 text-center text-danger bg-dark">
                {ApiError}
              </div>
            ) : null}
            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Form.Floating>
                  <Form.Control
                    {...register("userName")}
                    id="floatingInputCustom"
                    type={showEmail ? "text" : "email"}
                    placeholder="name@example.com"
                    className="form-control"
                    required
                  />
                  <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
                {errors.userName && (
                  <p style={{ color: "red" }}>{errors.userName.message}</p>
                )}
              </div>

              <div className="mb-2">
                <Form.Floating>
                  <Form.Control
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  <span
                    role="button"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="icon cursor-pointer material-symbols-outlined material-icons-outlined position-absolute top-50 pwd-icon translate-middle-y"
                  >
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </Form.Floating>
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
              </div>
              <Link href="/auth/forgot-password" className="float-start mb-3">
                Forgot password?
              </Link>
              <div className="d-inline-block w-100">
                <Form.Check className="d-inline-block mt-2 pt-1 p-3">
                  <Form.Check.Input
                    type="checkbox"
                    className="me-2"
                    id="customCheck11"
                    defaultChecked
                    {...register("remember")}
                  />
                  <Form.Check.Label>Remember Me</Form.Check.Label>
                </Form.Check>
                <div className="mb-3 ">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
                    onChange={onChangeValue}
                  />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="float-end"
                  disabled={!verified}
                >
                  Login
                </Button>
              </div>
              <div className="sign-info">
                <span className="dark-color d-inline-block line-height-2">
                  Don't have an account?{" "}
                  <Link href="/auth/register">Register</Link>
                </span>
                <ul className="iq-social-media">
                  <li>
                    <Link href="" onClick={() => loginWithProvider("facebook")}>
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <title>facebook</title>
                        <path d="M15 16h-14c-0.553 0-1-0.447-1-1v-14c0-0.553 0.447-1 1-1h14c0.553 0 1 0.447 1 1v14c0 0.553-0.447 1-1 1zM14 2h-12v12h12v-12zM8 6c0-1.103 0.912-2 1.857-2h1.143v2h-1v1h1v2h-1v3h-2v-3h-1v-2h1v-1z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="" onClick={() => loginWithProvider("google")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-google"
                        viewBox="0 0 16 16"
                      >
                        <title>Google</title>
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
                      </svg>
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        viewBox="0 0 24 28"
                        fill="currentColor"
                      >
                        <title>instagram</title>
                        <path d="M16 14c0-2.203-1.797-4-4-4s-4 1.797-4 4 1.797 4 4 4 4-1.797 4-4zM18.156 14c0 3.406-2.75 6.156-6.156 6.156s-6.156-2.75-6.156-6.156 2.75-6.156 6.156-6.156 6.156 2.75 6.156 6.156zM19.844 7.594c0 0.797-0.641 1.437-1.437 1.437s-1.437-0.641-1.437-1.437 0.641-1.437 1.437-1.437 1.437 0.641 1.437 1.437zM12 4.156c-1.75 0-5.5-0.141-7.078 0.484-0.547 0.219-0.953 0.484-1.375 0.906s-0.688 0.828-0.906 1.375c-0.625 1.578-0.484 5.328-0.484 7.078s-0.141 5.5 0.484 7.078c0.219 0.547 0.484 0.953 0.906 1.375s0.828 0.688 1.375 0.906c1.578 0.625 5.328 0.484 7.078 0.484s5.5 0.141 7.078-0.484c0.547-0.219 0.953-0.484 1.375-0.906s0.688-0.828 0.906-1.375c0.625-1.578 0.484-5.328 0.484-7.078s0.141-5.5-0.484-7.078c-0.219-0.547-0.484-0.953-0.906-1.375s-0.828-0.688-1.375-0.906c-1.578-0.625-5.328-0.484-7.078-0.484zM24 14c0 1.656 0.016 3.297-0.078 4.953-0.094 1.922-0.531 3.625-1.937 5.031s-3.109 1.844-5.031 1.937c-1.656 0.094-3.297 0.078-4.953 0.078s-3.297 0.016-4.953-0.078c-1.922-0.094-3.625-0.531-5.031-1.937s-1.844-3.109-1.937-5.031c-0.094-1.656-0.078-3.297-0.078-4.953s-0.016-3.297 0.078-4.953c0.094-1.922 0.531-3.625 1.937-5.031s3.109-1.844 5.031-1.937c1.656-0.094 3.297-0.078 4.953-0.078s3.297-0.016 4.953 0.078c1.922 0.094 3.625 0.531 5.031 1.937s1.844 3.109 1.937 5.031c0.094 1.656 0.078 3.297 0.078 4.953z"></path>
                      </svg>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </Form>
          </div>
        </Auth>
      ) : null}
    </>
  );
};

export default Login;
