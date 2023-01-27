import React from 'react'
import user01 from "../../../public/assets/images/user/01.jpg";
import p2 from "../../../public/assets/images/page-img/p2.jpg";
import p3 from "../../../public/assets/images/page-img/p3.jpg";
import p4 from "../../../public/assets/images/page-img/p4.jpg";
import p5 from "../../../public/assets/images/page-img/p5.jpg";
import p1 from "../../../public/assets/images/page-img/p1.jpg";
import user4 from "../../../public/assets/images/user/04.jpg";
import Image from 'next/image';
import Link from 'next/link';
function PostMediaGrid({ mediaContent }) {

    //  console.log(mediaContent, "mediaContent.fsile");

    return (
        <div>

            {mediaContent && mediaContent.file && <>
                <>
                    <Link href={`post/post-details/${mediaContent._id}`} >
                        <MediaComponent mediaCount={mediaContent.file.length} mediaData={mediaContent.file} />
                    </Link>
                </>
            </>}
        </div>
    )
}


const MediaComponent = (props) => {

    const { mediaCount, mediaData } = props
    const MorePostCount = mediaCount - 3

    return (
        <>
            <div>
                <div className={`d-grid grid-rows-${mediaCount && mediaCount > 2 ? 2 : 1} grid-flow-col gap-3`} >
                    {mediaData &&
                        mediaData.slice(0, 4).map((data, index) => {
                            const fileData = data.file[0]

                            const clasname = mediaCount && mediaCount > 2 ? mediaCount === 3 && index == 0 ? "row-span-2" : 'row-span-1' : 'row-span-2'
                            return (
                                <React.Fragment key={index}>
                                    {fileData &&
                                        <>

                                            <div className={`${clasname} position-relative`}>
                                                {fileData.type && fileData.type == "mp4" ?
                                                    <video width="100%" height="100%" controls>
                                                        <source src={fileData.location} type="video/mp4" />

                                                    </video>
                                                    :

                                                    <Image
                                                        src={fileData.location}
                                                        alt="post2"
                                                        className={`img-fluid rounded w-100 h-100  ${mediaData[2] && 'h-100'}`}
                                                        height={500}
                                                        width={500}
                                                    />
                                                }
                                                {index && index == 3 ?
                                                    <div className='overly position-absolute top-0 start-0 end-0 bottom-0 h-100 w-100 ' style={{ backgroundColor: "#000000a8" }}>
                                                        <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "height": "100%", "width": "100%", "overflow": "hidden" }}>
                                                            <h1 style={{ color: "#ffffff" }} > +{MorePostCount}</h1>
                                                        </div>
                                                    </div> : ""
                                                }
                                            </div>

                                        </>
                                    }
                                </React.Fragment>

                            )

                        })

                    }
                </div>
            </div>
        </>

    )

}





export default PostMediaGrid