import { Button, Icon, Select, Switch } from "#shared/ui/index";

/**
 *
 */
const indexPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="mapApp">
    <nav class="mapApp__navigation">
      <input type="search" id="searchAddress">
      ${Switch({
        label: "Бары",
        extraClasses: ["switch--isRightLabel"],
        extraInputAttrs: [
          { name: "name", value: "rememberMe" },
          { name: "form", value: "formAuth" },
        ],
      })}
      ${Switch({
        label: "Рестораны",
        extraClasses: ["switch--isRightLabel"],
        extraInputAttrs: [
          { name: "name", value: "rememberMe" },
          { name: "form", value: "formAuth" },
        ],
      })}
      ${Switch({
        label: "ТРК",
        extraClasses: ["switch--isRightLabel"],
        extraInputAttrs: [
          { name: "name", value: "rememberMe" },
          { name: "form", value: "formAuth" },
        ],
      })}
      ${Switch({
        label: "Театры",
        extraClasses: ["switch--isRightLabel"],
        extraInputAttrs: [
          { name: "name", value: "rememberMe" },
          { name: "form", value: "formAuth" },
        ],
      })}
      ${Switch({
        label: "Кино",
        extraClasses: ["switch--isRightLabel"],
        extraInputAttrs: [
          { name: "name", value: "rememberMe" },
          { name: "form", value: "formAuth" },
        ],
      })}
    </nav>
    <section id="map1" class="mapApp__yandexMap yandexMap"></section>
    <aside class="mapApp__actions">
      <ul>
        <li>${Button({ text: "Добавить метку", iconSlot: Icon({ id: "LocationIcon" }), extraClasses: ["isDisabled"], extraAttrs: [{ name: "disabled" }] })}</li>
        <li>${Button({ text: "Построить маршрут", iconSlot: Icon({ id: "RouteIcon" }), extraClasses: ["isDisabled"], extraAttrs: [{ name: "disabled" }] })}</li>
        <li>${Button({ text: "Мои маршруты", iconSlot: Icon({ id: "DirectIcon" }), extraClasses: ["isDisabled"], extraAttrs: [{ name: "disabled" }] })}</li>
      </ul>
    </aside>
  </div>
  
<!--

