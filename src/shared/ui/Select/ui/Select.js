import { getGeneratedAttrs } from "#shared/lib/utils";

export const Select = ({ extraAttrs = [], cfg = {} } = {}) => {
  return `<select data-js-select='${JSON.stringify(cfg)}' ${getGeneratedAttrs(extraAttrs)}>
    </select>`;
};
