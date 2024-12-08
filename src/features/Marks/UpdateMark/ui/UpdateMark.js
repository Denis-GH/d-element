import { Button, Icon } from "#shared/ui";

/**
 * Кнопка для открытия модалки для обновления метки
 * @return {String}
 */
export const UpdateMarkBtn = ({
  markInfo,
  text = "Редактировать",
  iconColor,
  extraClasses = [],
}) => {
  return Button({
    text,
    iconSlot: Icon({ id: "EditIcon", color: iconColor }),
    extraClasses: extraClasses,
    extraAttrs: [
      {
        name: "data-js-update-mark-info",
        value: markInfo,
      },
    ],
  });
};
