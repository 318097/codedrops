import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "@codedrops/react-ui";
import "./Products.scss";
import data from "../../DATA.json";
import PageNotFound from "../../lib/PageNotFound";
import Helmet from "../../lib/Helmet";
import tracking from "../../lib/mixpanel";

const Products = ({ match }) => {
  const { id } = match.params;

  const matchedProduct = data.products.find((product) => product.id === id);

  const { name, tagline, description, links, image, visible, logo, poster } =
    matchedProduct || {};

  const ctaAction = () => {
    let queryParams = "";
    // if (id === "octon") queryParams = `?token=${token}`;

    window.open(`${links.product.url}${queryParams}`, "__blank");
    tracking.track("OPENED_PRODUCT", { name });
  };

  if (!visible) return <PageNotFound />;

  const { demo, ph, product } = links;

  return (
    <section id="products">
      <Helmet data={{ title: name, description: tagline }} />
      <div className="content">
        {!!logo && <img className="logo" alt="logo" src={logo} />}
        <h3 className="name" dangerouslySetInnerHTML={{ __html: name }} />
        <p className="tagline" dangerouslySetInnerHTML={{ __html: tagline }} />
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex center mb-16">
          {!!demo && (
            <a className="link" href={demo.url} target="__blank">
              {demo.label}
            </a>
          )}
          {!!ph && (
            <a className="link" href={ph.url} target="__blank">
              {ph.label}
            </a>
          )}
        </div>

        {!!product && <Button onClick={ctaAction}>{product.label}</Button>}
        {/* <img src={image} alt={name} /> */}
      </div>
    </section>
  );
};

export default connect(null, null)(withRouter(Products));
