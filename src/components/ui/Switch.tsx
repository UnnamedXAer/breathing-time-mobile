import React from 'react';
import { StyleSheet, View, Switch as RNSwitch } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from './Themed';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

const Switch: React.FC<Props> = ({ label, value, onChange }) => {
  const scheme = useColorScheme();
  const { primary, accent } = Colors[scheme];
  return (
    <View style={styles.container}>
      <Text style={styles.switchLabel}>{label}</Text>
      <RNSwitch
        value={value}
        onValueChange={onChange}
        thumbColor={primary}
        trackColor={{
          true: accent,
          false: Colors[scheme].textRGBA(0.4), //'rgba(66, 34, 31, 0.3)',
        }}
        style={{ transform: [{ scale: 1.3 }] }}
      />
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing(),
    paddingVertical: Layout.spacing(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {},
});
