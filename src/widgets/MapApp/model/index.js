import { FilterManager } from "#features/Filter";
import { API_ENDPOINTS } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient";
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

    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiKey: this.apiKey,
      lang: "ru_RU",
      center: [56.5, 57.9],
      zoom: 10,
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
    });

    this.filterManager = new FilterManager({
      filterName: `marks`,
      onUpdate: (changedData) => this.handleFilterChanged(changedData),
    });

    this.filterManager.applyFilters(this.storeService.getFilters());

    this.yandexMap
      .initMap()
      .then(async () => {
        this.yandexMap.renderMarks(this.getFilteredMarkers()); //Рендерим метки из стора по фильтрам
        const markers = await this.fetchMarkers();
        const filters = await this.fetchFiltersCfg();
        this.saveMarkersToStore(markers);
        this.saveFiltersToStore(filters);
        this.filterManager.applyFilters(filters);
      })
      .catch((e) => console.error(e));

    this.#bindYandexMapEvents();
    this.subscribeToStoreServiceChanges();
  }

  handleFilterChanged(changeData) {
    //TODO: есть замечение, касательно того, что мы всегда подвязываемся к полю inputs, а если у нас будет несколько фильтров? Нужно будет подумать над этим.
    if (changeData.search) {
      this.handleCenterMapByAddress(changeData.search.value);
    }
    const currentState = this.storeService.getFilters().inputs;
    const updatedState = { ...currentState, ...changeData };
    this.storeService.updateStore("setFilters", { inputs: updatedState });
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

  getFilteredMarkers() {
    // Получаем активные фильтры из состояния хранилища
    const activeFilters = this.storeService.getFilters().inputs;
    // Фильтруем метки, оставляем только те, для которых фильтры включены (isChecked: true)
    const filteredMarkers = this.storeService.getMarkers().filter((marker) => {
      // Проверяем, включен ли фильтр для типа метки
      return activeFilters[marker.type]?.isChecked;
    });
    return filteredMarkers;
  }

  handleMarkersChangedInStore() {
    console.debug("markers changed", this.storeService.getMarkers());
    // this.yandexMap.renderMarks(this.storeService.getMarkers());
  }

  handleFiltersChangedInStore() {
    this.yandexMap.renderMarks(this.getFilteredMarkers());
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
      this.handleMarkersChangedInStore()
    );
    this.filterSubscription = this.storeService.subscribeToFiltersChanged(() =>
      this.handleFiltersChangedInStore()
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

  #bindYandexMapEvents() {
    this.yandexMap?.containerMap?.addEventListener(yandexMapCustomEventNames.markClicked, (e) => {
      this.handleMarkerClick(e);
    });
  }
}
