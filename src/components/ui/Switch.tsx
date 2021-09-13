import React from 'react';
import { StyleSheet, View, Switch as RNSwitch } from 'react-native';
import Layout from '../../constants/Layout';
import { Text } from './Themed';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

const Switch: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.switchLabel}>{label}</Text>
      <RNSwitch
        value={value}
        onValueChange={onChange}
        thumbColor={'#019191'}
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
