import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "../../components/Card";
import Link from "next/link";
import ProfileHeader from "../../components/profile-header";
import Image from "next/image";
import Default from "../../layouts/default";

// images
import gi1 from "../../public/assets/images/page-img/gi-1.jpg";
import gi2 from "../../public/assets/images/page-img/gi-2.jpg";
import gi3 from "../../public/assets/images/page-img/gi-3.jpg";
import gi4 from "../../public/assets/images/page-img/gi-4.jpg";
import gi5 from "../../public/assets/images/page-img/gi-5.jpg";
import gi6 from "../../public/assets/images/page-img/gi-6.jpg";
import gi7 from "../../public/assets/images/page-img/gi-7.jpg";
import gi8 from "../../public/assets/images/page-img/gi-8.jpg";
import gi9 from "../../public/assets/images/page-img/gi-9.jpg";
import user05 from "../../public/assets/images/user/25.png";
import user06 from "../../public/assets/images/user/06.jpg";
import user07 from "../../public/assets/images/user/07.jpg";
import user08 from "../../public/assets/images/user/08.jpg";
import user09 from "../../public/assets/images/user/09.jpg";
import user10 from "../../public/assets/images/user/10.jpg";
import img1 from "../../public/assets/images/page-img/profile-bg1.jpg";
import img2 from "../../public/assets/images/page-img/profile-bg2.jpg";
import img3 from "../../public/assets/images/page-img/profile-bg3.jpg";
import img4 from "../../public/assets/images/page-img/profile-bg4.jpg";
import img5 from "../../public/assets/images/page-img/profile-bg5.jpg";
import img6 from "../../public/assets/images/page-img/profile-bg6.jpg";
import img7 from "../../public/assets/images/page-img/profile-bg7.jpg";
import img9 from "../../public/assets/images/page-img/profile-bg9.jpg";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allJoinedGroupList } from "../../store/groups";

const MyGroup = () => {
  const [myGroup, setMyGroup] = useState(null);
  const dispatch = useDispatch();

  const groups = useSelector((state) => state?.groups?.joinedGroup);

  const userId = useSelector((state) => state?.user?.data?.userInfo?._id);

  useEffect(() => {
    dispatch(allJoinedGroupList());
  }, []);

  useEffect(() => {
    let mygroup = [];
    mygroup = groups?.filter((el) => {
      return userId === el.memberId;
    });
    setMyGroup(mygroup);
  }, [groups]);

  return (
    <Default>
      <Head>
        <title>Joined Group</title>
      </Head>
      <ProfileHeader img={img7} title="Groups" />
      <div id="content-page" className="content-page">
        <Container>
          <div className="d-grid gap-3 d-grid-template-1fr-19">
            {myGroup &&
              myGroup?.map((group, index) => (
                <Card key={index} className="mb-0">
                  <div className="top-bg-image">
                    <Image
                      src={img1}
                      className="img-fluid w-100"
                      alt="group-bg"
                    />
                  </div>
                  <Card.Body className=" text-center">
                    <div className="group-icon">
                      <Image
                        src={
                          group?.groupInfo?.groupImage?.file?.location || gi1
                        }
                        alt="profile-img"
                        className="rounded-circle img-fluid avatar-120"
                        height={100}
                        width={100}
                      />
                    </div>
                    <div className="group-info pt-3 pb-3">
                      <h4 className="text-capitalize">
                        <Link href={`/groups/${group?.groupInfo?._id}`}>
                          {group?.groupInfo?.groupName}
                        </Link>
                      </h4>
                      <p>Lorem Ipsum data</p>
                    </div>
                    <div className="group-details d-inline-block pb-3">
                      <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                        <li className="pe-3 ps-3">
                          <p className="mb-0">Post</p>
                          <h6>600</h6>
                        </li>
                        <li className="pe-3 ps-3">
                          <p className="mb-0">Member</p>
                          <h6>{group?.groupInfo?.members?.length || 0}</h6>
                        </li>
                        {/* <li className="pe-3 ps-3">
                        <p className="mb-0">Visit</p>
                        <h6>1.2k</h6>
                      </li> */}
                      </ul>
                    </div>
                    <div className="group-member mb-3">
                      <div className="iq-media-group">
                        <Link href="#" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user05}
                            alt=""
                          />
                        </Link>
                        <Link href="#" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user06}
                            alt=""
                          />
                        </Link>
                        <Link href="#" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user07}
                            alt=""
                          />
                        </Link>
                        <Link href="#" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user08}
                            alt=""
                          />
                        </Link>
                        <Link href="#" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user09}
                            alt=""
                          />
                        </Link>
                        <Link href="#" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user10}
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                    <Link
                      href={`/groups/${group?.groupId}`}
                      type="submit"
                      className="btn btn-primary d-block w-100"
                    >
                      Visit
                    </Link>
                  </Card.Body>
                </Card>
              ))}
            {groups?.length === 0 || groups === undefined ? (
              <Card className="mb-0">
                <div className="card-body text-center">
                  <h5 className="card-title">
                    You have not created any group yet!
                  </h5>
                </div>
              </Card>
            ) : null}
          </div>
        </Container>
      </div>
    </Default>
  );
};

export default MyGroup;
