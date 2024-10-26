//алиасы для webpack и postcss

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const aliases = {
  "#public": path.resolve(__dirname, "public"),
  "#shared": path.resolve(__dirname, "src/shared"),
  "#entities": path.resolve(__dirname, "src/entities"),
  "#features": path.resolve(__dirname, "src/features"),
  "#pages": path.resolve(__dirname, "src/pages"),
  "#widgets": path.resolve(__dirname, "src/widgets"),
  "#app": path.resolve(__dirname, "src/app"),
};
