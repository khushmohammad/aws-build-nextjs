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



    return (
        <div>
            {/* <IsOneMedia /> */}

            {/* <IsTwoMedia/> */}
            {/* <IsThreeMedia/> */}
            {/* <IsFourMedia /> */}
            {/* <IsAboveFourMedia /> */}

            {mediaContent &&
                mediaContent.length != 0 && mediaContent.length == 1 && <IsOneMedia Media={mediaContent} />

            }
            {mediaContent && mediaContent.length != 0 && mediaContent.length == 2 && <IsTwoMedia MediaTwo={mediaContent} />}
            {mediaContent && mediaContent.length != 0 && mediaContent.length == 3 && <IsThreeMedia IsThreeMedia={mediaContent} />}
            {mediaContent && mediaContent.length != 0 && mediaContent.length == 4 && <IsFourMedia IsFourMedia={mediaContent} />}
            {mediaContent && mediaContent.length != 0 && mediaContent.length > 4 && <IsAboveFourMedia IsAboveFourMedia={mediaContent} />}
        </div>
    )
}


const IsOneMedia = ({ Media }) => {

    const { location, type } = Media[0]?.file[0]

    // console.log(Media, "Media");
    return (

        <div>
            {Media &&

                <div className="user-post">
                    <div className=" d-grid grid-rows-1 grid-flow-col gap-3">
                        <div className="row-span-1 row-span-md-1">
                            {type && type == "mp4" ?
                                <video width="100%" height="100%" controls>
                                    <source src={location} type="video/mp4" />

                                </video>
                                :
                                <Image
                                    src={location}
                                    alt="post2"
                                    className="img-fluid rounded w-100"
                                    height={500}
                                    width={500}
                                />
                            }
                        </div>
                    </div>
                </div>

            }
        </div>

    )
}
const IsTwoMedia = ({ MediaTwo }) => {
    return (
        <>

            <div>
                {MediaTwo &&
                    <div>
                        <div className="user-post">
                            <div className=" d-grid grid-rows-1 grid-flow-col gap-3">
                                <div className="row-span-2 row-span-md-1">
                                    {MediaTwo[0]?.file[0].type && MediaTwo[0]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={MediaTwo[0]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={MediaTwo[0]?.file[0].location}
                                            alt="post2"
                                            className="img-fluid rounded w-100"
                                            height={500}
                                            width={500}
                                        />
                                    }

                                </div>
                                <div className="row-span-1">
                                    {MediaTwo[1]?.file[0].type && MediaTwo[1]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={MediaTwo[1]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={MediaTwo[1]?.file[0].location}
                                            alt="post2"
                                            className="img-fluid rounded w-100"
                                            height={500}
                                            width={500}
                                        />
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
const IsThreeMedia = ({ IsThreeMedia }) => {
    return (
        <>
            <div>
                {IsThreeMedia &&
                    <div>
                        <div className="user-post">
                            <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                                <div className="row-span-2 row-span-md-1">
                                    {IsThreeMedia[0]?.file[0].type && IsThreeMedia[0]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsThreeMedia[0]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={IsThreeMedia[0]?.file[0].location}
                                            alt="post2"
                                            className="img-fluid rounded w-100 h-100"
                                            style={{ objectFit: "cover" }}
                                            height={300}
                                            width={300}
                                        />
                                    }


                                </div>
                                <div className="row-span-1">
                                    {IsThreeMedia[1]?.file[0].type && IsThreeMedia[1]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsThreeMedia[1]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={IsThreeMedia[1]?.file[0].location}
                                            alt="post2"
                                            className="img-fluid rounded w-100"
                                            height={300}
                                            width={300}
                                            style={{ maxHeight: '175px', objectFit: "cover" }}

                                        />
                                    }


                                </div>
                                <div className="row-span-1 ">
                                    {IsThreeMedia[2]?.file[0].type && IsThreeMedia[2]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsThreeMedia[1]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={IsThreeMedia[2]?.file[0].location}
                                            alt="post3"
                                            className="img-fluid rounded w-100"
                                            height={300}
                                            width={300}
                                            style={{ maxHeight: '175px', objectFit: "cover" }}
                                        />


                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
const IsFourMedia = ({ IsFourMedia }) => {
    return (
        <>
            <div>
                {IsFourMedia &&
                    <div>
                        <div className="user-post">
                            <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                                <div className="row-span-1 row-span-md-1">
                                    {IsFourMedia[0]?.file[0].type && IsFourMedia[0]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsFourMedia[0]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={IsFourMedia[0]?.file[0].location}
                                            alt="post2"
                                            className="img-fluid rounded w-100"
                                            height={300}
                                            width={300}
                                            style={{ maxHeight: '175px', objectFit: "cover" }}
                                        />
                                    }

                                </div>
                                <div className="row-span-1">
                                    {IsFourMedia[1]?.file[0].type && IsFourMedia[1]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsFourMedia[1]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={IsFourMedia[1]?.file[0].location}
                                            alt="post2"
                                            className="img-fluid rounded w-100"
                                            height={300}
                                            width={300}
                                            style={{ maxHeight: '175px', objectFit: "cover" }}

                                        />
                                    }

                                </div>
                                <div className="row-span-1 ">
                                    {IsFourMedia[2]?.file[0].type && IsFourMedia[2]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsFourMedia[2]?.file[0].location} type="video/mp4" />

                                        </video>
                                        :
                                        <Image
                                            src={IsFourMedia[2]?.file[0].location}
                                            alt="post3"
                                            className="img-fluid rounded w-100"
                                            height={300}
                                            width={300}
                                            style={{ maxHeight: '175px', objectFit: "cover" }}

                                        />
                                    }

                                </div>
                                <div className="row-span-1 ">
                                    {IsFourMedia[3]?.file[0].type && IsFourMedia[3]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsFourMedia[3]?.file[0].location} type="video/mp4" />
                                        </video>
                                        :
                                        <Image
                                            src={IsFourMedia[3]?.file[0].location}
                                            alt="post3"
                                            className="img-fluid rounded w-100"
                                            height={300}
                                            width={300}
                                            style={{ maxHeight: '175px', objectFit: "cover" }}

                                        />
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
const IsAboveFourMedia = ({ IsAboveFourMedia }) => {
    // console.log(IsAboveFourMedia.length - 4, "IsAboveFourMedia");
    const MorePostCount = IsAboveFourMedia.length - 4
    return (
        <>

            <div>
                {IsAboveFourMedia &&
                    <div className="user-post">
                        <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                            <div className="row-span-1 row-span-md-1">
                                {IsAboveFourMedia[0]?.file[0].type && IsAboveFourMedia[0]?.file[0].type == "mp4" ?
                                    <video width="100%" height="100%" controls>
                                        <source src={IsAboveFourMedia[0]?.file[0].location} type="video/mp4" />
                                    </video>
                                    :
                                    <Image
                                        src={IsAboveFourMedia[0]?.file[0].location}
                                        alt="post2"
                                        className="img-fluid rounded w-100"
                                        height={300}
                                        width={300}
                                        style={{ maxHeight: '175px', objectFit: "cover" }}
                                    />
                                }

                            </div>
                            <div className="row-span-1">
                                {IsAboveFourMedia[1]?.file[0].type && IsAboveFourMedia[1]?.file[0].type == "mp4" ?
                                    <video width="100%" height="100%" controls>
                                        <source src={IsAboveFourMedia[1]?.file[0].location} type="video/mp4" />
                                    </video>
                                    :
                                    <Image
                                        src={IsAboveFourMedia[1]?.file[0].location}
                                        alt="post2"
                                        className="img-fluid rounded w-100"
                                        height={300}
                                        width={300}
                                        style={{ maxHeight: '175px', objectFit: "cover" }}
                                    />
                                }

                            </div>
                            <div className="row-span-1 ">
                                {IsAboveFourMedia[2]?.file[0].type && IsAboveFourMedia[2]?.file[0].type == "mp4" ?
                                    <video width="100%" height="100%" controls>
                                        <source src={IsAboveFourMedia[2]?.file[0].location} type="video/mp4" />
                                    </video>
                                    :
                                    <Image
                                        src={IsAboveFourMedia[2]?.file[0].location}
                                        alt="post2"
                                        className="img-fluid rounded w-100"
                                        height={300}
                                        width={300}
                                        style={{ maxHeight: '175px', objectFit: "cover" }}
                                    />
                                }

                            </div>
                            <Link href={"post/post-details"} >
                                <div className="row-span-1 position-relative">
                                    {IsAboveFourMedia[3]?.file[0].type && IsAboveFourMedia[3]?.file[0].type == "mp4" ?
                                        <video width="100%" height="100%" controls>
                                            <source src={IsAboveFourMedia[3]?.file[0].location} type="video/mp4" />
                                        </video>
                                        :
                                        <Image
                                            src={IsAboveFourMedia[3]?.file[0].location}
                                            alt="post2"
                                            className="img-fluid rounded w-100"
                                            height={300}
                                            width={300}
                                            style={{ maxHeight: '175px', objectFit: "cover" }}
                                        />
                                    }

                                    <div className='overly position-absolute top-0 start-0 end-0 bottom-0 h-100 w-100 ' style={{ backgroundColor: "#000000a8" }}>
                                        <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "height": "100%", "width": "100%", "overflow": "hidden" }}>
                                            <h1 style={{ color: "#ffffff" }} > +{MorePostCount}</h1>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default PostMediaGrid