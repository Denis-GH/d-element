/* eslint-disable @stylistic/js/padded-blocks */
import { createStore } from "#shared/store/store";

export class StoreService {
  constructor(storageName) {
    this.store = createStore(storageName);
    this.actionMap = {
      setMarkers: (payload) => this.store.getState().setMarkers(payload),
      addMarker: (payload) => this.store.getState().addMarker(payload),
      addMarkerList: (payload) => this.store.getState().addMarkerList(payload),
      removeMarker: (payload) => this.store.getState().removeMarker(payload),
      removeMarkerList: (payload) => this.store.getState().removeMarkerList(payload),
      setFilters: (payload) => this.store.getState().setFilters(payload),
      removeFilters: () => this.store.getState().removeFilters(),
    };
  }

  subscribeToMarkersChanged(callback) {
    return this.store.subscribe((state) => state.markers, callback);
  }

  subscribeToFiltersChanged(callback) {
    return this.store.subscribe((state) => state.activeFilters, callback);
  }

  getMarkers() {
    return this.store.getState().markers;
  }
  getFilters() {
    return this.store.getState().activeFilters;
  }

  updateStore(action, payload) {
    const actionFunction = this.actionMap[action];
    actionFunction ? actionFunction(payload) : console.warn(`Action ${action} is not defined`);
  }
}
