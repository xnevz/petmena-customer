import { Box, ScrollView } from 'native-base';
import React, { ReactNode, CSSProperties } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';
import { primary } from '../assets/css/Colors';
import overlay from '../assets/img/backOverlay.png';

export default function Background({ children, style, useScroll = true }: { style?: CSSProperties, children: ReactNode, useScroll?: boolean; }) {

    return (
        <View style={{ backgroundColor: primary, height: '100%' }}>
            <Image source={overlay} style={{ width: '100%', height: '100%', position: 'absolute' }} />
            {
                useScroll ? <ScrollView style={{ marginTop: 70, width: '100%' }} contentContainerStyle={{ ...Object(style) }}>
                    {children}
                </ScrollView> :
                    <View style={{ ...Object(style), height: '100%' }}>
                        {children}
                    </View>
            }
        </View>
    );
}
