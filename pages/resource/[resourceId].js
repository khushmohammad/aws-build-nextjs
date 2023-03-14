import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { resourceService } from "../../services/basic.service";

import Resource from "../../layouts/resourceLayout";

const resourceDetails = () => {
  const router = useRouter();

  const { resourceId } = router.query;

  const [catInfo, setCatInfo] = useState(null);

  const getData = async (id) => {
    const response = await resourceService(id);
    setCatInfo(response);
  };

  useEffect(() => {
    if (resourceId !== undefined) {
      getData(resourceId);
    }
  }, [resourceId]);

  return (
    <>
      <Resource>
        {catInfo !== null ? (
          <div class="card">
            <div class="card-header">{catInfo.name}</div>
            <div class="card-body">
              <h5 class="card-title">{catInfo.description}</h5>
              <p class="card-text">{catInfo.content}</p>
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
