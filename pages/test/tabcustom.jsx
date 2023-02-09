import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// import Sonnet from '../../components/Sonnet';


function ControlledTabsExample() {
    const router = useRouter()
    const roomId = router?.query?.room
    const [key, setKey] = useState('home')

    const changeRoom = (tab) => {
        setKey(tab)
        router.push(`tabcustom?room=${tab}`)
    }
    useEffect(() => {
        setKey(roomId)
    }, [roomId])



    return (
        <> <Tab.Container id="left-tabs-example" activeKey={key}
            onSelect={(k) => changeRoom(k)}>
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            first
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            second
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

            {/* <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => changeRoom(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    profile
                </Tab>
                <Tab eventKey="contact" title="Contact">
                    contact
                </Tab>
                <Tab eventKey="about" title="About">
                    about
                </Tab>

            </Tabs> */}

        </>
    );
}

export default ControlledTabsExample;