import { createI18n } from 'vue3-i18n';
import en from './en.json';
import hu from './hu.json';

const i18n = createI18n({
  locale: 'hu',
  messages: {
    en: en,
    hu: hu
  },
});

export default i18n;