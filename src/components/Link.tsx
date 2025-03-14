import React from 'react';
import { Text } from 'react-native';

interface linkType {
  title: string;
  onPress?: ()=>void;
}

export default function Link({ title, onPress }: linkType) {
  const style = ['flex', 'underline', 'underline-offset-4', 'text-link', 'active:text-hoverPrimary', 'cursor-pointer'].filter(Boolean).join(' ');
  return (
    <Text className={style} onPress={onPress}>
      {title}
    </Text>
  );
}
