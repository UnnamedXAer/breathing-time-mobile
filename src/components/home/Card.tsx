import * as React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native';
import Layout from '../../constants/Layout';

interface Props {
  label: string;
  helperLabel?: string;
  image: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Card: React.FC<Props> = ({ label, helperLabel, image, onPress }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const icon = require(image) as ImageRequireSource;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={{
          width: 70,
          height: 70,
          tintColor: 'red',
        }}
        source={icon}
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
