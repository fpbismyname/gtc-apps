const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  if (config.devServer) {
    config.devServer.hot = true;         // Aktifkan Hot Reload
    config.devServer.liveReload = true;  // Aktifkan Live Reload
  }
  return config;
};
