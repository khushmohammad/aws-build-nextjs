import React, { useState } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import Card from "../../components/Card";
import ProfileHeader from "../../components/profile-header";

// fullcalender
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

// Datepicker
// import Datepicker from "../../components/datepicker";

// img
import profilebg6 from "../../public/assets/images/page-img/profile-bg6.jpg";
import Default from "../../layouts/default";
import Link from "next/link";
import CreateEvent from "../../components/events";

const Calendar = () => {
  const [show, setShow] = useState(false);
  let events = [
    {
      title: "5:30a Repeating Event",
      date: "2022-08-29",
      textColor: "white",
      backgroundColor: "#d592ff",
      borderColor: "#d592ff",
    },
    {
      title: "5:30a Repeating Event",
      date: "2023-02-27",
      textColor: "white",
      backgroundColor: "#ff9b8a",
      borderColor: "#ff9b8a",
    },
    {
      title: "5:30a Birthday Party",
      date: "2023-02-02",
      textColor: "white",
      backgroundColor: "#49f0d3",
      borderColor: "#49f0d3",
    },
    {
      title: "5:30a Meeting",
      date: "2023-04-04",
      textColor: "white",
      backgroundColor: "#a09e9e",
      borderColor: "#a09e9e",
    },
    {
      title: "Ajay's Birthday Party",
      date: "2023-02-09",
      textColor: "white",
      backgroundColor: "#49f0d3",
      borderColor: "#49f0d3",
    },
    {
      title: "5:30a Birthday Party",
      date: "2023-03-08",
      textColor: "white",
      backgroundColor: "#ff9b8a",
      borderColor: "#ff9b8a",
    },
    {
      title: "5:30a Doctor Meeting",
      date: "2023-01-10",
      textColor: "white",
      backgroundColor: "#f4a965",
      borderColor: "#f4a965",
    },
    {
      title: "5:30a All Day Event",
      date: "2023-02-11",
      textColor: "white",
      backgroundColor: "#50b5ff",
      borderColor: "#50b5ff",
    },
    {
      title: "5:30a Repeating Event",
      date: "2023-01-18",
      textColor: "white",
      backgroundColor: "#50b5ff",
      borderColor: "#50b5ff",
    },
    {
      title: "5:30a Repeating Event",
      date: "2023-01-20",
      textColor: "white",
      backgroundColor: "#49f0d3",
      borderColor: "#49f0d3",
    },
  ];

  const handleEventClick = (clickInfo) => {
    alert(clickInfo.event.title);
  };

  const handleEvents = (events) => {
    console.log(events);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <>
      <CreateEvent show={show} onHide={() => setShow(false)} />

      <Default>
        <ProfileHeader title="Calender and Events" img={profilebg6} />
        <div id="content-page" className="content-page">
          <Container>
            <Row className="row-eq-height">
              <Col md="4" lg="4">
                {/* <Card className="mt-3">
                  <Card.Body>
                    <div className="input-group">
                      <Datepicker className="vanila-datepicker" />
                    </div>
                  </Card.Body>
                </Card> */}

                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Today's Schedule</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="m-0 p-0 today-schedule">
                      <li className="d-flex">
                        <div className="schedule-icon">
                          <i className="material-symbols-outlined text-primary md-18">
                            fiber_manual_record
                          </i>
                        </div>
                        <div className="schedule-text">
                          <span>Web Design</span>
                          <span>09:00 to 12:00</span>
                        </div>
                      </li>
                      <li className="d-flex">
                        <div className="schedule-icon">
                          <i className="material-symbols-outlined text-success md-18">
                            fiber_manual_record
                          </i>
                        </div>
                        <div className="schedule-text">
                          <span>Participate in Design</span>
                          <span>09:00 to 12:00</span>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="8" lg="8">
                <Card className="mt-3">
                  <Card.Header className="d-flex justify-content-between flex-wrap">
                    <div className="header-title">
                      <h4 className="card-title">Create Event</h4>
                    </div>
                    <div className="card-header-toolbar d-flex align-items-center mt-1 mt-md-0">
                      <Link
                        onClick={() => setShow(true)}
                        href="#"
                        className="btn btn-primary d-flex align-items-center"
                      >
                        <i className="material-symbols-outlined me-1 md-18">
                          add
                        </i>
                        Create An Event
                      </Link>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <FullCalendar
                      plugins={[dayGridPlugin, listPlugin]}
                      //    themeSystem={bootstrap}
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                      }}
                      events={events}
                      initialView="dayGridMonth"
                      editable={true}
                      selectable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      weekends={true}
                      // select={handleDateSelect}
                      eventContent={renderEventContent} // custom render function
                      eventClick={handleEventClick}
                      eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Default>
    </>
  );
};

export default Calendar;
