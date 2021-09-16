import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import Layout from '../constants/Layout';
import { RootState } from '../store/types';
import Headline from './ui/Headline';
import { Text } from './ui/Themed';

interface Props {
  style?: ViewStyle;
}

const phases = [
  'Breathing - take {{breathsPerRound}} deep breaths.',
  'Breath hold - exhale then stop breathing until you feel urge to inhale.',
  'Recovery - inhale deeply and hold breath for {{recoveryTime}} seconds.',
];

const RoundPhases__unused: React.FC<Props> = ({ style }) => {
  const { breathsPerRound, recoveryTime } = useSelector(
    (state: RootState) => state.exercise,
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headlineContainer}>
        <Headline
          variant="h3"
          style={{
            fontSize: Layout.spacing(2.3),
          }}>
          Round phases
        </Headline>
      </View>
      <Text style={styles.text}>
        {phases[0].replace('{{breathsPerRound}}', breathsPerRound.toString())}
      </Text>
      <Text style={styles.text}>{phases[1]}</Text>
      <Text style={styles.text}>
        {phases[2].replace('{{recoveryTime}}', recoveryTime.toString())}
      </Text>
    </View>
  );
};

export default RoundPhases__unused;

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.spacing(3),
    marginBottom: Layout.spacing(1),
  },
  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: Layout.spacing(),
  },
  text: {
    fontSize: Layout.spacing(2),
    marginVertical: Layout.spacing(0.5),
  },
});
