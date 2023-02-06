import { Row, Col, Container } from "react-bootstrap";
import Card from "../components/Card";
import CustomToggle from "../components/dropdowns";
import ShareOffcanvas from "../components/share-offcanvas";
import Default from "../layouts/default";
import { useSession } from "next-auth/react";
import Post from "../components/post/postView/Post";
import FsLightbox from "fslightbox-react";
import { useState } from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const [toggler, setToggler] = useState(false);

  // console.log("session and status: ", session, status);

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
