import React from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
// import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//img
import logo from "../public/assets/images/logo-full.png";
import login1 from "../public/assets/images/login/1.png";
import login2 from "../public/assets/images/login/2.png";
import login3 from "../public/assets/images/login/3.png";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const Auth = ({ children }) => {
  let history = useRouter();
  return (
    <>
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <Container className="p-0">
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" href="#">
                  {/* <Image
                    src={logo}
                    className="img-fluid"
                    alt="logo"
                    width={214}
                  /> */}
                  <h1 className="text-light">IWL</h1>
                </Link>
                <div className="sign-slider overflow-hidden ">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    className="list-inline m-0 p-0 "
                  >
                    <SwiperSlide>
                      <Image
                        src={login1}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login2}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">
                        Connect with the world
                      </h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login3}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5 sign-up">
              {children}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Auth;
