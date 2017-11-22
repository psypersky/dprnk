
module.exports = ({ production, body }) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Startup Fullstack Boilerplate</title>
    <meta name="description" content="Startup Fullstack Boilerplate">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  </head>
  <body>
    <div id="app">${body}</div>
    <script src="/client_bundle.js"></script>
  </body>
</html>
`
