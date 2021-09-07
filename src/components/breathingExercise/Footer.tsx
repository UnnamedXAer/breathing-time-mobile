import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from '../ui/Themed';

interface Props {
  text?: string;
}

const Footer: React.FC<Props> = ({ children, text }) => {
  const scheme = useColorScheme();

  const color = Colors[scheme].textRGBA(0.7);

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
});

export default Footer;
