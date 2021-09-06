import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Card from '../components/home/Card';
import { View } from '../components/ui/Themed';
import CoughingSvg from '../components/ui/icons/CoughingSvg';
import Layout from '../constants/Layout';
import { RootTabScreenProps } from '../navigation/bottomTab/types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card
          label="Breathing Exercise"
          onPress={() =>
            navigation.navigate('BreathingExerciseStack', {
              screen: 'Start',
            })
          }>
          <CoughingSvg />
        </Card>
        <Card
          label="Breathing Instruction"
          onPress={() => navigation.navigate('BreathingInstruction')}>
          <CoughingSvg />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing(), // @todo: test the margin/padding
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
