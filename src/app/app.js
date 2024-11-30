import "./styles.js";
import { API_URL } from "#shared/config/constants";
import { ModalManager } from "#shared/lib/plugins/modalManager.js";
import { ApiClient } from "#shared/lib/services/ApiClient.js";
import { StoreService } from "#shared/lib/services/StoreService.js";
import { SelectModel } from "#shared/ui/Select/model/index.js";
import { MapApp } from "#widgets/MapApp/index.js";

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
  new MapApp(storeService, apiClient);
  new ModalManager().openConfirmModal({ message: "Сохранить изменения?" });
});
