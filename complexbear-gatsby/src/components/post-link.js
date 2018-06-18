import React from "react";
import Link from "gatsby-link";

const PostLink = ({ post }) => (
  <div style={{
    marginTop: 10
    }}>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
    <hr/>
  </div>
);

export default PostLink;
