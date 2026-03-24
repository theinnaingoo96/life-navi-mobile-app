import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { User, Mail, Phone, MapPin, Calendar, Baby, UserRound, Flag, Languages, Briefcase, History, FileText } from 'lucide-react-native';

import { ScreenBackground } from '@/components/ScreenBackground';
import { DetailHeader } from '@/components/DetailHeader';
import { Colors, Typography, Layout } from '@/constants';
import { AppNavigationProp } from '@/types/navigation';
import { authService } from '@/services/authService';

export const ProfileDetailScreen = () => {
    const navigation = useNavigation<AppNavigationProp>();

    const { data: userData, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: authService.getMe,
    });

    const user = userData?.data?.user || userData;

    if (isLoading) {
        return (
            <ScreenBackground>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            </ScreenBackground>
        );
    }

    if (isError) {
        return (
            <ScreenBackground>
                <View style={styles.center}>
                    <Text style={Typography.body}>Error loading profile.</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={{ color: Colors.primary }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </ScreenBackground>
        );
    }

    return (
        <ScreenBackground>
            <View style={styles.container}>
                <DetailHeader screen="Profile Details" />

                <ScrollView style={styles.scrollContent}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            {user?.avatar?.url ? (
                                <Image source={{ uri: user?.avatar?.url }} style={styles.avatar} resizeMode='cover' />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <User size={40} color={Colors.white} />
                                </View>
                            )}
                        </View>
                        <Text style={[Typography.header, { marginTop: Layout.spacing.m }]}>
                            {user?.first_name} {user?.last_name}
                        </Text>
                        <Text style={[Typography.caption, { color: Colors.gray400 }]}>{user?.account_id || 'null'}</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <InfoRow icon={<Mail size={20} color={Colors.gray400} />} label="Email" value={user?.email} />
                        <InfoRow icon={<Phone size={20} color={Colors.gray400} />} label="Phone" value={user?.phone || 'Not provided'} />
                        <InfoRow icon={<Baby size={20} color={Colors.gray400} />} label="Date of Birth" value={user?.date_of_birth || 'Not provided'} />
                        <InfoRow icon={<UserRound size={20} color={Colors.gray400} />} label="Gender" value={user?.gender || 'Not provided'} />
                        <InfoRow icon={<Flag size={20} color={Colors.gray400} />} label="Nationality" value={user?.nationality || 'Not provided'} />
                        <InfoRow icon={<Languages size={20} color={Colors.gray400} />} label="Languages" value={user?.languages_spoken || 'Not provided'} />
                        <InfoRow icon={<Briefcase size={20} color={Colors.gray400} />} label="Profession" value={user?.profession || 'Not provided'} />
                        <InfoRow icon={<History size={20} color={Colors.gray400} />} label="Experience" value={user?.experience || 'Not provided'} />
                        <InfoRow icon={<MapPin size={20} color={Colors.gray400} />} label="Location" value={user?.location || 'Not provided'} />
                        <InfoRow icon={<Calendar size={20} color={Colors.gray400} />} label="Joined" value={new Date(user?.created_at).toLocaleDateString()} />
                        <InfoRow icon={<FileText size={20} color={Colors.gray400} />} label="Overview" value={user?.overview || 'Not provided'} isLast />
                    </View>
                </ScrollView>
            </View>
        </ScreenBackground>
    );
};

const InfoRow = ({ icon, label, value, isLast = false }: { icon: any, label: string, value: string, isLast?: boolean }) => (
    <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
        <View style={styles.infoIcon}>{icon}</View>
        <View style={styles.infoText}>
            <Text style={[Typography.caption, { color: Colors.gray400 }]}>{label}</Text>
            <Text style={Typography.body}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Layout.spacing.m
    },
    iconBtn: {
        padding: 8,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: Layout.spacing.l,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: Colors.white,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.gray200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoSection: {
        padding: Layout.spacing.m,
        marginTop: Layout.spacing.m,
    },
    scrollContent: {
        flex: 1,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Layout.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray100,
    },
    infoIcon: {
        width: 40,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: Layout.spacing.s,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backBtn: {
        marginTop: 20,
        padding: 10,
    }
});
