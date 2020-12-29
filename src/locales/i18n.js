import { createI18n } from 'vue3-i18n';
import en from './en.json';

const i18n = createI18n({
  locale: "en",
  messages: {
    en: en
  },
});

console.log(en)

export default i18n;