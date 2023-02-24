import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

function PostContentSection({ stringContent }) {
  const [readMore, setReadMore] = useState(false);
  return (
    <div>
      <p>
      {readMore ? stringContent : `${stringContent.substring(0, 250)}`}
        {stringContent.length>200?(<a
          className="text-primary text-decoration-underline ps-1 fw-bold"
          role={`button`}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "show less" : "read more"}
        </a>):null}
{/*         
        {readMore ? stringContent : `${stringContent.substring(0, 10)}...`}
        <a
          className="text-primary text-decoration-underline"
          role={`button`}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "show less" : "read More "}
        </a> */}
      </p>
    </div>
  );
}

export default PostContentSection;
