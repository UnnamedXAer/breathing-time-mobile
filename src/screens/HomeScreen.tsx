import * as React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import Card from '../components/home/Card';
import { View } from '../components/ui/Themed';
import CoughingSvg from '../components/ui/icons/CoughingSvg';
import Layout from '../constants/Layout';
import { RootTabScreenProps } from '../navigation/bottomTab/types';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Separator from '../components/ui/Separator';
import { latoFontsMap } from '../helpers/fonts';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const scheme = useColorScheme();
  const c = Colors[scheme].text;
  const titles = Constants.systemFonts.map((f) => t(f, c));

  const latoTitles = Object.keys(latoFontsMap).map((f) => t(f, c));
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card
          label="Breathing Exercise"
          onPress={() =>
            navigation.navigate('BreathingExerciseStack', {
              screen: 'Start',
            })
          }>
          <CoughingSvg />
        </Card>
        <Card
          label="Breathing Instruction"
          onPress={() => navigation.navigate('BreathingInstruction')}>
          <CoughingSvg />
        </Card>

        <Separator />
        {latoTitles}
        <Separator />
        {titles}
      </View>
    </ScrollView>
  );
}

const t = (
  fontFamily: string,
  color: string,
  fontWeight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
  fontStyle?: 'normal' | 'italic',
) => (
  <Text
    key={fontFamily + Math.random().toLocaleString() + fontWeight!}
    style={{
      fontSize: Layout.spacing(2),
      marginBottom: Layout.spacing(2),
      fontFamily,
      color,
      fontWeight,
      fontStyle,
    }}>
    {fontFamily} {fontWeight} {fontStyle}: To get started, download the font you want to
    use in your app
  </Text>
);

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: Layout.spacing(), // @todo: test the margin/padding
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // marginHorizontal: -Layout.spacing(1),
  },
});
