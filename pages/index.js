import { Row, Col, Container } from "react-bootstrap";

import Default from "../layouts/default";
import { useSession } from "next-auth/react";
import Post from "../components/post/postView/Post";

import { useState } from "react";

const Home = () => {
  return (
    <>
      <Default>
        <Container>
          <Row>
            <Col lg={8} className="row m-0 p-0 mx-auto">
              <Col sm={12}>
                <Post activePage={"home"} />
              </Col>
            </Col>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default Home;
