import {View, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../assets/css/global';
import {font_color} from '../assets/css/Colors';
import {StackHeaderProps} from '@react-navigation/stack';
import {getHeaderTitle} from '@react-navigation/elements';

export default function Header({headerProps}: {headerProps: StackHeaderProps}) {
  return (
    <View style={{...globalStyles.centerContent, margin: '5%'}}>
      <Text
        style={{
          backgroundColor: 'transparent',
          color: font_color,
          fontSize: 20,
        }}>
        {getHeaderTitle(headerProps.options, 'PetMena')}
      </Text>
    </View>
  );
}
