import postcssPresetEnv from "postcss-preset-env";
import postcssUrl from "postcss-url";
import { aliases } from "./aliases.js";

export default {
  plugins: [
    postcssUrl({
      url: (asset) => {
        for (const [alias, targetPath] of Object.entries(aliases)) {
          if (asset.url.startsWith(alias)) {
            return asset.url.replace(alias, targetPath);
          }
        }
        return asset.url;
      },
    }),
    "postcss-import", // Для поддержки @import
    "postcss-mixins", // Для миксинов
    postcssPresetEnv({
      features: {
        "nesting-rules": true, // Для вложенности
        "custom-media-queries": true, // Для кастомных медиа-запросов
      },
    }),
  ],
};
