import React from 'react';
import { Image, View } from 'react-native';
import { primary } from '../assets/css/Colors';
import overlay from '../assets/img/backOverlay.png';

export default function Background({ children, style }) {
    return (
        <View style={{ backgroundColor: primary, height: '100%', ...(style ?? {}) }}>
            <Image source={overlay} style={{ width: '100%', height: '100%', position: 'absolute' }} />
            {children}
        </View>
    );
}
