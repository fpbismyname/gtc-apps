import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorType, directionType, sizeType } from '../types/typeStyle';

interface sectionType {
  children: React.ReactNode;
  expand?:boolean
  color?: colorType;
  padding?: sizeType;
  gap?: sizeType;
  direction?: directionType;
  customStyle?: string;
}

export default function Section({ children, color = 'light', padding = 'none', gap = 'none', direction = 'column', customStyle = '', expand}: sectionType) {
  const style = [
    'flex',
    customStyle,
    expand && 'flex-1',
    color === 'light' && 'bg-light',
    color === 'dark' && 'bg-dark',
    color === 'transparent' && 'bg-none',
    padding === 'none' && 'p-0',
    padding === 'sm' && 'p-2',
    padding === 'md' && 'p-6',
    padding === 'xl' && 'p-8',
    padding === 'lg' && 'p-12',
    gap === 'none' && 'gap-0',
    gap === 'sm' && 'gap-4',
    gap === 'md' && 'gap-6',
    gap === 'xl' && 'gap-8',
    gap === 'lg' && 'gap-12',
    direction === 'column' && 'flex-col',
    direction === 'row' && 'flex-row'
  ]
    .filter(Boolean)
    .join(' ');
  return <SafeAreaView className={style}>{children}</SafeAreaView>;
}
