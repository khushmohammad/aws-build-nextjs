import { Nav, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../components/Card";
import Link from "next/link";

import FsLightbox from "fslightbox-react";

//images
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileOrCoverPhotos from "./ProfileOrCoverPhotos";
import PostMedia from "./PostMedia";

const Gallery = () => {
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });
  const [source, setSource] = useState([]);

  const photos = useSelector((state) => state?.user?.photos);
  const postPhotos = useSelector((state) => state?.post?.photos);

  const imageOnSlide = (number) => {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  };

  useEffect(() => {
    photos?.map((pic) => {
      if (source?.includes(pic?.file?.location) === false) {
        setSource([...source, pic?.file?.location]);
      }
    });
  }, [photos]);

  return (
    <>
      <FsLightbox
        toggler={imageController.toggler}
        sources={source}
        type="image"
        slide={imageController.slide}
      />

      <Card>
        <Card.Body>
          <h2>Photos</h2>
          <div className="friend-list-tab mt-2">
            <Nav
              variant="pills"
              className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
            >
              <li>
                <Nav.Link
                  eventKey="p1"
                  href="#pill-photosofyou"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={source[0]}
                    className="img-fluid rounded"
                    alt="Responsive"
                    height={100}
                    width={100}
                  />
                  <p>Your Photos</p>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  eventKey="p2"
                  href="#pill-profile-photos"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={source[0]}
                    className="img-fluid rounded"
                    alt="Responsive"
                    height={100}
                    width={100}
                  />
                  <p>Profile Photos</p>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  eventKey="p3"
                  href="#pill-cover-photos"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={source[0]}
                    className="img-fluid rounded"
                    alt="Responsive"
                    height={100}
                    width={100}
                  />
                  <p>Cover Photos</p>
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  eventKey="p4"
                  href="#pill-your-photos"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Image
                    loading="lazy"
                    src={source[0]}
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
                <Card.Body className="p-0">
                  <div className="d-grid gap-2 d-grid-template-1fr-13">
                    {photos &&
                      photos
                        ?.slice(0)
                        ?.reverse()
                        ?.map((pic, index) => (
                          <div key={index}>
                            <div className="user-images position-relative overflow-hidden">
                              <Link
                                onClick={() => imageOnSlide(index + 1)}
                                href="#"
                              >
                                <img
                                  loading="lazy"
                                  src={pic?.file?.location}
                                  className="img-fluid rounded"
                                  alt="Responsive"
                                  width="100%"
                                  height="100%"
                                  layout="responsive"
                                  objectFit="contain"
                                />
                              </Link>
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Edit or Remove</Tooltip>}
                              >
                                <Link
                                  href="#"
                                  className="image-edit-btn material-symbols-outlined md-16"
                                >
                                  drive_file_rename_outline
                                </Link>
                              </OverlayTrigger>
                            </div>
                          </div>
                        ))}
                  </div>
                </Card.Body>
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
