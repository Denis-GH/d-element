import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { aliases } from "./aliases.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, "./src");
const buildDir = path.resolve(__dirname, "./build");
const publicDir = path.resolve(__dirname, "./public");
const pagesDir = path.resolve(__dirname, "./src/pages");
const appDir = path.resolve(__dirname, "./src/app");

const folders = ["fonts", "assets"];
const copyFolders = (folders) => {
  return folders.map((folder) => {
    const fromPath = path.resolve(publicDir, `./${folder}`);
    const toPath = path.resolve(buildDir, `./${folder}`);
    if (!fs.existsSync(fromPath)) {
      console.warn(`Source folder: ${fromPath} does not exist`);
    }
    return {
      from: fromPath,
      to: toPath,
      noErrorOnMissing: true,
    };
  });
};

export default async (env, { mode }) => {
  const isDev = mode === "development";
  return {
    mode,
    entry: path.join(appDir, "app.js"),
    output: {
      path: buildDir,
      filename: "js/[name].js",
      clean: true,
    },
    devServer: {
      static: {
        directory: publicDir,
      },
      port: 8080,
      open: true,
      historyApiFallback: true,
      hot: true,
      watchFiles: ["src/**/*.js", "src/**/*.css", "src/**/*.html", "src/**/*.json"],
    },
    module: {
      rules: [
        {
          test: /\.(css|pcss)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: isDev ? true : false,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext]",
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(pagesDir, "index.js"),
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name].css",
      }),
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(env.API_URL),
      }),
      new CopyPlugin({
        patterns: copyFolders(folders),
      }),
    ],
    resolve: {
      alias: aliases,
      extensions: [".js", ".pcss"],
    },
    optimization: {
      minimize: !isDev, //В режиме продакшена
      minimizer: [
        new CssMinimizerPlugin(), //Минификация CSS
        new TerserPlugin(),
      ],
    },
    devtool: isDev ? "source-map" : false,
  };
};
