import "./styles.js";
import { DeleteMarkModel } from "#features/Marks/DeleteMark/model/index.js";
import { UpdateMarkModel } from "#features/Marks/UpdateMark/model/index.js";
import { API_URL } from "#shared/config/constants";
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
  window.App.ApiClient = new ApiClient(API_URL);
  window.App.Selects = new SelectModel();
  window.App.SelectModel = SelectModel;
  window.App.StoreServiceForMap = new StoreService("store-map-markers");
  new MapApp(window.App.StoreServiceForMap, window.App.ApiClient);
  new DeleteMarkModel(window.App.StoreServiceForMap);
  new UpdateMarkModel(window.App.StoreServiceForMap);
});
