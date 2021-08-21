/* eslint-disable no-param-reassign */
import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n/index';
import * as actions from '@/actions';

const LOCALES = Object.freeze({
  en: 'en',
  zh: 'zh_TW',
  zh_TW: 'zh_TW',
  'zh-TW': 'zh_TW',
});

const { language } = window.navigator;

export const DEFAULT_LOCALE = language in LOCALES ? LOCALES[language] : LOCALES.en;

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
});

export const setLanguage = (locale) => {
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
};

export const loadMessage = async (locale) => {
  try {
    const message = await actions.project.fetchValues({
      projectId: process.env.VUE_APP_API_PROJECT_ID,
      locale,
    });
    i18n.global.setLocaleMessage(locale, message);
  } catch (e) {
    console.debug(e);
  }
  return nextTick();
};

export default i18n;