${Button({ text: "Да", iconSlot: Icon({ id: "YesIcon" }), extraClasses: ["btn--isGreenLightIcon"] })}
${Button({ text: "Нет", iconSlot: Icon({ id: "NoIcon" }), extraClasses: ["btn--isRedIcon"] })}
  
  ${Select({
    cfg: {
      preset: "default",
      itemSelectText: "",
      searchEnabled: false,
      choices: [
        {
          value: "item 1",
          label: "item 1",
          selected: true,
          customProperties: {
            icon: Icon({ id: "YesIcon" }),
          },
        },
        {
          value: "item 2",
          label: "item 2",
          selected: true,
          customProperties: {
            icon: Icon({ id: "YesIcon" }),
          },
        },
        {
          value: "item 3",
          label: "item 3",
          selected: true,
          customProperties: {
            icon: Icon({ id: "YesIcon" }),
          },
        },
        {
          value: "item 4",
          label: "item 4",
          selected: true,
          customProperties: {
            icon: Icon({ id: "YesIcon" }),
          },
        },
      ],
    },
  })}
  
  -->

  <div id="svg-sprite" style="display: none"><svg class="icons-sprite" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><symbol fill="none" viewBox="0 0 18 18" id="BarIcon" xmlns="http://www.w3.org/2000/svg"><path d="M9 .333c-2.667 0-9.333.334-8.667 1l8 8.334V15c0 1.333-4 .667-4 2.667h9.334c0-2-4-1.334-4-2.667V9.667l8-8.334c.666-.666-6-1-8.667-1Zm0 1.334c3.333 0 6.333.333 6.333.333l-1 1H3.667l-1-1s3-.333 6.333-.333Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 18 18" id="CinemaIcon" xmlns="http://www.w3.org/2000/svg"><path d="M9 .667a8.333 8.333 0 0 1 5 15h1.667a.833.833 0 0 1 0 1.666H9A8.333 8.333 0 1 1 9 .667Zm0 10A1.667 1.667 0 1 0 9 14a1.667 1.667 0 0 0 0-3.333ZM5.667 7.333a1.667 1.667 0 1 0 0 3.334 1.667 1.667 0 0 0 0-3.334Zm6.666 0a1.667 1.667 0 1 0 0 3.333 1.667 1.667 0 0 0 0-3.333ZM9 4a1.667 1.667 0 1 0 0 3.333A1.667 1.667 0 0 0 9 4Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 14 14" id="CloseIcon" xmlns="http://www.w3.org/2000/svg"><path d="M13.3.71a.996.996 0 0 0-1.41 0L7 5.59 2.11.7A.997.997 0 1 0 .7 2.11L5.59 7 .7 11.89a.998.998 0 0 0 1.41 1.41L7 8.41l4.89 4.89a.997.997 0 0 0 1.41-1.41L8.41 7l4.89-4.89c.38-.38.38-1.02 0-1.4Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 16 18" id="DeleteIcon" xmlns="http://www.w3.org/2000/svg"><path d="M14.875 3.125h-2.813v-.938A2.188 2.188 0 0 0 9.876 0h-3.75a2.188 2.188 0 0 0-2.188 2.188v.937H1.126a.937.937 0 1 0 0 1.875h.313v10.625A1.563 1.563 0 0 0 3 17.188h10a1.563 1.563 0 0 0 1.563-1.563V5h.312a.937.937 0 0 0 0-1.875Zm-9.063-.938a.312.312 0 0 1 .313-.312h3.75a.313.313 0 0 1 .313.313v.937H5.811v-.938Zm6.875 13.126H3.313V5h9.374v10.313ZM7.064 7.5v5a.937.937 0 0 1-1.875 0v-5a.937.937 0 1 1 1.875 0Zm3.75 0v5a.938.938 0 0 1-1.876 0v-5a.937.937 0 1 1 1.876 0Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 16 18" id="DirectIcon" xmlns="http://www.w3.org/2000/svg"><path d="M7.167 7.333h-5L.5 5.667 2.167 4h5V1.5L8 .667l.833.833v.833h5L15.5 4l-1.667 1.667h-5v1.666h5L15.5 9l-1.667 1.667h-5v5a1.666 1.666 0 0 1 1.667 1.666h-5a1.667 1.667 0 0 1 1.667-1.666V7.333Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 16 16" id="EditIcon" xmlns="http://www.w3.org/2000/svg"><path d="M.5 12.55v2.533c0 .234.183.417.417.417H3.45a.391.391 0 0 0 .292-.125l9.1-9.092-3.125-3.125L.625 12.25a.409.409 0 0 0-.125.3Zm14.758-8.683a.83.83 0 0 0 0-1.175l-1.95-1.95a.83.83 0 0 0-1.175 0l-1.525 1.525 3.125 3.125 1.525-1.525Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 14 18" id="LocationIcon" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.385 17.445S.333 12.348.333 7.333a6.667 6.667 0 1 1 13.334 0c0 5.015-6.052 10.112-6.052 10.112a.933.933 0 0 1-1.23 0ZM7 10.25a2.916 2.916 0 1 0 0-5.833 2.916 2.916 0 0 0 0 5.833Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 18 18" id="MusicIcon" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.333 4.85V1.515a.834.834 0 0 0-.985-.835L6.377 2.34a.833.833 0 0 0-.71.84v7.932A3.333 3.333 0 1 0 7.333 14V7.205l8.334-1.388v3.629a3.333 3.333 0 1 0 1.666 2.887V4.85Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 16 16" id="NoIcon" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="2"/><path d="m12.8 3.2-9.6 9.6" stroke="currentColor" stroke-width="2"/></symbol><symbol fill="none" viewBox="0 0 18 18" id="RestaurantIcon" xmlns="http://www.w3.org/2000/svg"><path d="M5.044 10.056 1.1 6.142a3.745 3.745 0 0 1 0-5.3l6.608 6.555-2.664 2.66Zm6.382-1.695-1.383 1.377 6.476 6.442-1.328 1.32-6.476-6.442L2.24 17.5.912 16.18 10.1 7.04c-.668-1.432-.198-3.446 1.299-4.934 1.798-1.798 4.377-2.135 5.751-.768 1.384 1.376 1.045 3.942-.762 5.73-1.497 1.489-3.52 1.957-4.96 1.292Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 18 18" id="RouteIcon" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.313 5.25a1.563 1.563 0 1 0 0-3.125 1.563 1.563 0 0 0 0 3.125Zm0 1.875a3.438 3.438 0 0 1-3.308-2.5H4.721a1.034 1.034 0 0 0-.297 2.024l9.691 2.907a2.909 2.909 0 0 1-.836 5.694H6.996a3.439 3.439 0 1 1 0-1.875h6.283a1.034 1.034 0 0 0 .297-2.024L3.885 8.445a2.909 2.909 0 0 1 .836-5.695h6.284a3.439 3.439 0 1 1 3.307 4.375ZM5.25 14.313a1.562 1.562 0 1 1-3.125 0 1.562 1.562 0 0 1 3.125 0Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 16 16" id="SaveIcon" xmlns="http://www.w3.org/2000/svg"><path d="M2.167 15.5h11.666a1.666 1.666 0 0 0 1.667-1.667V4.667L11.333.5H2.167A1.667 1.667 0 0 0 .5 2.167v11.666A1.666 1.666 0 0 0 2.167 15.5ZM3.833 2.167h3.334v1.666h1.666V2.167H10.5V5.5H3.833V2.167Zm0 6.666h8.334v5H3.833v-5Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 19 19" id="SearchIcon" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.323 12.905a8 8 0 1 0-1.412 1.41l.043.046 4.242 4.243a1 1 0 0 0 1.415-1.415l-4.243-4.242-.045-.042Zm-2.076-9.15A6 6 0 1 1 3.83 12.31a6 6 0 0 1 8.417-8.555Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 14 16" id="TheaterIcon" xmlns="http://www.w3.org/2000/svg"><path d="M7 11.812c.805 0 1.489-.291 2.051-.874a2.918 2.918 0 0 0 .844-2.1H4.089c0 .818.285 1.518.855 2.1.57.583 1.256.874 2.056.874ZM7 16c-.97 0-1.88-.188-2.73-.565a7.158 7.158 0 0 1-2.222-1.532 7.15 7.15 0 0 1-1.5-2.276A7.133 7.133 0 0 1 0 8.837V0h14v8.837a7.16 7.16 0 0 1-.548 2.79 7.108 7.108 0 0 1-1.5 2.275 7.228 7.228 0 0 1-2.222 1.533A6.602 6.602 0 0 1 7 16M3.13 5.573h2.826c0-.398-.14-.74-.419-1.025a1.36 1.36 0 0 0-1.009-.429c-.393 0-.724.142-.994.427a1.44 1.44 0 0 0-.404 1.026m4.913-.016h2.827a1.39 1.39 0 0 0-.415-1.016 1.36 1.36 0 0 0-1.002-.42c-.39 0-.722.14-.997.421-.275.281-.413.62-.413 1.015Z" fill="currentColor"/></symbol><symbol fill="none" viewBox="0 0 18 13" id="YesIcon" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.955 1.26a1.25 1.25 0 0 1 0 1.767l-9.37 9.369a1.334 1.334 0 0 1-1.885 0L1.045 7.742a1.25 1.25 0 1 1 1.767-1.768l3.83 3.83 8.545-8.545a1.25 1.25 0 0 1 1.768 0Z" fill="currentColor"/></symbol></svg></div>
</body>
</html>`;

export default indexPage;
