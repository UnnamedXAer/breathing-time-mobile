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
import { t } from 'i18n-js';
import { useTranslationChange } from '../hooks/useTranslationChange';

export default function AboutScreen({ navigation }: RootStackScreenProps<'About'>) {
  useTranslationChange();

  const scheme = useColorScheme();
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Headline variant={'h2'} style={{ textAlign: 'center' }}>
              {t('about.title')}
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

          <View>
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>{Constants.manifest?.name}</Text>{' '}
              {t('about.text1')}
              <TextLink onPress={() => navigation.push('Preferences')}>
                {t('about.preferences')}
              </TextLink>
              {t('about.text2')}
              <TextLink
                external
                onPress={() => Linking.openURL('https://www.wimhofmethod.com/')}>
                {t('about.whm')}
              </TextLink>{' '}
              {t('about.text3')}
            </Text>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text
            style={{
              color: Colors[scheme].textRGBA(0.7),
            }}>
            {(t('about.app_version'), [Constants.manifest?.version])}
            {__DEV__ ? ' __DEV__' : null}
          </Text>
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
    maxWidth: 500,
    paddingTop: Layout.spacing(2),
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
  text: {
    fontSize: Layout.spacing(2.2),
    textAlign: 'justify',
    lineHeight: Layout.spacing(3),
  },
  footerContainer: {
    marginTop: Layout.spacing(3),
    marginBottom: Layout.spacing(2),
  },
});
