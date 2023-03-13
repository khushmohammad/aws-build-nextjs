import Link from "next/link";
import React from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getHelpApi } from "../../services/help.service";

function Help() {
  // const GetHelp = () => {
  //     console.log("first")
  //     getHelpApi()
  // }

  return (
    <>
      <Nav.Item as="li">
        <Link
          className={`${
            location.pathname === "/help" ? "active" : ""
          } nav-link `}
          aria-current="page"
          href="/help"
        >
          <OverlayTrigger placement="right" overlay={<Tooltip>help</Tooltip>}>
            <i className="icon material-symbols-outlined">help</i>
          </OverlayTrigger>
          <span className="item-name">Community Help</span>
        </Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Link
          className={`${
            location.pathname === "/help-supports" ? "active" : ""
          } nav-link `}
          aria-current="page"
          href="/help-supports"
        >
          <OverlayTrigger placement="right" overlay={<Tooltip>help</Tooltip>}>
            <i className="icon material-symbols-outlined">help</i>
          </OverlayTrigger>
          <span className="item-name">Help & support </span>
        </Link>
      </Nav.Item>
    </>
  );
}

export default Help;
