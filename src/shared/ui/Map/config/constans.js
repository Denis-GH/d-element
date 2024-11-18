import { Icon } from "#shared/ui/Icons";

export const defaultClassNames = {
  balloonContent: "yandexMap__balloonContent",
  balloonLayout: "yandexMap__balloonLayout",
  mark: "yandexMap__mark",
};

export const defaultIconShapeCfg = {
  type: "Circle",
  coordinates: [0, 0],
  radius: 88,
};

export const iconsPresets = {
  1: Icon({ id: "BarIcon", color: "var(--colorRed)" }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
