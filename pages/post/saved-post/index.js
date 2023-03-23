import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Default from "../../../layouts/default";
import Post from "../../../components/post/postView/Post";
import { getSavePostListApi } from '../../../services/posts.service';

function SavedPost() {

    return (
        <div>
            <Default>
                <Container>
                    <Row>
                        <Col lg={8} className="row m-0 p-0 mx-auto">
                            <Col sm={12}>
                                <Post activePage={"savedPost"} />
                            </Col>
                        </Col>

                    </Row></Container>
            </Default>
        </div>
    )
}

export default SavedPost