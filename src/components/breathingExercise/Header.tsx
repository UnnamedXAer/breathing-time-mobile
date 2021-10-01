import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from '../ui/Themed';

interface Props {
  title: string;
  roundInfo?: string;
}
const Header: React.FC<Props> = ({ children, title, roundInfo }) => {
  const scheme = useColorScheme();

  const color = Colors[scheme].textRGBA(0.7);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {roundInfo && <Text style={[styles.roundInfo, { color }]}>{roundInfo}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Layout.spacing(Layout.window.height < 600 ? 4 : 5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  roundInfo: {
    marginTop: Layout.spacing(2),
    textAlign: 'center',
    fontSize: Layout.spacing(2.2),
  },
});

export default Header;
