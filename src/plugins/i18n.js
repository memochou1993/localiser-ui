/* eslint-disable no-param-reassign */
import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n/index';
import * as actions from '@/actions';

const LOCALISER_PROJECT_ID = 1;
const DEFAULT_LOCALE = 'en';
const SUPPORT_LOCALES = [
  DEFAULT_LOCALE,
  'zh_TW',
];

export const setLanguage = (i18n, locale) => {
  i18n.global.locale = locale;
  document.documentElement.lang = locale;
};

export const loadMessages = async (i18n, locale) => {
  try {
    const message = await actions.project.fetchValues({
      projectId: LOCALISER_PROJECT_ID,
      locale: SUPPORT_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE,
    });
    i18n.global.setLocaleMessage(locale, message);
  } catch (e) {
    console.debug(e);
  }
  return nextTick();
};

export const i18n = createI18n({
  locale: DEFAULT_LOCALE,
});
