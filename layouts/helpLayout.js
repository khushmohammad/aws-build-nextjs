import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../components/help&support/sidebar";
import Footer from "../components/partials/dashboard/FooterStyle/footer";
import Header from "../components/partials/dashboard/HeaderStyle/header";
import { getHelp } from "../store/site/help";

const Help = (props) => {
  const [helpId, setHelpId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHelp(helpId));
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

export default Help;
