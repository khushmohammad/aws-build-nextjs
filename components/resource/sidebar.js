import React, { useEffect, useState, useContext } from "react";
// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useDispatch, useSelector } from "react-redux";

//components
import Scrollbar from "smooth-scrollbar";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Link from "next/link";
import { resourceService } from "../../services/basic.service";

import SubCategory from "./SubCategory";

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

const Sidebar = () => {
  const [subCat, setSubCat] = useState(null);
  const [activeMenu, setActiveMenu] = useState({ state: false, eventKey: "" });

  const dispatch = useDispatch();

  // sidebar responsive
  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.add("sidebar-mini");
  };

  const miniSideBarClose = () => {
    document.getElementsByTagName("ASIDE")[0].classList.remove("sidebar-mini");
  };

  const sidebarType = useSelector(SettingSelector.sidebar_type); // array
  const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);
  useEffect(() => {
    Scrollbar.init(document.querySelector(".data-scrollbar"));

    window.addEventListener("resize", () => {
      const tabs = document.querySelectorAll(".nav");
      const sidebarResponsive = document.querySelector(
        '[data-sidebar="responsive"]'
      );
      if (window.innerWidth <= 1380 && window.innerWidth > 1025) {
        minisidebar();
      } else if (window.innerWidth < 1025) {
        Array.from(tabs, (elem) => {
          if (
            !elem.classList.contains("flex-column") &&
            elem.classList.contains("nav-tabs") &&
            elem.classList.contains("nav-pills")
          ) {
            elem.classList.add("flex-column", "on-resize");
          }
          return elem.classList.add("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (!sidebarResponsive.classList.contains("sidebar-mini")) {
            sidebarResponsive.classList.add("sidebar-mini", "on-resize");
          }
        }
      } else {
        miniSideBarClose();
        Array.from(tabs, (elem) => {
          if (elem.classList.contains("on-resize")) {
            elem.classList.remove("flex-column", "on-resize");
          }
          return elem.classList.remove("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (
            sidebarResponsive.classList.contains("sidebar-mini") &&
            sidebarResponsive.classList.contains("on-resize")
          ) {
            sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
          }
        }
      }
    });
  });
  // sidebar responsive

  const resourceCategories = useSelector(
    (state) => state?.resource?.resourceCategory
  );

  console.log("<<<<<--->>>>>", resourceCategories);

  const getSubCategory = async (resourceId = null) => {
    const res = await resourceService(resourceId);
    console.log("***---***", res);
    setSubCat(res.subCategories);
  };

  return (
    <>
      <aside
        className={`${sidebarType.join(
          " "
        )} ${sidebarMenuStyle} sidebar sidebar-default sidebar-base navs-rounded-all `}
        id="first-tour"
        data-toggle="main-sidebar"
        data-sidebar="responsive"
      >
        <div className="sidebar-body pt-0 data-scrollbar">
          <div className="sidebar-list">
            <div
              className="d-flex flex-column justify-content-between"
              style={{ minHeight: "90vh" }}
            >
              <Accordion
                as="ul"
                className="navbar-nav iq-main-menu"
                id="sidebar-menu"
              >
                <li className="nav-item static-item">
                  <Link
                    className="nav-link static-item disabled"
                    href="#"
                    tabIndex="-1"
                  >
                    <span className="default-icon">Resource Center</span>
                    <span
                      className="mini-icon"
                      data-bs-toggle="tooltip"
                      title="Social"
                      data-bs-placement="right"
                    >
                      -
                    </span>
                  </Link>
                </li>

                {resourceCategories &&
                  resourceCategories.length !== 0 &&
                  resourceCategories.map((category, index) => (
                    <Accordion.Item
                      as="li"
                      eventKey="help-menu"
                      bsPrefix="nav-item"
                      key={index}
                    >
                      <CustomToggle
                        eventKey={category._id}
                        onClick={(activeKey) => {
                          if (activeKey.state == true) {
                            getSubCategory(category._id);
                          }
                          setActiveMenu(activeKey);
                        }}
                      >
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>{category?.name}</Tooltip>}
                        >
                          <i className="icon material-symbols-outlined">
                            newspaper
                          </i>
                        </OverlayTrigger>
                        <span
                          className="item-name"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {category?.name}
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
                        {subCat &&
                          activeMenu.state == true &&
                          activeMenu.eventKey == category._id && (
                            <SubCategory
                              parentId={category?._id}
                              subcat={subCat}
                            />
                          )}
                      </>
                    </Accordion.Item>
                  ))}
              </Accordion>
              <div>
                <hr />
                <div
                  className={`${
                    location.pathname === "/user/user-profile" ? "active" : ""
                  } nav-item `}
                >
                  <Link
                    className={`${
                      location.pathname === "#" ? "active" : ""
                    } nav-link `}
                    aria-current="page"
                    onClick={() => signOut()}
                    href="#"
                  >
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Logout</Tooltip>}
                    >
                      <i className="icon material-symbols-outlined">login</i>
                    </OverlayTrigger>
                    <span className="item-name">Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-footer"></div>
      </aside>
    </>
  );
};

export default Sidebar;
