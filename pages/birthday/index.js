import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "../../components/Card";
import Image from "next/image";
//img
import profilebg4 from "../../public/assets/images/page-img/profile-bg4.jpg";
import React, { useState, useEffect } from "react";
import { friendsBirthdayList } from "../../services/friends.service";
import user7 from "../../public/assets/images/user/07.jpg";

//comingsoon birthday
import Comingsoon from "../../pages/test/comingsoon";
//profile-header
import ProfileHeader from "../../components/profile-header";
import Default from "../../layouts/default";
import { map } from "lodash";
import { useRouter } from "next/router";

const Birthday = () => {
  const router = useRouter();
  const [myFri, setMyfri] = useState([]);
  const [upcomingBirthdayState, setUpcomingBirthdayState] = useState([]);
  const [monthWiseState, setMonthWiseState] = useState([]);

  const todaysBirthday = async () => {
    const res = await friendsBirthdayList();
    console.log(res, "res*****");
    const todayBirthday = await res[0]?.myFriends?.filter(
      (elem) =>
        new Date(elem?.dateOfBirth)?.getDate() - 1 == new Date()?.getDate() &&
        new Date(elem?.dateOfBirth)?.getMonth() == new Date()?.getMonth()
    );
    setMyfri(todayBirthday);
  };
  const birthdayArry = async () => {
    const res = await friendsBirthdayList();
    const dob = await res;
    upcomingBirthdays(dob[0]?.myFriends);
  };
  let dt = new Date();
  let upcommingBdyDigits = [1, 2, 3, 4, 5, 6, 7];
  const sevenDays = upcommingBdyDigits.map((_) => {
    return {
      date: new Date(dt?.setDate(dt?.getDate() + 1))?.getDate(),
      month: new Date(dt?.setMonth(dt?.getMonth()))?.getMonth() + 1,
    };
  });

  const upcomingBirthdays = (birthdayArr) => {
    birthdayArr.filter((elem) => {
      sevenDays &&
        sevenDays.forEach((e) => {
          if (e?.date == elem?.day && e?.month == elem?.month) {
            setUpcomingBirthdayState([...upcomingBirthdayState, elem]);
          }
        });
    });
  };
  console.log("upcomingBirthdayState", upcomingBirthdayState);
  const birthdayMonthArry = async () => {
    const res = await friendsBirthdayList();
    const dob = await res;
    setMonthWiseState(dob[0]?.myFriends);
  };
  const friendsByMonth = {};

  monthWiseState.forEach((friend) => {
    const birthMonth = new Date(friend?.dateOfBirth)?.getMonth();

    if (!friendsByMonth[birthMonth]) {
      friendsByMonth[birthMonth] = [];
    }

    friendsByMonth[birthMonth]?.push(friend);
  });

  useEffect(() => {
    birthdayMonthArry();
  }, []);
  const year = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const friendsByMonthList = Object?.keys(friendsByMonth)?.map((month) => {
    if (new Date()?.getMonth() !== parseInt(month)) {
      return (
        <div key={month}>
          <div className="birthday-block">
            <Card>
              <Card.Header className=" d-flex justify-content-between rounded border-bottom-0">
                <div className="header-title">
                  <h4 className="card-title">
                    {year[parseInt(month)]} Birthday
                  </h4>
                </div>
              </Card.Header>
            </Card>

            {friendsByMonth[month]?.map((friend, index) => (
              <Col lg="6" md="12" key={index}>
                <Card>
                  <Card.Body>
                    <div className="iq-birthday-block">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Link href="#">
                            <Image
                              src={
                                friend?.profileInfo?.profileInfo?.file
                                  ?.location || user7
                              }
                              alt="profile-img"
                              height={100}
                              width={100}
                              className="img-fluid"
                            />
                          </Link>
                          <div className="friend-info ms-0 ms-md-3 mt-md-0 mt-2">
                            <h5>{`${friend?.firstName}  ${friend?.lastName}`}</h5>
                            <p className="mb-0">
                              {`${
                                new Date(friend?.dateOfBirth)?.getDate() - 1
                              } ${
                                year[new Date(friend?.dateOfBirth)?.getMonth()]
                              }  ${new Date(
                                friend?.dateOfBirth
                              )?.getFullYear()}`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => router.push(`/user/${friend._id}`)}
                          className="btn btn-primary"
                        >
                          Wish
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </div>
      );
    }
  });

  useEffect(() => {
    todaysBirthday();
  }, []);
  useEffect(() => {
    birthdayArry();
  }, []);

  return (
    <>
      <Comingsoon />

      <div style={{ display: "none" }}>
        <Default>
          <ProfileHeader title="Birthday" img={profilebg4} />
          <div id="content-page" className="content-page">
            <Container>
              <Row>
                <Col sm="12">
                  <div className="birthday-block">
                    <Card>
                      <Card.Header className="d-flex justify-content-between rounded border-bottom-0">
                        <div className="header-title">
                          <h4 className="card-title">Today Birthday</h4>
                        </div>
                      </Card.Header>
                    </Card>
                    <Row>
                      {myFri[0] ? (
                        myFri.map((elem, index) => (
                          <Col lg="6" md="12" key={index}>
                            <Card>
                              <Card.Body>
                                <div className="iq-birthday-block">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                      <Link href="#">
                                        <Image
                                          src={
                                            elem?.profileInfo?.profileInfo?.file
                                              ?.location || user7
                                          }
                                          alt="profile-img"
                                          height={100}
                                          width={100}
                                          className="img-fluid"
                                        />
                                      </Link>
                                      <div className="friend-info ms-0 ms-md-3 mt-md-0 mt-2">
                                        <h5>{`${elem?.firstName}  ${elem?.lastName}`}</h5>
                                        <p className="mb-0">Today</p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() =>
                                        router.push(`/user/${elem?._id}`)
                                      }
                                      className="btn btn-primary"
                                    >
                                      Wish
                                    </button>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      ) : (
                        <h4
                          style={{
                            textAlign: "center",
                            width: "100%",
                            padding: "5px",
                          }}
                        >
                          No birthday today
                        </h4>
                      )}
                    </Row>
                  </div>
                  <div className="birthday-block">
                    <Card>
                      <Card.Header className=" d-flex justify-content-between rounded border-bottom-0">
                        <div className="header-title">
                          <h4 className="card-title">Upcoming Birthday</h4>
                        </div>
                      </Card.Header>
                    </Card>
                    {upcomingBirthdayState[0] ? (
                      upcomingBirthdayState.map((elem, index) => (
                        <Col lg="6" md="12" key={index}>
                          <Card>
                            <Card.Body>
                              <div className="iq-birthday-block">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center">
                                    <Link href="#">
                                      <Image
                                        src={
                                          elem?.profileInfo?.profileInfo?.file
                                            ?.location || user7
                                        }
                                        alt="profile-img"
                                        height={100}
                                        width={100}
                                        className="img-fluid"
                                      />
                                    </Link>
                                    <div className="friend-info ms-0 ms-md-3 mt-md-0 mt-2">
                                      <h5>{`${elem.firstName}  ${elem.lastName}`}</h5>
                                      <p className="mb-0">
                                        {`${
                                          new Date(
                                            elem?.dateOfBirth
                                          )?.getDate() - 1
                                        } ${
                                          year[
                                            new Date(
                                              elem?.dateOfBirth
                                            )?.getMonth()
                                          ]
                                        }  ${new Date(
                                          elem?.dateOfBirth
                                        )?.getFullYear()}`}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      router.push(`/user/${elem._id}`)
                                    }
                                    className="btn btn-primary"
                                  >
                                    Wish
                                  </button>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <h4
                        style={{
                          textAlign: "center",
                          width: "100%",
                          padding: "5px",
                        }}
                      >
                        No birthday today
                      </h4>
                    )}
                  </div>
                  <div>{friendsByMonthList}</div>
                </Col>
              </Row>
            </Container>
          </div>
        </Default>
      </div>
    </>
  );
};
export default Birthday;
