import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";

import FsLightbox from "fslightbox-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AllPhotos = () => {
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 0,
  });
  const [postPic, setPostPic] = useState([]);
  const [profilePic, setProfilePic] = useState([]);

  const photos = useSelector((state) => state?.user?.photos);
  const postMedia = useSelector((state) => state?.post?.photos);

  const imageOnSlide = (number) => {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  };

  useEffect(() => {
    postMedia?.map((media) => {
      if (media?.file?.type !== "mp4") {
        if (postPic?.includes(media?.file?.location) === false) {
          setPostPic([...postPic, media?.file?.location]);
        }
      }
    });
  }, [postMedia]);

  useEffect(() => {
    photos?.map((pic) => {
      if (profilePic?.includes(pic?.file?.location) === false) {
        setProfilePic([...profilePic, pic?.file?.location]);
      }
    });
  }, [photos]);

  let source = [...postPic, ...profilePic];

  return (
    <>
      <FsLightbox
        toggler={imageController.toggler}
        sources={source}
        type="image"
        slide={imageController.slide}
      />
      <div className="card-body p-0">
        <div className="d-grid gap-2 d-grid-template-1fr-13 ">
          {source &&
            source?.map((pic, index) => (
              <div key={index}>
                <div className="user-images position-relative overflow-hidden">
                  <Link onClick={() => imageOnSlide(index)} href="#">
                    <img
                      loading="lazy"
                      src={pic}
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
      </div>
    </>
  );
};

export default AllPhotos;
