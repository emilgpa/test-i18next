`npm run init`

# COMPILE TO...

### DEVELOPMENT

`npm run dev`

### PRODUCTION

`npm run pro`

# RUN SERVER

`npm run live` (listening :3000)

# OBSERVATIONS

### IN DEVELOPMENT

- everything works.

### IN PRODUCTION

- with `i18next` included in `externals` in `webpack.config.js`, everything works.
- without `i18next` included in `externals` and configured with `react: {wait: true}` in `src/i18n/i18n.ts`, the components are not loaded.
- without `i18next` included in `externals` and configured with `react: {wait: false}` in `src/i18n/i18n.ts`, the components are loaded but when the language is changed, the texts are not translated.