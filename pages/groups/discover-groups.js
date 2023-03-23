import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Card from "../../components/Card";
import Link from "next/link";
import ProfileHeader from "../../components/profile-header";
import Image from "next/image";
import Default from "../../layouts/default";

// images
import gi5 from "../../public/assets/images/page-img/gi-5.jpg";
import user05 from "../../public/assets/images/user/25.png";
import user06 from "../../public/assets/images/user/06.jpg";
import user07 from "../../public/assets/images/user/07.jpg";
import user08 from "../../public/assets/images/user/08.jpg";
import user09 from "../../public/assets/images/user/09.jpg";
import user10 from "../../public/assets/images/user/10.jpg";
import img5 from "../../public/assets/images/page-img/profile-bg5.jpg";
import img7 from "../../public/assets/images/page-img/profile-bg7.jpg";
import {
  allJoinedGroupList,
  allJoinRequestSent,
  getAllGroupsList,
} from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import {
  groupActionService,
  joinGroupService,
} from "../../services/groups.service";
import GroupCard from "../../components/group/group-card";

const Groups = () => {
  const [isJoined, setIsJoined] = useState([]);
  const [isFollow, setIsFollow] = useState([]);
  const [joinedGroup, setJoinedGroup] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const groups = useSelector((state) => state?.groups?.allGroups?.allGroups);

  const myGroups = useSelector((state) => state?.groups?.joinedGroup);

  useEffect(() => {
    dispatch(getAllGroupsList(page));
    dispatch(allJoinedGroupList());
  }, [page]);

  useEffect(() => {
    let res = [];
    res = groups?.filter((el) => {
      return !myGroups?.find((element) => {
        return element.groupId === el._id;
      });
    });

    setGroupList(res);
  }, [groups, myGroups]);

  const joinGroup = async (groupId) => {
    const res = await joinGroupService(groupId);
    if (res?.success === true) {
      // setIsJoined((prev) =>
      //   Boolean(!prev[groupId])
      //     ? { ...prev, [groupId]: true }
      //     : { ...prev, [groupId]: false }
      // );
      // setJoinedGroup([...joinedGroup, groupId]);
      dispatch(getAllGroupsList(1));
    }
  };

  useEffect(() => {
    joinGroup();
    // window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, [page]);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const followAndUnfollowGroup = async (groupid) => {
    const res = await groupActionService(groupid, {
      action: "FollowAndUnFollow",
      actionData: {},
    });
    if (res?.success) {
      dispatch(getAllGroupsList(1));
    }
  };

  // useEffect(() => {
  //   dispatch(allJoinRequestSent(joinedGroup));
  // }, [joinedGroup]);

  return (
    <Default>
      <Head>
        <title>Discover Groups</title>
      </Head>
      <ProfileHeader img={img7} title="Groups" />
      <div id="content-page" className="content-page">
        <Container>
          {/* <div className="d-grid gap-3 d-grid-template-1fr-19">
            <GroupCard
              groups={groupList}
              message="No groups to join!"
            />
          </div> */}
          <div className="d-grid gap-3 d-grid-template-1fr-19">
            {groupList &&
              groupList?.length !== 0 &&
              groupList?.map((group, index) => (
                <Card key={index} className=" mb-0">
                  <div className="top-bg-image">
                    <Image
                      src={img5}
                      className="img-fluid w-100"
                      alt="group-bg"
                      height={125}
                      width={490}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <div className="group-icon">
                      <Image
                        src={group?.groupImagesInfo?.file?.location || gi5}
                        alt="profile-img"
                        className="rounded-circle img-fluid avatar-120"
                        height={100}
                        width={100}
                      />
                    </div>
                    <div className="group-info pt-3 pb-3">
                      <h4>
                        <Link href={`/groups/${group._id}`}>
                          {group?.groupName}
                        </Link>
                      </h4>
                      <p>Lorem Ipsum data</p>
                    </div>
                    <div className="group-details d-inline-block pb-3">
                      <ul className="d-flex align-items-center justify-content-between list-inline m-0 p-0">
                        <li className="pe-3 ps-3">
                          <p className="mb-0">Post</p>
                          <h6>{group?.totalPosts}</h6>
                        </li>
                        <li className="pe-3 ps-3">
                          <p className="mb-0">Member</p>
                          <h6>{group?.groupMembers}</h6>
                        </li>
                      </ul>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <Button
                          className={
                            group?.isGroupRequest
                              ? "btn btn-soft-primary d-block w-100"
                              : "btn btn-primary d-block w-100"
                          }
                          onClick={() => joinGroup(group._id)}
                        >
                          {group?.isGroupRequest ? "Requested" : "Join"}
                        </Button>
                      </div>
                      <div className="col-6">
                        <Button
                          className={
                            group?.isGroupFollower
                              ? "btn btn-soft-primary d-block w-100"
                              : "btn btn-primary d-block w-100"
                          }
                          onClick={() => followAndUnfollowGroup(group._id)}
                        >
                          {group?.isGroupFollower ? "Unfollow" : "Follow"}
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </div>
          {groupList?.length === 0 || groupList === undefined ? (
            <Card className="mb-0">
              <div className="card-body text-center">
                <h5 className="card-title">No groups to join!</h5>
              </div>
              {/* <Link href="/groups/create-group" className="btn btn-primary">
                Create Group
              </Link> */}
            </Card>
          ) : null}
        </Container>
      </div>
    </Default>
  );
};

export default Groups;
