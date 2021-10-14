import { locale } from 'expo-localization';
import I18n from 'i18n-js';
import { store } from '../store';
import { Locales, Locale } from '../store/settings/types';

export function getBestLocale() {
  const storeLocale = store.getState().settings.locale;
  if (storeLocale !== Locales.Default) {
    return storeLocale;
  }

  return findLocaleInSystems() || Locales.EN;
}

function findLocaleInSystems() {
  const matchedLang = Object.values(Locales).find((l) => l === locale.substr(0, 2));
  if (matchedLang) {
    return matchedLang;
  }
  return null;
}

export function updateLocale(newLocale: Locale) {
  const locale =
    newLocale === Locales.Default ? findLocaleInSystems() || Locales.EN : newLocale;
  console.log('new locale: ', newLocale, 'setting locale to:', locale);
  I18n.locale = locale;
}
