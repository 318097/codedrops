import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { fetchBookmarks } from "../../store/posts/actions";
import Card from "./Card";
import "./Posts.scss";

const PageWrapper = styled.div`
  columns: 220px;
  column-gap: 12px;
`;

const Posts = ({ fetchBookmarks, bookmarks }) => {
  useEffect(() => {
    if (!bookmarks.length) fetchBookmarks();
  }, []);

  return (
    <section id="posts">
      <PageWrapper>
        {bookmarks.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </PageWrapper>
    </section>
  );
};

const mapStateToProps = ({ posts }) => ({
  bookmarks: posts.bookmarks || [],
});

const mapDispatchToProps = {
  fetchBookmarks,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
