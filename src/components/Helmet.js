import React from "react";
import { Helmet as HelmetElement } from "react-helmet";

const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/318097/code-drops/master/assets/codedrops.v2.png";

const HelmetData = ({ data }) => {
  const {
    title = "",
    description = "",
    image = DEFAULT_IMAGE,
    pageTitleSuffix,
  } = data || {};

  const currentURL = window.location.href;
  const content = `${title}
  ${description}
  `;

  return (
    <HelmetElement>
      <meta charSet="utf-8" />
      <title>{`${title}${pageTitleSuffix ? pageTitleSuffix : ""}`}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:image" content={image} key="ogimage" />
      {description && <meta name="description" content={description} />}
      <meta name="twitter:card" content={content} key="twcard" />
      <meta property="og:url" content={currentURL} key="ogurl" />
    </HelmetElement>
  );
};

export default HelmetData;
