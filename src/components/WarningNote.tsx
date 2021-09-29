import { t } from 'i18n-js';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Headline from './ui/Headline';
import WarningSvg from './ui/icons/WarningSvg';
import { Text } from './ui/Themed';

interface Props {
  style?: ViewStyle;
  textSize?: number;
}

const WarningNote: React.FC<Props> = ({ style, textSize = Layout.spacing(2.2) }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headlineContainer}>
        <WarningSvg
          fill={Colors.colors.warning}
          opacity={0.6}
          width={48}
          height={48}
          style={styles.icon}
        />
        <Headline variant="h3">{t('ex.warning.title')}</Headline>
      </View>
      <Text style={{ fontSize: textSize }}>{t('ex.warning.text')}</Text>
    </View>
  );
};

export default WarningNote;

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.spacing(3),
  },
  headlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: Layout.spacing(),
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: Layout.spacing(),
  },
});
