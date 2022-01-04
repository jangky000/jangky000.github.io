/* eslint-disable global-require */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/getPosts');
      require('./scripts/sitemap-generator');
    }
    return config;
  },
};
