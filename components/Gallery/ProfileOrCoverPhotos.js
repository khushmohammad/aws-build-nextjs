import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";

import FsLightbox from "fslightbox-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteGaleryImage } from "../../services/profile.service";

const ProfilePhotos = ({ imagetype }) => {
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });
  const [source, setSource] = useState([]);
  const [images, setImages] = useState([]);

  const photos = useSelector((state) => state?.user?.photos);

  const imageOnSlide = (number) => {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  };

  const removeImage = async (fileId, imageType) => {
    console.log("::", fileId, imageType);
    const res = await deleteGaleryImage(fileId, imageType);
    console.log("hhhh::", res);
  };

  useEffect(() => {
    photos?.map((pic) => {
      if (pic?.imageType === imagetype) {
        if (source?.includes(pic?.file?.location) === false) {
          setSource([...source, pic?.file?.location]);
          setImages([...images, pic]);
        }
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
      <div className="card-body p-0">
        <div className="d-grid gap-2 d-grid-template-1fr-13 ">
          {images &&
            images?.map((data, index) => (
              <div key={index}>
                <div className="user-images position-relative overflow-hidden">
                  <Link onClick={() => imageOnSlide(index + 1)} href="#">
                    <img
                      loading="lazy"
                      src={data?.file?.location}
                      className="img-fluid rounded"
                      alt="img"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectfit="contain"
                    />
                  </Link>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Remove</Tooltip>}
                  >
                    <a
                      onClick={() => removeImage(data?._id, data?.imageType)}
                      className="image-edit-btn material-symbols-outlined md-16"
                    >
                      drive_file_rename_outline
                    </a>
                  </OverlayTrigger>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePhotos;
