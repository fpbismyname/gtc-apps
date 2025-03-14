import React from 'react';
import { Text as T } from 'react-native';
import { sizeType, weightType } from '../types/typeStyle';

interface typeText {
  size?: sizeType | "2xl" | "3xl";
  weight?: weightType;
  customStyle?: string;
  children: React.ReactNode;
}

export default function Text({ size = 'sm', weight = 'normal', children, customStyle = '' }: typeText) {
  const style = [
    customStyle,
    size === 'sm' && 'text-sm',
    size === 'md' && 'text-base',
    size === 'xl' && 'text-xl',
    size === '2xl' && 'text-2xl',
    size === '3xl' && 'text-3xl',
    weight === 'bolder' && 'font-bold',
    weight === 'bold' && 'font-semibold',
    weight === 'normal' && 'font-normal',
    weight === 'thin' && 'font-light'
  ]
    .filter(Boolean)
    .join(' ');

  return <T className={style}>{children}</T>;
}
