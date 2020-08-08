import React, { Fragment } from "react";
import marked from "marked";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import colors, { Card as MCard, Tag, Icon } from "@codedrops/react-ui";

const Wrapper = styled.div`
  break-inside: avoid-column;
  margin-bottom: 12px;
  position: relative;
  .card {
    position: relative;
    cursor: pointer;
    min-height: 115px;
    /* border-radius: 4px; */
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.strokeOne};
    /* box-shadow: 2px 2px 4px #e0e0e0; */
    padding: 20px 10px;

    &:hover {
      background: ${colors.featherDark};
    }
    .title {
      color: ${colors.iron};
      text-align: center;
      font-weight: normal;
    }
  }
  .tagList {
    margin-top: 4px;
    margin-left: 2px;
    .tag {
      border-radius: 2px;
      padding: 3px 2px 0px 2px;
      font-size: 0.8rem;
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
      <MCard curved>
        <h3 className="title">{title}</h3>
        {type === "DROP" && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        )}
      </MCard>
      {!!tags.length && (
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
      )}
      {type === "DROP" && <Icon size={12} className="bulb-icon" type="bulb" />}
    </Wrapper>
  );
};

const mapStateToProps = ({ posts }) => ({
  tagColors: posts.tagColors,
});

export default connect(mapStateToProps)(withRouter(Card));
