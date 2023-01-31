import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../components/Card";
import Default from "../../layouts/default";
import Head from "next/head";
import GroupInvitation from "../../components/group/invitation-request";

const groupInvitation = () => {
  return (
    <>
      <Default>
        <Head>
          <title>Group Invitation</title>
        </Head>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Group Invitation</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <GroupInvitation />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default groupInvitation;
