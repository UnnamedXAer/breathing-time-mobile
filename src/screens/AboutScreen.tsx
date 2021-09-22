import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Headline from '../components/ui/Headline';
import { Text } from '../components/ui/Themed';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import Constants from 'expo-constants';
import TextLink from '../components/ui/TextLink';
import { RootStackScreenProps } from '../navigation/types';
import Logo from '../assets/images/adaptive-icon.png';

export default function AboutScreen({ navigation }: RootStackScreenProps<'About'>) {
  const scheme = useColorScheme();
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Headline variant={'h2'} style={{ textAlign: 'center' }}>
              About Application
            </Headline>
          </View>
          <View style={styles.logoContainer}>
            <Image
              width={200}
              height={200}
              style={styles.logo}
              source={Logo as ImageSourcePropType}
            />
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
            App version: {Constants.manifest?.version} {__DEV__ ? '__DEV__' : null}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: Layout.spacing(3),
  },
  logoContainer: {
    marginBottom: Layout.spacing(3),
  },
  logo: {
    margin: -40,
    width: 200,
    height: 200,
  },
  textContainer: {
    maxWidth: 420,
  },
  text: {
    fontSize: Layout.spacing(2.2),
    textAlign: 'justify',
  },
  footerContainer: {
    marginTop: Layout.spacing(3),
    marginBottom: Layout.spacing(2),
  },
});
