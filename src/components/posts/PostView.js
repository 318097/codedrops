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
    padding: 12px 0 4px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 5px 5px 10px #e0e0e0;
    .title {
      text-align: center;
      margin: 10px;
      font-size: 1.4rem;
    }
    .content {
      flex: 1 1 auto;
      overflow: auto;
      padding: 20px 10px;
      font-size: 1.2rem;
      line-height: 1.6;
      code {
        background: ${colors.orchid};
        color: ${colors.white};
        padding: 2px 4px 0;
        border-radius: 2px;
        font-size: 1rem;
      }
      pre {
        padding: 4px;
        border: 0.5px solid ${colors.strokeTwo};
        border-radius: 2px;
        font-size: 1rem;
        overflow-x: auto;
        background: ${colors.bg};
        code {
          font-size: 1rem;
          background: none;
          color: ${colors.bar};
        }
      }
    }
    .tagList {
      padding-left: 4px;
      .tag {
        padding: 2px 4px 0;
        margin-right: 3px;
        border-radius: 0;
      }
    }
  }
  .back-icon {
    position: absolute;
    top: 6px;
    left: 6px;
    z-index: 1;
  }
`;

const PostView = ({ history, match, post, getPostById, tagColors }) => {
  useEffect(() => {
    const { id } = match.params;
    getPostById(id);
  }, [match.params.id]);

  const handleTagClick = (value) => (event) => {
    event.stopPropagation();
    history.push(`/?tags=${value}`);
  };

  if (!post) return null;

  const { title, content, tags = [], _id } = post;
  return (
    <section id="view-post">
      <CardWrapper className="post-wrapper">
        <Card>
          <h3 className="title">{title}</h3>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
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
        </Card>
        <Icon
          size={16}
          background
          className="back-icon"
          onClick={() => history.push("/")}
          type="caret-left"
        />
      </CardWrapper>
      <RelatedPosts postId={_id} />
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
