/**
 *
 */
export const getGeneratedAttrs = (attributes = []) => {
  return attributes
    .map((attr) => (attr.value !== undefined ? `${attr.name}=${attr.value}` : `${attr.name}`))
    .join(" ");
};
