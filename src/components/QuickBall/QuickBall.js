import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
      target !== document.getElementById("quick-ball-icon")
    )
      toggleQuickBall();
  };

  const handleClick = (productPath) => {
    if (!productPath) return;
    history.push(productPath);
    toggleQuickBall();
  };

  return (
    <div className="quick-ball-container" ref={containerRef}>
      {/* <Icon
        type="cancel-2"
        className="close-icon"
        size={16}
        onClick={toggleQuickBall}
      /> */}
      <div className="container">
        {menu.map(({ name, subMenu = [], productPath }) => (
          <div key={name} className="menu-container">
            <h4
              onClick={() => handleClick(productPath)}
              className={`name${productPath ? " pointer" : ""}`}
            >
              {name}
            </h4>
            {!!subMenu.length &&
              subMenu.map(({ name, tagline, productPath }, index) => {
                return (
                  <div
                    key={name}
                    className="sub-menu-container"
                    onClick={() => handleClick(productPath)}
                  >
                    <span className="index">{index + 1}.</span>
                    <h4 className="name">{name}</h4>
                    {tagline && <p className="tagline">{tagline}</p>}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(null, null)(withRouter(QuickBall));
