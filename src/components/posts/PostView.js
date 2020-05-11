import React, { useEffect } from "react";
import marked from "marked";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getPostById } from "../../store/posts/actions";
import colors, { Card, Tag, Icon } from "@ml318097/react-ui";

const Wrapper = styled.div`
  margin-top: 20px;
  max-width: 450px;
  width: 95%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .card {
    height: 100%;
    padding: 12px 0;
    box-shadow: none;
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
      code {
        background: ${colors.orchid};
        color: ${colors.white};
        padding: 2px;
        border-radius: 2px;
        font-size: 1rem;
      }
      pre {
        padding: 4px;
        border: 0.5px solid ${colors.strokeTwo};
        border-radius: 6px;
        font-size: 1rem;
        background: ${colors.featherDark};
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
        cursor: pointer;
        margin-right: 3px;
        color: ${colors.steel};
      }
    }
  }
  .back-icon {
    position: absolute;
    top: 8px;
    left: 6px;
    z-index: 1;
  }
`;

const PostView = ({ history, match, post, getPostById }) => {
  useEffect(() => {
    const { id } = match.params;
    getPostById(id);
  }, []);

  const handleTagClick = (value) => (event) => {
    event.stopPropagation();
    history.push(`/?tags=${value}`);
  };

  if (!post) return null;

  const { title, content, tags = [] } = post;
  return (
    <section id="view-post">
      <Wrapper>
        <Card curved>
          <h3 className="title">{title}</h3>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
          <div className="tagList">
            {["javascript", "react"].map((tag, index) => (
              <Tag onClick={handleTagClick(tag)} key={index}>
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
      </Wrapper>
    </section>
  );
};

const mapStateToProps = ({ posts }) => ({
  post: posts.selectedPost,
});

const mapDispatchToProps = {
  getPostById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostView));
