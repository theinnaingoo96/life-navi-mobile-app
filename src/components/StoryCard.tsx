import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Edit, Trash } from 'lucide-react-native';

import { Colors, Typography, Layout } from '@/constants';

interface StoryCardProps {
  title: string;
  date: string;
  category: string;
  status: 'Published' | 'Pending' | 'Draft';
  imageUrl?: string;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  title, date, category, status, imageUrl, onPress, onEdit, onDelete
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Published': return Colors.success;
      case 'Pending': return Colors.warning;
      case 'Draft': return Colors.gray400;
      default: return Colors.gray400;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={[Typography.caption, { color: Colors.primary, marginBottom: 4 }]}>
          {category} • {date}
        </Text>
        <Text style={[Typography.subheader, { fontSize: 16 }]} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.footer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
              <Edit size={15} color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.actionBtn}>
              <Trash size={15} color={Colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
    marginRight: Layout.spacing.m,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: Colors.gray400,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.spacing.s,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    marginLeft: Layout.spacing.m,
  },
});
