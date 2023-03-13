import Image from "next/image";
import Link from "next/link";

import error404 from "../public/assets/images/error/400.png";

function PageNotFound() {
  return (
    <div>
      <div className="wrapper">
        <div className="container p-0">
          <div className="row no-gutters height-self-center">
            <div className="col-sm-12 text-center align-self-center">
              <div className="iq-error position-relative mt-5">
                <Image
                  src={error404}
                  className="img-fluid iq-error-img"
                  alt=""
                />
                <h2 className="mb-0 text-center">
                  Oops! This Page is Not Found.
                </h2>
                <p className="text-center">
                  The requested page dose not exist.
                </p>
                <Link className="btn btn-primary mt-3" href="/">
                  <span className="d-flex align-items-center">
                    <i className="material-symbols-outlined md-18 me-1">home</i>
                    Back to Home
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
