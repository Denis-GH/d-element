/* eslint-disable @stylistic/js/padded-blocks */
import { StoreService } from "#shared/lib/services/StoreService";

export class MapApp {
  constructor(storageName) {
    this.storeService = new StoreService(storageName);
    this.subscribeToStoreServiceChanges();

    console.debug("Готовый стор-сервис ->", this.storeService);

    setTimeout(() => {
      this.storeService.updateStore("removeMarker", "2221");
    }, 5000);
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
}
