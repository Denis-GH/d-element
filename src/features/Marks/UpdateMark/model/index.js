import { UpdateMarkModalContent } from "../index.js";
import { API_ENDPOINTS, API_URL } from "#shared/config/constants";
import { ModalManager } from "#shared/lib/plugins/modalManager";
import { SelectModel } from "#shared/ui/Select/model";

/**
 *
 */
export class UpdateMarkModel {
  attrs = {
    updateMark: "data-js-update-mark-info",
    selectTypeMark: "data-js-update-mark-info-select-type",
  };

  constructor(storeService) {
    this.storeService = storeService;
    this.#bindEvents();
  }

  #handleClick(e) {
    const parent = e.target.closest(`[${this.attrs.updateMark}]`);
    if (!parent) return;
    try {
      const markInfo = JSON.parse(parent.getAttribute(this.attrs.updateMark));
      console.debug(markInfo, "!!!!!");
      ModalManager.getInstance().open(
        UpdateMarkModalContent({
          markInfo,
          url: `${API_URL}/${API_ENDPOINTS.marks.update}`,
        }),
        {
          on: {
            reveal: () => {
              const selectNode = document.querySelector(
                `[${this.attrs.selectTypeMark}="${markInfo.id}"]`
              );
              if (selectNode) {
                SelectModel.initSelect(selectNode);
              } else {
                console.error("Не найден элемент селекта для инициализации");
              }
            },
          },
          closeButton: false,
        }
      );
    } catch (error) {
      console.error("Ошибка при открытии модалки обновления метки:", error);
    }
  }

  #bindEvents() {
    document.addEventListener("click", (e) => {
      this.#handleClick(e);
    });
  }
}
