module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Llew Vallis",
        short_name: "Llew Vallis",
        start_url: "/",
        background_color: "#222",
        theme_color: "#01b46a",
        display: "standalone",
        icon: "src/favicon.png",
      },
    },
  ],
};
