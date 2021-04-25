import React from "react";
import styled from "styled-components";
import colors, { Icon } from "@codedrops/react-ui";

const getSharerURL = (type, url = window.location.href, text) => {
  const encodedPageURL = encodeURIComponent(url);
  // eslint-disable-next-line default-case
  switch (type) {
    case "FACEBOOK":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedPageURL}${
        text && `&quote=${text}`
      }`;
    case "TWITTER":
      return `https://twitter.com/intent/tweet?url=${encodedPageURL}${
        text && `&text=${text}`
      }`;
    case "LINKEDIN":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPageURL}`;
  }
};

const Wrapper = styled.div`
  background: ${colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 2px;
  text-transform: uppercase;
  a {
    cursor: pointer;
    position: relative;
    .icon {
      margin: 0;
    }
  }
`;

const menuList = [
  {
    id: "facebook",
    icon: "facebook",
  },
  {
    id: "linkedin",
    icon: "linkedin",
  },
  {
    id: "twitter",
    icon: "twitter",
  },
];

const SharePost = () => {
  return (
    <Wrapper>
      Liked this post? Share it!
      {menuList.map(({ id, icon }) => {
        const url = getSharerURL(id.toUpperCase());
        return (
          <a key={id} target="_blank" rel="noopener noreferrer" href={url}>
            <Icon hover fill={colors.iron} type={icon} />
          </a>
        );
      })}
    </Wrapper>
  );
};

export default SharePost;
