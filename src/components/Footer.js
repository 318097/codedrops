import React from "react";
import styled from "styled-components";
import { Icon } from "@codedrops/react-ui";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
  animation: delay 1s 6s forwards;
  opacity: 0;
  a {
    cursor: pointer;
    position: relative;
    .icon {
      margin: 0;
    }
  }
  @media (min-width: 700px) {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }
`;

const menuList = [
  {
    id: "facebook",
    url: "https://www.facebook.com/codedrops.tech/",
    icon: "facebook",
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/codedrops.tech/",
    icon: "instagram",
  },
  { id: "twitter", url: "https://twitter.com/codedrops_tech", icon: "twitter" },
];

const Footer = () => (
  <Wrapper>
    {menuList.map(({ id, url, icon }) => (
      <a key={id} target="_blank" rel="noopener noreferrer" href={url}>
        <Icon className="icon icon-bg" type={icon} />
      </a>
    ))}
  </Wrapper>
);

export default Footer;
