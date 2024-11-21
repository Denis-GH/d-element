import { Icon } from "#shared/ui/Icons";

export const defaultClassNames = {
  balloonContent: "yandexMap__balloonContent",
  balloonLayout: "yandexMap__balloonLayout",
  mark: "yandexMap__mark",
};

export const defaultIconShapeCfg = {
  type: "Circle",
  coordinates: [20, 20],
  radius: 20,
};

export const iconsPresets = [
  Icon({ id: "BarIcon", color: "var(--colorRed)" }),
  Icon({ id: "RestaurantIcon", color: "var(--colorOrange)" }),
  Icon({ id: "TheaterIcon", color: "var(--colorPurple)" }),
  Icon({ id: "CinemaIcon", color: "var(--colorGreenDark)" }),
  Icon({ id: "MusicIcon", color: "var(--colorBlue)" }),
];

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
