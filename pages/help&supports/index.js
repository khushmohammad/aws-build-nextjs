import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Help from "../../layouts/helpLayout";
import { getHelp } from "../../store/site/help";

const index = () => {
  const [helpId, setHelpId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHelp(helpId));
  }, []);

  return (
    <>
      <Help>
        <h1>Help Page</h1>
      </Help>
    </>
  );
};

export default index;
