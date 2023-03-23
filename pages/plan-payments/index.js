import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Default from "../../layouts/default";
import { getAllPlans } from "../../store/subscription";

const Subscription = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const plans = useSelector((state) => state?.subscription?.plans);

  useEffect(() => {
    dispatch(getAllPlans());
  }, []);

  return (
    <Default>
      <Container>
        <div id="content-page" className="content-page">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card inner-page-bg bg-primary p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-white">Subscription Plans</h3>
                    {/* <p className="text-white">lorem ipsum</p> */}
                  </div>
                </div>
              </div>
              {plans &&
                plans.length !== 0 &&
                plans?.map((plan, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-body border text-center rounded">
                        <span className="text-uppercase">{plan?.label}</span>
                        <div className="d-flex align-items-center justify-content-center">
                          <h2 className="mb-4 display-6">${plan?.price}</h2>
                          <small className="text-muted">
                            / {plan?.renewal_type?.split("/")[1]}
                          </small>
                        </div>
                        <div
                          className="list-unstyled text-start line-height-4 mb-0"
                          dangerouslySetInnerHTML={{
                            __html: plan.details,
                          }}
                        ></div>
                        <Button className="btn btn-primary mt-5">
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </Default>
  );
};

export default Subscription;
