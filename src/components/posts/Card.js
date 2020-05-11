import React, { Fragment } from "react";
import marked from "marked";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import colors, { Card as MCard, Tag, Icon } from "@ml318097/react-ui";

const Wrapper = styled.div`
  height: 135px;
  cursor: pointer;
  position: relative;
  .card {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    &:after {
      background: ${colors.steel};
    }
    .title {
      color: ${colors.iron};
      text-align: center;
    }
    .content {
      width: 100%;
      overflow: auto;
      pre code {
        font-size: 1rem;
      }
    }
    .tagList {
      position: absolute;
      bottom: 8px;
      left: 6px;
      text-align: left;
      .tag {
        font-size: 0.8rem;
        color: ${colors.steel};
      }
    }
  }
  .bulb-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
  }
`;

const Card = ({ history, post }) => {
  const { title = "", content = "", type = "DROP", tags = [], _id } =
    post || {};

  const handleClick = () => history.push(`/${_id}`);

  const handleTagClick = (value) => (event) => {
    event.stopPropagation();
    history.push(`/posts?tags=${value}`);
  };

  if (!post) return <Fragment />;

  return (
    <Wrapper onClick={handleClick}>
      <MCard>
        {type === "POST" && <h3 className="title">{title}</h3>}
        {type === "DROP" && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        )}
        <div className="tagList">
          {tags.map((tag, index) => (
            <Tag onClick={handleTagClick(tag)} key={index}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </div>
        {type === "DROP" && <Icon className="bulb-icon" type="bulb" />}
      </MCard>
    </Wrapper>
  );
};

Card.defaultProps = {
  showTitle: true,
  showContent: true,
};

export default withRouter(Card);
