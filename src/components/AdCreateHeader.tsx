import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { X, ChevronDown, Eye, Edit } from 'lucide-react-native';

import { Colors, Typography, Layout } from '@/constants';
import { AppNavigationProp } from '@/types/navigation';

export const AdCreateHeader: React.FC<{ screen: string }> = ({ screen }) => {
    const navigation = useNavigation<AppNavigationProp>();

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })}>
                <X size={20} color={Colors.black} />
            </TouchableOpacity>
            {
                screen === 'StoryPreview' ? (
                    <View style={styles.countryPicker}>
                        <Eye size={20} color={Colors.primaryDark} />
                        <Text style={[Typography.label, styles.countryName, { color: Colors.primaryDark, marginLeft: Layout.spacing.s }]}>PREVIEW MODE</Text>
                    </View>
                ) : (
                    <View style={styles.countryPicker}>
                        <Image source={require('@/assets/images/uk.png')} style={styles.flag} />
                        <Text style={[Typography.label, styles.countryName]}>United Kingdom</Text>
                        <ChevronDown size={20} color={Colors.black} />
                    </View>
                )
            }
            {
                screen === 'StoryPreview' ? (
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Edit size={20} color={Colors.black} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )
            }
        </View>
    )
}

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Layout.spacing.m,
        backgroundColor: 'transparent',
    },
    backBtn: {
        padding: Layout.spacing.s,
        borderRadius: Layout.borderRadius.m,
        width: 35,
        height: 35,
        backgroundColor: Colors.white,
    },
    countryPicker: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'center',
    },
    countryName: {
        height: 40, paddingTop: 5, paddingBottom: 0, textAlignVertical: 'center',
        marginHorizontal: Layout.spacing.s,
    },
    flag: {
        width: 20,
        height: 20,
        borderRadius: Layout.borderRadius.xxl * 2,
        marginRight: Layout.spacing.s,
    },
})