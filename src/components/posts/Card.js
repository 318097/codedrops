import React, { Fragment } from "react";
import marked from "marked";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import colors, { Card as MCard, Tag, Icon } from "@codedrops/react-ui";

const lastVisited = localStorage.getItem("last-access");

const isNew = (publishedAt) => {
  if (!lastVisited || !publishedAt) return;

  const publishedAtTime = new Date(publishedAt).getTime();
  return publishedAtTime > lastVisited;
};

const Wrapper = styled.div`
  break-inside: avoid-column;
  margin-bottom: 12px;
  position: relative;
  .card {
    position: relative;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.strokeOne};
    padding: 20px 10px;
    overflow: hidden;
    &:hover {
      background: ${colors.featherDark};
    }
    .title {
      color: ${colors.iron};
      text-align: center;
      padding: 30px 0 20px;
      font-size: 1.6rem;
    }
    .title.post {
      padding: 40px 0;
      font-size: 1.8rem;
    }
  }
  .info-list {
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tag-list {
      .tag {
        border-radius: 2px;
        padding: 3px 2px 0px 2px;
        font-size: 0.8rem;
      }
    }
  }
  .live-id {
    border-radius: 30%;
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 32px;
    width: 32px;
    font-size: 0.8rem;
    background: ${colors.strokeOne};
    position: absolute;
    bottom: -6px;
    right: -2px;
    padding: 8px;
  }
  .new-post {
    color: white;
    background: ${colors.orange};
    font-size: 0.8rem;
    padding: 2px 1px 0px;
    border-radius: 2px;
    z-index: 1;
  }
  .bulb-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
  }
`;

const Card = ({ history, post, customStyle, tagColors = {} }) => {
  const {
    title = "",
    content = "",
    type = "DROP",
    tags = [],
    _id,
    slug,
    liveId,
    publishedAt,
  } = post || {};

  const handleClick = () => history.push(`/posts/${slug}`);

  const handleTagClick = (event, value) => {
    // history.push(`/posts?tags=${value}`);
  };

  if (!post) return <Fragment />;

  const isNewPost = isNew(publishedAt);

  return (
    <Wrapper style={customStyle}>
      <MCard curved onClick={handleClick}>
        <h3 className={`title ${type === "POST" ? "post" : ""}`}>{title}</h3>
        {["DROP", "QUIZ"].includes(type) && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        )}
        <div className="live-id">{liveId}</div>
      </MCard>
      {(!!tags.length || isNewPost) && (
        <div className="info-list">
          <div className="tag-list">
            {tags.map((tag, index) => (
              <Tag
                onClick={(e) => handleTagClick(e, tag)}
                key={index}
                color={tagColors[tag] ? tagColors[tag] : colors.steel}
              >
                {tag.toUpperCase()}
              </Tag>
            ))}
          </div>
          {isNewPost && <div className="new-post">NEW</div>}
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
