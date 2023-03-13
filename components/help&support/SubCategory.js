import React, { useState, useContext } from "react";

import SubChildCategory from "./SubChildCategory";
import { helpService } from "../../services/basic.service";

import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Link from "next/link";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      href="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const SubCategory = (props) => {
  const [subCategory, setSubCategory] = useState(null);
  const [activeMenu, setActiveMenu] = useState({ state: false, eventKey: "" });

  const getSubCategory = async (helpId) => {
    const res = await helpService(helpId);
    console.log("getSubCategory", res);
    setSubCategory(res);
  };

  return (
    <>
      {props.subcat[0] && props.subcat[0].parentId == props?.parentId && (
        <ul className="sub-nav">
          {props.subcat &&
            props.subcat?.length !== 0 &&
            props.subcat?.map((sub, index) => (
              <Accordion.Item
                as="li"
                eventKey="help-menu"
                bsPrefix="nav-item"
                key={index}
              >
                <CustomToggle
                  eventKey={sub._id}
                  onClick={(activeKey) => {
                    // console.log("***active key***", activeKey);
                    if (activeKey.state == true) {
                      getSubCategory(sub._id);
                    }
                    setActiveMenu(activeKey);
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>{sub?.title}</Tooltip>}
                  >
                    <i className="icon material-symbols-outlined">newspaper</i>
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
                  <i className="right-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </i>
                </CustomToggle>
                <>
                  <ul>
                    {subCategory?.helpInfo?.parentId === props.parentId &&
                    Array.isArray(subCategory.helpChildInfo) &&
                    subCategory.helpChildInfo[0] &&
                    activeMenu.state == true &&
                    activeMenu.eventKey == sub._id ? (
                      <SubChildCategory subCategory={subCategory} />
                    ) : null}
                  </ul>
                </>
              </Accordion.Item>
            ))}
        </ul>
      )}
    </>
  );
};

export default SubCategory;
