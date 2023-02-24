import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Post from '../../../components/post/postView/Post'
import PostContentSection from '../../../components/post/postView/PostContentSection'
import PostFooter from '../../../components/post/postView/PostFooter'
import Default from '../../../layouts/default'
import user2 from "../../../public/assets/images/user/02.jpg";
import { getPostsByPostId } from "../../../services/posts.service";
import { getPostTime } from '../../../services/time.service'

function PostDetailsById() {
    const router = useRouter()

    const PostId = router.query.postId
    const [postDetail, setPostDetail] = useState("")
    const postData = async () => {
        const res = await getPostsByPostId(PostId)
        res.length == 0 ? setPostDetail(res) : setPostDetail([res])

    }
    useEffect(() => {
        PostId && postData()
    }, [PostId])
    //console.log(postDetail);
    return (

        <Default>
            <Container>
                <Row>
                    <Col lg={8} className="row m-0 p-0 mx-auto">

                        <Col sm={12}>
                            {postDetail &&
                                <Post activePage={"PostDetail"} postDetailObj={postDetail && postDetail} />}
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