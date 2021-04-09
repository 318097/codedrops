import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "@codedrops/react-ui";
import "./Products.scss";
import data from "../../DATA.json";
import PageNotFound from "../PageNotFound";

const Products = ({ history, match }) => {
  const { id } = match.params;

  const matchedProduct = data.products.find((product) => product.id === id);

  const {
    name,
    tagline,
    description,
    links,
    image,
    visible,
    logo,
    video,
    poster,
  } = matchedProduct || {};

  const ctaAction = () => {
    window.open(`${links.product.url}`, "__blank");
  };

  if (!visible) return <PageNotFound />;

  return (
    <section id="products">
      <div className="content">
        {!!logo && <img className="logo" alt="logo" src={logo} />}
        <h3 className="name" dangerouslySetInnerHTML={{ __html: name }} />
        <p className="tagline" dangerouslySetInnerHTML={{ __html: tagline }} />
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex center" style={{ marginBottom: "24px" }}>
          {!!video && (
            <a className="link" href={video} target="__blank">
              Demo
            </a>
          )}
          {!!links.ph && (
            <a className="link" href={links.ph.url} target="__blank">
              {links.ph.label}
            </a>
          )}
        </div>

        {!!links.product && (
          <Button onClick={ctaAction}>{links.product.label}</Button>
        )}
        {/* <img src={image} alt={name} /> */}
      </div>
      {/* {poster && <img src={poster} alt="preview" className="poster" />} */}
      {/* <video autoPlay width="640" height="500">
        <source src={poster} type="video/mp4" />
      </video> */}
    </section>
  );
};

export default connect(null, null)(withRouter(Products));
