import {Link} from '@react-navigation/native';

import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  Input,
  Text,
  View,
} from 'native-base';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as colors from '../assets/css/Colors';
import Background from '../components/Background';

import PasswordInput from '../components/PasswordInput';
import {useInput} from '../customHooks/uiHooks';

export default function ConfirmNumber() {
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
          <SimpleLineIcon name="screen-smartphone" size={50} color="white" />
        </Flex>

        {/* infos */}
        <Text color="white" fontSize="xl" textAlign="center">
          We sent a code
        </Text>
        <Text color="white" fontSize="sm" textAlign="center" mt="10px">
          We have sent you a verification code to your email
        </Text>

        {/* input */}
        <Flex direction="row" align="center" justify="space-around">
          <Input bg="gray.800" rounded="full" w="65px" h="65px" size="2xl" />
          <Input bg="gray.800" rounded="full" w="65px" h="65px" size="2xl" />
          <Input bg="gray.800" rounded="full" w="65px" h="65px" size="2xl" />
          <Input bg="gray.800" rounded="full" w="65px" h="65px" size="2xl" />
        </Flex>

        {/* btn */}
        <Button
          mt="50px"
          leftIcon={<Icon color="#f0f" size={30} name="done" />}
          onPress={() => {
            // TODO
          }}
        />

        {/* resend btn */}
        <Center>
          <TouchableOpacity
            onPress={() => {
              // TODO
            }}>
            <Flex direction="row" align="center">
              <MaterialIcons name="refresh" size={20} />
              <Text ml="5px" color="white" fontSize="sm">
                Resend
              </Text>
            </Flex>
          </TouchableOpacity>
        </Center>
      </View>
    </Background>
  );
}
