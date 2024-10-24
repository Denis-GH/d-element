import { Button } from "#shared/ui/Button/index";
import { Switch } from "#shared/ui/index";
import {
  BarIcon,
  CinemaIcon,
  CloseIcon,
  DeleteIcon,
  DirectIcon,
  RouteIcon,
  EditIcon,
  LocationIcon,
  MusicIcon,
  RestaurantIcon,
  SaveIcon,
  SearchIcon,
  TheaterIcon,
  YesIcon,
  NoIcon,
} from "#shared/ui/Icons";

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
</body>
</html>`;

export default indexPage;
