import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./MenuDropdown.scss";
import { Icon } from "@codedrops/react-ui";

const MenuDropdown = ({ toggleDropdown, dropdownVisibility, menu }) => {
  const containerRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleOutsideClick, {
        capture: true,
      });
  }, []);

  const handleOutsideClick = (e) => {
    const ref = containerRef.current;
    const { target } = e;

    if (
      ref &&
      !ref.contains(target) &&
      !document.getElementById("drop-icon").contains(target)
    )
      toggleDropdown();
  };

  return (
    <div className="menu-dropdown">
      <Icon
        id="drop-icon"
        className="ant-icon"
        type="menu"
        hover
        onClick={toggleDropdown}
      />
      {dropdownVisibility && (
        <div className="menu-dropdown-container" ref={containerRef}>
          {menu.map(({ name, subMenu = [], url = "" }) => (
            <div key={name} className="menu-container">
              <Link
                onClick={() => (url ? toggleDropdown() : null)}
                to={url}
                className={`item-name${url ? " link" : ""}`}
              >
                {name}
              </Link>

              {!!subMenu.length &&
                subMenu.map(({ name, subText, url }, index) => {
                  return (
                    <Link
                      onClick={toggleDropdown}
                      key={name}
                      className="sub-menu-item-wrapper"
                      to={url}
                    >
                      <span className="index">{index + 1}.</span>
                      <h4 className="item-name">{name}</h4>
                      {subText && <p className="sub-text">{subText}</p>}
                    </Link>
                  );
                })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default connect(null, null)(withRouter(MenuDropdown));
