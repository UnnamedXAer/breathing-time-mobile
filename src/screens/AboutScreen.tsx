import React from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import Headline from '../components/ui/Headline';
import { Text } from '../components/ui/Themed';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import Constants from 'expo-constants';
import TextLink from '../components/ui/TextLink';
import { RootStackScreenProps } from '../navigation/types';

export default function AboutScreen({ navigation }: RootStackScreenProps<'About'>) {
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
          <Text style={styles.text}>
            {Constants.manifest?.name} is a simple web application designed to help you
            with breathing exercises based on the Wim Hof method.
          </Text>
          <Text style={styles.text}>
            It allows you to easily adjust tempo of exercise based on your{' '}
            <TextLink onPress={() => navigation.push('Preferences')}>
              preferences
            </TextLink>
            . The breathing exercises are the first of the three pillars in the Wim Hof
            Method. You can find more information on the{' '}
            <TextLink
              external
              onPress={() => Linking.openURL('https://www.wimhofmethod.com/')}>
              Wim Hof Method
            </TextLink>{' '}
            official website.
          </Text>
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
