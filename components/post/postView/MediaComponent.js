import Image from 'next/image';
import React from 'react'

const MediaComponent = (props) => {
    const mediaData = props.mediaData;
    //const MorePostCount = mediaCount - 3
    // console.log(mediaData, "mediaData");
    return (
      <>
        <div>
          <div className={`d-block  `}>
            {mediaData &&
              mediaData.slice(0, 4).map((data, index) => {
                // console.log(data,"filedfsdData");
  
                const fileData = data.file;
                // console.log(fileData,"fileData");
                // const clasname = 'row-span-3'
                return (
                  <React.Fragment key={index}>
                    {fileData && (
                      <>
                        <div className={` position-relative bg-light my-3`}>
                          {fileData.type && fileData.type == "mp4" ? (
                            <video width="100%" height="100%" controls>
                              <source src={fileData.location} type="video/mp4" />
                            </video>
                          ) : (
                            <Image
                              src={fileData.location}
                              alt="post2"
                              className={`  img-fluid rounded w-100 `}
                              height={500}
                              width={500}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </>
    );
  };

export default MediaComponent