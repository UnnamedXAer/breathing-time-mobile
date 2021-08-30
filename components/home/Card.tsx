import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import Layout from '../../constants/Layout';

interface Props {
  label: string;
  helperLabel?: string;
  image: string;
}

const Card: React.FC<Props> = ({ label, helperLabel, image }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        style={{
          width: 70,
          height: 70,
          tintColor: 'red',
        }}
        source={require('../../assets/images/adaptive-icon.png')}
      />
      <Text style={styles.label}>
        {label}
        {helperLabel && <Text>{helperLabel}</Text>}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: 'rgb(1, 77, 77)',
    borderWidth: 2,
    borderRadius: Layout.baseRadius,
    width: Layout.window.width / 2 - Layout.spacing(5),
    maxWidth: 350,
    height: 130,
    padding: Layout.spacing(2),
    margin: Layout.spacing(1),
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  label: {
    fontSize: Layout.spacing(2.5),
  },
});

export default Card;
