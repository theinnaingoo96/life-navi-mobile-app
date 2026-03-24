import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ScreenBackground } from '@/components/ScreenBackground';
import { AppNavigationProp } from '@/types/navigation';
import { Typography } from '@/constants';
import { useAppStore } from '@/store/useAppStore';
import LifeNaviLogo from '@/assets/icons/LifeNavi.svg';

const { width } = Dimensions.get('window');

export const SplashScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const hasHydrated = useAppStore(state => state._hasHydrated);
  const token = useAppStore(state => state.token);

  useEffect(() => {
    if (hasHydrated) {
      const timer = setTimeout(() => {
        if (token) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasHydrated, token, navigation]);

  return (
    <ScreenBackground style={styles.container}>
      <View style={styles.logoContainer}>
        <LifeNaviLogo width={200} height={50} style={{ marginBottom: 10 }} />
        <Text style={Typography.caption}>Your One-Stop Life Marketplace</Text>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: width * 0.8,
    height: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
