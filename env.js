const fs = require('fs');

const env = process.env.NODE_ENV;

console.log(`The environment is ${process.env.NODE_ENV}\n`);

const scriptsPro = `
    <script src="/static/node_modules/i18next/dist/umd/i18next.js"></script>
    <script src="/static/dist/main.bundle.js"></script>
`

const scriptsDev = `
    <script src="/static/jspm_packages/system.js"></script>
    <script src="/static/config.js"></script>
    <script type="text/javascript" defer>
        System.import('/static/dev/app.js').then(
            m => null, 
            err => console.error("error al cargar la app", err)
        );
    </script>
`

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="google-signin-client_id" content="295036914881-d6eg0bhn5dbj648lu5b8m1td2vpnkuph.apps.googleusercontent.com">
    <link rel="stylesheet" type="text/css" href="/static/normalize.css">
    <title>Login with Google</title>
</head>
<body>
    <div id="app"></div>
    <div>
        ${env == "production" ? scriptsPro : scriptsDev}
    </div>
</body>
</html>
`

const fileName = 'app.html';
const stream = fs.createWriteStream(fileName);

stream.once('open', (fd) => {
    stream.end(html);
});