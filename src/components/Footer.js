import React from "react";
import styled from "styled-components";
import colors, { Icon } from "@codedrops/react-ui";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
  a {
    cursor: pointer;
    .icon {
      padding: 8px;
      &:hover {
        background: ${colors.strokeTwo};
      }
    }
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
