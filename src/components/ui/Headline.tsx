import React from 'react';
import { TextStyle } from 'react-native';
import Layout from '../../constants/Layout';
import { Text } from './Themed';

interface Props {
  variant?: 'h1' | 'h2' | 'h3';
  style?: TextStyle;
}

const Headline: React.FC<Props> = ({ children, variant = 'h1', style }) => {
  let fontSize = Layout.spacing(4);

  switch (variant) {
    case 'h2':
      fontSize = Layout.spacing(3);
      break;
    case 'h3':
      fontSize = Layout.spacing(3);
      break;
  }

  return (
    <Text
      style={{
        fontSize,
        fontFamily: 'Roboto',
        fontWeight: '700',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default Headline;
