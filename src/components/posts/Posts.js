import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import colors, { Button } from "@codedrops/react-ui";
import { fetchPosts, setFilter } from "../../store/posts/actions";
import Card from "./Card";
import "./Posts.scss";

const PageWrapper = styled.div`
  margin-bottom: 25px;
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
      background: ${colors.bar};
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
      background: ${colors.bar};
    }
  }
  .notes-wrapper {
    columns: 220px;
    column-gap: 12px;
  }
`;

const Posts = ({ posts, fetchPosts, setFilter, meta, filters, appLoading }) => {
  useEffect(() => {
    if (!posts.length) fetchPosts();
  }, []);

  const { page = 1 } = filters;

  const noteChunks = Array(Math.ceil(posts.length / 25))
    .fill(null)
    .map((_, index) => posts.slice(index * 25, index * 25 + 25));

  return (
    <section id="posts">
      {noteChunks.map((chunk, index) => (
        <PageWrapper key={index}>
          <div className="notes-wrapper">
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
      {meta && page * 25 <= meta.count && (
        <div className="actions-row">
          <Button
            size="lg"
            onClick={() => setFilter({ page: page + 1 }, false)}
          >
            Load
          </Button>
        </div>
      )}
    </section>
  );
};

const mapStateToProps = ({ posts, app: { appLoading } }) => ({
  posts: posts.posts ? posts.posts : [],
  meta: posts.meta,
  filters: posts.filters,
  appLoading,
});

const mapDispatchToProps = {
  fetchPosts,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
