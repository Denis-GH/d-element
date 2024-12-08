import { getResponseMock } from "./lib/index.js";
import { API_ENDPOINTS } from "../config/constants.js";
import { filterCfg } from "#widgets/MapApp/api/mockData.js";
import { markDetail, marksList } from "#widgets/MapApp/index.js";

export const handlers = [
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.marks.list,
    data: marksList,
  }),
  ...markDetail.map((markInfo) => {
    return getResponseMock({
      type: "GET",
      endpoint: `${API_ENDPOINTS.marks.detail}`,
      queryParams: { id: markInfo.id },
      data: markInfo,
    });
  }),
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.config.list,
    data: filterCfg,
  }),
  getResponseMock({
    type: "DELETE",
    endpoint: API_ENDPOINTS.marks.delete,
    data: null,
  }),
  getResponseMock({
    type: "POST",
    endpoint: API_ENDPOINTS.marks.update,
    data: {},
  }),
];
