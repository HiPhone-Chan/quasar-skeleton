# quasar-skeleton

A vue3 admin project

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

### Lint the files

```bash
npm run lint
```

### Format the files

```bash
npm run format
```

### Build the app for production

```bash
npm run build
```

## Customize the configuration

### quasar config

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### project config

- project variables are defined in directory config
- variables start with `VUE_APP_` can be used in vue app.

## router

### hidden

set true to hide in the bar(side bar / bottom bar / ...)

### priority

set to sort the router asc order

### mete.roles

- set non-empty array means to require authorization and you have the role to access page
- set empty array [] means to require authorization to access page
- set false means to you can access directly without authorization

## reference

[quasar](https://quasar.dev/)
[element-plus](https://element-plus.org/)
[PanJiaChen](https://github.com/PanJiaChen/vue-element-admin)
