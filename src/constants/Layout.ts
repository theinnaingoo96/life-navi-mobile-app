import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 20,
        xl: 32,
    },
    borderRadius: {
        s: 4,
        m: 8,
        l: 12,
        xl: 16,
        xxl: 20,
    }
};