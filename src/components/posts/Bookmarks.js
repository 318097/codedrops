import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { fetchBookmarks } from "../../store/posts/actions";
import Card from "./Card";
import "./Posts.scss";

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 16px;
`;

const Posts = ({ fetchBookmarks, bookmarks, appLoading }) => {
  useEffect(() => {
    if (!bookmarks.length) fetchBookmarks();
  }, []);

  return (
    <section id="posts">
      {appLoading ? null : bookmarks.length ? (
        <PageWrapper>
          {bookmarks.map((post) => (
            <Card key={post._id} post={post} target={"bookmarks"} />
          ))}
        </PageWrapper>
      ) : (
        <p className="empty">No bookmarks yet..</p>
      )}
    </section>
  );
};

const mapStateToProps = ({ posts, app: { appLoading } }) => ({
  bookmarks: posts.bookmarks || [],
  appLoading,
});

const mapDispatchToProps = {
  fetchBookmarks,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Posts));
