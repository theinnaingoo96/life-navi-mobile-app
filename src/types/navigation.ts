import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  AdSelection: undefined;
  PostStory: undefined;
  StoryPreview: undefined;
  MyStories: undefined;
  ProfileDetail: undefined;
  NewsDetail: { articleId: string };
};

export type AppNavigationProp = StackNavigationProp<RootStackParamList>;
