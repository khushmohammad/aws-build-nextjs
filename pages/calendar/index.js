import React, { useState } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import Card from "../../components/Card";
import ProfileHeader from "../../components/profile-header";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

// fullcalender
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

// Datepicker
// import Datepicker from "../../components/datepicker";
import Calender from "react-calendar";

// img
import profilebg6 from "../../public/assets/images/page-img/profile-bg6.jpg";
import Default from "../../layouts/default";
import Link from "next/link";
import CreateEvent from "../../components/events";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CalendarPage = () => {
  const [show, setShow] = useState(false);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [value, onChange] = useState(new Date());

  const events = useSelector((state) => state?.events?.allEvents);

  useEffect(() => {
    const today = new Date();
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate()
      );
    });
    console.log("::", filteredEvents);
    setTodaysEvents(filteredEvents);
  }, [events]);

  // let events = [
  //   {
  //     title: "5:30a Repeating Event",
  //     date: "2023-02-10",
  //     textColor: "white",
  //     backgroundColor: "#d592ff",
  //     borderColor: "#d592ff",
  //   },
  // ];

  const handleEventClick = (clickInfo) => {
    alert(clickInfo.event.title);
  };

  const handleEvents = (events) => {
    // console.log(events);
  };

  const renderEventContent = (eventInfo) => {
    console.log("::", eventInfo);
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
                <Card className="mt-3">
                  <Card.Body>
                    <div className="input-group">
                      {/* <Datepicker className="vanila-datepicker" /> */}
                      <Calender onChange={onChange} value={value} />
                    </div>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Today's Schedule</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="m-0 p-0 today-schedule">
                      {todaysEvents?.map((e, i) => (
                        <li key={i} className="d-flex">
                          <div className="schedule-icon">
                            <i
                              className="material-symbols-outlined md-18"
                              style={{ color: `${e.backgroundColor}` }}
                            >
                              fiber_manual_record
                            </i>
                          </div>
                          <div className="schedule-text">
                            <span className="text-capitalize">{e.title}</span>
                            <span>
                              {moment(e.start).format("LT")} -{" "}
                              {moment(e.end).format("LT")}
                            </span>
                          </div>
                        </li>
                      ))}
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
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                      ]}
                      initialView="dayGridMonth"
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                      }}
                      events={events}
                      eventLimit={3}
                      editable={true}
                      selectable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      weekends={true}
                      nowIndicator
                      dateClick={(e) => console.log(e.dateStr)}
                      eventClick={(e) => console.log(e.event.id)}
                      eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    />
                    {/* <FullCalendar
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
                      eventColor="red"
                      nowIndicator
                      // select={handleDateSelect}
                      eventContent={renderEventContent} // custom render function
                      eventClick={handleEventClick}
                      eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    /> */}
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

export default CalendarPage;
