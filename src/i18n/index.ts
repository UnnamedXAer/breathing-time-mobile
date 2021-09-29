import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './messages/en';
import pl from './messages/pl';
import { I18nMessages } from './types';

export const languages = ['en', 'pl'] as const;

const messages: I18nMessages = {
  en,
  pl,
};

i18n.pluralization['pl'] = (count) => {
  if (count === 1) {
    return ['one'];
  }

  if ([2, 3, 4].indexOf(count % 10) >= 0 && [12, 13, 14].indexOf(count % 100) < 0) {
    return ['few'];
  }

  if (
    count % 10 == 0 ||
    [0, 1, 5, 6, 7, 8, 9].indexOf(count % 10) >= 0 ||
    [11, 12, 13, 14].indexOf(count % 100) >= 0
  ) {
    return ['many'];
  }

  return ['other'];
};

i18n.translations = messages;

console.log(Localization.locale);
console.log(Localization.locales);

i18n.fallbacks = true;
i18n.defaultLocale = 'en';
i18n.locale = Localization.locales[1];

console.log(i18n.currentLocale());
