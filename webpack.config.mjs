import path, { join } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, './src');
const buildDir = path.resolve(__dirname, './build');
const pagesDir = path.resolve(__dirname, './src/pages');

export default async (env, mode) => {
  console.debug('env', env);
  return {
    mode,
    entry: path.join(baseDir, 'app.js'),
    output: {
      path: buildDir,
      filename: 'bundle.js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(pagesDir, 'index.js'),
      }),
    ],
  };
};
