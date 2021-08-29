# Localiser UI

A self-hosting localization tool.

## Localization Implementation

In `src/plugins/i18n.js` file:

```javascript
import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n/index';
import * as actions from '@/actions';

// define support locales
const LOCALES = Object.freeze({
  en: 'en',
  zh: 'zh_TW',
  zh_TW: 'zh_TW',
  'zh-TW': 'zh_TW',
});

// detect preferred locale
const language = localStorage.getItem('locale') || window.navigator.language;

// determine default locale
export const DEFAULT_LOCALE = language in LOCALES ? LOCALES[language] : LOCALES.en;

// create an I18n instance
const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
});

// set locale for app
export const setLanguage = (locale) => {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  localStorage.setItem('locale', locale);
};

// load locale files
export const loadMessage = async (locale) => {
  try {
    // fetch from remote
    const message = await actions.project.fetchCachedValues({
      projectId: process.env.VUE_APP_API_PROJECT_ID,
      locale,
    });
    i18n.global.setLocaleMessage(locale, message);
  } catch {
    // or import from local if server is down
    const message = await import(/* webpackChunkName: "locale-[request]" */ `@/assets/lang/${locale}.json`);
    i18n.global.setLocaleMessage(locale, message);
  }
  return nextTick();
};

export default i18n;
```

In `main.js` file:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './plugins/i18n';

createApp(App)
  .use(i18n)
  .mount('#app');
```

In `App.vue` file:

```javascript
import i18n, {
  DEFAULT_LOCALE,
  loadMessage,
  setLanguage,
} from '@/plugins/i18n';

export default {
  name: 'App',
  setup() {
    (async () => {
      await loadMessage(DEFAULT_LOCALE);
      setLanguage(DEFAULT_LOCALE);
    })();
    const changeLanguage = async (locale) => {
      if (!i18n.global.availableLocales.includes(locale)) {
        await loadMessage(locale);
      }
      setLanguage(locale);
    };
    return {
      changeLanguage,
    };
  },
};
```

## Version Control

Download locale files to project with [Localiser CLI](https://github.com/memochou1993/localiser-cli) easily.

## Development

Download the master branch.

```BASH
git clone git@github.com:memochou1993/localiser-ui.git
```

Copy `.env.example` to `.env`.

```BASH
cp .env.example .env
```

Install the dependencies.

```
yarn install
```

Start a development server.

```
yarn serve
```
