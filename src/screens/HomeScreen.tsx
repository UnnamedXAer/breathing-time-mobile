import * as React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import Card from '../components/home/Card';

import { View } from '../components/ui/Themed';
import CoughingSvg from '../components/ui/icons/CoughingSvg';
import Layout from '../constants/Layout';
import { RootTabScreenProps } from '../navigation/bottomTab/types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card
          label="Breathing Exercise"
          onPress={() =>
            navigation.navigate('BreathingExerciseStack', {
              screen: 'Start',
              params: {
                someData: 123,
              },
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
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: -Layout.spacing(1),
  },
});
