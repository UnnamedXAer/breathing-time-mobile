import I18n from 'i18n-js';
import { Locales } from '../store/settings/types';
import { getBestLocale } from './helpers';
import en from './messages/en';
import pl from './messages/pl';
import { pluralization as pluralizationPL } from './messages/pl/pluralization';
import { I18nMessages } from './types';

export const messages: I18nMessages = {
  en,
  pl,
};

I18n.pluralization[Locales.PL] = pluralizationPL;

I18n.translations = messages;

I18n.fallbacks = true;
I18n.defaultLocale = Locales.EN;
I18n.locale = getBestLocale();
