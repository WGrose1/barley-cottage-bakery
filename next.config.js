const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const webpack = require("webpack");
require("dotenv").config();

module.exports = withPlugins([
  [
    optimizedImages,
    {
      /* config for next-optimized-images */
    },
  ],

  // your other plugins here
]);

// module.exports = {
//   webpack: (config) => {
//     const env = Object.keys(process.env).reduce((acc, curr) => {
//       acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
//       return acc;
//     }, {});

//     config.plugins.push(new webpack.DefinePlugin(env));

//     return config;
//   },
// };
