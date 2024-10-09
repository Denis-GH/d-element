import { Button } from '../shared/ui/Button/index.js';

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
  ${Button({ text: 'hi' })}
</body>
</html>`;

export default indexPage;
