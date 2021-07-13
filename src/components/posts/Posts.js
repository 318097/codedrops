import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import colors, { Button } from "@codedrops/react-ui";
import { fetchPosts, setFilter } from "../../store/posts/actions";
import Card from "./Card";
import "./Posts.scss";
import config from "../../config";
import { get } from "lodash";
import Helmet from "../../lib/Helmet";
import tracking from "../../lib/mixpanel";

const PageWrapper = styled.div`
  .page-splitter {
    display: block;
    width: 80%;
    margin: 20px 30px 25px;
    position: relative;
    span {
      padding: 0 12px;
      display: inline-block;
      position: relative;
      left: 20px;
      background: ${colors.primary};
      color: white;
      font-size: 1rem;
      z-index: 2;
    }
    &:after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      top: 50%;
      background: ${colors.primary};
    }
  }
  .posts-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
  }
`;

const Posts = ({ posts, fetchPosts, setFilter, meta, filters, appLoading }) => {
  useEffect(() => {
    if (!posts.length) fetchPosts();
  }, []);

  const handleLoad = () => {
    setFilter({ page: page + 1 }, false);
    tracking.track("CLICK_ACTION", { target: "load more posts" });
  };

  const { page = 1 } = filters;

  const noteChunks = Array(Math.ceil(posts.length / config.POST_COUNT))
    .fill(null)
    .map((_, index) =>
      posts.slice(
        index * config.POST_COUNT,
        index * config.POST_COUNT + config.POST_COUNT
      )
    );

  const showLoadButton = meta && page * config.POST_COUNT <= meta.count;

  return (
    <section id="posts">
      <Helmet
        data={{
          title: "Code Drops",
        }}
      />
      {appLoading && filters.page === 1 ? null : (
        <Fragment>
          {noteChunks.map((chunk, index) => (
            <PageWrapper key={index}>
              <div className="posts-wrapper">
                {chunk.map((post) => (
                  <Card key={post._id} post={post} />
                ))}
              </div>
              {index < noteChunks.length - 1 && (
                <div className="page-splitter">
                  <span>{`Page: ${index + 2}`}</span>
                </div>
              )}
            </PageWrapper>
          ))}
          {showLoadButton && (
            <div className="actions-row">
              <Button onClick={handleLoad}>Load</Button>
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
};

const mapStateToProps = ({ posts, app: { appLoading } }) => ({
  posts: get(posts, "posts", []),
  meta: posts.meta,
  filters: posts.filters,
  appLoading,
});

const mapDispatchToProps = {
  fetchPosts,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
