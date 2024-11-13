import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 *
 */
export const Switch = ({
  label = "",
  extraClasses = [],
  extraAttrs = [],
  extraInputAttrs = [],
}) => {
  return `<label class="switch" ${extraClasses.join(" ")} ${getGeneratedAttrs(extraAttrs)}>
              <span class="switch__label">${label}</span>
              <input type="checkbox" class="switch__input visuallyHidden" ${getGeneratedAttrs(extraInputAttrs)}>
              <span class="switch__slider"></span>
          </label>`;
};
