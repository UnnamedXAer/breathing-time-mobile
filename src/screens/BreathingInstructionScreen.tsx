import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Headline from '../components/ui/Headline';
import { Text, View } from '../components/ui/Themed';
import Layout from '../constants/Layout';

export default function BreathingInstructionScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Headline variant="h1">Round Phases</Headline>
          <Text style={styles.text}>30 - 50 deep breaths.</Text>
          <Text style={styles.text}>
            Hold your breath on the exhale until strong need to inhale.
          </Text>
          <Text style={styles.text}>
            Recovery - Hold your breath on the inhale for 15 s.
          </Text>
        </View>
        <View>
          <Headline variant="h1">Exercise instructions</Headline>
          <Headline variant="h3">Get comfortable</Headline>
          <Text style={styles.text}>
            - lie down or sit depending what is the most comfortable for you.
          </Text>

          <Headline variant="h3">Take 30 - 50 deep breaths</Headline>
          <Text style={styles.text}>
            - inhale deeply through nose or mouth and exhale through mouth. Try to inhale
            to the belly. Do not force exhale.
          </Text>
          <Headline variant="h3">Hold breath</Headline>
          <Text style={styles.text}>
            - on the last breath inhale really deeply and let the air go - stop breathing.
            Hold on breath out until you feel strong need to breath.
          </Text>
          <Headline variant="h3">Recover</Headline>
          <Text style={styles.text}>
            - hold breath - inhale once and stop breathing for 15 s.
          </Text>
          <Headline variant="h3">Next round</Headline>
          <Text style={styles.text}>
            - round is completed. Next round will be started.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing(2),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: Layout.spacing(2),
  },
});
