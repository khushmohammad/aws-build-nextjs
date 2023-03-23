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
import GroupCard from "../../components/group/group-card";

const JoinedGroup = () => {
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
      return userId !== el.memberId;
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
            <GroupCard
              groups={myGroup}
              message="You have not joined any group yet!"
            />
          </div>
        </Container>
      </div>
    </Default>
  );
};

export default JoinedGroup;
