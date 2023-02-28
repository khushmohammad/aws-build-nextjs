import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Help from "../../layouts/helpLayout";
import { helpService } from "../../services/basic.services";

const helpDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { helpId } = router.query;

  console.log(helpId);

  const getHelp = async () => {
    const res = await helpService(helpId);
    console.log("res::", res);
  };

  useEffect(() => {}, [helpId]);

  return (
    <>
      <Help>
        <h1>Help Detail page</h1>
      </Help>
    </>
  );
};

export default helpDetails;
