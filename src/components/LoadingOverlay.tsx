import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

import { useAppStore } from '@/store/useAppStore';
import { Colors } from '@/constants';

export const LoadingOverlay = () => {
    const isLoading = useAppStore((state) => state.isLoading);

    if (!isLoading) return null;

    return (
        <Modal
            transparent
            animationType="fade"
            visible={isLoading}
            onRequestClose={() => { }}
        >
            <View style={styles.container}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        padding: 24,
        backgroundColor: Colors.white,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
