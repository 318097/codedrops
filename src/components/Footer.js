import React from "react";
import styled from "styled-components";
import { Icon } from "@codedrops/react-ui";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
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
