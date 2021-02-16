import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "@codedrops/react-ui";
import "./Products.scss";
import { PRODUCTS } from "../../constants";
import PageNotFound from "../PageNotFound";

const Products = ({ history, match }) => {
  const { id } = match.params;
  const matchedProduct = PRODUCTS.find((product) => product.id === id);
  const { name, shortDescription, description, download, image, visible } =
    matchedProduct || {};

  const downloadProduct = () => {
    window.open(`${download}?utm_source=codedrops`, "__blank");
  };

  if (!visible) return <PageNotFound />;

  return (
    <section id="products">
      <h3 className="name" dangerouslySetInnerHTML={{ __html: name }} />
      <p
        className="short-description"
        dangerouslySetInnerHTML={{ __html: shortDescription }}
      />
      <p
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {!!download && <Button onClick={downloadProduct}>Download</Button>}
      {/* <img src={image} alt={name} /> */}
    </section>
  );
};

export default connect(null, null)(withRouter(Products));
