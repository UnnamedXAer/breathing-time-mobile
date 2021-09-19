import React, { useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TextStyle, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Colors from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from './Themed';

type DataRow = { key: string; label: string };
interface Props<T extends DataRow> {
  initValue?: string;
  data: T[];
  onChange: (option: T) => void;
}

export default function Select<T extends DataRow>({
  data,
  onChange,
  initValue,
}: Props<T>) {
  const scheme = useColorScheme();
  const [value, setValue] = useState(initValue);
  const selectRef = useRef<ModalSelector<T>>(null);

  const color = Colors[scheme].text;
  const primary = Colors[scheme].primary;

  return (
    <View style={{ ...styles.container, borderBottomColor: primary }}>
      <View style={styles.labelContainer}>
        <Text>App theme:</Text>
      </View>
      <View style={styles.selectContainer}>
        <ModalSelector
          ref={selectRef}
          initValue={initValue}
          data={data}
          backdropPressToClose
          onChange={(option) => {
            setValue(option.label);
            onChange(option);
          }}>
          <View style={styles.select}>
            <Text
              style={{ ...styles.selectText, color }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {value}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={25} color={primary} />
          </View>
        </ModalSelector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Layout.spacing(),
    flex: 1,
    borderBottomWidth: 4,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    maxHeight: '100%',
  },
  selectContainer: {
    flex: 1,
    maxWidth: 200,
  },
  select: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectText: {
    flex: 1,
    marginRight: Layout.spacing(2),
    fontFamily: Fonts.Lato,
    fontSize: Layout.spacing(2.2),
  } as TextStyle,
});
