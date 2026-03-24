import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors, Typography, Layout } from '../constants';
import { X } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

import { ScreenBackground } from '../components/ScreenBackground';
import { RootStackParamList } from '../types/navigation';
import { useArticleDetail } from '@/hooks/useArticleDetail';
import { getLocalizedValue } from '@/utils/localization';
import { ActivityIndicator } from 'react-native';
import { DetailHeader } from '@/components/DetailHeader';

export const StoryDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'NewsDetail'>>();
  const { articleId } = route.params;

  const { data: article, isLoading, error } = useArticleDetail(articleId);

  if (isLoading) {
    return (
      <ScreenBackground>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </ScreenBackground>
    );
  }

  if (error || !article) {
    return (
      <ScreenBackground>
        <View style={styles.centerContainer}>
          <Text style={Typography.body}>Error loading article details.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text style={{ color: Colors.primary }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenBackground>
    );
  }

  const authorName = `${article.user?.first_name || ''} ${article.user?.last_name || ''}`.trim() || 'Anonymous';
  const dateStr = article.updated_at ? formatDistanceToNow(new Date(article.updated_at), { addSuffix: true }) : 'Recently';
  
  const featuredImageRaw = article.featured_images?.[0];
  let featuredImageUri = typeof featuredImageRaw === 'string' ? featuredImageRaw : (featuredImageRaw?.url || featuredImageRaw?.base64);
  
  if (featuredImageUri && !featuredImageUri.startsWith('http') && !featuredImageUri.startsWith('data:') && !featuredImageUri.startsWith('file://') && !featuredImageUri.startsWith('/')) {
    featuredImageUri = `data:image/jpeg;base64,${featuredImageUri}`;
  }

  const categoryTitle = getLocalizedValue(article.category?.title) || 'Uncategorized';

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <DetailHeader
          screen='story'
          category={categoryTitle}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[Typography.header, { fontSize: 24, marginTop: Layout.spacing.s, marginBottom: Layout.spacing.m }]}>
            {getLocalizedValue(article.title)}
          </Text>

          <View style={styles.authorRow}>
            {article.user?.avatar?.small ? (
              <Image source={{ uri: article.user.avatar.small }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar} />
            )}
            <Text style={Typography.caption}>
              <Text style={{ fontWeight: 'bold' }}>{authorName}</Text> • {dateStr} • {article.read_time || 5} min read
            </Text>
          </View>

          {featuredImageUri ? (
            <Image source={{ uri: featuredImageUri }} style={styles.featuredImage} />
          ) : (
            <View style={styles.featuredImage}>
              <Text style={{ color: Colors.white }}>No Image Available</Text>
            </View>
          )}

          <Text style={[Typography.body, { marginBottom: Layout.spacing.m }]}>
            {getLocalizedValue(article.contents)}
          </Text>

          {article.short_description && (
            <View style={styles.quoteBlock}>
              <Text style={[Typography.body, { fontStyle: 'italic', color: Colors.gray400 }]}>
                {article.short_description}
              </Text>
            </View>
          )}
        </ScrollView>
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
    borderBottomColor: Colors.gray200,
  },
  backBtn: {
    padding: Layout.spacing.s,
    width: 40,
    alignItems: 'center',
  },
  content: {
    padding: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl * 3,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.l,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray200,
    marginRight: 8,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.gray400,
    borderRadius: Layout.borderRadius.m,
    marginBottom: Layout.spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteBlock: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    paddingLeft: Layout.spacing.m,
    marginVertical: Layout.spacing.m,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

