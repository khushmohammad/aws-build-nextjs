import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

function LeftTabsExample() {

  const router = useRouter()

  console.log(router.query.p, "router");
  const [key, setKey] = useState('first');
  return (
    <>
      {
        router.query.p &&
        <Tab.Container
          activeKey={key}
          onSelect={(k) => setKey(k)}
          id="left-tabs-example"
        //defaultActiveKey={`${router.query.p}`}
        >
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Link href="test?p=first">Tab 1</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="test?p=second">Tab 2</Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <h1>test 1</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h1>test 2</h1>

                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      }
    </>

  );
}

export default LeftTabsExample;