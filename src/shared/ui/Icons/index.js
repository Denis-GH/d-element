/**
 *
 */
export const Icon = ({ id = "", width = "18", height = "18", color = "currentColor" } = {}) =>
  `<svg width="${width}" height="${height}" color="${color}"><use xlink:href="#${id}"></use></svg>`;
