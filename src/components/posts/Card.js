import React, { Fragment } from "react";
import marked from "marked";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import colors, { Card as MCard, Tag, Icon } from "@codedrops/react-ui";

const Wrapper = styled.div`
  height: 135px;
  width: 215px;
  cursor: pointer;
  position: relative;
  margin: 2px;
  .card {
    border-radius: 2px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background: ${colors.feather};
    border: 1px solid ${colors.strokeOne};
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
      bottom: 4px;
      left: 4px;
      text-align: left;
      .tag {
        padding: 1px 2px 0px 2px;
        font-size: 0.8rem;
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

const Card = ({ history, post, customStyle, tagColors = {} }) => {
  const { title = "", content = "", type = "DROP", tags = [], _id } =
    post || {};

  const handleClick = () => history.push(`/${_id}`);

  const handleTagClick = (value) => (event) => {
    event.stopPropagation();
    history.push(`/posts?tags=${value}`);
  };

  if (!post) return <Fragment />;

  return (
    <Wrapper style={customStyle} onClick={handleClick}>
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
            <Tag
              onClick={handleTagClick(tag)}
              key={index}
              color={tagColors[tag] ? tagColors[tag] : colors.steel}
            >
              {tag.toUpperCase()}
            </Tag>
          ))}
        </div>
        {type === "DROP" && (
          <Icon size={12} className="bulb-icon" type="bulb" />
        )}
      </MCard>
    </Wrapper>
  );
};

const mapStateToProps = ({ posts }) => ({
  tagColors: posts.tagColors,
});

export default connect(mapStateToProps)(withRouter(Card));
