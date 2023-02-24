import React, { useState } from "react";

function PostContentSection({ stringContent }) {
  const [readMore, setReadMore] = useState(false);
  return (
    <div>
      <p>
        {readMore ? stringContent : `${stringContent.substring(0, 250)}`}
        {stringContent.length > 200 ? (
          <a
            className="text-primary text-decoration-underline ps-1 fw-bold"
            role={`button`}
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? null : "read more"}
          </a>
        ) : null}
      </p>
    </div>
  );
}

export default PostContentSection;
