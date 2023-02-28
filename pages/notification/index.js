import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Dropdown, Card } from 'react-bootstrap'

// img

import Default from '../../layouts/default'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification } from '../../store/site/Notification'
import NotificatonCard from '../../components/notification/NotificatonCard'
import NewNotification from '../../components/notification/NewNotification'
import Link from 'next/link'
import { io } from "socket.io-client";

const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_CONNECTION_FOR_NOTIFICATION);


const Notification = () => {

   const dispatch = useDispatch()
   const notificationlist = useSelector((state) => state?.notification?.list)
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(5);
   const [notificationListState, setNotificationListState] = useState([])

   useEffect(() => {
      // setNotificationListState(notificationlist)
      // setNotificationListState((prev) => [...prev, ...notificationlist])

      if (page && page == 1) {
         notificationlist?.length == 0 ? setNotificationListState("") : setNotificationListState(notificationlist);
      } else {
         notificationlist?.length == 0
            ? ""
            : Array.isArray(notificationlist)
               ? setNotificationListState((prev) => [...prev, ...notificationlist])
               : "";
      }

   }, [notificationlist])


   const params = { page: page, limit: limit }
   useEffect(() => {
      dispatch(getNotification(params))
   }, [page])


   const LoadMore = () => {

      setPage((prev) => prev + 1);

   }

   useEffect(() => {
      socket.on("new_notification", (data) => {
        // console.log(data, "data")
         dispatch(getNotification(params))
      })
   }, [socket])



   return (
      <Default>
         <Container>
            <Row>
               <Col sm="12">
                  <h4 className="card-title mb-3">Notification</h4>
               </Col>
               <Col sm="12">
                  {/* <NewNotification  /> */}
                  {
                     notificationListState && notificationListState.map((data, index) => {
                        return (
                           <React.Fragment key={index}>
                              {data &&
                                 <NotificatonCard notification={data} />}
                           </React.Fragment>


                        )

                     })
                  }
                  {notificationlist && notificationlist?.length != 0 ?
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
   )
}


export default Notification