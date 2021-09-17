import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Headline from '../components/ui/Headline';
import Separator from '../components/ui/Separator';
import { Text, View } from '../components/ui/Themed';
import WarningNote from '../components/WarningNote';
import Layout from '../constants/Layout';

type Instructions = { title: string; paragraphs: string[] }[];

const instructions: Instructions = [
  {
    title: 'Get comfortable',
    paragraphs: [
      'Lie down or sit depending what is the most comfortable for you, make sure you can breath freely - your lungs can expand without any constriction. Any additional  contraction will hinder the exercise and shorten the duration of your breath holding.',
    ],
  },
  {
    title: 'Take 30 - 50 deep breaths',
    paragraphs: [
      'Inhale deeply through nose or mouth and exhale through mouth. Try to inhale deeply to the belly. Do not force exhale, just let the air go.',
      'You may experience dizziness, tingling and numbness in fingers and legs - these are normal, harmless side effects of lowering the level of carbon dioxide in the blood stream.',
    ],
  },
  {
    title: 'Hold breath',
    paragraphs: [
      'After the last breath take deep breath - fill whole lungs and let the air go - stop breathing. Hold breath until you feel urge to inhale.',
      'Stop breathing may cause fainting if you force it to much. It is not dangerous but better avoided. Holding breath until the feel of moderate or strong need to inhale is enough.',
    ],
  },
  {
    title: 'Recovery',
    paragraphs: [
      'Once you feel urge to breath inhale at full capacity of your lungs and stop breathing for about 15 seconds. One round is completed.',
      'The next round starts from the breathing phase. Repeat this cycle 3-5 times with not break in between.',
    ],
  },
  {
    title: 'Next round',
    paragraphs: ['Round is completed. Next round will be started.'],
  },
];

export default function BreathingInstructionScreen() {
  return (
    <ScrollView style={styles.container}>
      <Headline variant="h2" style={{ textAlign: 'center' }}>
        Exercise instructions
      </Headline>

      <WarningNote />

      <View style={styles.instructionsContainer}>
        {instructions.map((phase, idx) => (
          <React.Fragment key={idx}>
            <View style={styles.phaseContainer}>
              <Headline variant="h3">{phase.title}</Headline>
              {phase.paragraphs.map((paragraph, i) => (
                <Text style={styles.text} key={i}>
                  {'\t\t' + paragraph}
                </Text>
              ))}
            </View>
            {idx + 1 < instructions.length && <Separator />}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing(2),
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
