import { Button, Icon, Select } from "#shared/ui";

/**
 * Контент модалки обновления метки
 * @return {string}
 */
export const UpdateMarkModalContent = ({ markInfo, url, method = "post" }) => {
  return `<div class="updateModalContent">
  <form data-js-form=${JSON.stringify({ url, method, showModalAfterSuccess: "#modalSuccess", redirectUrlAfterSuccess: "/test.html", delayBeforeRedirect: 3000 })}>
    <h3 class="updateModalContent__title">Редактировать метку</h3>
    <p class="updateModalContent__markTitle">${markInfo.title}</p>
    <div class="updateModalContent__info infoUpdateModalContent">
      <div class="infoUpdateModalContent__typeMarkSelectTitle">
        Тип метки
      </div>
      <div class="infoUpdateModalContent__typeMarkSelect">
        ${Select({
          extraAttrs: [
            {
              name: "data-js-update-mark-info-select-type",
              value: markInfo.id,
            },
          ],
          cfg: {
            preset: "default",
            itemSelectText: "",
            searchEnabled: false,
            choices: [
              {
                value: "Бar",
                label: "Бар",
                selected: markInfo.type === "bars",
                customProperties: {
                  icon: Icon({ id: "CinemaIcon", color: "var(--colorPrimary)" }),
                },
              },
              {
                value: "Ресторан",
                label: "Ресторан",
                selected: markInfo.type === "restaurant",
                customProperties: {
                  icon: Icon({ id: "CinemaIcon", color: "var(--colorPrimary)" }),
                },
              },
              {
                value: "Ночной клуб",
                label: "Ночной клуб",
                selected: markInfo.type === "trk",
                customProperties: {
                  icon: Icon({ id: "CinemaIcon", color: "var(--colorPrimary)" }),
                },
              },
              {
                value: "Театр",
                label: "Театр",
                selected: markInfo.type === "theatre",
                customProperties: {
                  icon: Icon({ id: "CinemaIcon", color: "var(--colorPrimary)" }),
                },
              },
              {
                value: "Кино",
                label: "Кино",
                selected: markInfo.type === "cinema",
                customProperties: {
                  icon: Icon({ id: "CinemaIcon", color: "var(--colorPrimary)" }),
                },
              },
            ],
          },
        })}
      </div>
      <label class="infoUpdateModalContent__commentTitle" for="UpdateModalContentComment">
        Комментарий пользователя
      </label>
      <textarea class="infoUpdateModalContent__comment" type="comment" id="UpdateModalContentComment" rows="5" name="comment">${markInfo.comment}</textarea>
      <div class="updateModalContent__actions">
        ${Button({
          text: "Сохранить",
          iconSlot: Icon({ id: "SaveIcon" }),
          extraAttrs: [
            {
              name: "type",
              value: "submit",
            },
            {
              name: "name",
              value: "typeMark",
            },
          ],
        })}
      </div>
    </div>
  </form>
  </div>`;
};
