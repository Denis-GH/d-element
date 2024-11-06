import { persist, subscribeWithSelector } from "zustand/middleware";
import { createStore as create } from "zustand/vanilla";

export const createStore = (storageName) => {
  return create(
    subscribeWithSelector(
      persist(
        (set) => ({
          markers: [],
          activeFilters: {},
          setMarkers: (markers) => set({ markers }),
          addMarker: (marker) =>
            set((state) => {
              const exists = state.markers.some((m) => m?.id === marker.id);

              if (exists) {
                console.warn(`Marker with ID ${marker.id} already exists.`);
                return state;
              }

              return {
                markers: [...state.markers, marker],
              };
            }),
          addMarkerList: (markerList) =>
            set((state) => {
              const existsMarkers = [];
              const newMarkers = [];

              markerList.forEach((marker) => {
                if (state.markers.some((m) => m?.id === marker.id)) {
                  existsMarkers.push(marker);
                } else {
                  newMarkers.push(marker);
                }
              });

              if (existsMarkers.length > 0) {
                console.warn(
                  `Marker(s) with ID ${existsMarkers.map((m) => m.id).join(", ")} already exists.`
                );
              }

              return {
                markers: [...state.markers, ...newMarkers],
              };
            }),
          removeMarker: (markerId) =>
            set((state) => ({
              markers: state.markers.filter((marker) => marker.id !== markerId),
            })),
          removeMarkerList: (markerIdList) =>
            set((state) => ({
              markers: state.markers.filter((marker) => !markerIdList.includes(marker.id)),
            })),
          setFilters: (filters) => set({ activeFilters: filters }),
          removeFilters: () => set({ activeFilters: {} }),
        }),
        {
          name: storageName,
          getStorage: () => localStorage,
        }
      )
    )
  );
};
