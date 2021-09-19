import {
  ColorSchemeName as _ColorSchemeName,
  useColorScheme as _useColorScheme,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Theme, Themes } from '../store/settings/types';
import { RootState } from '../store/types';

export type ColorSchemeName = Exclude<Theme, 'system'>;

export default function useColorScheme(): ColorSchemeName {
  const userTheme = useSelector((state: RootState) => state.settings.theme);
  const systemTheme = _useColorScheme() as NonNullable<_ColorSchemeName>;
  return userTheme !== Themes.System ? userTheme : systemTheme;
}
