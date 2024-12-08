import Swiper from "swiper/bundle";
import {
  defaultClassNames,
  defaultIconShapeCfg,
  iconsPresets,
  yandexMapCustomEventNames,
} from "../config/constans.js";
import { checkMapInstance } from "../config/lib/checkMapInstance.js";
import { DeleteMarkBtn, UpdateMarkBtn } from "#features/Marks/index.js";
import { getExternalScript } from "#shared/lib/utils/getExternalScript";
import { Spinner } from "#shared/ui/Spinner/index.js";

/**
 *
 */
export class YandexMap {
  constructor({
    containerSelector,
    apiKey,
    center = [55.175016, 61.402001],
    zoom = 10,
    lang = "ru_RU",
    apiUrl = "https://api-maps.yandex.ru/2.1/?apikey",
    classNames,
    iconShapeCfg,
  }) {
    this.containerSelector = containerSelector;
    this.containerMap = document.querySelector(this.containerSelector);
    this.apiKey = apiKey;
    this.center = center;
    this.zoom = zoom;
    this.lang = lang;
    this.apiUrl = apiUrl;
    this.instance = null;
    this.iconsPresets = iconsPresets;
    this.centerMarkerElement = null;
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
      this.containerMap,
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
    this.addCenterMarker();
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
        hideIconOnBalloonOpen: false,
      }
    );

    placemark.events.add("click", (event) => {
      if (this.instance.balloon.isOpen()) {
        return;
      }
      if (onClick && typeof onClick === "function") onClick(id, event);
    });

    this.instance.geoObjects.add(placemark);
  });

  addCenterMarker = checkMapInstance(() => {
    try {
      const centerMarker = document.createElement("div");
      centerMarker.className = this.classNames["centerMarker"];
      centerMarker.innerHTML = this.iconsPresets.centerMarker;
      this.containerMap?.appendChild(centerMarker);
      this.centerMarkerElement = centerMarker;
    } catch (e) {
      console.error("Ошибка при добавлении центральной метки:", e);
    }
  });

  handleMarkerClick(id, e) {
    const targetPlacemark = e.get("target");
    const customEvent = new CustomEvent(yandexMapCustomEventNames.markClicked, {
      detail: {
        id,
        mark: targetPlacemark,
      },
    });
    this.containerMap.dispatchEvent(customEvent);
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

  getLayoutContentForBalloon(id, info) {
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
                <div class="yandexMap__balloonIcon">${this.iconsPresets[info.data.type] || ""}</div>
                <div class="yandexMap__balloonName">${info.data.type || ""}</div>
              </div>
              <div class="yandexMap__balloonAddress">${info.data.address.street}, ${info.data.address.house}</div>
              <div class="yandexMap__balloonComment">${info.data.comment}</div>
              <div class="yandexMap__balloonActions">
                ${UpdateMarkBtn({ markInfo: info.data, extraClasses: ["yandexMap__balloonEdit"] })}
                ${DeleteMarkBtn({ markId: id, extraClasses: ["yandexMap__balloonDelete"] })}
              </div>
            </div>`; // TODO: вынести классы в classNames
  }

  renderMarks = checkMapInstance((marks) => {
    this.clearMap();
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

  clearMap = checkMapInstance(() => {
    this.instance.geoObjects.removeAll();
  });

  centerMapByCoords = checkMapInstance((coords, zoom = 15) => {
    try {
      this.instance.setCenter(coords, zoom);
    } catch (e) {
      console.error(e);
    }
  });

  #bindEvents() {
    this.instance.events.add("click", () => {
      this.instance.balloon.close();
    });
  }
}
