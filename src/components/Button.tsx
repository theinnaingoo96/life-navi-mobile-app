import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, View } from 'react-native';
import { Colors, Typography, Layout } from '@/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title, onPress, variant = 'primary', disabled, loading, style, textStyle, icon
}) => {
  const getBgColor = () => {
    if (disabled) return Colors.gray200;
    if (variant === 'primary') return Colors.primary;
    if (variant === 'secondary') return Colors.secondary;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return Colors.gray400;
    if (variant === 'outline') return Colors.black;
    return Colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBgColor() },
        variant === 'outline' && styles.outline,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.s }}>
          {icon}
          <Text style={[Typography.label, { color: getTextColor(), marginBottom: 0 }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: Layout.borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
    width: '100%',
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
});
