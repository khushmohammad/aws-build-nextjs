import React, { useEffect, useState } from "react";
// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";

// Redux Selector / Action
import { useDispatch, useSelector } from "react-redux";

//components
import Scrollbar from "smooth-scrollbar";
import {
  Accordion,
  Button,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Link from "next/link";
import { helpService } from "../../services/basic.services";
import CustomToggle from "../dropdowns";
import SubCategory from "./SubCategory";

const Sidebar = () => {
  const [subCategory, setSubCategory] = useState(null);
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

  const helpCategories = useSelector((state) => state?.help?.helpCategory);

  const getSubCategory = async (helpId) => {
    const res = await helpService(helpId);
    setSubCategory({ subCats: res, parentId: helpId });
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
                    <span className="default-icon">Help Center</span>
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
                {helpCategories &&
                  helpCategories.length !== 0 &&
                  helpCategories.map((category, index) => (
                    <li
                      key={index}
                      className={`${
                        location.pathname === "/" ? "active" : ""
                      } nav-item `}
                    >
                      <Link
                        className={`${
                          location.pathname === "/" ? "active" : ""
                        } nav-link `}
                        aria-current="page"
                        href={`/help&supports/${category?._id}`}
                      >
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>{category?.title}</Tooltip>}
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
                          <a
                            className=""
                            onClick={() => getSubCategory(category?._id)}
                          >
                            {category?.title}
                            {subCategory && (
                              <SubCategory
                                helpid={category?._id}
                                subcat={subCategory}
                              />
                            )}
                          </a>
                        </span>
                      </Link>
                    </li>
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
