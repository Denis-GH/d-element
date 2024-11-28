import { API_ENDPOINTS } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient";
import { getDebouncedFn } from "#shared/lib/utils";
import { yandexMapCustomEventNames } from "#shared/ui/Map/config/constans";
import { YandexMap } from "#shared/ui/Map/model";

/**
 *
 */
export class MapApp {
  constructor(storeService, apiClient = new ApiClient()) {
    this.storeService = storeService;
    this.apiClient = apiClient;
    this.apiGeoUrl = "https://geocode-maps.yandex.ru/1.x/?apikey";
    this.apiKey = "0ae22803-0158-4e0f-9dd1-6c79a36e28fa";
    this.inputAddress = document.querySelector("#searchAddress"); //TODO: вынести в фильтр.
    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiKey: this.apiKey,
      lang: "ru_RU",
      center: [56.5, 57.9],
      zoom: 10,
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
    });

    this.yandexMap
      .initMap()
      .then(async () => {
        this.yandexMap.renderMarks(this.storeService.getMarkers()); //Рендерим метки из стора
        const markers = await this.fetchMarkers();
        const filters = await this.fetchFiltersCfg();
        this.saveMarkersToStore(markers);
        this.saveFiltersToStore(filters);
      })
      .catch((e) => console.error(e));

    this.#bindYandexMapEvents();
    this.subscribeToStoreServiceChanges();
    this.#bindEvents();
  }

  async fetchFiltersCfg() {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.config.list);
      return response?.data || {};
    } catch (error) {
      console.error("Error fetching filters:", error);
      return {};
    }
  }

  saveFiltersToStore(filters) {
    if (Object.keys(filters).length > 0) {
      this.storeService.updateStore("setFilters", filters);
      console.debug("Filters fetched and stored:", filters);
    } else {
      console.warn("No filters found in the response");
    }
  }

  async handleMarkerClick(e) {
    const {
      detail: { id, mark },
    } = e;
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.marks.detail, {
        id: id,
      });
      const layout = this.yandexMap.getLayoutContentForBalloon(response);
      this.yandexMap.renderCustomBalloon(id, mark, layout);
    } catch (e) {
      console.error(e);
    }
  }

  handleMarkersChanged() {
    console.debug("markers changed", this.storeService.getMarkers());
    this.yandexMap.renderMarks(this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    console.debug("filters changed", this.storeService.getFilters());
  }

  handleCenterMapByAddress(address) {
    fetch(`${this.apiGeoUrl}=${this.apiKey}&geocode=${encodeURIComponent(address)}&format=json`)
      .then((res) => res.json())
      .then((data) => {
        const coords =
          data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point?.pos?.split(" ");
        if (coords) {
          const lat = parseFloat(coords[1]);
          const lon = parseFloat(coords[0]);
          this.yandexMap.centerMapByCoords([lat, lon]);
        }
      })
      .catch((e) => console.error(e));
  }

  subscribeToStoreServiceChanges() {
    this.markerSubscription = this.storeService.subscribeToMarkersChanged(() =>
      this.handleMarkersChanged()
    );
    this.filterSubscription = this.storeService.subscribeToFiltersChanged(() =>
      this.handleFiltersChanged()
    );
  }

  unsubscribeFromStoreServiceChanges() {
    this.markerSubscription?.();
    this.filterSubscription?.();
  }

  async fetchMarkers() {
    try {
      const response = await this.apiClient.get(API_ENDPOINTS.marks.list);
      return response?.data?.marks || [];
    } catch (error) {
      console.error("Error fetching markers:", error);
      return [];
    }
  }

  saveMarkersToStore(markers) {
    if (markers.length > 0) {
      this.storeService.updateStore("setMarkers", markers);
      console.debug("Markers fetched and stored:", markers);
    } else {
      console.warn("No markers found in the response");
    }
  }

  #bindEvents() {
    if (this.inputAddress) {
      const debouncedHandleCenterMapByAddress = getDebouncedFn((value) => {
        this.handleCenterMapByAddress(value);
      }, 500);

      this.inputAddress.addEventListener("input", (e) => {
        debouncedHandleCenterMapByAddress(e.target.value);
      });
    }
  }

  #bindYandexMapEvents() {
    this.yandexMap?.containerMap?.addEventListener(yandexMapCustomEventNames.markClicked, (e) => {
      this.handleMarkerClick(e);
    });
  }
}
