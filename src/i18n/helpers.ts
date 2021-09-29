import { locale } from 'expo-localization';
import I18n from 'i18n-js';
import { store } from '../store';
import { Locales, Locale } from '../store/settings/types';

export function getBestLocale() {
  const storeLocale = store.getState().settings.locale;
  if (storeLocale !== 'default') {
    return storeLocale;
  }
  const matchedLang = Object.values(Locales).find((l) => l === locale.substr(0, 2));
  if (matchedLang) {
    return matchedLang;
  }

  return Locales.EN;
}

export function updateLocale(newLocale: Locale) {
  const locale = newLocale === 'default' ? Locales.EN : newLocale;
  I18n.locale = locale;
}
