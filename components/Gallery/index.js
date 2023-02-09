import { Nav, Tab } from "react-bootstrap";
import Card from "../../components/Card";

//images
import img1 from "../../public/assets/images/gallery-icon/allphotos.png";
import img2 from "../../public/assets/images/gallery-icon/profileimage.jpg";
import img3 from "../../public/assets/images/gallery-icon/coverImage.png";
import img4 from "../../public/assets/images/gallery-icon/videoicon.jpg";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileOrCoverPhotos from "./ProfileOrCoverPhotos";
import PostMedia from "./PostMedia";
import AllPhotos from "./AllPhotos";

const Gallery = () => {
  const [source, setSource] = useState([]);

  const photos = useSelector((state) => state?.user?.photos);
  const postPhotos = useSelector((state) => state?.post?.photos);

  useEffect(() => {
    photos?.map((pic) => {
      if (source?.includes(pic?.file?.location) === false) {
        setSource([...source, pic?.file?.location]);
      }
    });
  }, [photos]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2>Photos</h2>
          <div className="friend-list-tab mt-2">
            <Nav
              variant="pills"
              className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
            >
              <li className="text-center">
                <Nav.Link
                  eventKey="p1"
                  href="#pill-photosofyou"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={img1}
                    className="img-fluid rounded"
                    alt="Responsive"
                    height={100}
                    width={100}
                  />
                  <p>Your Photos</p>
                </Nav.Link>
              </li>
              <li className="text-center">
                <Nav.Link
                  eventKey="p2"
                  href="#pill-profile-photos"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={img2}
                    className="img-fluid rounded"
                    alt="Responsive"
                    height={100}
                    width={100}
                  />
                  <p>Profile Photos</p>
                </Nav.Link>
              </li>
              <li className="text-center">
                <Nav.Link
                  eventKey="p3"
                  href="#pill-cover-photos"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={img3}
                    className="img-fluid rounded"
                    alt="Responsive"
                    height={100}
                    width={100}
                  />
                  <p>Cover Photos</p>
                </Nav.Link>
              </li>
              <li className="text-center">
                <Nav.Link
                  eventKey="p4"
                  href="#pill-your-photos"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={img4}
                    className="img-fluid rounded"
                    alt="Responsive"
                    height={100}
                    width={100}
                  />
                  <p>Your Videos</p>
                </Nav.Link>
              </li>
            </Nav>
            <hr />
            <Tab.Content>
              <Tab.Pane eventKey="p1">
                <AllPhotos />
              </Tab.Pane>
              <Tab.Pane eventKey="p2">
                <ProfileOrCoverPhotos imagetype="profileImage" />
              </Tab.Pane>
              <Tab.Pane eventKey="p3">
                <ProfileOrCoverPhotos imagetype="coverImage" />
              </Tab.Pane>
              <Tab.Pane eventKey="p4">
                <PostMedia mediatype="mp4" />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Gallery;
