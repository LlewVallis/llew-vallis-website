exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: "frontmatter-markdown-loader",
          options: {
            mode: ["react-component"],
          },
        },
      ],
    },
  });
};
