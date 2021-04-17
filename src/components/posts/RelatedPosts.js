import React, { useEffect } from "react";
import Card from "./Card";
import { fetchRelatedPosts } from "../../store/posts/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const RelatedPosts = ({
  postId,
  tags,
  relatedPosts = [],
  fetchRelatedPosts,
}) => {
  useEffect(() => {
    fetchRelatedPosts({ postId, tags });
  }, [postId]);

  return (
    <section id="related-post">
      <h3 className="text-center mb">Related Posts</h3>
      <div className="posts-wrapper">
        {relatedPosts.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = ({ posts }) => ({
  relatedPosts: posts.relatedPosts,
});

const mapDispatchToProps = {
  fetchRelatedPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RelatedPosts));
