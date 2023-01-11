import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Default from "../../layouts/default";


const Calendar = () => {
  return (
    <Default>
        <Container>
            <Row>
                <Col md={12}>
                        <h3>Calendar</h3>
                </Col>
            </Row>
        </Container>
    </Default>
  )
}

export default Calendar