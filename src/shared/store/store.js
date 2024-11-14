import { persist, subscribeWithSelector } from "zustand/middleware";
import { createStore as create } from "zustand/vanilla";

/**
 *
 */
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
              const markerIndex = state.markers.findIndex((m) => m?.id === marker.id);

              if (markerIndex !== -1) {
                const updatedMarkers = [...state.markers];
                updatedMarkers[markerIndex] = { ...updatedMarkers[markerIndex], ...marker };
                return { markers: updatedMarkers };
              }

              return { markers: [...state.markers, marker] };
            }),
          addMarkerList: (newMarkers) => {
            set((state) => {
              const updatedMarkers = [...state.markers];

              newMarkers.forEach((marker) => {
                const markerIndex = updatedMarkers.findIndex((m) => m.id === marker.id);

                if (markerIndex !== -1) {
                  updatedMarkers[markerIndex] = {
                    ...updatedMarkers[markerIndex],
                    ...marker,
                  };
                } else {
                  updatedMarkers.push(marker);
                }
              });

              return { markers: updatedMarkers };
            });
          },
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
