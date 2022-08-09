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
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import * as colors from '../assets/css/Colors';
import Background from '../components/Background';

import PasswordInput from '../components/PasswordInput';
import {useInput} from '../customHooks/uiHooks';

export default function PasswordReset() {
  const password = useInput(4);
  const confirm_password = useInput(4);

  return (
    <Background>
      <View style={{margin: 40}}>
        {/* icon */}
        <Flex
          align="center"
          justify="center"
          mt="50px"
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
          <SimpleLineIcon name="lock-open" size={50} color="white" />
        </Flex>

        {/* infos */}
        <Text color="white" fontSize="xl" textAlign="center">
          Password Reset
        </Text>
        <Text color="white" fontSize="sm" textAlign="center" mt="10px">
          Type the new password
        </Text>

        {/* input */}
        {/* password */}
        <FormControl isInvalid={password.invalid}>
          <PasswordInput {...password} />
          <FormControl.ErrorMessage>
            Password must be at least 4 characters long
          </FormControl.ErrorMessage>
        </FormControl>

        {/* confirm password */}
        <FormControl isInvalid={confirm_password.invalid}>
          <PasswordInput {...confirm_password} />
          <FormControl.ErrorMessage>
            Password must be at least 4 characters long
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
