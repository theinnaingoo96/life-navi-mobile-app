import { TextStyle } from 'react-native';
import { Colors } from './Colors';
import { Layout } from './Layout';

export const Typography: { [key: string]: TextStyle } = {
    header: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.fontBlack,
    },
    subheader: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.fontBlack,
    },
    body: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.fontBlack,
        lineHeight: 22,
    },
    caption: {
        fontSize: 12,
        color: Colors.gray400,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.fontBlack,
        marginBottom: 8,
    },
    tablabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.fontBlack,
    },
};