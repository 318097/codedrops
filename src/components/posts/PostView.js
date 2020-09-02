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
    padding: 20px 0 10px;
    display: flex;
    flex-direction: column;
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
        <Card bottomLine>
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
