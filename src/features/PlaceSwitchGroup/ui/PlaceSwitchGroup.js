import { switchConfigDefault } from "../config/index.js";
import { getGeneratedAttrs } from "#shared/lib/utils";
import { Icon, Switch } from "#shared/ui/index.js";
/**
 * Компонент PlaceSwitchGroup с прокидываемым конфигом
 * @param {Object} param0 - параметры компонента
 * @param {Array} param0.extraClasses - дополнительные классы
 * @param {Array} param0.extraAttrs - дополнительные аттрибуты
 * @param {Array} param0.switchConfig - конфиг для генерации переключателей
 * @return {String} HTML-строка
 */
export const PlaceSwitchGroup = ({
  extraClasses = [],
  extraAttrs = [],
  switchConfig = switchConfigDefault,
} = {}) => {
  // Рендерим каждый Switch по конфигу
  const switchElements = switchConfig
    .map(({ label, name, checked, dataJsFilterItem, dataJsFilterParentName }) => {
      return `
      ${Switch({
        label: label,
        extraClasses: ["switch--isRightLabel"],
        extraInputAttrs: [
          { name: "name", value: name },
          { name: "checked", value: checked.toString() },
          { name: "data-js-filter-item", value: dataJsFilterItem },
          { name: "data-js-filter-parent-name", value: dataJsFilterParentName },
        ],
      })}
    `;
    })
    .join(""); // Собираем все элементы в одну строку
  return `
    <nav class="mapApp__placeSwitchGroup ${extraClasses.join(" ")}" ${getGeneratedAttrs(extraAttrs)} data-js-filter="marks">
      <div class="searchBox">
        <input type="search" name="search" placeholder="Введите адрес" data-js-filter-item="search" data-js-filter-parent-name="marks" class="searchBox__input">
        <div class="searchBox__icon">${Icon({ id: "SearchIcon" })}</div>
      </div>
        ${switchElements}
    </nav>
  `;
};
