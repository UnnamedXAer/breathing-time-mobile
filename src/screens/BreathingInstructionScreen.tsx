import { t } from 'i18n-js';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Headline from '../components/ui/Headline';
import Separator from '../components/ui/Separator';
import { Text, View } from '../components/ui/Themed';
import WarningNote from '../components/WarningNote';
import Layout from '../constants/Layout';
import { LocaleMessages } from '../i18n/types';

export default function BreathingInstructionScreen() {
  const instructions = t(
    'instructions.phases',
  ) as unknown as LocaleMessages['instructions']['phases'];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Headline variant="h2" style={{ textAlign: 'center' }}>
          {t('instructions.title')}
        </Headline>

        <WarningNote />

        <View style={styles.instructionsContainer}>
          {instructions.map((phase, idx) => (
            <React.Fragment key={idx}>
              <View style={styles.phaseContainer}>
                <Headline variant="h3">{phase.title}</Headline>
                {phase.p.map((p, i) => (
                  <Text style={styles.text} key={i}>
                    {'\t\t' + p}
                  </Text>
                ))}
              </View>
              {idx + 1 < instructions.length && <Separator />}
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: Layout.spacing(2),
    maxWidth: 500,
  },
  instructionsContainer: {
    marginVertical: Layout.spacing(3),
    paddingBottom: Layout.spacing(4),
  },
  phaseContainer: {
    marginVertical: Layout.spacing(2),
  },
  text: {
    marginTop: Layout.spacing(1),
    fontSize: Layout.spacing(2.2),
  },
  strong: {
    fontWeight: 'bold',
  },
});
