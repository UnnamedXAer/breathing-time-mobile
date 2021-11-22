import { productionSettingsDefaultState } from './defaultState';

export type SettingsStateProps = keyof SettingsState;

export type UpdateSettingsPayload = {
  propName: SettingsStateProps;
  value: SettingsState[SettingsStateProps];
};

export const Themes = {
  System: 'system',
  Light: 'light',
  Dark: 'dark',
  Bluish: 'bluish',
  Greenish: 'greenish',
  Reddish: 'reddish',
} as const;

export const Locales = {
  Default: 'default',
  PL: 'pl',
  EN: 'en',
} as const;

export type LocaleKey = keyof typeof Locales;
export type Locale = typeof Locales[LocaleKey];

export type ThemeKey = keyof typeof Themes;
export type Theme = typeof Themes[ThemeKey];

export type SettingsState = typeof productionSettingsDefaultState;

export type SavedSettings = Partial<SettingsState> | null;
