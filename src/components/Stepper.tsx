import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Layout } from '../constants';

interface StepperProps {
  value: number;
  onValueChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labelFormat?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  value, onValueChange, min = 1, max = 60, step = 1, labelFormat = ""
}) => {
  const handleDecrement = () => {
    if (value > min) onValueChange(value - step);
  };
  const handleIncrement = () => {
    if (value < max) onValueChange(value + step);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, value <= min && styles.disabled]}
        onPress={handleDecrement}
        disabled={value <= min}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={[Typography.body, styles.valueText]}>
        {value} {labelFormat}
      </Text>

      <TouchableOpacity
        style={[styles.button, value >= max && styles.disabled]}
        onPress={handleIncrement}
        disabled={value >= max}
      >
        <Text style={[styles.buttonText, { color: Colors.primary }]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.s,
    backgroundColor: Colors.white,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: Colors.gray100,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray400,
  },
  valueText: {
    fontWeight: '600',
  },
});
