import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import useColorScheme from '../../hooks/useColorScheme';
import { ExerciseTabScreenProps } from '../../navigation/exerciseBottomTab/types';
import Button from '../ui/Button';
import { Text } from '../ui/Themed';

interface Props
  extends Pick<
    ExerciseTabScreenProps<'Breathing' | 'BreathHold' | 'Recovery'>,
    'navigation'
  > {
  text?: string;
}

const Footer: React.FC<Props> = ({ children, text, navigation }) => {
  const scheme = useColorScheme();

  const color = Colors[scheme].textRGBA(0.7);

  return (
    <View style={styles.container}>
      <View style={styles.finishBtnContainer}>
        <Button
          size={'small'}
          onPress={() => {
            Alert.alert(
              'Finish breathing session',
              'Do you want to end the session now?',
              [
                {
                  text: 'Yes, finish',
                  onPress: () => navigation.jumpTo('Summary'),
                },
                {
                  text: 'No',
                },
              ],
              {
                cancelable: true,
              },
            );
          }}
          title="Finish"
        />
      </View>
      {children}
      {text && <Text style={{ textAlign: 'center', color }}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing(),
    width: '100%',
  },
  finishBtnContainer: {
    maxWidth: 150,
    marginBottom: Layout.spacing(),
  },
});

export default Footer;
