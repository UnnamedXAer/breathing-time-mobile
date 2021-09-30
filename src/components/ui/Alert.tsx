import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Headline from './Headline';
import WarningSvg from './icons/WarningSvg';
import { Text } from './Themed';

interface Props {
  style?: ViewStyle;
  textSize?: number;
  title?: string;
  content: string;
  onPress?: () => void;
}

const Alert: React.FC<Props> = ({
  title,
  content,
  style,
  textSize = Layout.spacing(2.2),
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, style, { opacity: pressed ? 0.5 : 1 }]}
      onPress={onPress}>
      <WarningSvg
        fill={Colors.colors.warning}
        opacity={0.6}
        width={48}
        height={48}
        style={styles.icon}
      />

      <View style={styles.content}>
        {title && <Headline variant="h3">{title}</Headline>}
        <Text
          style={{
            fontSize: textSize,
            textAlign: 'justify',
            textAlignVertical: 'center',
          }}>
          {content}
        </Text>
      </View>
    </Pressable>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: Colors.colors.warning,
    borderWidth: 3,
    width: '100%',
    borderRadius: Layout.baseRadius,
    paddingRight: Layout.spacing(),
    paddingBottom: Layout.spacing(),
  },
  content: {
    flex: 1,
  },
  icon: {
    display: 'flex',
    width: 48,
    height: 48,
    marginRight: Layout.spacing(),
  },
});
