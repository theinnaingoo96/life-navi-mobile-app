import React, { forwardRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

import { Typography, Layout, Colors } from '@/constants';

interface BottomModalProps {
  title: string;
  children: React.ReactNode;
}

export const BottomModal = forwardRef<BottomSheet, BottomModalProps>(
  ({ title, children }, ref) => {

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
        backgroundStyle={{ backgroundColor: Colors.backgroundLight }}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.header}>
            <Text style={Typography.subheader}>{title}</Text>
          </View>
          <View style={styles.content}>
            {children}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  content: {
  },
});
