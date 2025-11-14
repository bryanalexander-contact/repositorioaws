const webpackConfig = {
  mode: "development",
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(svg|png|jpg|jpeg|gif|webp)$/, use: "file-loader" }
    ],
  },
  resolve: { extensions: [".js", ".jsx"] },
};

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "test/setup.js",  // 🔹 NUEVO: Archivo de configuración
      "test/**/*.spec.js"
    ],
    preprocessors: { 
      "test/setup.js": ["webpack"],
      "test/**/*.spec.js": ["webpack"] 
    },
    webpack: webpackConfig,
    browsers: ["ChromeHeadless"],
    singleRun: true,
    reporters: ["progress"],
  });
};
