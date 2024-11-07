import "./styles.js";
import { API_URL, API_ENDPOINTS } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient.js";
import { SelectModel } from "#shared/ui/Select/model/index.js";
import { MapApp } from "#widgets/MapApp/model/index.js";
import { StoreService } from "#shared/lib/services/StoreService.js";

async function initMSW() {
  if (process.env.NODE_ENV === "development") {
    const { getMocks } = await import("#shared/api/browser");
    await getMocks();
    console.debug("msw ready");
  } else {
    return Promise.resolve();
  }
}

function domReady() {
  return new Promise((res) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", res);
    } else {
      res();
    }
  });
}

Promise.all([initMSW(), domReady()]).then(() => {
  window.App = {};
  const apiClient = new ApiClient(API_URL);
  window.App.Selects = new SelectModel();
  window.App.SelectModel = SelectModel;
  const storeService = new StoreService("store-map-markers");
  new MapApp(storeService);
});
