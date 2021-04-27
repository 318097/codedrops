import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./QuickBall.scss";
import data from "../../DATA.json";
import { Icon } from "@codedrops/react-ui";

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

const QuickBall = ({ toggleQuickBall, quickBallStatus }) => {
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
      !document.getElementById("quick-ball-icon").contains(target)
    )
      toggleQuickBall();
  };

  return (
    <div className="quick-ball">
      <Icon
        id="quick-ball-icon"
        className="ant-icon"
        type="menu"
        hover
        onClick={() => toggleQuickBall(!quickBallStatus)}
      />
      {quickBallStatus && (
        <div className="quick-ball-container" ref={containerRef}>
          {/* <Icon
        type="cancel-2"
        className="close-icon"
        size={16}
        onClick={toggleQuickBall}
      /> */}
          <div className="container">
            {menu.map(({ name, subMenu = [], productPath = "" }) => (
              <div key={name} className="menu-container">
                <Link
                  onClick={() => (productPath ? toggleQuickBall() : null)}
                  to={productPath}
                  className={`name${productPath ? " pointer" : ""}`}
                >
                  {name}
                </Link>

                {!!subMenu.length &&
                  subMenu.map(({ name, tagline, productPath }, index) => {
                    return (
                      <Link
                        onClick={() => toggleQuickBall()}
                        key={name}
                        className="sub-menu-container"
                        to={productPath}
                      >
                        <span className="index">{index + 1}.</span>
                        <h4 className="name">{name}</h4>
                        {tagline && <p className="tagline">{tagline}</p>}
                      </Link>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(null, null)(withRouter(QuickBall));
