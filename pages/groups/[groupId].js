import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ProfileHeader from "../../components/profile-header";
import CustomToggle from "../../components/dropdowns";
import ShareOffcanvas from "../../components/share-offcanvas";

//image
import img1 from "../../public/assets/images/page-img/gi-1.jpg";
import user1 from "../../public/assets/images/user/05.jpg";
import user2 from "../../public/assets/images/user/06.jpg";
import user3 from "../../public/assets/images/user/07.jpg";
import user4 from "../../public/assets/images/user/08.jpg";
import user5 from "../../public/assets/images/user/09.jpg";
import user6 from "../../public/assets/images/user/10.jpg";
import user7 from "../../public/assets/images/user/11.jpg";
import user8 from "../../public/assets/images/user/12.jpg";
import header from "../../public/assets/images/page-img/profile-bg7.jpg";
import Link from "next/link";
import Default from "../../layouts/default";
import Image from "next/image";
import GroupMemeber from "../../components/group/group-member";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupByID,
  groupInvitationList,
  groupJoinRequestLists,
} from "../../store/groups";
import Post from "../../components/post/postView/Post";
import InviteFriend from "../../components/group/invite-friend";
import GroupJoinRequest from "../../components/group/join-request";

const GroupDetail = () => {
  const [showGroupMember, setShowGroupMember] = useState(false);
  const [showInviteFriends, setShowInviteFriends] = useState(false);
  const [showJoinRequest, setShowJoinRequest] = useState(false);

  const groupData = useSelector((state) => state?.groups?.groupInfo);

  const userInfo = useSelector((state) => state?.user?.data);

  const memberCount = useSelector((state) => state?.groups?.groupMember);

  const dispatch = useDispatch();
  const router = useRouter();
  const { groupId } = router.query;

  useEffect(() => {
    dispatch(getGroupByID(groupId));
    dispatch(groupInvitationList());
    dispatch(groupJoinRequestLists(groupId));
  }, [groupId]);

  return (
    <>
      <GroupMemeber
        groupid={groupId}
        show={showGroupMember}
        onHide={() => setShowGroupMember(false)}
      />
      <InviteFriend
        groupid={groupId}
        show={showInviteFriends}
        onHide={() => setShowInviteFriends(false)}
      />
      <GroupJoinRequest
        groupid={groupId}
        show={showJoinRequest}
        onHide={() => setShowJoinRequest(false)}
      />
      <Default>
        <ProfileHeader img={header} groupid={groupId} />
        <div id="content-page" className="content-page">
          <Container>
            <Row>
              <Col lg="12">
                <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap">
                  <div className="group-info d-flex align-items-center">
                    <div className="me-3">
                      <Image
                        className="rounded-circle img-fluid avatar-100"
                        src={groupData?.groupImagesInfo?.file?.location || img1}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="info">
                      <h4 className="text-capitalize">
                        {groupData?.groupName}
                      </h4>
                      <p className="mb-0 text-capitalize">
                        <i className="ri-lock-fill pe-2"></i>
                        {groupData?.privacyTypesInfo?.dropdownValue} Group .{" "}
                        <Link
                          href="#"
                          className="btn-link"
                          onClick={() => setShowGroupMember(true)}
                        >
                          {(memberCount &&
                            memberCount.length !== 0 &&
                            memberCount[0]?.memberCount?.members) ||
                            0}{" "}
                          members
                        </Link>
                      </p>
                    </div>
                  </div>
                  {userInfo?.userInfo?.roleInfo?.dropdownValue ===
                  "Integrating Coach" ? (
                    <div
                      mt-md="0"
                      mt="2"
                      className="group-member d-flex align-items-center"
                    >
                      <div className="iq-media-group me-3">
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user1}
                            alt=""
                          />
                        </Link>
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user2}
                            alt=""
                          />
                        </Link>
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user3}
                            alt=""
                          />
                        </Link>
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user4}
                            alt=""
                          />
                        </Link>
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user5}
                            alt=""
                          />
                        </Link>
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user6}
                            alt=""
                          />
                        </Link>
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user7}
                            alt=""
                          />
                        </Link>
                        <Link href="" className="iq-media">
                          <Image
                            className="img-fluid avatar-40 rounded-circle"
                            src={user8}
                            alt=""
                          />
                        </Link>
                      </div>

                      <Button
                        variant="primary"
                        className="mb-2"
                        onClick={() => setShowInviteFriends(true)}
                      >
                        <i className="ri-add-line me-1"></i>Invite
                      </Button>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col lg="8">
                <Post activePage={"group"} groupId={groupId} />
              </Col>
              <Col lg="4">
                <Card>
                  <Card.Header className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Groups</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="list-inline p-0 m-0">
                      <li className="mb-3 pb-3 border-bottom">
                        <div className="iq-search-bar members-search p-0">
                          <form action="#" className="searchbox w-auto">
                            <input
                              type="text"
                              className="text search-input bg-grey"
                              placeholder="Type here to search..."
                            />
                            <Link className="search-link" href="#">
                              <i className="ri-search-line"></i>
                            </Link>
                          </form>
                        </div>
                      </li>
                      <Link href="#">
                        <li className="mb-3 d-flex align-items-center">
                          <div className="avatar-40 rounded-circle bg-gray d-flex align-items-center justify-content-center me-3">
                            <i className="material-symbols-outlined">
                              credit_card
                            </i>
                          </div>
                          <h6 className="mb-0">Your Feed</h6>
                        </li>
                      </Link>
                      <Link href="/groups/all-groups">
                        <li className="mb-3 d-flex align-items-center">
                          <div className="avatar-40 rounded-circle bg-gray d-flex align-items-center justify-content-center me-3">
                            <i className="material-symbols-outlined">explore</i>
                          </div>
                          <h6 className="mb-0">Discover</h6>
                        </li>
                      </Link>
                      {userInfo?.userInfo?.roleInfo?.dropdownValue ===
                      "Integrating Coach" ? (
                        <>
                          <li
                            className="mb-3 text-primary d-flex align-items-center"
                            onClick={() => setShowJoinRequest(true)}
                            role="button"
                          >
                            <div className="avatar-40 rounded-circle bg-gray d-flex align-items-center justify-content-center me-3">
                              <span className="material-symbols-outlined">
                                add_circle
                              </span>
                            </div>
                            <h6 className="mb-0">Member Requests</h6>
                          </li>
                          <li>
                            <Link
                              href="/groups/create-group"
                              className="btn btn-primary d-block w-100"
                            >
                              <i className="ri-add-line pe-2"></i>Create New
                              Group
                            </Link>
                          </li>
                        </>
                      ) : null}
                    </ul>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">About</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <ul className="list-inline p-0 m-0">
                      <li className="mb-3">
                        <p className="mb-0 text-capitalize">
                          {groupData?.groupName}
                        </p>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <i className="material-symbols-outlined">
                              {groupData?.privacyTypesInfo?.dropdownValue ===
                              "open"
                                ? "public"
                                : "lock"}
                            </i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="text-capitalize">
                              {groupData?.privacyTypesInfo?.dropdownValue}
                            </h6>
                            <p className="mb-0">
                              Success in slowing economic activity.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <i className="material-symbols-outlined">
                              visibility
                            </i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>Visible</h6>
                            <p className="mb-0">
                              Various versions have evolved over the years
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <i className="material-symbols-outlined">group</i>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>General group</h6>
                            <p className="mb-0">
                              There are many variations of passages
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Default>
    </>
  );
};

export default GroupDetail;
