import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Card from "../../components/Card";
import Link from "next/link";
import ProfileHeader from "../../components/profile-header";
import Image from "next/image";
import Default from "../../layouts/default";

import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allJoinedGroupList } from "../../store/groups";
import GroupCard from "../../components/group/group-card";

const MyGroup = () => {
  const [myGroup, setMyGroup] = useState(null);
  const [joinedGroup, setJoinedGroup] = useState(null);
  const dispatch = useDispatch();

  const groups = useSelector((state) => state?.groups?.joinedGroup);

  const userId = useSelector((state) => state?.user?.data?.userInfo?._id);

  console.log(groups, userId, "<<>>>");

  useEffect(() => {
    dispatch(allJoinedGroupList());
  }, []);

  useEffect(() => {
    let mygroup = [];
    mygroup = groups?.filter((el) => {
      return userId === el?.groupInfo?.groupCreator;
    });

    setMyGroup(mygroup);
  }, [groups]);

  useEffect(() => {
    let joinedgroup = [];
    joinedgroup = groups?.filter((el) => {
      return userId !== el?.groupInfo?.groupCreator;
    });
    setJoinedGroup(joinedgroup);
  }, [groups]);

  useEffect(() => {
    dispatch(allJoinedGroupList());
  }, []);

  return (
    <Default>
      <Head>
        <title>Joined Group</title>
      </Head>
      {/* <ProfileHeader img={img7} title="Groups" /> */}
      <div id="content-page" className="content-page">
        <Container>
          {myGroup && myGroup.length !== 0 && (
            <>
              <div className="col-sm-12">
                <div className="card inner-page-bg bg-primary p-2">
                  <h3 className="text-white">My Groups</h3>
                </div>
              </div>
              <div className="d-grid gap-3 d-grid-template-1fr-19">
                <GroupCard
                  groups={myGroup}
                  message="You have not created any group yet!"
                />
              </div>
            </>
          )}
          {joinedGroup && joinedGroup.length !== 0 && (
            <>
              <div className="col-sm-12">
                <div className="card inner-page-bg bg-primary p-2">
                  <h3 className="text-white">Joined Groups</h3>
                </div>
              </div>
              <div className="d-grid gap-3 d-grid-template-1fr-19">
                <GroupCard
                  groups={joinedGroup}
                  message="You have not joined any group yet!"
                />
              </div>
            </>
          )}
          {groups?.length === 0 || groups === undefined ? (
            <Card className="mb-0">
              <div className="card-body text-center">
                <h5 className="card-title">You haven't joined any group!</h5>
              </div>
              <Link href="/groups/discover-groups" className="btn btn-primary">
                Discover Group
              </Link>
            </Card>
          ) : null}
        </Container>
      </div>
    </Default>
  );
};

export default MyGroup;
