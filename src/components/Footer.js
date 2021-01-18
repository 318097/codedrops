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

const Footer = () => (
  <Wrapper>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.facebook.com/codedrops.tech/"
    >
      <Icon className="icon icon-bg" type="facebook" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/codedrops.tech/"
    >
      <Icon className="icon icon-bg" type="instagram" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://twitter.com/codedrops_tech"
    >
      <Icon className="icon icon-bg" type="twitter" />
    </a>
  </Wrapper>
);

export default Footer;
