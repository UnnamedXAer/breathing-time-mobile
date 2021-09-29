import { Locale } from '../store/settings/types';
import baseMessages from './messages/en';

export type LocaleMessages = typeof baseMessages;

export type I18nMessages = {
  [key in Exclude<Locale, 'default'>]: LocaleMessages;
};

export type MessagePlural = {
  one?: string;
  many?: string;
  few?: string;
  other?: string;
  zero?: string;
};
