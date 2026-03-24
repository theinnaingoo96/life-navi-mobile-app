import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Edit, Send, X } from 'lucide-react-native';

import { Button } from '@/components/Button';
import { Colors, Typography, Layout } from '@/constants';
import { AppNavigationProp } from '@/types/navigation';
import { ScreenBackground } from '@/components/ScreenBackground';
import { AdCreateHeader } from '@/components/AdCreateHeader';
import { useAppStore } from '@/store/useAppStore';
import { articleService } from '@/services/articleService';

export const StoryPreviewScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const tempStoryData = useAppStore(state => state.tempStoryData);
  const user = useAppStore(state => state.user);

  if (!tempStoryData) {
    return (
      <ScreenBackground>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={Typography.body}>No story data to preview.</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={{ marginTop: Layout.spacing.m, width: 'auto' }}
          />
        </View>
      </ScreenBackground>
    );
  }

  const featuredImage = tempStoryData.images && tempStoryData.images.length > 0 ? tempStoryData.images[0] : null;
  const authorName = `${user?.first_name || 'Anonymous'} ${user?.last_name || ''}`.trim();
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getArticlePayload = () => {
    const processedImages = tempStoryData.images?.map((img: any) => {
      if (img.base64) {
        return `data:${img.type || 'image/jpeg'};base64,${img.base64}`;
      }
      return img.url || img.uri || img;
    }) || [];

    return {
      title: tempStoryData.title,
      contents: tempStoryData.content,
      short_description: tempStoryData.shortDescription,
      read_time: tempStoryData.readTime,
      category_id: tempStoryData.categoryId,
      tags: tempStoryData.tags,
      featured_images: processedImages,
      country_id: tempStoryData.country,
      visibility: 'public',
    };
  };

  const handlePublish = async () => {
    const article = getArticlePayload();
    try {
      const response = await articleService.createArticle(article);
      Alert.alert('Success', 'Story published successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Something went wrong');
    }
  };

  const handleUpdate = async () => {
    const article = getArticlePayload();
    try {
      const response = await articleService.updateArticle(tempStoryData.uuid, article);
      Alert.alert('Success', 'Story updated successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Something went wrong');
    }
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <AdCreateHeader screen="StoryPreview" />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[Typography.caption, { color: Colors.primary, textTransform: 'uppercase' }]}>
            {tempStoryData.category || 'NO CATEGORY'}
          </Text>
          <Text style={[Typography.header, { fontSize: 28, marginTop: Layout.spacing.s, marginBottom: Layout.spacing.m }]}>
            {tempStoryData.title || 'No Title'}
          </Text>

          <View style={styles.authorRow}>
            {user?.avatar?.small ? (
              <Image source={{ uri: user.avatar.small }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar} />
            )}
            <Text style={Typography.caption}>
              <Text style={{ fontWeight: 'bold' }}>{authorName}</Text> • {dateStr} • {tempStoryData.readTime} min read
            </Text>
          </View>

          {featuredImage ? (
            <Image
              source={{ uri: featuredImage.uri || featuredImage.url || (typeof featuredImage === 'string' ? featuredImage : '') }}
              style={styles.featuredImage}
            />
          ) : (
            <View style={styles.featuredImage}>
              <Text style={{ color: Colors.white }}>No Image Available</Text>
            </View>
          )}

          <Text style={[Typography.body, { marginBottom: Layout.spacing.m }]}>
            {tempStoryData.content || 'No content provided.'}
          </Text>
        </ScrollView>

        <View style={styles.footerActions}>
          <Button
            title="Edit Story"
            variant="outline"
            style={styles.draftBtn}
            onPress={() => navigation.goBack()}
            icon={<Edit size={18} color={Colors.black} />}
          />
          <Button
            title={tempStoryData.uuid ? "Update Story" : "Publish Now"}
            style={styles.publishBtn}
            onPress={tempStoryData.uuid ? handleUpdate : handlePublish}
            icon={<Send size={18} color={Colors.white} />}
          />
        </View>
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
    backgroundColor: 'transparent',
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
    paddingBottom: Layout.spacing.xl * 2,
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
  footerActions: {
    flexDirection: 'row',
    padding: Layout.spacing.m,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    backgroundColor: Colors.white,
    gap: Layout.spacing.m,
  },
  draftBtn: {
    flex: 1,
  },
  publishBtn: {
    flex: 1,
  },
});

