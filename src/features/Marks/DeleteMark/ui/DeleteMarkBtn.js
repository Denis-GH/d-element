import { Button, Icon } from "#shared/ui";

/**
 *
 */
export const DeleteMarkBtn = ({ markId, color = "var(--colorRed)", extraClasses = [] }) => {
  return Button({
    text: "",
    iconSlot: Icon({ id: "DeleteIcon", color }),
    extraClasses: extraClasses,
    extraAttrs: [{ name: "data-js-delete-mark-btn", value: markId }],
  });
};
