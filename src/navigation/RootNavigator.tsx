import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@/screens/HomeScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { AdSelectionScreen } from '@/screens/AdSelectionScreen';
import { PostStoryScreen } from '@/screens/PostStoryScreen';
import { StoryPreviewScreen } from '@/screens/StoryPreviewScreen';
import { MyStoriesScreen } from '@/screens/MyStoriesScreen';
import { StoryDetailScreen } from '@/screens/StoryDetailScreen';
import { ProfileDetailScreen } from '@/screens/ProfileDetailScreen';
import { SplashScreen } from '@/screens/SplashScreen';

import { RootStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AdSelection" component={AdSelectionScreen} />
      <Stack.Screen name="PostStory" component={PostStoryScreen} />
      <Stack.Screen name="StoryPreview" component={StoryPreviewScreen} />
      <Stack.Screen name="MyStories" component={MyStoriesScreen} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
      <Stack.Screen name="NewsDetail" component={StoryDetailScreen} />

    </Stack.Navigator>
  );
};
