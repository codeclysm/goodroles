import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './i18n/en';
import it from './i18n/it';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,

    resources: {
      en,
      it
    },

    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    }
  });


export default i18n;