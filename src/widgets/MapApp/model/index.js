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
    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiKey: "0ae22803-0158-4e0f-9dd1-6c79a36e28fa",
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
        this.saveMarkersToStore(markers);
      })
      .catch((e) => console.error(e));

    this.#bindYandexMapEvents();
    this.subscribeToStoreServiceChanges();
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

  #bindYandexMapEvents() {
    document.addEventListener(yandexMapCustomEventNames.markClicked, (e) => {
      this.handleMarkerClick(e);
    });
  }
}
