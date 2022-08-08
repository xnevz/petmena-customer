import {Link} from '@react-navigation/native';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  Input,
  Text,
  View,
} from 'native-base';
import React, {useEffect} from 'react';
import {Image, Keyboard, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import * as colors from '../assets/css/Colors';
import Background from '../components/Background';

import login_icon from './../assets/img/login.png';
import PasswordInput from '../components/PasswordInput';
import {useInput} from '../customHooks/uiHooks';

export default function ForgotPassword() {
  const email = useInput(4);
  return (
    <Background>
      <View style={{margin: 40}}>
        {/* icon */}
        <Flex
          align="center"
          justify="center"
          mt="100px"
          h="120px"
          w="120px"
          alignSelf="center"
          rounded="full"
          position="relative"
          mb="50px">
          <Box
            bg="white"
            opacity={0.4}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            rounded="full"
          />
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={80}
            color="white"
          />
        </Flex>

        {/* infos */}
        <Text color="white" fontSize="xl" textAlign="center">
          Forgot Password?
        </Text>
        <Text color="white" fontSize="sm" textAlign="center" mt="10px">
          Enter the email address associated with your account.
        </Text>

        {/* input */}
        <FormControl isInvalid={email.invalid}>
          <Input
            keyboardType="email-address"
            placeholderTextColor={'red'}
            placeholder="Email address"
            {...email}
          />
          <FormControl.ErrorMessage>
            Username must be at least 4 characters long
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          leftIcon={<Icon color="#f0f" size={30} name="done" />}
          onPress={() => {
            // TODO
          }}
        />
      </View>
    </Background>
  );
}
