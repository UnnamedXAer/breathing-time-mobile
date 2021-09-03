import React, { ReactElement } from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

interface Props {
  label: string;
  helperLabel?: string;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactElement;
}

const Card: React.FC<Props> = ({ label, helperLabel, children, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>{children}</View>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>
          {label}
          {helperLabel && <Text>{helperLabel}</Text>}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: Layout.baseRadius,
    width: Layout.window.width / 2 - Layout.spacing(5),
    maxWidth: 350,
    height: 130,
    margin: Layout.spacing(1),
  },
  imageWrapper: {
    position: 'absolute',
    right: Layout.spacing(),
    top: Layout.spacing(),
    width: 70,
    height: 70,
  },
  labelWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(100,100,100,0.3)',
    paddingHorizontal: Layout.spacing(1),
    paddingVertical: 2,
  },
  label: {
    fontSize: Layout.spacing(2.5),
  },
});

export default Card;
