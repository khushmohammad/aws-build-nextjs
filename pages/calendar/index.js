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

//comingsoon birthday 
import Comingsoon from "../../pages/test/comingsoon";
// img
import profilebg6 from "../../public/assets/images/page-img/profile-bg6.jpg";
import Default from "../../layouts/default";
import Link from "next/link";
import CreateEvent from "../../components/events";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../store/events";
import { useRouter } from "next/router";
import { getAllBirthdays } from "../../store/friends";

const CalendarPage = () => {
  const [show, setShow] = useState(false);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [value, onChange] = useState(new Date());
  const [birthdayData, setBirthdayData] = useState([]);
  const [allEventData, setAllEventData] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllBirthdays());
  }, []);

  const events = useSelector((state) => state?.events?.allEvents);
  const friendsBirthdays = useSelector((state) => state?.friends?.birthdays);

  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  useEffect(() => {
    let data = { id: "", title: "", start: "", backgroundColor: "cyan" };

    friendsBirthdays &&
      friendsBirthdays.length !== 0 &&
      friendsBirthdays.map((birthday, index) => {
        const date = new Date(birthday?.myFriends[index]?.dateOfBirth);
        let age = new Date().getFullYear() - date.getFullYear() + 1;
        date.setFullYear(
          new Date().getFullYear(),
          date.getMonth(),
          date.getDate() - 1
        );

        data.title = `${
          birthday?.myFriends[index]?.firstName
        }'s ${age}${nthNumber(age)} birthday`;
        data.start = date;
        data.id = birthday?.myFriends[index]?._id;
      });

    setBirthdayData([data]);
  }, [friendsBirthdays]);

  useEffect(() => {
    if (events !== undefined) setAllEventData([...events, ...birthdayData]);
  }, [birthdayData]);

  useEffect(() => {
    dispatch(getEvents("hosting"));

    const today = new Date();
    const filteredEvents =
      allEventData &&
      allEventData.length !== 0 &&
      allEventData?.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.getFullYear() === today.getFullYear() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getDate() === today.getDate()
        );
      });
    setTodaysEvents(filteredEvents);
  }, [events]);

  const handleEventClick = (clickInfo) => {
    alert(clickInfo.event.title);
    console.log(clickInfo.event.id);
    if (birthdayData.some((el) => el.id === clickInfo.event.id)) {
      router.push(`/friends/${clickInfo.event.id}`);
    } else {
      router.push(`/events/${clickInfo.event.id}`);
    }
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
    <Comingsoon/>
      <CreateEvent show={show} onHide={() => setShow(false)} />
      <div style={{ display: "none" }}>
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
                        {todaysEvents &&
                          todaysEvents.length !== 0 &&
                          todaysEvents?.map((e, i) => (
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
                                <span className="text-capitalize">
                                  {e.title}
                                </span>
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
                        events={allEventData}
                        eventLimit={3}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        nowIndicator
                        dateClick={(e) => console.log(e.dateStr)}
                        eventClick={(e) => handleEventClick(e)}
                        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Default>
      </div>
    </>
  );
};

export default CalendarPage;
