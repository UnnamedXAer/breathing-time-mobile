import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Headline from '../components/ui/Headline';
import { Text } from '../components/ui/Themed';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import Constants from 'expo-constants';

const about =
  'Breathing Time is a simple web application designed to help you with breathing exercises based on the Wim Hof method.\nIt allows you to easily adjust tempo of exercise based on your preferences. The breathing exercises are the first of the three pillars in the Wim Hof Method. You can find more information on the Wim Hof Method official website.';

export default function AboutScreen() {
  const scheme = useColorScheme();
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
      <View>
        <View style={styles.headerContainer}>
          <Headline variant={'h2'} style={{ textAlign: 'center' }}>
            About Application
          </Headline>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{about}</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text
          style={{
            color: Colors[scheme].textRGBA(0.7),
          }}>
          App version: {Constants.manifest?.version}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: Layout.spacing(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginBottom: Layout.spacing(3),
  },
  textContainer: {
    maxWidth: 420,
  },
  text: {
    fontSize: Layout.spacing(2.2),
    textAlign: 'justify',
  },
  footerContainer: {
    marginVertical: Layout.spacing(2),
  },
});
