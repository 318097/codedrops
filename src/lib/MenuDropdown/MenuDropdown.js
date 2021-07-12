import React from "react";
import { withRouter } from "react-router-dom";
import "./MenuDropdown.scss";
import { Icon, Dropdown } from "@codedrops/react-ui";
import data from "../../DATA.json";
import { get } from "lodash";
import { getToken } from "../auth";

const menu = [
  {
    name: "Products",
    subMenu: data.products
      .filter((product) => product.visible)
      .map((product) => ({
        ...product,
        url: product.productPath,
        subText: product.tagline,
        productPath: get(product, "links.product.url"),
      })),
  },
];

const MenuDropdown = ({ history, actionClick }) => {
  const handleClick = ({ url, productPath, name }) => {
    if (url) history.push(url);
    else if (productPath) {
      const token = getToken() || "";
      window.open(`${productPath}?token=${token}&utm_source=codedrops`);
    }
    actionClick("Products", name);
  };

  return (
    <Dropdown
      renderButtonComponent={<Icon type="menu" />}
      renderDropdownComponent={
        <div className="menu-dropdown-container">
          {menu.map(({ name, subMenu = [], url = "" }) => (
            <div key={name} className="menu-container">
              <div
                onClick={() => handleClick({ url, name })}
                className={`item-name${url ? " link" : ""}`}
              >
                {name}
              </div>

              {!!subMenu.length &&
                subMenu.map(({ name, subText, url, productPath }, index) => {
                  return (
                    <div
                      key={name}
                      className="sub-menu-item-wrapper"
                      onClick={() => handleClick({ url, productPath, name })}
                    >
                      <span className="index">{index + 1}.</span>
                      <h4 className="item-name">{name}</h4>
                      {subText && <p className="sub-text">{subText}</p>}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      }
    />
  );
};

export default withRouter(MenuDropdown);
