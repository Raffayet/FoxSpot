import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import {ScaledSheet} from "react-native-size-matters";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = ScaledSheet.create({
  default: {
    fontSize: '16@s', // Scaled font size
    lineHeight: '24@s', // Scaled line height
  },
  defaultSemiBold: {
    fontSize: '16@s',
    lineHeight: '24@s',
    fontWeight: '600',
  },
  title: {
    fontSize: '32@s',
    fontWeight: 'bold',
    lineHeight: '32@s',
  },
  subtitle: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
  link: {
    lineHeight: '30@s',
    fontSize: '16@s',
    color: '#0a7ea4',
  },
});
