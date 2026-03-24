import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { FlatList, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { Search } from 'lucide-react-native';

import { useMyStories, ArticleStatus } from '@/hooks/useMyStories';
import { articleService } from '@/services/articleService';
import { AppNavigationProp } from '@/types/navigation';
import { ScreenBackground } from '@/components/ScreenBackground';
import { getLocalizedValue } from '@/utils/localization';
import { Colors, Typography, Layout } from '@/constants';
import { DetailHeader } from '@/components/DetailHeader';
import { useAppStore } from '@/store/useAppStore';
import { StoryCard } from '@/components/StoryCard';

const TABS = ['All', 'Published', 'Pending', 'Drafts'];

export const MyStoriesScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statusMap: Record<string, ArticleStatus> = {
    'All': 'all',
    'Published': 'published',
    'Pending': 'pending',
    'Drafts': 'draft',
  };

  const { data: stories, isLoading, refetch, isRefetching } = useMyStories(statusMap[activeTab]);

  const handleDelete = (uuid: string) => {
    Alert.alert(
      'Delete Story',
      'Are you sure you want to delete this story?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await articleService.deleteArticle(uuid);
              refetch();
            } catch (error: any) {
              Alert.alert('Error', error?.message || 'Failed to delete story');
            }
          },
        },
      ]
    );
  };

  const filteredStories = stories?.filter((story: any) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => {
    const statusLabelMap: Record<string, 'Published' | 'Pending' | 'Draft'> = {
      published: 'Published',
      pending: 'Pending',
      draft: 'Draft',
      rejected: 'Draft',
    };

    return (
      <StoryCard
        title={getLocalizedValue(item.title)}
        category={getLocalizedValue(item.category?.title) || 'Uncategorized'}
        date={item.updated_at ? formatDistanceToNow(new Date(item.updated_at), { addSuffix: true }) : ''}
        status={statusLabelMap[item.status as string] || 'Draft'}
        imageUrl={item.featured_images?.[0]?.url}
        onPress={() => navigation.navigate('NewsDetail', { articleId: item.uuid })}
        onEdit={() => {
          const mappedData = {
            uuid: item.uuid,
            title: getLocalizedValue(item.title),
            contents: getLocalizedValue(item.contents),
            shortDescription: item.short_description || '',
            readTime: item.read_time || 5,
            category: getLocalizedValue(item.category?.title) || '',
            categoryId: item.category?.id || '',
            tags: item.tags || [],
            country: item.country?.id || '',
            images: item.featured_images?.map((img: any) => ({ uri: img.url, isFromApi: true })) || [],
          };
          useAppStore.getState().setTempStoryData(mappedData);
          navigation.navigate('PostStory');
        }}
        onDelete={() => handleDelete(item.uuid)}
      />
    );
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <DetailHeader screen="My Stories" />

        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search news and stories my stories"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[Typography.caption, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isLoading && !isRefetching ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredStories}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.primary} />
            }
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Text style={Typography.body}>No stories found.</Text>
              </View>
            }
          />
        )}
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.m,
    paddingTop: Layout.spacing.xl * 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginVertical: Layout.spacing.s,
    marginHorizontal: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    paddingBottom: Layout.spacing.m,
  },
  tab: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: 20,
    marginHorizontal: Layout.spacing.s,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: Layout.spacing.xl,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
});

