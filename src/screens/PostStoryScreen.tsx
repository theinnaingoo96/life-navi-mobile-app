import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import { ChevronRightIcon } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { Alert, ActivityIndicator } from 'react-native';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Stepper } from '@/components/Stepper';
import { BottomModal } from '@/components/BottomModal';
import { Colors, Typography, Layout, CommonStyles } from '@/constants';
import { ScreenBackground } from '@/components/ScreenBackground';
import { AppNavigationProp } from '@/types/navigation';
import { AdCreateHeader } from '@/components/AdCreateHeader';
import { useAppStore } from '@/store/useAppStore';
import { useCategories } from '@/hooks/useCategories';

const TAGS = ['Breaking', 'Local', 'Community', 'Editorial', 'Opinion', 'Announcement'];

export const PostStoryScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const tempStoryData = useAppStore(state => state.tempStoryData);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      uuid: null as string | null,
      category: null as string | null,
      categoryId: null as string | number | null,
      title: '',
      content: '',
      readTime: 5,
      shortDescription: '',
      tags: [] as string[],
      images: [] as any[],
    },
  });

  const category = watch('category');
  const selectedTags = watch('tags');
  const selectedImages = watch('images');

  const categoryModalRef = useRef<BottomSheet>(null);
  const tagsModalRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (tempStoryData) {
      reset({
        uuid: tempStoryData.uuid || null,
        category: tempStoryData.category || null,
        categoryId: tempStoryData.categoryId || null,
        title: tempStoryData.title || '',
        content: tempStoryData.contents || '',
        readTime: tempStoryData.readTime || 5,
        shortDescription: tempStoryData.shortDescription || '',
        tags: tempStoryData.tags || [],
        images: tempStoryData.images || [],
      });
    }
  }, [tempStoryData, reset]);

  const handlePublish = (data: any) => {
    useAppStore.getState().setTempStoryData(data);
    navigation.navigate('StoryPreview');
  };

  const handlePickImage = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
      includeBase64: true,
    });

    if (result.didCancel) return;

    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Unknown error');
      return;
    }

    if (result.assets) {
      const validImages: any[] = [];
      const oversizedImages: string[] = [];

      result.assets.forEach(asset => {
        const fileSize = asset.fileSize || 0;
        if (fileSize > 10 * 1024 * 1024) {
          oversizedImages.push(asset.fileName || 'Unknown file');
        } else {
          validImages.push(asset);
        }
      });

      if (oversizedImages.length > 0) {
        Alert.alert(
          'File Size Error',
          `The following images are larger than 10MB and were not added: ${oversizedImages.join(', ')}`
        );
      }

      if (validImages.length > 0) {
        setValue('images', [...selectedImages, ...validImages]);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setValue('images', newImages);
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <AdCreateHeader screen="AdSelection" />

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[Typography.header]}>Post your story</Text>

          <Text style={[Typography.label, styles.fieldLabel]}>Category *</Text>
          <Controller
            control={control}
            name="category"
            rules={{ required: 'Category is required' }}
            render={({ field: { value } }) => (
              <TouchableOpacity
                style={[styles.selectInput, errors.category && CommonStyles.inputError]}
                onPress={() => categoryModalRef.current?.expand()}
              >
                <Text style={[Typography.body, !value && { color: Colors.gray400 }]}>
                  {value || 'Select'}
                </Text>
                <ChevronRightIcon size={20} color={Colors.gray400} />
              </TouchableOpacity>
            )}
          />
          {errors.category && <Text style={CommonStyles.errorText}>{errors.category.message}</Text>}

          <Text style={[Typography.label, styles.fieldLabel]}>Story Title *</Text>
          <Controller
            control={control}
            name="title"
            rules={{
              required: 'Title is required',
              maxLength: { value: 100, message: 'Title must be less than 100 characters' }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[CommonStyles.input, errors.title && CommonStyles.inputError]}
                placeholder="Enter a compelling headline"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.title && <Text style={CommonStyles.errorText}>{errors.title.message}</Text>}

          <Text style={[Typography.label, styles.fieldLabel]}>Story Content *</Text>
          <Controller
            control={control}
            name="content"
            rules={{
              required: 'Content is required',
              minLength: { value: 50, message: 'Content must be atleast 50 characters' }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  style={[CommonStyles.input, styles.textArea, errors.content && CommonStyles.inputError]}
                  placeholder="Write your story here... Share news, insights, or community updates."
                  multiline
                  textAlignVertical="top"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <Text style={styles.charCount}>{value.length} characters</Text>
              </View>
            )}
          />
          {errors.content && <Text style={CommonStyles.errorText}>{errors.content.message}</Text>}

          <Text style={[Typography.label, styles.fieldLabel]}>Estimated Read Time</Text>
          <Controller
            control={control}
            name="readTime"
            render={({ field: { onChange, value } }) => (
              <Stepper value={value} onValueChange={onChange} labelFormat="min read" />
            )}
          />

          <Text style={[Typography.label, styles.fieldLabel, { marginTop: Layout.spacing.l }]}>Featured Images</Text>
          <View style={styles.imageGallery}>
            {selectedImages.map((image, index) => (
              <View key={image.uri || index} style={styles.imageWrapper}>
                <Image source={{ uri: image.uri }} style={styles.pickedImage} />
                <TouchableOpacity style={styles.removeBadge} onPress={() => removeImage(index)}>
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {selectedImages.length < 5 && (
              <TouchableOpacity style={styles.uploadArea} onPress={handlePickImage}>
                <Text style={{ fontSize: 24, color: Colors.primary }}>+</Text>
                <Text style={[Typography.body, { color: Colors.primary, marginTop: 4 }]}>Upload Image</Text>
                <Text style={[Typography.caption, { color: Colors.gray400 }]}>JPG, PNG up to 10MB</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={[Typography.label, styles.fieldLabel]}>Short Description</Text>
          <Controller
            control={control}
            name="shortDescription"
            rules={{
              maxLength: { value: 500, message: 'Short description must be less than 500 characters' }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[CommonStyles.input, errors.shortDescription && CommonStyles.inputError]}
                placeholder="Enter a shot description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.shortDescription && <Text style={CommonStyles.errorText}>{errors.shortDescription.message}</Text>}

          <Text style={[Typography.label, styles.fieldLabel]}>Tags</Text>
          <TouchableOpacity style={styles.selectInput} onPress={() => tagsModalRef.current?.expand()}>
            <Text style={[Typography.body, selectedTags.length === 0 && { color: Colors.gray400 }]}>
              {selectedTags.length > 0 ? selectedTags.join(', ') : 'breaking-news, local, community'}
            </Text>
          </TouchableOpacity>

          <View style={styles.warningBox}>
            <Text style={[Typography.caption, { color: Colors.error }]}>
              Note: Your story will be reviewed before publication to ensure it meets our community guidelines. This typically takes 1-2 business days.
            </Text>
          </View>

          <View style={styles.footerActions}>
            <Button
              title="Save Draft"
              variant="outline"
              style={styles.draftBtn}
              onPress={() => { }}
            />
            <Button
              title="Publish Story"
              style={styles.publishBtn}
              onPress={handleSubmit(handlePublish)}
            />
          </View>
        </ScrollView>

        <BottomModal title="Category" ref={categoryModalRef}>
          <Controller
            control={control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <View style={styles.modalChips}>
                {categoriesLoading ? (
                  <ActivityIndicator color={Colors.primary} style={{ flex: 1, padding: 20 }} />
                ) : (
                  categories?.map((cat: any) => (
                    <Chip
                      key={cat.id}
                      label={cat.title}
                      selected={value === cat.title}
                      onPress={() => {
                        onChange(cat.title);
                        setValue('categoryId', cat.id);
                      }}
                    />
                  ))
                )}
              </View>
            )}
          />
          <Button
            title="Confirm"
            onPress={() => categoryModalRef.current?.close()}
            style={styles.modalConfirmBtn}
          />
        </BottomModal>


        <BottomModal title="Tags" ref={tagsModalRef}>
          <Controller
            control={control}
            name="tags"
            render={({ field: { value, onChange } }) => (
              <View style={styles.modalChips}>
                {TAGS.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    selected={value.includes(tag)}
                    onPress={() => {
                      const newValue = value.includes(tag)
                        ? value.filter((t: string) => t !== tag)
                        : [...value, tag];
                      onChange(newValue);
                    }}
                  />
                ))}
              </View>
            )}
          />
          <View style={{ height: 5 }} />
          <Button
            title="Confirm"
            onPress={() => tagsModalRef.current?.close()}
            style={styles.modalConfirmBtn}
          />
        </BottomModal>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  backBtn: {
    padding: Layout.spacing.s,
    width: 40,
    alignItems: 'center',
  },
  countryPicker: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    padding: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl * 2,
  },
  fieldLabel: {
    marginTop: Layout.spacing.m,
    marginBottom: 4,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 10,
    color: Colors.gray400,
    textAlign: 'right',
    marginTop: 4,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.m,
  },
  uploadArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryLight + '33',
    borderStyle: 'dashed',
    borderRadius: Layout.borderRadius.m,
    padding: Layout.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningBox: {
    backgroundColor: Colors.primaryLight,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.m,
    marginTop: Layout.spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  footerActions: {
    flexDirection: 'row',
    marginTop: Layout.spacing.xl,
    gap: Layout.spacing.m,
  },
  draftBtn: {
    flex: 1,
  },
  publishBtn: {
    flex: 1,
  },
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.s,
  },
  imageWrapper: {
    width: (Layout.window.width - Layout.spacing.m * 2 - Layout.spacing.s * 2) / 3,
    aspectRatio: 1,
    borderRadius: Layout.borderRadius.m,
    overflow: 'hidden',
    marginBottom: Layout.spacing.s,
  },
  pickedImage: {
    width: '100%',
    height: '100%',
  },
  removeBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
  },
  modalChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.l,
  },
  modalConfirmBtn: {
    borderRadius: 30,
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
});

