import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import useColorScheme from '../../hooks/useColorScheme';

export function Text({ style, ...otherProps }: DefaultText['props']) {
  const scheme = useColorScheme();

  return (
    <DefaultText
      style={[{ color: Colors[scheme].text, fontFamily: Fonts.Lato }, style]}
      {...otherProps}
    />
  );
}

export function View({ style, ...otherProps }: DefaultView['props']) {
  const scheme = useColorScheme();

  return (
    <DefaultView
      style={[{ backgroundColor: Colors[scheme].background }, style]}
      {...otherProps}
    />
  );
}
