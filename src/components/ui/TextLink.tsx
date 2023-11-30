import { EvilIcons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import Colors from '../../constants/Colors';
import { Text } from './Themed';

interface Props {
  onPress: () => void;
  external?: boolean;
  children: ReactNode;
}

const TextLink: React.FC<Props> = ({ children, onPress, external }) => {
  return (
    <Text
      onPress={onPress}
      style={{
        color: Colors.colors.info,
      }}>
      {children}
      {external && (
        <EvilIcons name="external-link" size={24} color={Colors.colors.info} />
      )}
    </Text>
  );
};

export default TextLink;
