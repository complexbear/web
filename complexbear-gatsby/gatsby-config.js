module.exports = {
  siteMetadata: {
    title: 'Blog',
  },
  plugins: [{
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `D:/Code/blog/posts`,
      name: 'markdown-pages'
    }
  },
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-remark`
  ],
  // Note: it must *not* have a trailing slash.
  pathPrefix: `/blog`
};
