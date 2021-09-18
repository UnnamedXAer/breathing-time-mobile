import React, { ReactElement } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from '../ui/Themed';

interface Props {
  label: string;
  helperLabel?: string;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactElement;
  imgContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const Card: React.FC<Props> = ({
  label,
  helperLabel,
  children,
  onPress,
  imgContainerStyle,
  labelStyle,
}) => {
  const scheme = useColorScheme();
  const backgroundColor = Colors[scheme].background;
  const labelBgColor =
    scheme === 'dark' ? 'rgba(100,100,100,0.3)' : 'rgba(100,100,100,0.1)';

  return (
    <TouchableOpacity
      style={{ ...styles.card, backgroundColor }}
      onPress={onPress}
      activeOpacity={0.7}>
      <>
        <View style={[styles.imageContainer, imgContainerStyle]}>{children}</View>
        <View style={{ ...styles.labelWrapper, backgroundColor: labelBgColor }}>
          <Text style={{ ...styles.label, ...labelStyle }}>
            {label}
            {helperLabel && <Text>{helperLabel}</Text>}
          </Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: 'rgba(100,100,100,0.3)',
    borderWidth: 2,
    borderRadius: Layout.baseRadius,
    width: '100%',
    height: 130,
    margin: Layout.spacing(1),
    padding: Layout.baseRadius,
    flexDirection: 'row',
    elevation: 6,
  },
  imageContainer: {
    padding: Layout.spacing(3),
    width: '30%',
  },
  labelWrapper: {
    flex: 1,
    paddingHorizontal: Layout.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: Layout.spacing(2.5),
  },
});

export default Card;
