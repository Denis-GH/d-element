import { Icon } from "#shared/ui/Icons";

export const defaultClassNames = {
  balloonContent: "yandexMap__balloonContent",
  balloonLayout: "yandexMap__balloonLayout",
  mark: "yandexMap__mark",
  centerMarker: "yandexMap__centerMarker",
};

export const defaultIconShapeCfg = {
  type: "Circle",
  coordinates: [20, 20],
  radius: 20,
};

export const iconsPresets = {
  bars: Icon({ id: "BarIcon", color: "var(--colorRed)" }),
  restaurant: Icon({ id: "RestaurantIcon", color: "var(--colorOrange)" }),
  theater: Icon({ id: "TheaterIcon", color: "var(--colorPurple)" }),
  cinema: Icon({ id: "CinemaIcon", color: "var(--colorGreenDark)" }),
  trk: Icon({ id: "MusicIcon", color: "var(--colorBlue)" }),
  centerMarker: Icon({ id: "CenterMapIcon", color: "var(--colorGray)" }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
