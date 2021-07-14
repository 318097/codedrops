import React, { Fragment } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import colors, { Card as MCard, Tag, Icon } from "@codedrops/react-ui";
import { md } from "../../lib";
import { toLower, isEmpty, toUpper } from "lodash";
import tracking from "../../lib/mixpanel";

const lastVisited = localStorage.getItem("last-access");

const isNew = (publishedAt) => {
  if (!lastVisited || !publishedAt) return;

  const publishedAtTime = new Date(publishedAt).getTime();
  return publishedAtTime > lastVisited;
};

const CardWrapper = styled.div`
  height: 300px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  a {
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
    .card {
      overflow: hidden;
      flex: 1 1 auto;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      cursor: pointer;
      width: 100%;
      padding: 20px 10px;
      border: 1px solid ${colors.bg};
      box-shadow: ${colors.bg} 3px 3px 3px;
      .title {
        color: ${colors.iron};
        text-align: center;
        padding-bottom: 20px;
        font-size: 1.6rem;
      }
      .content {
        width: 100%;
      }
    }
  }
  .info-list {
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tag {
      font-size: 0.8rem;
      padding: 2px 4px 1px 4px;
    }
  }
  .bulb-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
  }

  &.post {
    .card {
      justify-content: center;
      .title {
        font-size: 2rem;
        line-height: 2.8rem;
      }
    }
  }
`;

const Card = ({ history, post, customStyle, tagColors = {}, target }) => {
  const {
    title = "",
    content = "",
    type = "DROP",
    tags = [],
    slug,
    liveId,
    publishedAt,
  } = post || {};

  const handleTagClick = (event, value) => {
    // history.push(`/posts?tags=${value}`);
    // tracking.track("CLICK_TAG", { slug, title });
  };

  if (!post) return <Fragment />;

  const isNewPost = isNew(publishedAt);

  const pathname = `/posts/${slug}`;

  return (
    <CardWrapper style={customStyle} className={toLower(type)}>
      <Link to={{ pathname, search: target ? `?target=${target}` : "" }}>
        <MCard
          hover
          onClick={() => tracking.track("VIEW_POST", { slug, title })}
        >
          <h3
            className="title"
            dangerouslySetInnerHTML={{ __html: md.renderInline(title) }}
          />
          {["DROP", "QUIZ"].includes(type) && (
            <p
              className="content"
              dangerouslySetInnerHTML={{ __html: md.render(content) }}
            ></p>
          )}
        </MCard>
      </Link>

      {(!isEmpty(tags) || isNewPost) && (
        <div className="info-list">
          <div className="fcc">
            {isNewPost && <Tag color="orange">NEW</Tag>}
            <Tag color="green">{`#${liveId}`}</Tag>
          </div>

          <div className="tag-list">
            {tags.map((tag, index) => (
              <Tag
                onClick={(e) => handleTagClick(e, tag)}
                key={index}
                color={tagColors[tag] ? tagColors[tag] : colors.steel}
              >
                {toUpper(tag)}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {type === "DROP" && <Icon size={12} className="bulb-icon" type="bulb" />}
    </CardWrapper>
  );
};

const mapStateToProps = ({ posts }) => ({
  tagColors: posts.tagColors,
});

export default connect(mapStateToProps)(withRouter(Card));
