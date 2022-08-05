import { View, Text } from 'react-native';
import React from 'react';
import { globalStyles } from '../assets/css/global';
import { font_color } from '../assets/css/Colors';

export default function Header(props) {
    console.log(props);
    return (
        <View style={{ ...globalStyles.centerContent, margin: '5%' }}>
            <Text style={{ backgroundColor: 'transparent', color: font_color, fontSize: 18 }}>Header</Text>
        </View>
    );
}