import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Resource from "../../layouts/resourceLayout";
import { getResource } from "../../store/site/resource";

const index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResource(""));
  }, []);

  return (
    <>
      <Resource>
        <div class="card">
          <h5 class="card-header">Featured</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <h1>Resource Page</h1>
          </div>
        </div>
      </Resource>
    </>
  );
};

export default index;
