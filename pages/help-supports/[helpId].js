import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Help from "../../layouts/helpLayout";
import { helpService } from "../../services/basic.service";

const helpDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [subCategory, setSubCategory] = useState(null);

  const { helpId } = router.query;

  const getHelp = async () => {
    const res = await helpService(helpId);
    setSubCategory(res?.helpInfo);
    console.log("res::", res);
  };

  // console.log("helpId", helpId);
  useEffect(() => {
    // console.log("***************", subCategory);
    getHelp();
  }, [helpId]);

  return (
    <>
      <Help>
        {subCategory !== null && subCategory?.level == 2 ? (
          <div class="card">
            <div class="card-header">Level {subCategory.level}</div>
            <div class="card-body">
              <h5 class="card-title">{subCategory.title}</h5>
              <p class="card-text">{subCategory.description}</p>
            </div>
          </div>
        ) : (
          <div class="card">
            <div class="card-body">
              <center>
                <h1>Help Detail page</h1>
              </center>
            </div>
          </div>
        )}
      </Help>
    </>
  );
};

export default helpDetails;
