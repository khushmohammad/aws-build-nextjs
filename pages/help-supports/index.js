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
        <div class="card">
          <h5 class="card-header">Featured</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <h1>Help Page</h1>
          </div>
        </div>
      </Help>
    </>
  );
};

export default index;
