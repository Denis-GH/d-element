import Swiper from "swiper/bundle";
import {
  defaultClassNames,
  defaultIconShapeCfg,
  iconsPresets,
  yandexMapCustomEventNames,
} from "../config/constans.js";
import { checkMapInstance } from "../config/lib/checkMapInstance.js";
import { getExternalScript } from "#shared/lib/utils/getExternalScript";
import { Icon } from "#shared/ui/Icons/index.js";
import { Spinner } from "#shared/ui/Spinner/index.js";

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
    classNames,
    iconShapeCfg,
  }) {
    this.containerSelector = containerSelector;
    this.apiKey = apiKey;
    this.center = center;
    this.zoom = zoom;
    this.lang = lang;
    this.apiUrl = apiUrl;
    this.instance = null;
    this.iconsPresets = iconsPresets;
    this.currentBalloon = null;
    this.classNames = classNames ?? defaultClassNames;
    this.iconShapeCfg = iconShapeCfg ?? defaultIconShapeCfg;
  }

  getBalloonLayout() {
    if (window.ymaps) {
      const balloonLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.balloonLayout}">$[[options.contentLayout observeSize]]</div>`,
        {
          build: function () {
            balloonLayout.superclass.build.call(this);
          },
          clear: function () {
            balloonLayout.superclass.clear.call(this);
          },
        }
      );
      return balloonLayout;
    }
    throw new Error("ymaps not ready");
  }

  getBalloonContent({ id, children }) {
    if (window.ymaps) {
      const balloonContent = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.balloonContent}" data-js-balloon=${id}> 
          ${children}
         </div>`,
        {
          build: function () {
            balloonContent.superclass.build.call(this);
            // this.createSwiper(id);
          },
          clear: function () {
            balloonContent.superclass.clear.call(this);
          },
        }
      );
      return balloonContent;
    }
    throw new Error("ymaps not ready");
  }

  createSwiper(balloonId) {
    try {
      const balloonContainer = document.querySelector(`[data-js-balloon="${balloonId}"]`);
      const swiperEl = balloonContainer.querySelector(".swiper");
      new Swiper(swiperEl, {
        direction: "horizontal",
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  getMarkerLayout(typeMarker) {
    if (window.ymaps) {
      const customLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.mark}">
          ${this.iconsPresets[typeMarker] ? this.iconsPresets[typeMarker] : typeMarker}
         </div>`
      );
      return customLayout;
    }
    throw new Error("ymaps not ready");
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
    this.#bindEvents();
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

  addMark = checkMapInstance(({ id, type, cords, onClick } = {}) => {
    const placemark = new window.ymaps.Placemark(
      cords,
      { id },
      {
        balloonLayout: this.getBalloonLayout(),
        balloonContentLayout: this.getBalloonContent({
          id,
          children: Spinner(),
        }),
        hasBalloon: true,
        iconLayout: this.getMarkerLayout(type),
        iconShape: this.iconShapeCfg,
      }
    );

    placemark.events.add("click", (event) => {
      if (onClick && typeof onClick === "function") onClick(id, event);
    });

    placemark.events.add("balloonopen", () => {
      // Если на карте уже открыт балун, закрываем его
      if (this.currentBalloon) {
        this.currentBalloon.balloon.close();
      }
      // Обновляем ссылку на текущий открытый балун
      this.currentBalloon = placemark;
    });

    placemark.events.add("balloonclose", () => {
      this.currentBalloon = null;
    });

    this.instance.geoObjects.add(placemark);
  });

  handleMarkerClick(id, e) {
    const targetPlacemark = e.get("target");
    const customEvent = new CustomEvent(yandexMapCustomEventNames.markClicked, {
      detail: {
        id,
        mark: targetPlacemark,
      },
    });
    document.dispatchEvent(customEvent);
  }

  renderCustomBalloon(id, mark, info) {
    mark.options.set(
      "balloonContentLayout",
      this.getBalloonContent({
        id,
        children: `${info}`,
      })
    );

    try {
      this.createSwiper(id);
    } catch (error) {
      console.error("Ошибка при инициализации Swiper:", error);
    }
  }

  getLayoutContentForBalloon(info) {
    const slides = info.data.images
      .map(
        (image) =>
          `<div class="swiper-slide yandexMap__balloonSwiperSlide"><img src="${image}" alt="image"></div>`
      )
      .join("");
    return `<div class="yandexMap__balloonPictures">
              <div class="swiper yandexMap__balloonSwiper">
                <div class="swiper-wrapper">
                  ${slides}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
            </div>
            <div class="yandexMap__balloonBody">
              <h2 class="yandexMap__balloonTitle">${info.data.title}</h2>
              <div class="yandexMap__balloonType">
                <div class="yandexMap__balloonIcon">${this.iconsPresets[info.data.type] ? this.iconsPresets[info.data.type] : ""}</div>
                <div class="yandexMap__balloonName"></div>
              </div>
              <div class="yandexMap__balloonAddress">${info.data.address.street}, ${info.data.address.house}</div>
              <div class="yandexMap__balloonComment">${info.data.comment}</div>
              <div class="yandexMap__balloonActions">
                <button class="yandexMap__balloonEdit">Редактировать</button>
                <button class="yandexMap__balloonDelete">${Icon({ id: "DeleteIcon" })}</button>
              </div>
            </div>`; // TODO: вынести классы в classNames
  }

  renderMarks = checkMapInstance((marks) => {
    marks.forEach((mark) => {
      this.addMark({
        id: mark.id,
        cords: mark.cords,
        type: mark.type,
        onClick: (id, e) => {
          this.handleMarkerClick(id, e);
        },
      });
    });
  });

  handleCloseCurrentBalloon() {
    if (this.currentBalloon) {
      this.currentBalloon.balloon.close();
    }
    this.currentBalloon = null;
  }

  #bindEvents() {
    this.instance.events.add("click", () => {
      this.handleCloseCurrentBalloon(); //TODO: а надо ли? надо подумать
    });
  }
}
