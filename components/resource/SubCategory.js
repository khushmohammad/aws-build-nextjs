import { sub } from "date-fns";
import Link from "next/link";
import React from "react";
import { Nav, Tooltip, OverlayTrigger } from "react-bootstrap";

const SubCategory = (props) => {
  return (
    <>
      {props.subcat &&
        props.subcat.length !== 0 &&
        props.subcat[0].parentId == props?.parentId && (
          <ul className="sub-nav">
            {props.subcat &&
              props.subcat?.length !== 0 &&
              props.subcat.map((sub, index) => (
                <Nav.Item as="li" key={index}>
                  <Link
                    className={`${
                      location.pathname === "/resource" ? "active" : ""
                    } nav-link`}
                    href={{ pathname: `/resource/${sub._id}`, query: sub }}
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
                      overlay={<Tooltip>{sub?.name}</Tooltip>}
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
                      {sub?.name}
                    </span>
                  </Link>
                </Nav.Item>
              ))}
          </ul>
        )}
    </>
  );
};

export default SubCategory;
