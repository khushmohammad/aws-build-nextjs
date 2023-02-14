import React, { useEffect } from 'react'
import { Row, Col, Container, Dropdown, Card } from 'react-bootstrap'
import Link from 'next/link'

// img
import user1 from '../../public/assets/images/user/1.jpg'

import Default from '../../layouts/default'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification, notification } from '../../store/site/Notification'
import { getPostTime } from '../../services/time.service'
import NotificationMessage from '../../components/notification/NotificationMessage'

const Notification = () => {

   const dispatch = useDispatch()
   const notificationlist = useSelector((state) => state?.notification?.list)


   useEffect(() => {
      dispatch(getNotification())

   }, [])




   return (
      <Default>
         <Container>
            <Row>
               <Col sm="12">
                  <h4 className="card-title mb-3">Notification</h4>
               </Col>
               <Col sm="12">
                  {
                     notificationlist && notificationlist.map((data, index) => {
                        return (
                           <React.Fragment key={index}>
                              {data &&
                                 <NotificatonCard notification={data} />}
                           </React.Fragment>


                        )

                     })
                  }

                  {/* <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user2} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className=" ms-3">
                                       <h6>Anne Fibbiyon Like Your Post</h6>
                                       <p className="mb-0">15  ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-danger rounded">
                                       <i className="material-symbols-outlined md-18">
                                          favorite_border
                                       </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card> */}
                  {/* <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user3} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Barry Cuda add Story</h6>
                                       <p className="mb-0">40  ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-primary rounded">
                                          <i className="material-symbols-outlined md-18">
                                             military_tech
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user4} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Cliff Hanger posted a comment on your status update</h6>
                                       <p className="mb-0">42  ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-success rounded">
                                          <i className="material-symbols-outlined md-16">
                                             chat_bubble_outline
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user4} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Rick O'Shea posted a comment on your photo</h6>
                                       <p className="mb-0">50  ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-success rounded">
                                          <i className="material-symbols-outlined md-16">
                                             chat_bubble_outline
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user5} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Brock Lee Sent a Friend Request</h6>
                                       <p className="mb-0">1 hour ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-warning rounded">
                                       <i className="material-symbols-outlined md-18">
                                          reply
                                       </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user6} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className=" ms-3">
                                       <h6>Ira Membrit shared your status update</h6>
                                       <p className="mb-0">1 hour ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-info rounded">
                                       <i className="material-symbols-outlined md-18">
                                          share
                                       </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user11} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Paul Molive and 3 ther have Birthday Today</h6>
                                       <p className="mb-0">3 houe ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-danger rounded">
                                          <i className="material-symbols-outlined md-18">
                                              cake
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user7} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Petey Cruiser Sent a Friend request</h6>
                                       <p className="mb-0">1 day ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-warning rounded">
                                          <i className="material-symbols-outlined md-18">
                                             reply
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user8} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Bob Frapples and 45 other Like Your Pst on timeline</h6>
                                       <p className="mb-0">1 week ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-danger rounded">
                                          <i className="material-symbols-outlined md-18">
                                             favorite_border
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user12} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Maya Didas share Your Post</h6>
                                       <p className="mb-0">1 month ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-info rounded">
                                       <i className="material-symbols-outlined md-18">
                                          share
                                       </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user9} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className=" ms-3">
                                       <h6>Sal Monella Add Photo with You</h6>
                                       <p className="mb-0">1 month ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-primary rounded">
                                          <i className="material-symbols-outlined md-18">
                                             military_tech
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user10} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="ms-3">
                                       <h6>Barb Dwyer commented on your new profile status</h6>
                                       <p className="mb-0">2 month ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-success rounded">
                                          <i className="material-symbols-outlined md-16">
                                             chat_bubble_outline
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user13} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className="info ms-3">
                                       <h6>Terry Aki commented on your new profile status</h6>
                                       <p className="mb-0">2 month ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-success rounded">
                                          <i className="material-symbols-outlined md-16">
                                             chat_bubble_outline
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Body>
                        <ul className="notification-list m-0 p-0">
                           <li className="d-flex align-items-center justify-content-between">
                              <div className="user-img img-fluid">
                                 <Image src={user14} alt="story-img" className="rounded-circle avatar-40"/>
                              </div>
                              <div className="w-100">
                                 <div className="d-flex justify-content-between">
                                    <div className=" ms-3">
                                       <h6>Paige Turner Posted in Development Community</h6>
                                       <p className="mb-0">3 month ago</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                       <Link href="#" className="me-3 iq-notify bg-soft-primary rounded">
                                          <i className="material-symbols-outlined md-18 ">
                                             military_tech
                                          </i>
                                       </Link>
                                       <div className="card-header-toolbar d-flex align-items-center">
                                          <Dropdown>
                                          <Link href="#">
                                             <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                                more_horiz
                                             </Dropdown.Toggle>
                                             </Link>
                                             <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#"><i className="ri-eye-fill me-2"></i>View</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                                <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                             </Dropdown.Menu>
                                          </Dropdown>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </Card.Body>
                  </Card> */}
               </Col>
            </Row>
         </Container>
      </Default>
   )
}


const NotificatonCard = ({ notification }) => {
   //  console.log(notification, "sdfsdf");
   return (
      <Card>
         <Card.Body>
            <ul className="notification-list m-0 p-0">
               <li className="d-flex align-items-center justify-content-between">
                  <div className="user-img img-fluid">
                     <Image src={notification?.userDetails?.profilePictureInfo?.file?.location || user1}
                        alt="profile-bg"
                        height={100}
                        width={100} className="rounded-circle avatar-40" />
                  </div>
                  <div className="w-100">
                     <div className="d-flex justify-content-between">
                        <div className=" ms-3">
                           <h6>  {notification?.userDetails?.userInfo?.firstName || ''}{" "}
                              {notification?.userDetails?.userInfo?.lastName || ''} {NotificationMessage(notification.message)}</h6>
                           <p className="mb-0"> {getPostTime(notification.createdAt)} ago</p>
                        </div>
                        <div className="d-flex align-items-center">
                           <Link href="#" className="me-3 iq-notify bg-soft-primary rounded">
                              <i className="material-symbols-outlined md-18">
                                 military_tech
                              </i>
                           </Link>
                           <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                 <Link href="#">
                                    <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                       more_horiz
                                    </Dropdown.Toggle>
                                 </Link>
                                 <Dropdown.Menu className="dropdown-menu-right">
                                    <Dropdown.Item href="#">
                                       <i className="ri-eye-fill me-2"></i>View
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="ri-delete-bin-6-fill me-2"></i>Delete</Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="ri-pencil-fill me-2"></i>Edit</Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="ri-printer-fill me-2"></i>Print</Dropdown.Item>
                                    <Dropdown.Item href="#"><i className="ri-file-download-fill me-2"></i>Download</Dropdown.Item>
                                 </Dropdown.Menu>
                              </Dropdown>
                           </div>
                        </div>
                     </div>
                  </div>
               </li>
            </ul>
         </Card.Body>
      </Card>
   )
}

export default Notification