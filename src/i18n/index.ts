import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { store } from '../store';
import { Locales } from '../store/settings/types';
import en from './messages/en';
import pl from './messages/pl';
import { pluralization as pluralizationPL } from './messages/pl/pluralization';
import { I18nMessages } from './types';

export const messages: I18nMessages = {
  en,
  pl,
};

i18n.pluralization[Locales.PL] = pluralizationPL;

i18n.translations = messages;

i18n.fallbacks = true;
i18n.defaultLocale = Locales.EN;
i18n.locale = getBestLocale();

function getBestLocale() {
  const storeLocale = store.getState().settings.locale;
  if (storeLocale !== 'default') {
    return storeLocale;
  }
  const matchedLang = Object.values(Locales).find(
    (l) => l === Localization.locale.substr(0, 2),
  );
  if (matchedLang) {
    return matchedLang;
  }

  return Locales.EN;
}
