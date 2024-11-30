import { getGeneratedAttrs } from "#shared/lib/utils";
import { Button, Icon } from "#shared/ui";

/**
 *
 */
export const ConfirmModal = ({ message = "", extraClasses = [], extraAttrs = [] }) => {
  return `<div class="confirmModal" ${getGeneratedAttrs(extraAttrs)} ${extraClasses.join(" ")}>
            <p class="confirmModal__title">${message}</p>
            <div class="confirmModal__buttons">
              ${Button({ text: "Да", iconSlot: Icon({ id: "YesIcon" }), extraClasses: ["btn--isGreenLightIcon"], extraAttrs: [{ name: "data-js-confirm-btn" }] })}
              ${Button({ text: "Нет", iconSlot: Icon({ id: "NoIcon" }), extraClasses: ["btn--isRedIcon"], extraAttrs: [{ name: "data-js-cancel-btn" }] })}
            </div>
          </div>`;
};
