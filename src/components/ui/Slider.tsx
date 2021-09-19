import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Slider as RNSlider } from '@miblanchard/react-native-slider';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { Text } from './Themed';

interface Props {
  value: number;
  onChange: (value: number) => void;
  label: string;
  trackMarks?: number[];
  min?: number;
  max?: number;
  step?: number;
  trackMultiplier?: number;
  valueTranslation?: { [value: number]: string | number };
}

const Slider: React.FC<Props> = ({
  value,
  onChange,
  label,
  trackMarks,
  min = 0,
  max = 10,
  step = 1,
  trackMultiplier = 1,
  valueTranslation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text>{label}</Text>
        <Text style={styles.labelValue}>
          {valueTranslation ? valueTranslation[value] : value}
        </Text>
      </View>
      <RNSlider
        containerStyle={{
          ...styles.sliderContainer,
          marginTop: trackMarks?.length ? Layout.spacing(2) : Layout.spacing(),
        }}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        trackMarks={trackMarks}
        renderTrackMarkComponent={
          trackMarks ? (idx) => renderTrackMarkComponent(idx, trackMultiplier) : void 0
        }
        value={value}
        minimumValue={min}
        maximumValue={max}
        step={step}
        onValueChange={(value) => onChange(typeof value === 'number' ? value : value[0])}
      />
    </View>
  );
};

const renderTrackMarkComponent = (idx: number, trackMultiplier: number) => {
  const value = (idx + 1) * trackMultiplier;
  return (
    <View
      style={[
        styles.trackMarkComponentContainer,
        {
          left: value > 9 ? 8 : 10,
        },
      ]}>
      <Text>{value}</Text>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.spacing(),
  },
  sliderContainer: {
    marginTop: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 2,
  },
  labelValue: {
    fontSize: Layout.spacing(2.2),
  },
  thumb: {
    backgroundColor: '#019191',
    borderColor: Colors.light.primary,
    borderWidth: Layout.baseRadius,
    width: Layout.spacing(4),
    height: Layout.spacing(4),
    borderRadius: Layout.spacing(2),
    shadowColor: Colors.dark.text,
    shadowOffset: {
      width: Layout.baseRadius,
      height: Layout.baseRadius,
    },
    shadowOpacity: 0.6,
    elevation: 6,
  },
  track: {
    backgroundColor: '#019191',
    height: Layout.spacing(1),
    borderRadius: Layout.baseRadius,
    shadowColor: Colors.dark.text,
    shadowOffset: {
      width: Layout.baseRadius,
      height: Layout.baseRadius,
    },
    shadowOpacity: 0.6,
    elevation: 3,
  },
  trackMarkComponentContainer: {
    position: 'relative',
    top: -Layout.spacing(2.5),
    width: Layout.spacing(4),
    height: Layout.spacing(4),
  },
});
