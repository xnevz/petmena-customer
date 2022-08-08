import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HStack, Avatar} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PageHeader = ({
  onBackPress,
  label,
  avatar,
  backgroundColor,
  iconColor = '#fff',
  textColor = '#fff',
}) => {
  return (
    <HStack
      justifyContent="space-between"
      px={5}
      py={5}
      style={{backgroundColor}}>
      {/* back icon */}
      <Icon
        color={iconColor}
        size={30}
        name="arrow-back"
        onPress={onBackPress}
      />
      {/* title */}
      <Text style={[styles.title, {color: textColor}]}>{label}</Text>
      {/* avtar */}
      <Avatar bg="gray.500" size="sm" source={{uri: avatar}}>
        AJ
      </Avatar>
    </HStack>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '300',
  },
});
