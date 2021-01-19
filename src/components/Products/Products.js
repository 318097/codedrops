import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon, Button } from "@codedrops/react-ui";
import "./Products.scss";
import { PRODUCTS } from "../../constants";

const Products = ({ history, match }) => {
  const { id } = match.params;
  const matchedProduct = PRODUCTS.find((product) => product.id === id);
  const {
    name,
    shortDescription,
    description,
    download,
    image,
  } = matchedProduct;

  const downloadProduct = () => {
    window.open(download, "__blank");
  };

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
      <Button onClick={downloadProduct}>Download</Button>
      {/* <img src={image} alt={name} /> */}
    </section>
  );
};

export default connect(null, null)(withRouter(Products));
