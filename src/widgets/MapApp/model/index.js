/* eslint-disable @stylistic/js/padded-blocks */
import { API_ENDPOINTS } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient";

export class MapApp {
  constructor(storeService, apiClient = new ApiClient()) {
    this.storeService = storeService;
    this.apiClient = apiClient;
    this.subscribeToStoreServiceChanges();
    this.fetchMarkers();
  }

  handleMarkersChanged() {
    console.debug("markers changed", this.storeService.getMarkers());
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
      const markers = response.data.marks || [];

      if (markers.length > 0) {
        this.storeService.updateStore("setMarkers", markers);
        console.debug("Markers fetched and stored:", markers);
      } else {
        console.warn("No markers found in the response");
      }
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  }
}
