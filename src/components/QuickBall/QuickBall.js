import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "@codedrops/react-ui";
import "./QuickBall.scss";
import data from "../../DATA.json";

const menu = [
  {
    name: "Products",
    subMenu: data.products.filter((product) => product.visible),
  },
  {
    name: "Feedback",
    productPath: "/feedback",
  },
];

const QuickBall = ({ history, toggleQuickBall }) => {
  const handleClick = (productPath) => {
    if (!productPath) return;
    history.push(productPath);
    toggleQuickBall();
  };

  return (
    <div className="container">
      <Icon
        type="cancel-2"
        className="close-icon"
        size={14}
        onClick={toggleQuickBall}
      />
      {menu.map(({ name, subMenu = [], productPath }) => (
        <div key={name} className="menu-container">
          <h4 onClick={() => handleClick(productPath)} className="name bb">
            {name}
          </h4>
          {!!subMenu.length &&
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
