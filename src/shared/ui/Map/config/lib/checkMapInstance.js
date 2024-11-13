export function checkMapInstance(method) {
  return function (...args) {
    if (!this.instance) {
      console.warn("Карта не инициализирована");
      return;
    }
    return method.apply(this, args);
  };
}
