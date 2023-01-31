import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import PostContentSection from '../../../components/post/postView/PostContentSection'
import PostFooter from '../../../components/post/postView/PostFooter'
import Default from '../../../layouts/default'
import user2 from "../../../public/assets/images/user/02.jpg";
import { getPostsByPostId } from "../../../services/posts.service";

function PostDetailsById() {
    const router = useRouter()

    const PostId = router.query.postId

    const [postDetail, setPostDetail] = useState("")
    const postData = async () => {
        const res = await getPostsByPostId(PostId)
        const data = res
        setPostDetail(data)
    }
    useEffect(() => {
        PostId && postData()
    }, [PostId])

    return (

        <Default>
            <Container>
                <Row>
                    <Col lg={8} className="row m-0 p-0">

                        <Col sm={12}>

                            <Card className="card-block card-stretch card-height" >
                                <Card.Body>
                                    <div className="user-post-data">
                                        <div className="d-flex justify-content-between">
                                            <div className="me-3">
                                                {/* {profilePictureInfo && profilePictureInfo.file && (
                                                    <Image
                                                        className="rounded-circle img-fluid"
                                                        src={profilePictureInfo.file.location}
                                                        alt=""
                                                        height={53}
                                                        width={53}
                                                    />
                                                )} */}

                                                {postDetail?.postCreatedBy && (
                                                    <Image
                                                        className="rounded-circle img-fluid"
                                                        src={
                                                            postDetail?.postCreatedBy?.profilePictureInfo?.file
                                                                ?.location || user2
                                                        }
                                                        alt=""
                                                        height={53}
                                                        width={53}
                                                    />
                                                )}
                                            </div>
                                            <div className="w-100">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h5 className="mb-0 d-inline-block">
                                                            {" "}
                                                            {postDetail?.postCreatedBy &&
                                                                `${postDetail?.postCreatedBy?.userInfo?.firstName}   ${postDetail?.postCreatedBy?.userInfo?.lastName} `}
                                                        </h5>
                                                        <span className="mb-0 ps-1 d-inline-block">
                                                            Add New Post
                                                        </span>
                                                        <p className="mb-0 text-primary">Just Now</p>
                                                    </div>
                                                    <div className="card-post-toolbar">
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="bg-transparent">
                                                                <span className="material-symbols-outlined">
                                                                    more_horiz
                                                                </span>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                                                <Dropdown.Item className=" p-3">
                                                                    <div
                                                                        className="d-flex align-items-top"
                                                                        onClick={() => {
                                                                            setPostID(_id);
                                                                            setShowModal(true);
                                                                        }}
                                                                    >
                                                                        <div className="h4 material-symbols-outlined">
                                                                            <i className="ri-save-line"></i>
                                                                        </div>
                                                                        <div className="data ms-2">
                                                                            <h6>Edit Post</h6>
                                                                            <p className="mb-0">Edit</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className=" p-3" href="#">
                                                                    <div className="d-flex align-items-top">
                                                                        <div className="h4 material-symbols-outlined">
                                                                            <i className="ri-save-line"></i>
                                                                        </div>
                                                                        <div className="data ms-2">
                                                                            <h6>Save Post</h6>
                                                                            <p className="mb-0">
                                                                                Add this to your saved items
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>

                                                                <Dropdown.Item className="p-3" href="#">
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-close-circle-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Hide Post</h6>
                                                                            <p className="mb-0">
                                                                                See fewer posts like this.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className=" p-3">
                                                                    <div
                                                                        className="d-flex align-items-top"
                                                                        onClick={() => DeletePostByPostId(_id)}
                                                                    >
                                                                        <div className="h4 material-symbols-outlined">
                                                                            <i className="ri-save-line"></i>
                                                                        </div>
                                                                        <div className="data ms-2">
                                                                            <h6>Delete Post</h6>
                                                                            <p className="mb-0">Delete</p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className=" p-3" href="#">
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-user-unfollow-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Unfollow User</h6>
                                                                            <p className="mb-0">
                                                                                Stop seeing posts but stay friends.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item className=" p-3" href="#">
                                                                    <div className="d-flex align-items-top">
                                                                        <i className="ri-notification-line h4"></i>
                                                                        <div className="data ms-2">
                                                                            <h6>Notifications</h6>
                                                                            <p className="mb-0">
                                                                                Turn on notifications for this post
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        {/* {description && (
                                            <PostContentSection stringContent={description} />
                                        )} */}
                                        <div className="mt-3">
                                            {postDetail && (
                                                <PostContentSection stringContent={postDetail?.description} />
                                            )}
                                        </div>
                                        <MediaComponent mediaData={postDetail?.filesInfo} />
                                        <PostFooter postIdForLike={PostId} />

                                    </div>



                                </Card.Body>
                            </Card>
                        </Col>
                    </Col>
                </Row>
            </Container >
        </Default>






    )
}


const MediaComponent = (props) => {

    const mediaData = props.mediaData
    //const MorePostCount = mediaCount - 3
    // console.log(mediaData, "mediaData");
    return (
        <>
            <div>
                <div className={`d-block  `} >
                    {mediaData &&
                        mediaData.slice(0, 4).map((data, index) => {
                            // console.log(data,"filedfsdData");

                            const fileData = data.file
                            // console.log(fileData,"fileData");
                            // const clasname = 'row-span-3'
                            return (
                                <React.Fragment key={index}>
                                    {fileData &&
                                        <>

                                            <div className={` position-relative bg-light my-3`}>
                                                {fileData.type && fileData.type == "mp4" ?
                                                    <video width="100%" height="100%" controls>
                                                        <source src={fileData.location} type="video/mp4" />

                                                    </video>
                                                    :

                                                    <Image
                                                        src={fileData.location}
                                                        alt="post2"
                                                        className={`  img-fluid rounded w-100 `}
                                                        height={500}
                                                        width={500}
                                                    />
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

export default PostDetailsById