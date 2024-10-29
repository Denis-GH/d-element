/* eslint-disable @stylistic/js/padded-blocks */
import Choices from "choices.js";
import { getCfg } from "#shared/lib/utils";
/**
 * Модель для создания кастомного селекта на основе choices.js
 */
export class SelectModel {
  selectors = {
    instance: "[data-js-select]",
  };

  static instance;

  static choicesInstances = [];

  static presets = {
    default: {
      createItem: ({ classNames }, data, { strToEl, escapeForTemplate, getClassNames }) => {
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
          ${getClassNames(
            data.highlighted ? classNames.highlightedState : classNames.itemSelectable
          ).join(" ")} 
          ${data.placeholder ? classNames.placeholder : ""}" 
          data-item 
          data-id="${data.id}" 
          data-value="${data.value}" 
          ${data.active ? 'aria-selected="true"' : ""}
          ${data.disabled ? 'aria-disabled="true"' : ""}>
            <span class="select__choiceIcon">${data?.customProperties?.icon ?? ""}</span><span>${data.label}</span>
          </div>
        `);
      },
      createChoice: (
        { classNames },
        data,
        { strToEl, escapeForTemplate, getClassNames },
        itemSelectText
      ) => {
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
            ${getClassNames(classNames.itemChoice).join(" ")} 
            ${getClassNames(
              data.disabled ? classNames.itemDisabled : classNames.itemSelectable
            ).join(" ")}" 
            data-select-text="${itemSelectText}" 
            data-choice 
            ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : "data-choice-selectable"}
            data-id="${data.id}" 
            data-value="${data.value}">
            <span class="select__choiceIcon">${data?.customProperties?.icon ?? ""}</span><span>${data.label}</span>
          </div>
        `);
      },
    },
    // Другие шаблоны, например "fancy", "compact", можно добавить сюда
    fancy: {
      // кастомный шаблон для item
      createItem: ({ classNames }, data, { strToEl, escapeForTemplate, getClassNames }) => {
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
          ${getClassNames(data.highlighted ? classNames.highlightedState : classNames.itemSelectable).join(" ")} 
          ${data.placeholder ? classNames.placeholder : ""}" 
          data-item 
          data-id="${data.id}" 
          data-value="${data.value}"
          ${data.active ? 'aria-selected="true"' : ""}
          ${data.disabled ? 'aria-disabled="true"' : ""}>
            🌟 ${data.label}
          </div>
        `);
      },
      // кастомный шаблон для choice
      createChoice: (
        { classNames },
        data,
        { strToEl, escapeForTemplate, getClassNames },
        itemSelectText
      ) => {
        return strToEl(`
          <div class="${getClassNames(classNames.item).join(" ")} 
          ${getClassNames(classNames.itemChoice).join(" ")} 
          ${getClassNames(data.disabled ? classNames.itemDisabled : classNames.itemSelectable).join(" ")}"
          data-choice 
          data-select-text="${itemSelectText}" 
          ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : "data-choice-selectable"}
          data-id="${data.id}" 
          data-value="${data.value}">
            🌟 ${data.label}
          </div>
        `);
      },
    },
  };

  static defaultCfg = {
    itemSelectText: "",
    classNames: {
      containerOuter: ["choices", "select"],
      itemChoice: ["choices__item--choice", "select__choice"],
      containerInner: ["choices__inner", "select__inner"],
      list: ["choices__list", "select__list"],
      itemSelectable: ["choices__item--selectable", "select__item--selectable"],
    },
    callbackOnCreateTemplates: function (
      strToEl,
      escapeForTemplate,
      getClassNames,
      { preset, itemSelectText }
    ) {
      const presetName = preset || "default";
      const { createItem, createChoice } =
        SelectModel.presets[presetName] || SelectModel.presets.default;

      return {
        item: (classNames, data) =>
          createItem(classNames, data, {
            strToEl,
            escapeForTemplate,
            getClassNames,
          }),
        choice: (classNames, data) =>
          createChoice(
            classNames,
            data,
            {
              strToEl,
              escapeForTemplate,
              getClassNames,
            },
            itemSelectText
          ),
      };
    },
  };

  static createSelect(node) {
    const cfg = getCfg(node, "data-js-select");
    const { disableTemplates, preset, ...restCfg } = cfg;
    const choicesConfig = {
      ...SelectModel.defaultCfg,
      ...restCfg,
    };
    //Если не хотим использовать кастомный шаблон - передаем явно это в конфиге
    if (disableTemplates) {
      delete choicesConfig.callbackOnCreateTemplates;
    } else {
      //Паттерн декоратор. Применяем функцию высшего порядка, чтобы дополнительно прокинуть поле preset для создания кастомного шаблона, если он нужен
      //Подробно описал как это работает в readme.md
      //Вкратце, наш originalCallback в defaultCfg принимает только 3 параметра. Нам же необходимо дополнительно прокинуть preset, чтобы определить какой шаблон для кастомного селекта будет использоваться, при этом сохраняя аргументы, которые передали изначально. Применяем паттерн декоратор и немного "меняем" дефолтное поведение функции
      choicesConfig.callbackOnCreateTemplates = ((originalCallback) => {
        return function (...args) {
          return originalCallback.apply(this, [
            ...args,
            { preset, itemSelectText: choicesConfig.itemSelectText }, //дополнительно надо передать preset и текст при наведении. Связано с тем, что в статическом поле presets есть готовые функции-билдеры для формирования кастомной разметки и ,например, для choices, надо передавать itemSelectText, который есть в конфиге.
          ]);
        };
      })(choicesConfig.callbackOnCreateTemplates);
    }
    SelectModel.choicesInstances.push(
      new Choices(node, {
        ...choicesConfig,
      })
    );
  }

  static getChoiceInstance(node) {
    return SelectModel.choicesInstances.find((instance) => instance.passedElement.element === node);
  }

  constructor() {
    if (SelectModel.instance) return SelectModel.instance;
    this.selects = document.querySelectorAll(this.selectors.instance);
    this.selects.forEach((select) => {
      SelectModel.createSelect(select);
    });
    SelectModel.instance = this;
  }
}
