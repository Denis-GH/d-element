import { getResponseMock } from "./lib/index.js";
import { API_ENDPOINTS } from "../config/constants.js";
import { markDetail, marksList } from "#widgets/MapApp/index.js";

export const handlers = [
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.marks.list,
    data: marksList,
  }),
  getResponseMock({
    type: "GET",
    endpoint: `${API_ENDPOINTS.marks.detail}?id=1`,
    data: markDetail.find((item) => item.id === "1"),
  }),
  getResponseMock({
    type: "GET",
    endpoint: `${API_ENDPOINTS.marks.detail}?id=2`,
    data: markDetail.find((item) => item.id === "2"),
  }),
];
