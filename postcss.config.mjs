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
    "postcss-custom-media", // Для кастомных медиа-запросов
    "postcss-nested", // Для вложенности в стилях
    postcssPresetEnv({
      features: {},
    }),
  ],
};
