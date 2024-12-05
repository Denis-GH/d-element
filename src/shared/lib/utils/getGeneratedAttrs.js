/**
 *
 */
export const getGeneratedAttrs = (attributes = []) => {
  return attributes
    .map((attr) => {
      const value = typeof attr.value === "object" ? JSON.stringify(attr.value) : attr.value;
      return value ? `${attr.name}=${value}` : `${attr.name}`;
    })
    .join(" ");
};
