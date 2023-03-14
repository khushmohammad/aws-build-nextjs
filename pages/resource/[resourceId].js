import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Resource from "../../layouts/resourceLayout";

const resourceDetails = () => {
  const router = useRouter();

  const resourceId = router.query;
  const data = router.query;

  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (data) {
      setInfo(data);
    }
  }, [resourceId]);

  return (
    <>
      <Resource>
        {info !== null ? (
          <div class="card">
            <div class="card-header">{info.name}</div>
            <div class="card-body">
              <h5 class="card-title">{info.description}</h5>
              <p class="card-text">{info.content}</p>
            </div>
          </div>
        ) : (
          <div class="card">
            <div class="card-body">
              <center>
                <h1>Resource Detail page</h1>
              </center>
            </div>
          </div>
        )}
      </Resource>
    </>
  );
};

export default resourceDetails;
