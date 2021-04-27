import React from "react";
import styled from "styled-components";
import colors, { Icon } from "@codedrops/react-ui";

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
    color: colors.iron,
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/codedrops.tech/",
    icon: "instagram",
    color: colors.iron,
  },
  {
    id: "twitter",
    url: "https://twitter.com/codedrops_tech",
    icon: "twitter",
    color: colors.iron,
  },
  {
    id: "linkedin",
    url: "https://www.linkedin.com/company/codedrops-tech/",
    icon: "linkedin",
    color: colors.iron,
  },
];

const Footer = () => (
  <Wrapper>
    {menuList.map(({ id, url, icon, color }) => (
      <a key={id} target="_blank" rel="noopener noreferrer" href={url}>
        <Icon hover type={icon} fill={color} />
      </a>
    ))}
  </Wrapper>
);

export default Footer;
