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
import { t } from 'i18n-js';
import { useTranslationChange } from '../hooks/useTranslationChange';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  useTranslationChange();
  const scheme = useColorScheme();
  const fillColor = Colors[scheme].primary;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Card
          label={t('home.start_exercise')}
          onPress={() =>
            navigation.navigate('BreathingExerciseBottomTab', {
              screen: 'Start',
            })
          }
          imgContainerStyle={styles.beImg}
          labelStyle={styles.beLabel}>
          <CoughingSvg fillColor={fillColor} />
        </Card>
        <Card label={t('home.overview')} onPress={() => navigation.navigate('Overview')}>
          <SimpleLineIcons name="chart" size={48} color={fillColor} />
        </Card>
        <Card
          label={t('home.exercise_instructions')}
          onPress={() => navigation.navigate('BreathingInstruction')}>
          <InstructionSvg fillColor={fillColor} />
        </Card>
        <Card
          label={t('home.preferences')}
          onPress={() => navigation.navigate('Preferences')}>
          <PreferencesSvg fillColor={fillColor} />
        </Card>
        {/* // */}
        {__DEV__ && (
          <>
            <Card
              label={'Start'}
              onPress={() =>
                navigation.navigate('BreathingExerciseBottomTab', { screen: 'Start' })
              }>
              <PreferencesSvg fillColor={'orange'} />
            </Card>
            <Card
              label={'Breathing'}
              onPress={() =>
                navigation.navigate('BreathingExerciseBottomTab', { screen: 'Breathing' })
              }>
              <PreferencesSvg fillColor={'orange'} />
            </Card>
            <Card
              label={'Hold'}
              onPress={() =>
                navigation.navigate('BreathingExerciseBottomTab', {
                  screen: 'BreathHold',
                })
              }>
              <PreferencesSvg fillColor={'orange'} />
            </Card>
            <Card
              label={'Recovery'}
              onPress={() =>
                navigation.navigate('BreathingExerciseBottomTab', { screen: 'Recovery' })
              }>
              <PreferencesSvg fillColor={'orange'} />
            </Card>
            <Card
              label={'Summary'}
              onPress={() =>
                navigation.navigate('BreathingExerciseBottomTab', { screen: 'Summary' })
              }>
              <PreferencesSvg fillColor={'orange'} />
            </Card>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingBottom: Layout.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: Layout.spacing(2),
    flex: 1,
    maxWidth: 400,
    alignItems: 'center',
  },
  beImg: { padding: Layout.spacing(2) },
  beLabel: { fontWeight: 'bold' },
});
