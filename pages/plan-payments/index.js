import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Default from "../../layouts/default";
import Comingsoon from "../test/comingsoon";

const Index = () => {
  return (
    // <Comingsoon />
    <Default>
      <div>
        <div className="position-relative"></div>
        <div id="content-page" className="content-page">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div
                  className="card position-relative inner-page-bg bg-primary"
                  style={{ height: "150px" }}
                >
                  <div className="inner-page-title">
                    <h3 className="text-white">Subscription Plans</h3>
                    <p className="text-white">lorem ipsum</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                  <div className="card-body border text-center rounded">
                    <span className="text-uppercase">Basic</span>
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3">$26</h2>
                      <small className="text-muted">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <a href="#" className="btn btn-primary mt-5">
                      Start Starter
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card bg-primary text-white">
                  <div className="card-body border text-center rounded">
                    <span className="text-uppercase">Basic</span>
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3 text-white">$99</h2>
                      <small className="text-white-50">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <a
                      href="#"
                      className="btn btn-light text-dark btn-block mt-5"
                    >
                      Start Starter
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                  <div className="card-body border text-center rounded">
                    <span className="text-uppercase">Basic</span>
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3">$39</h2>
                      <small className="text-muted">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <a href="#" className="btn btn-primary mt-5">
                      Start Starter
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card">
                  <div className="card-body border text-center rounded">
                    <span className="text-uppercase">Basic</span>
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3">$25</h2>
                      <small className="text-muted">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <a href="#" className="btn btn-primary mt-5">
                      Start Starter
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card bg-dark text-white text-center">
                  <img
                    src="../assets/images/page-img/25.jpg"
                    className="card-img rounded"
                    alt="#"
                  />
                  <div className="card-img-overlay">
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3 text-white">$19</h2>
                      <small className="text-white">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <button type="button" className="btn btn-primary mt-3">
                      Get started
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card bg-dark text-white text-center">
                  <img
                    src="../assets/images/page-img/26.jpg"
                    className="card-img rounded"
                    alt="#"
                  />
                  <div className="card-img-overlay">
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3 text-white">$19</h2>
                      <small className="text-white">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <button type="button" className="btn btn-primary mt-3">
                      Get started
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card bg-dark text-white text-center">
                  <img
                    src="../assets/images/page-img/27.jpg"
                    className="card-img rounded"
                    alt="#"
                  />
                  <div className="card-img-overlay">
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3 text-white">$19</h2>
                      <small className="text-white">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <button type="button" className="btn btn-primary mt-3">
                      Get started
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card bg-dark text-white text-center">
                  <img
                    src="../assets/images/page-img/28.jpg"
                    className="card-img rounded"
                    alt="#"
                  />
                  <div className="card-img-overlay">
                    <div className="d-flex align-items-center justify-content-center">
                      <h2 className="mb-4 display-3 text-white">$19</h2>
                      <small className="text-white">/ Month</small>
                    </div>
                    <ul className="list-unstyled line-height-4 mb-0">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                    </ul>
                    <button type="button" className="btn btn-primary mt-3">
                      Get started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
};

export default Index;
