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
} as const;

export type ThemeKey = keyof typeof Themes;
export type Theme = typeof Themes[ThemeKey];

export type SettingsState = typeof productionSettingsDefaultState;

export type SavedSettings = Partial<SettingsState> | null;
