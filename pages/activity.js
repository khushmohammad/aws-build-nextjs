import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ActivityLogCard from '../components/notification/ActivityLogCard'
import Default from "../layouts/default"
import { getActivityLogsList } from '../store/site/activity'
function Activity() {

    const dispatch = useDispatch()
    const activityLogsList = useSelector((state) => state?.activity?.logsList)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [ActivityLogState, setActivityLogState] = useState([])

    useEffect(() => {


        if (page && page == 1) {
            activityLogsList?.length == 0 ? setActivityLogState([]) : setActivityLogState(activityLogsList);
        } else {
            activityLogsList?.length == 0
                ? ""
                : Array.isArray(activityLogsList)
                    ? setActivityLogState((prev) => [...prev, ...activityLogsList])
                    : "";
        }

    }, [activityLogsList])

    const params = { page: page, limit: limit }
    useEffect(() => {
        dispatch(getActivityLogsList(params))
    }, [page])


    const LoadMore = () => {

        setPage((prev) => prev + 1);

    }

    return (
        <div>
            <Default>
                <Container>
                    <Row>
                        <Col sm="12">
                            <h4 className="card-title mb-3">Your's  Activity</h4>
                        </Col>

                        <Col sm="12">

                            {
                                ActivityLogState && ActivityLogState.map((data, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {data &&
                                                <ActivityLogCard notification={data} />}
                                        </React.Fragment>


                                    )

                                })
                            }
                            {activityLogsList && activityLogsList?.length != 0 ?
                                <div className="text-center iq-sub-card">

                                    <button
                                        onClick={() => LoadMore()}
                                        className=" btn text-primary  mb-3"
                                    >
                                        View More
                                    </button>

                                </div>
                                :
                                <div className="text-center iq-sub-card">

                                    <p>
                                        No record found!
                                    </p>
                                </div>
                            }

                        </Col>
                    </Row>
                </Container>
            </Default>
        </div>
    )
}

export default Activity