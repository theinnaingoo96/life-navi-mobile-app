import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BottomSheet from '@gorhom/bottom-sheet';
import { Plus, User, LogOut, Settings } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Typography, Layout } from '@/constants';
import { useAppStore } from '@/store/useAppStore';
import { useCategories } from '@/hooks/useCategories';
import { AppNavigationProp } from '@/types/navigation';
import { ScreenBackground } from '@/components/ScreenBackground';
import LifeNaviLogo from '@/assets/icons/LifeNavi.svg';
import { BottomModal } from '@/components/BottomModal';

export const HomeScreen = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation<AppNavigationProp>();
  const user = useAppStore(state => state.user);
  const [index, setIndex] = useState(0);
  const profileModalRef = useRef<BottomSheet>(null);
  const { data: categories, isLoading, isError } = useCategories();
  const routes = [
    { key: 'home', title: 'Home', description: 'Welcome to LifeNavi!' },
    ...(categories || []).map((cat: any) => ({
      key: cat.id.toString(),
      title: cat.title,
      description: cat.description,
    })),
  ];

  const handleLogout = () => {
    useAppStore.getState().logout();
    navigation.replace('Login');
  };

  useEffect(() => {
    console.log('Current User:', user);
    console.log('Categories:', categories);
  }, [categories, user]);

  const handleOpenProfile = () => {
    profileModalRef.current?.expand();
  };

  const renderScene = ({ route }: { route: { key: string; title: string, description: string } }) => {
    if (route.key === 'home') {
      return (
        <View style={styles.scene}>
          <Text style={Typography.header}>Home Content</Text>
          <Text style={Typography.body}>Welcome to LifeNavi!</Text>
        </View>
      );
    }
    return (
      <View style={styles.scene}>
        <Text style={Typography.header}>{route.title}</Text>
        <Text style={Typography.body}>{route.description}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={Typography.body}>Error loading categories.</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={{ color: Colors.white }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (routes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={Typography.body}>No categories found.</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={{ color: Colors.white }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <LifeNaviLogo width={80} height={20} />
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate('AdSelection')}
            >
              <Plus size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={handleOpenProfile}
            >
              {user?.avatar?.small ? (
                <Image source={{ uri: user.avatar.small }} style={styles.avatarPlaceholder} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <User size={20} color={Colors.white} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          commonOptions={{
            labelStyle: { color: Colors.black, fontSize: 14, fontWeight: '600' },
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: Colors.primary }}
              style={{ backgroundColor: Colors.background }}
              scrollEnabled={true}
              activeColor={Colors.primary}
              inactiveColor={Colors.black}
            />
          )}
        />
      </View>

      <BottomModal title={`Welcome ${user?.short_name}`} ref={profileModalRef} >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              profileModalRef.current?.close();
              navigation.navigate('ProfileDetail');
            }}
          >
            <User size={20} color={Colors.black} />
            <Text style={[Typography.body, { marginLeft: 12 }]}>Profile Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              profileModalRef.current?.close();
              navigation.navigate('MyStories');
            }}
          >
            <Settings size={20} color={Colors.black} />
            <Text style={[Typography.body, { marginLeft: 12 }]}>My stories</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalOption, { borderBottomWidth: 0 }]}
            onPress={() => {
              profileModalRef.current?.close();
              handleLogout();
            }}
          >
            <LogOut size={20} color={Colors.error} />
            <Text style={[Typography.body, { marginLeft: 12, color: Colors.error }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.m,
    // paddingTop: Layout.spacing.xl * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
    marginRight: 8,
  },
  profileBtn: {
    padding: 4,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: Layout.spacing.s,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.m,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  }
});
