import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "@codedrops/react-ui";
import "./QuickBall.scss";
import { PRODUCTS } from "../../constants";

const menu = [
  {
    name: "Products",
    subMenu: [PRODUCTS[0]],
  },
];

const QuickBall = ({ history, toggleQuickBall }) => {
  const handleClick = (productPath) => history.push(productPath);

  return (
    <div className="container">
      <Icon
        type="cancel-2"
        className="close-icon"
        size={12}
        onClick={toggleQuickBall}
      />
      {menu.map(({ name, subMenu = [], productPath }) => (
        <div key={name} className="menu-container">
          <h4 className="name bb">{name}</h4>
          {subMenu.length &&
            subMenu.map(({ name, shortDescription, productPath }, index) => {
              return (
                <div key={name} className="sub-menu-container">
                  <span className="index">{index + 1}.</span>
                  <h4
                    className="name"
                    onClick={() => handleClick(productPath)}
                  >{`${name}`}</h4>
                  {shortDescription && (
                    <p className="short-description">{shortDescription}</p>
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default connect(null, null)(withRouter(QuickBall));
