import { Button } from "#shared/ui/Button/index";
import { BarIcon, CinemaIcon, MusicIcon, RestaurantIcon } from "#shared/ui/Icons";
import { Switch } from "#shared/ui/index";
import { Select } from "#shared/ui/index";

const indexPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  hello world
  ${Button({ text: "hi" })}
  ${Switch({
    label: "Привет мир",
    extraInputAttrs: [
      { name: "name", value: "rememberMe" },
      { name: "form", value: "formAuth" },
    ],
  })}
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
            icon: BarIcon(),
          },
        },
        {
          value: "item 2",
          label: "item 2",
          selected: true,
          customProperties: {
            icon: CinemaIcon(),
          },
        },
        {
          value: "item 3",
          label: "item 3",
          selected: true,
          customProperties: {
            icon: MusicIcon(),
          },
        },
        {
          value: "item 4",
          label: "item 4",
          selected: true,
          customProperties: {
            icon: RestaurantIcon(),
          },
        },
      ],
    },
  })}
</body>
</html>`;

export default indexPage;
