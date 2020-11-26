import React, { useEffect } from "react";
import marked from "marked";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RelatedPosts from "./RelatedPosts";
import { getPostById } from "../../store/posts/actions";
import colors, { Card, Tag, Icon } from "@codedrops/react-ui";

const CardWrapper = styled.div`
  position: relative;
  .card {
    border: 1px solid ${colors.strokeOne};
    height: 100%;
    padding: 10px 0 2px;
    display: flex;
    flex-direction: column;
    .title {
      text-align: center;
      margin: 10px;
      font-size: 2rem;
    }
    .content {
      flex: 1 1 auto;
      overflow: auto;
      padding: 20px 10px;
      font-size: 1.2rem;
      line-height: 1.6;
      .chain-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        .chain-item-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          .chain-item-id {
            background: ${colors.strokeOne};
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.4s;
            margin-right: 10px;
            position: relative;
            top: 3px;
          }
          .chain-item-title {
            position: relative;
            top: 2px;
            font-size: 1.2rem;
          }
        }
        .chain-item-content {
          padding-left: 12px;
          font-size: 1.2rem;
          line-height: 1.6;
          color: ${colors.bar};
        }
      }
    }
    .actions {
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tag-list {
        .tag {
          padding: 2px 4px 0;
          margin-right: 3px;
          border-radius: 0;
        }
      }
      .date {
        font-size: 1rem;
        color: $bar;
      }
    }
  }
  .back-icon {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
  }
`;

const PostView = ({ history, match, post, getPostById, tagColors }) => {
  useEffect(() => {
    const { id } = match.params;
    getPostById(id);
  }, [match.params.id]);

  const handleTagClick = (value) => (event) => {
    // event.stopPropagation();
    // history.push(`/posts/?tags=${value}`);
  };

  if (!post) return null;

  const {
    title,
    content,
    tags = [],
    _id,
    type,
    chainedPosts = [],
    publishedAt,
  } = post || {};
  return (
    <section id="view-post">
      <CardWrapper className="post-wrapper">
        <Card bottomLine>
          <h3 className="title">{title}</h3>
          {type === "CHAIN" ? (
            <div className="content">
              {chainedPosts.map((post, index) => (
                <div className="chain-item" key={post._id}>
                  <div className="chain-item-header">
                    <div className="chain-item-id">{index + 1}</div>
                    <h3 className="chain-item-title">{post.title}</h3>
                  </div>
                  <div
                    className="chain-item-content"
                    dangerouslySetInnerHTML={{
                      __html: marked(post.content || ""),
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
          )}
          <div className="actions">
            <div className="tag-list">
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
            <div className="date">
              {publishedAt &&
                `Published on: ${new Date(publishedAt).toLocaleDateString()}`}
            </div>
          </div>
        </Card>
        <Icon
          size={16}
          className="back-icon icon"
          onClick={() => history.push("/posts")}
          type="caret-left"
        />
      </CardWrapper>
      <RelatedPosts postId={_id} tags={tags} />
    </section>
  );
};

const mapStateToProps = ({ posts }) => ({
  post: posts.selectedPost,
  tagColors: posts.tagColors,
});

const mapDispatchToProps = {
  getPostById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostView));
