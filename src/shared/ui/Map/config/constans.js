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

export const iconsPresets = {
  1: Icon({ id: "BarIcon", color: "var(--colorRed)" }),
  2: Icon({ id: "RestaurantIcon", color: "var(--colorOrange)" }),
  3: Icon({ id: "TheaterIcon", color: "var(--colorPurple)" }),
  4: Icon({ id: "CinemaIcon", color: "var(--colorGreenDark)" }),
  5: Icon({ id: "MusicIcon", color: "var(--colorBlue)" }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
