import { t } from 'i18n-js';
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
  onLeaveConfirm?: () => void;
}

const Footer: React.FC<Props> = ({ children, text, navigation, onLeaveConfirm }) => {
  const scheme = useColorScheme();

  const color = Colors[scheme].textRGBA(0.7);

  return (
    <View style={styles.container}>
      <View style={styles.finishBtnContainer}>
        <Button
          size={'small'}
          onPress={() => {
            Alert.alert(
              t('ex.footer.finish_title'),
              t('ex.footer.finish_message'),
              [
                {
                  text: t('ex.footer.confirm'),
                  onPress: () => {
                    if (onLeaveConfirm) {
                      onLeaveConfirm();
                    }
                    navigation.jumpTo('Summary');
                  },
                },
                {
                  text: t('common.no'),
                },
              ],
              {
                cancelable: true,
              },
            );
          }}
          title={t('ex.footer.finish')}
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
