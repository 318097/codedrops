import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./MenuDropdown.scss";
import { Icon, Dropdown } from "@codedrops/react-ui";
import data from "../../DATA.json";

const menu = [
  {
    name: "Products",
    subMenu: data.products
      .filter((product) => product.visible)
      .map((product) => ({
        ...product,
        url: product.productPath,
        subText: product.tagline,
      })),
  },
  {
    name: "Feedback",
    url: "/feedback",
  },
];

const MenuDropdown = () => {
  return (
    <Dropdown
      renderButtonComponent={<Icon type="menu" />}
      renderDropdownComponent={
        <div className="menu-dropdown-container">
          {menu.map(({ name, subMenu = [], url = "" }) => (
            <div key={name} className="menu-container">
              <Link to={url} className={`item-name${url ? " link" : ""}`}>
                {name}
              </Link>

              {!!subMenu.length &&
                subMenu.map(({ name, subText, url }, index) => {
                  return (
                    <Link key={name} className="sub-menu-item-wrapper" to={url}>
                      <span className="index">{index + 1}.</span>
                      <h4 className="item-name">{name}</h4>
                      {subText && <p className="sub-text">{subText}</p>}
                    </Link>
                  );
                })}
            </div>
          ))}
        </div>
      }
    />
  );
};

export default connect(null, null)(withRouter(MenuDropdown));
