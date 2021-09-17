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
          opacity={0.4}
          width={48}
          height={48}
          style={{
            width: 48,
            height: 48,
            marginRight: Layout.spacing(),
          }}
        />
        <Headline variant="h3">Attention</Headline>
      </View>
      <Text style={{ fontSize: textSize }}>
        This breathing exercise can affect your motor control, cause temporary dizziness
        or even make you faint - do NOT do it while driving or in kind of dangerous
        places. Find safe place like sofa or bed.
      </Text>
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
});
