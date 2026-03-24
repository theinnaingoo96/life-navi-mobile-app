import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';

import { Button } from '@/components/Button';
import { Colors, Typography, Layout, CommonStyles } from '@/constants';
import { AppNavigationProp } from '@/types/navigation';
import { authService } from '@/services/authService';
import { useAppStore } from '@/store/useAppStore';
import { ScreenBackground } from '@/components/ScreenBackground';

export const LoginScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [rememberMe, setRememberMe] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  useEffect(() => {
    const getDeviceName = async () => {
      const deviceName = await DeviceInfo.getDeviceName();
      setDeviceName(deviceName);
    };
    getDeviceName();
  }, []);

  useEffect(() => {
    reset({ identifier: '', password: '' });
  }, [method, reset]);

  const handleLogin = async (data: any) => {
    try {
      if (!data.identifier || !data.password) {
        return;
      }
      const response = await authService.login(data.identifier, data.password, deviceName);
      if (response.success) {
        useAppStore.getState().setRememberMe(rememberMe);
        useAppStore.getState().setToken(response.data.access_token);
        useAppStore.getState().setUser(response.data.user);

        navigation.navigate('AdSelection');
      } else {
        Alert.alert('Error', `${response}`);
      }
    } catch (error: any) {
      Alert.alert('Error', `${error.response.data.message}`);
    }
  };

  return (
    <ScreenBackground style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/* <Text
            style={[
              Typography.header,
              { fontSize: 32, color: Colors.primary, marginBottom: 8 },
            ]}
          >
            {' '}
            LifeNavi
          </Text> */}
          <Image source={require('../assets/icons/logo.png')} style={styles.headerLogo} />
          <Text style={Typography.caption}>Your One-Stop Life Marketplace</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, method === 'email' && styles.activeTab]}
            onPress={() => setMethod('email')}
          >
            <Text
              style={[
                Typography.tablabel,
                method === 'email' && { color: Colors.white },
              ]}
            >
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, method === 'phone' && styles.activeTab]}
            onPress={() => setMethod('phone')}
          >
            <Text
              style={[
                Typography.tablabel,
                method === 'phone' && { color: Colors.white },
              ]}
            >
              Phone number
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="identifier"
            rules={{
              required: method === 'email' ? 'Email is required' : 'Phone number is required',
              pattern: method === 'email' ? {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              } : {
                value: /^\d{7,15}$/,
                message: 'Invalid phone number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[CommonStyles.input, { borderRadius: 45 }, errors.identifier && CommonStyles.inputError]}
                placeholder={method === 'email' ? 'Email address' : 'Phone number'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
              />
            )}
          />
          {errors.identifier && (
            <Text style={CommonStyles.errorText}>{errors.identifier.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[CommonStyles.input, { flex: 1, marginBottom: 0, borderRadius: 45 }, errors.password && CommonStyles.inputError]}
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={Colors.gray400} />
                  ) : (
                    <Eye size={20} color={Colors.gray400} />
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && (
            <Text style={CommonStyles.errorText}>{errors.password.message}</Text>
          )}

          <View style={styles.row}>
            <View style={styles.remember}>
              <Text style={Typography.caption}>Remember me</Text>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{
                  false: Colors.gray200,
                  true: Colors.gray200,
                }}
                thumbColor={rememberMe ? Colors.primary : Colors.white}
                style={{ marginLeft: 8 }}
              />
            </View>
            <TouchableOpacity>
              <Text style={[Typography.caption, { color: Colors.primary }]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Login"
            onPress={handleSubmit(handleLogin)}
            loading={isSubmitting}
            style={CommonStyles.button}
          />

          <View style={styles.signupContainer}>
            <Text style={Typography.caption}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text
                style={[
                  Typography.caption,
                  { color: Colors.primary, fontWeight: 'bold' },
                ]}
              >
                Sign Up Now
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            {/* Placeholders for social icons */}
            <TouchableOpacity style={styles.socialBtn}>
              <Image source={require('../assets/icons/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Image source={require('../assets/icons/facebook.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Image source={require('../assets/icons/apple.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 LifeNavi Limited. All rights reserved.
          </Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity><Text style={styles.footerLink}>Privacy</Text></TouchableOpacity>
            <Text style={styles.footerDivider}> • </Text>
            <TouchableOpacity><Text style={styles.footerLink}>Terms</Text></TouchableOpacity>
            <Text style={styles.footerDivider}> • </Text>
            <TouchableOpacity><Text style={styles.footerLink}>Contact</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: Layout.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl * 1.5,
  },
  headerLogo: {
    width: 100,
    height: 50,
    marginBottom: Layout.spacing.m,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: Layout.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 60,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  form: {
    width: '100%',
  },
  passwordContainer: {
    ...CommonStyles.row,
    marginBottom: Layout.spacing.m,
  },
  eyeBtn: {
    position: 'absolute',
    right: Layout.spacing.l,
    height: '100%',
    justifyContent: 'center',
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.m,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Layout.spacing.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray200,
  },
  orText: {
    marginHorizontal: Layout.spacing.m,
    color: Colors.gray400,
    fontSize: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Layout.spacing.m,
  },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: Layout.window.width,
    alignItems: 'center',
    paddingBottom: Layout.spacing.m,
  },
  footerText: {
    ...Typography.caption,
    textAlign: 'center',
    marginBottom: Layout.spacing.s,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    ...Typography.caption,
    color: Colors.gray400,
  },
  footerDivider: {
    color: Colors.gray400,
    fontSize: 12,
  },
});
