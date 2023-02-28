import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";

import FsLightbox from "fslightbox-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteGaleryImage } from "../../services/profile.service";

const PostMedia = ({ mediatype }) => {
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });
  const [source, setSource] = useState([]);

  const postMedia = useSelector((state) => state?.post?.photos);

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
    postMedia?.map((media) => {
      if (media?.file?.type === mediatype) {
        if (source?.includes(media?.file?.location) === false) {
          setSource([...source, media?.file?.location]);
        }
      }
    });
  }, [postMedia]);

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
                  <Link onClick={() => imageOnSlide(index + 1)} href="#">
                    <video
                      loading="lazy"
                      src={pic}
                      className="img-fluid rounded"
                      alt="Responsive"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectfit="contain"
                      controls
                    />
                  </Link>
                  <a
                    role="button"
                    onClick={() => removeImage(data?._id, data?.imageType)}
                    className="image-edit-btn material-symbols-outlined md-16"
                  >
                    delete
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PostMedia;
