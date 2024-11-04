/* eslint-disable @stylistic/js/padded-blocks */
import Choices from "choices.js";
import { getCfg } from "#shared/lib/utils";
/**
 * Модель для создания кастомного селекта на основе choices.js
 */
class SelectTemplate {
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

  static getTemplate(presetName = "default") {
    return SelectTemplate.presets[presetName] || SelectTemplate.presets.default;
  }
}

class SelectConfig {
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
      const { createItem, createChoice } = SelectTemplate.getTemplate(preset);
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

  static getConfig(node) {
    const cfg = getCfg(node, "data-js-select");
    const { disableTemplates, preset, ...restCfg } = cfg;
    const choicesConfig = {
      ...SelectConfig.defaultCfg,
      ...restCfg,
    };

    if (disableTemplates) {
      delete choicesConfig.callbackOnCreateTemplates;
    } else {
      choicesConfig.callbackOnCreateTemplates = ((originalCallback) => {
        return function (...args) {
          return originalCallback.apply(this, [
            ...args,
            { preset, itemSelectText: choicesConfig.itemSelectText },
          ]);
        };
      })(choicesConfig.callbackOnCreateTemplates);
    }

    return choicesConfig;
  }
}

class ChoicesInstance {
  static choicesInstances = [];

  static createInstance(node, config) {
    const choicesInstance = new Choices(node, config);
    ChoicesInstance.choicesInstances.push(choicesInstance);
    return choicesInstance;
  }

  static getChoiceInstance(node) {
    return ChoicesInstance.choicesInstances.find(
      (instance) => instance.passedElement.element === node
    );
  }
}

export class SelectModel {
  selectors = {
    instance: "[data-js-select]",
  };

  static instance;

  constructor() {
    if (SelectModel.instance) return SelectModel.instance;
    this.selects = document.querySelectorAll(this.selectors.instance);
    this.selects.forEach((select) => {
      const config = SelectConfig.getConfig(select);
      ChoicesInstance.createInstance(select, config);
    });
    SelectModel.instance = this;
  }
}
