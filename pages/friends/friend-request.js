import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../components/Card";
import Default from "../../layouts/default";
import FriendRequestList from "../../components/friends/FriendRequestList";
import Head from "next/head";

const FriendReqest = () => {


  return (
    <>
      <Default>
        <Head>
          <title>Friend Request</title>
        </Head>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Friend Request</h4>
                  </div>
                </Card.Header>
                <Card.Body>

                  <FriendRequestList />
                
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Default>
    </>
  );
};

export default FriendReqest;
