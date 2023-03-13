import { sub } from "date-fns";
import Link from "next/link";
import React from "react";
import { Nav, Tooltip, OverlayTrigger } from "react-bootstrap";

const SubChildCategory = ({ subCategory }) => {
  return (
    <div>
      <ul className="sub-nav">
        {subCategory &&
          subCategory.helpChildInfo &&
          subCategory.helpChildInfo.length !== 0 &&
          subCategory.helpChildInfo.map((sub, index) => (
            <Nav.Item as="li" key={index}>
              <Link
                className={`${
                  location.pathname === "/help-supports" ? "active" : ""
                } nav-link`}
                href={`/help-supports/${sub._id}`}
              >
                <i className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <g>
                      <circle
                        cx="12"
                        cy="12"
                        r="8"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                </i>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>{sub?.title}</Tooltip>}
                >
                  <i className="sidenav-mini-icon"> FF </i>
                </OverlayTrigger>
                <span
                  className="item-name"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {sub?.title}
                </span>
              </Link>
            </Nav.Item>
          ))}
      </ul>
    </div>
  );
};

export default SubChildCategory;
