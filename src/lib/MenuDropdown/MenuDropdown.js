import React from "react";
import { withRouter } from "react-router-dom";
import "./MenuDropdown.scss";
import { Icon, Dropdown } from "@codedrops/react-ui";
import data from "../../DATA.json";
import { get } from "lodash";
import { getToken } from "../auth";
import tracking from "../mixpanel";

const menu = [
  {
    name: "Products",
    subMenu: data.products
      .filter((product) => product.visibility?.codedrops)
      .map((product) => ({
        ...product,
        url: product.path,
        subText: product.tagline,
        productURL: get(product, "links.product.url"),
      })),
  },
];

const MenuDropdown = ({ history }) => {
  const handleClick = ({ url, productURL, name }) => {
    tracking.track("VIEWED_PRODUCT_PAGE", { name });
    if (url) history.push(url);
    else if (productURL) {
      const token = getToken() || "";
      window.open(`${productURL}?token=${token}&utm_source=codedrops`);
    }
  };

  return (
    <Dropdown
      renderButtonComponent={
        <Icon
          type="menu"
          onClick={() =>
            tracking.track("CLICK_ACTION", { target: "menu icon" })
          }
        />
      }
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
                subMenu.map(({ name, subText, url, productURL }, index) => {
                  return (
                    <div
                      key={name}
                      className="sub-menu-item-wrapper"
                      onClick={() => handleClick({ url, productURL, name })}
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
