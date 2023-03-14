import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../components/resource/sidebar";
import Footer from "../components/partials/dashboard/FooterStyle/footer";
import Header from "../components/partials/dashboard/HeaderStyle/header";
import { getResource } from "../store/site/resource";

const Resource = (props) => {
  const [resourceId, setResourceId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResource(resourceId));
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content">
        <div id="content-page" className="content-page">
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resource;
