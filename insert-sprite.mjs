import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spritePath = path.join(__dirname, "src/shared/ui/icons/sprite.svg"); // путь к сгенерированному спрайту
const htmlPath = path.join(__dirname, "src/pages/index.js"); // путь к HTML-разметке

// Читаем содержимое спрайта
const spriteContent = fs.readFileSync(spritePath, "utf-8");

// Читаем HTML
let htmlContent = fs.readFileSync(htmlPath, "utf-8");

// Вставляем содержимое спрайта в разметку
htmlContent = htmlContent.replace(
  /<div id="svg-sprite" style="display: none">[\s\S]*?<\/div>/,
  `<div id="svg-sprite" style="display: none">${spriteContent}</div>`
);

// Записываем изменения в разметку
fs.writeFileSync(htmlPath, htmlContent, "utf-8");
