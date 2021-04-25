import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "@codedrops/react-ui";
import "./Products.scss";
import data from "../../DATA.json";
import PageNotFound from "../PageNotFound";
import { Helmet } from "react-helmet";

const HelmetData = ({ title }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta property="og:title" content={title} key="ogtitle" />
    <meta
      property="og:image"
      content={
        "https://raw.githubusercontent.com/318097/code-drops/master/assets/codedrops.v2.png"
      }
      key="ogimage"
    />
    {/* <meta name="description" content={title}/> */}
    {/* <meta name="twitter:card" content="summary" key="twcard" /> */}
    {/* <meta property="og:url" content={currentURL} key="ogurl" /> */}
  </Helmet>
);

const Products = ({ history, match }) => {
  const { id } = match.params;

  const matchedProduct = data.products.find((product) => product.id === id);

  const { name, tagline, description, links, image, visible, logo, poster } =
    matchedProduct || {};

  const ctaAction = () => {
    window.open(`${links.product.url}`, "__blank");
  };

  if (!visible) return <PageNotFound />;

  return (
    <section id="products">
      <HelmetData title={name} description={tagline} />
      <div className="content">
        {!!logo && <img className="logo" alt="logo" src={logo} />}
        <h3 className="name" dangerouslySetInnerHTML={{ __html: name }} />
        <p className="tagline" dangerouslySetInnerHTML={{ __html: tagline }} />
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex center" style={{ marginBottom: "24px" }}>
          {!!links.demo && (
            <a className="link" href={links.demo.url} target="__blank">
              {links.demo.label}
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
    </section>
  );
};

export default connect(null, null)(withRouter(Products));
