import React from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from '../ui/Themed';

interface Props {
  text?: string;
}

const Footer: React.FC<Props> = ({ children, text }) => {
  const scheme = useColorScheme();

  const color = scheme === 'light' ? 'rgba(18, 18, 18, 0.7)' : 'rgba(253, 253, 253, 0.7)';

  return (
    <View style={styles.container}>
      {children}
      {text && <Text style={{ textAlign: 'center', color }}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing(),
  },
  tip: {
    textAlign: 'center',
  },
});

export default Footer;
