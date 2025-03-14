import React from 'react';
import { TextInput as TI } from 'react-native';
import { colorType } from '../types/typeStyle';

interface textInputType {
  placeholder: string;
  color?: colorType;
  size?: 'sm' | 'md' | 'xl' | 'lg';
  onChange?: (text: string) => void;
  inputMode?: 'default' | 'numeric' | 'email' | 'search';
  value?: string;
  expand?:boolean;
  disabled?: boolean
}

export default function TextInput({ placeholder, inputMode = 'default', color, size, onChange, value, disabled = false, expand}: textInputType) {
  let inputText: any = [];

  if (inputMode === 'default') inputText = ['default', 'text'];
  if (inputMode === 'numeric') inputText = ['numeric', 'numeric'];
  if (inputMode === 'email') inputText = ['default', 'email'];
  if (inputMode === 'search') inputText = ['web-search', 'search'];

  const style = [
    'flex rounded-xl placeholder-inactive outline-0 border focus:bg-primary',
    expand && 'flex-1',
    color === 'light' && 'bg-light',
    color === 'primary' && 'bg-primary',
    color === 'secondary' && 'bg-secondary',
    color === 'info' && 'bg-info',
    color === 'warning' && 'bg-warning',
    color === 'danger' && 'bg-danger',
    color === 'active' && 'bg-active',
    color === 'inactive' && 'bg-inactive',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-4 py-4 text-base',
    size === 'xl' && 'px-6 py-6 text-xl',
    size === 'lg' && 'px-8 py-8 text-2xl'
  ]
    .filter(Boolean)
    .join(' ');

  return <TI placeholder={placeholder} className={style} onChangeText={onChange} keyboardType={inputText[0]} inputMode={inputText[1]} value={value} editable={!disabled} />;
}
