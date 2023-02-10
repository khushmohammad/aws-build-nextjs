import React from "react";
import { Container } from "react-bootstrap";

import Default from "../../layouts/default";
import ProfileHeader from '../../components/profile-header';
import profilebg7 from '../../public/assets/images/page-img/profile-bg7.jpg';
import Card from "../../components/Card";
const EventDetail = () => {
  return (
    <>
      <Default className="p-0">
        <ProfileHeader img={profilebg7}/>
            <Card className="card-block card-stretch card-height product">
                <Container>
                    <div>
                        <p>TOMORROW FROM 08:00 - 10:00</p>
                        <h1>Happy Health Mela Morning 8:00 to 10:00 AM</h1>
                        <p>Reliable Diagnostic Center, Tonk Road</p>
                    </div>
                </Container>
            </Card>
      </Default>
    </>
  );
};

export default EventDetail;
