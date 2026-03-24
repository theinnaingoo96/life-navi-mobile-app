import { ViewStyle, TextStyle } from 'react-native';
import { Colors } from './Colors';
import { Layout } from './Layout';

export const CommonStyles: { [key: string]: ViewStyle | TextStyle } = {
    flex: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    input: {
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: Layout.borderRadius.m,
        padding: Layout.spacing.m,
        marginBottom: Layout.spacing.m,
        fontSize: 16,
        backgroundColor: Colors.white,
        paddingHorizontal: Layout.spacing.l,
    },
    inputError: {
        borderColor: Colors.primary,
        marginBottom: Layout.spacing.xs,
    },
    errorText: {
        color: Colors.primary,
        fontSize: 12,
        marginBottom: Layout.spacing.m,
        marginLeft: Layout.spacing.xs,
    },

    button: {
        borderRadius: 45,
        height: 50,
        padding: Layout.spacing.m,
        backgroundColor: Colors.primary,
    },

    card: {
        backgroundColor: Colors.white,
        borderRadius: Layout.borderRadius.l,
        padding: Layout.spacing.m,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
};
