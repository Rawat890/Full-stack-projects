import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

import en from './locales/en.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      const bestLang = locales[0].languageTag;
      callback(bestLang.split('-')[0]);
    } else {
      callback('en');
    }
  },
  init: () => { },
  cacheUserLanguage: () => { },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
