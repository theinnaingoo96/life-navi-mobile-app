import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Share } from 'lucide-react-native';

import { Colors, Typography, Layout } from '@/constants';
import { AppNavigationProp } from '@/types/navigation';

export const DetailHeader: React.FC<{ screen: string, category?: string }> = ({ screen, category }) => {
    const navigation = useNavigation<AppNavigationProp>();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                <ChevronLeft size={24} color={Colors.black} />
            </TouchableOpacity>
            {
                screen === 'story' ? (
                    <Text style={[Typography.label, { color: Colors.primary }]}>{category}</Text>
                ) : (
                    <Text style={Typography.subheader}>{screen}</Text>
                )
            }
            {
                screen === 'story' ? (
                    <TouchableOpacity style={styles.iconBtn}>
                        <Share size={20} color={Colors.black} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Layout.spacing.m,
    },
    iconBtn: {
        padding: 8,
    },
});
