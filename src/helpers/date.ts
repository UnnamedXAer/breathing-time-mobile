import { enGB as en, pl } from 'date-fns/locale';
import I18n from 'i18n-js';

export function getDateOptions() {
  return {
    locale: I18n.locale === 'pl' ? pl : en,
  };
}
