import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RelatedPosts from "./RelatedPosts";
import { getPostById } from "../../store/posts/actions";
import colors, { Card, Tag, Icon, Button } from "@codedrops/react-ui";
import { showPopup } from "../../helper";
import { md } from "../../util";

const CardWrapper = styled.div`
  position: relative;
  .card {
    border: 1px solid ${colors.bg};
    box-shadow: ${colors.bg} 3px 3px 3px;
    height: 100%;
    padding: 10px 0 2px;
    display: flex;
    flex-direction: column;
    &:hover {
      background: ${colors.white};
    }
    .title {
      text-align: center;
      padding: 0 10px;
      margin-bottom: 10px;
      font-size: 2rem;
    }
    .content-wrapper {
      flex: 1 1 auto;
      overflow: auto;
      padding: 0 10px;
      .content {
        margin-bottom: 10px;
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
    }
    .quiz-solution {
      background: ${colors.bg};
      border: 1px solid ${colors.strokeTwo};
      padding: 10px;
      margin-bottom: 10px;
      text-align: center;
      border-radius: 4px;
    }
    .actions {
      padding: 0 10px 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tag-list {
        .tag {
          padding: 2px 4px 0;
          margin: 0 3px 3px 0px;
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
  .heart-icon {
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 1;
  }
`;

const PostView = ({
  history,
  match,
  post,
  getPostById,
  tagColors,
  session,
}) => {
  const [viewSolution, setViewSolution] = useState(false);

  useEffect(() => {
    const { id } = match.params;
    getPostById(id);
  }, [match.params.id]);

  const handleTagClick = (value) => (event) => {
    // event.stopPropagation();
    // history.push(`/posts/?tags=${value}`);
  };

  const toggleFavoritePost = () => {
    if (!session || !session.loggedIn)
      showPopup({ title: "Please login to mark as favorite" });
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
    solution,
  } = post || {};
  return (
    <section id="view-post">
      <CardWrapper className="post-wrapper">
        <Card bottomLine>
          <h3
            className="title"
            dangerouslySetInnerHTML={{ __html: md.renderInline(title) }}
          />
          <div className="content-wrapper">
            {type === "CHAIN" ? (
              <div className="content">
                {chainedPosts.map((post, index) => (
                  <div className="chain-item" key={post._id}>
                    <div className="chain-item-header">
                      <div className="chain-item-id">{index + 1}</div>
                      <h3
                        className="chain-item-title"
                        dangerouslySetInnerHTML={{
                          __html: md.renderInline(post.title),
                        }}
                      />
                    </div>
                    <div
                      className="chain-item-content"
                      dangerouslySetInnerHTML={{
                        __html: md.render(post.content || ""),
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: md.render(content) }}
              />
            )}
            {type === "QUIZ" && solution && (
              <Fragment>
                {viewSolution ? (
                  <div className="quiz-solution">{solution}</div>
                ) : (
                  <div className="fcc w-100">
                    <Button onClick={() => setViewSolution(true)}>
                      View Solution
                    </Button>
                  </div>
                )}
              </Fragment>
            )}
          </div>
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
        <Icon
          size={12}
          className="heart-icon icon"
          onClick={toggleFavoritePost}
          fill={colors.blue}
          type="heart"
        />
      </CardWrapper>
      <RelatedPosts postId={_id} tags={tags} />
    </section>
  );
};

const mapStateToProps = ({ posts, app }) => ({
  post: posts.selectedPost,
  tagColors: posts.tagColors,
  session: app.session,
});

const mapDispatchToProps = {
  getPostById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostView));
