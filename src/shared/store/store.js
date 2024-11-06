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
          addMarker: (marker) => {
            set((state) => {
              const exists = state.markers.some((m) => m?.id === marker.id);
              if (exists) {
                console.warn(`Marker with ID ${marker.id} already exists.`);
                return state;
              }
              return {
                markers: [...state.markers, marker],
              };
            });
          },
          removeMarker: (markerId) =>
            set((state) => ({
              markers: state.markers.filter((marker) => marker.id !== markerId),
            })),
          setFilters: (filters) => set({ activeFilters: filters }),
        }),
        {
          name: storageName,
          getStorage: () => localStorage,
        }
      )
    )
  );
};
