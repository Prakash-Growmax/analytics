import path from "path";

const config = {
  mode: "production",
  entry: "./public/script.js",
  output: {
    filename: "visitor-tracker.min.js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

export default config;
