import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Card from '../components/home/Card';
import { View } from '../components/ui/Themed';
import CoughingSvg from '../components/ui/icons/CoughingSvg';
import Layout from '../constants/Layout';
import InstructionSvg from '../components/ui/icons/InstructionSvg';
import PreferencesSvg from '../components/ui/icons/PreferencesSvg';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackScreenProps } from '../navigation/types';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const scheme = useColorScheme();
  const fillColor = Colors[scheme].primary;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Card
          label="Breathing Exercise"
          onPress={() =>
            navigation.navigate('BreathingExerciseBottomTab', {
              screen: 'Start',
            })
          }
          imgContainerStyle={{ padding: Layout.spacing(2) }}>
          <CoughingSvg fillColor={fillColor} />
        </Card>
        <Card
          label="Breathing Instruction"
          onPress={() => navigation.navigate('BreathingInstruction')}>
          <InstructionSvg fillColor={fillColor} />
        </Card>
        <Card label="Preferences" onPress={() => navigation.navigate('Preferences')}>
          <PreferencesSvg fillColor={fillColor} />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    maxWidth: 420,
    paddingHorizontal: Layout.spacing(),
    alignItems: 'center',
  },
});
