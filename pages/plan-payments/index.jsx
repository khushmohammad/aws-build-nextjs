import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Default from "../../layouts/default";


const Index = () => {
  return (
    <Default>
      <Container>
        <Row>
          <Col md={12}>
            <h3>plan-payments Details</h3>
          </Col>
        </Row>
      </Container>
    </Default>
  )
}

export default Index