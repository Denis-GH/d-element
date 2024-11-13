import { checkMapInstance } from "../config/lib/checkMapInstance.js";
import { getExternalScript } from "#shared/lib/utils/getExternalScript";

/**
 *
 */
export class YandexMap {
  constructor({
    containerSelector,
    apiKey,
    center = [55.751574, 37.573856],
    zoom = 10,
    lang = "ru_RU",
    apiUrl = "https://api-maps.yandex.ru/2.1/?apikey",
  }) {
    this.containerSelector = containerSelector;
    this.apiKey = apiKey;
    this.center = center;
    this.zoom = zoom;
    this.lang = lang;
    this.apiUrl = apiUrl;
    this.instance = null;
  }

  #createMap() {
    this.instance = new window.ymaps.Map(
      document.querySelector(this.containerSelector),
      {
        center: this.center,
        zoom: this.zoom,
        type: "yandex#map",
        controls: [],
      },
      {
        suppressMapOpenBlock: true,
      }
    );
    return this.instance;
  }

  async initMap() {
    try {
      if (window.ymaps) {
        return this.#createMap();
      }

      await getExternalScript(`${this.apiUrl}=${this.apiKey}&lang=${this.lang}`);
      await new Promise((resolve, reject) => {
        window.ymaps.ready(() => {
          try {
            resolve(this.#createMap());
          } catch (e) {
            reject(e);
          }
        });
      });
      return this.instance;
    } catch (error) {
      console.error("Ошибка при загрузке API Яндекс.Карт:", error);
    }
  }

  addMark = checkMapInstance(() => {
    const myPlacemark = new window.ymaps.Placemark([55.7, 37.6], {
      balloonContentHeader: "Однажды",
      balloonContentBody: "В студеную зимнюю пору",
      balloonContentFooter: "Мы пошли в гору",
      hintContent: "Зимние происшествия",
    });
    this.instance.geoObjects.add(myPlacemark);
  });
}
