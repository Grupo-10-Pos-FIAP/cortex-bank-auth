const { mergeWithCustomize, customizeArray } = require("webpack-merge");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");
  envFile.split("\n").forEach((line) => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "cortex-bank",
    projectName: "auth",
    webpackConfigEnv,
    argv,
  });

  return mergeWithCustomize({
    customizeArray: customizeArray({
      plugins: (basePlugins, newPlugins) => {
        const filteredBasePlugins = basePlugins.filter(
          (plugin) => !(plugin instanceof webpack.DefinePlugin)
        );
        return [...filteredBasePlugins, ...newPlugins];
      },
    }),
  })(defaultConfig, {
    plugins: [
      new webpack.DefinePlugin({
        "process.env.REACT_APP_API_URL": JSON.stringify(
          process.env.REACT_APP_API_URL || "http://localhost:3000"
        ),
        "process.env.REACT_APP_REDIRECT_URL": JSON.stringify(
          process.env.REACT_APP_REDIRECT_URL || "http://localhost:3000/dashboard"
        ),
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || webpackConfigEnv.mode || "development"
        ),
      }),
    ],
  });
};
