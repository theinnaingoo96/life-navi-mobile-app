import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '@/constants/Colors';

interface ScreenBackgroundProps extends ViewProps {
  children: React.ReactNode;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ children, style, ...props }) => {
  return (
    <LinearGradient
      colors={[Colors.background, Colors.white]}
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
