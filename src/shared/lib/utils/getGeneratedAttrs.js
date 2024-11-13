/**
 *
 */
export const getGeneratedAttrs = (attributes = []) => {
  return attributes.map((attr) => `${attr.name}=${attr.value}`).join(" ");
};
