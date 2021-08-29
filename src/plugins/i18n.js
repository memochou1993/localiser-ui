import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n/index';
import * as actions from '@/actions';

const LOCALES = Object.freeze({
  en: 'en',
  zh: 'zh_TW',
  zh_TW: 'zh_TW',
  'zh-TW': 'zh_TW',
});

const language = localStorage.getItem('locale') || window.navigator.language;

export const DEFAULT_LOCALE = language in LOCALES ? LOCALES[language] : LOCALES.en;

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
});

export const setLanguage = (locale) => {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  localStorage.setItem('locale', locale);
};

export const loadMessage = async (locale) => {
  try {
    const message = await actions.project.fetchMessages({
      projectId: process.env.VUE_APP_API_PROJECT_ID,
      locale,
    });
    i18n.global.setLocaleMessage(locale, message);
  } catch {
    const message = await import(/* webpackChunkName: "locale-[request]" */ `@/assets/lang/${locale}.json`);
    i18n.global.setLocaleMessage(locale, message);
  }
  return nextTick();
};

export default i18n;
