import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Typography, Layout, CommonStyles } from '@/constants';
import { AppNavigationProp } from '@/types/navigation';
import { ScreenBackground } from '@/components/ScreenBackground';
import { AdCreateHeader } from '@/components/AdCreateHeader';
import { useAppStore } from '@/store/useAppStore';

export const AdOption = ({ title, description, imageUrl, onPress }: { title: string, description: string, imageUrl: any, onPress: () => void }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.optionIconPlaceholder}>
      <Image source={imageUrl} style={styles.optionIcon} resizeMode='contain' />
    </View>
    <View style={styles.optionTextContainer}>
      <Text style={Typography.subheader}>{title}</Text>
      <Text style={[Typography.caption, { marginTop: 4 }]}>{description}</Text>
    </View>
  </TouchableOpacity>
);

export const AdSelectionScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();

  const handlePostStory = () => {
    useAppStore.getState().setTempStoryData(null);
    navigation.navigate('PostStory');
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <AdCreateHeader screen="AdSelection" />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[Typography.header, { marginBottom: Layout.spacing.xl, textAlign: 'left' }]}>What would you like to do?</Text>

          <AdOption
            title="Post a personal ad"
            description="Post listing as a private person"
            imageUrl={require('@/assets/images/personal.png')}
            onPress={() => { }}
          />
          <AdOption
            title="Post a business ad"
            description="Post listing as a company"
            imageUrl={require('@/assets/images/business.png')}
            onPress={() => { }}
          />
          <AdOption
            title="Post a story"
            description="Publish your news releases or the latest stories in your community"
            imageUrl={require('@/assets/images/story.png')}
            onPress={handlePostStory}
          />

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>
          <View style={{ marginBottom: Layout.spacing.m }} />

          <AdOption
            title="Become a service provider"
            description="Offer professional service"
            imageUrl={require('@/assets/images/service-provider.png')}
            onPress={() => { }}
          />
        </ScrollView>
      </View>
    </ScreenBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Layout.spacing.m,
    paddingTop: Layout.spacing.xl,
  },
  optionCard: {
    backgroundColor: Colors.white,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.m,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
    alignItems: 'center',
  },
  optionIconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: Layout.borderRadius.xxl * 2,
    borderColor: Colors.border,
    borderWidth: 1,
    marginRight: Layout.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIcon: {
    width: 30,
    height: 30,
  },
  optionTextContainer: {
    flex: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Layout.spacing.m,
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
});

