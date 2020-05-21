import React from "react";
import styled from "styled-components";
import { Icon } from "@codedrops/react-ui";

const Wrapper = styled.div`
  position: absolute;
  bottom: 4px;
  right: 3px;
  display: flex;
  a {
    margin: 0 2px;
    cursor: pointer;
  }
`;

const Footer = () => (
  <Wrapper>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.facebook.com/codedrops.tech/"
    >
      <Icon type="facebook" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/codedrops.tech/"
    >
      <Icon type="instagram" />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://twitter.com/codedrops_tech"
    >
      <Icon type="twitter" />
    </a>
  </Wrapper>
);

export default Footer;
