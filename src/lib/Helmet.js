import React from "react";
import { Helmet as HelmetElement } from "react-helmet";

const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/318097/code-drops/master/assets/codedrops.v2.png";

const Helmet = ({ data }) => {
  const {
    title = "",
    description = "",
    image = DEFAULT_IMAGE,
    pageTitleSuffix,
  } = data || {};

  const currentURL = window.location.href;
  // const content = `${title}
  // ${description}
  // `;

  return (
    <HelmetElement>
      <meta charSet="utf-8" />
      <title>{`${title}${pageTitleSuffix ? pageTitleSuffix : ""}`}</title>
      <meta name="title" content={title} />
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta property="og:type" content={"article"} key="ogtype" />
      <meta property="og:url" content={currentURL} key="ogurl" />
      {/* Render small sized card */}
      <meta name="twitter:card" content={"summary"} key="twcard" />
      <meta name="twitter:site" content={"@codedrops_tech"} key="twsite" />
      <meta name="twitter:creator" content={"@318097"} key="twcreator" />
    </HelmetElement>
  );
};

export default Helmet;
