import React from 'react';
import {Avatar, Box, Flex, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Appointment({children, item}) {
  return (
    <Flex
      rounded="xl"
      bg="white"
      borderColor="gray.200"
      borderWidth={1}
      p="10px"
      direction="row"
      align="center"
      mb="10px">
      {/* avatar */}
      <Avatar
        bg="gray.200"
        // source={{
        //   uri: item.picture,
        // }}
        size="lg"
        _image={{
          borderRadius: 10,
        }}
        rounded="xl"
        mr="10px">
        NB
      </Avatar>

      {/* details */}
      <Box flex={1}>
        <Text color="black" numberOfLines={1}>
          Appointment name
        </Text>

        {/* time & location */}
        <Flex direction="row" align="center">
          <Flex direction="row" align="center" mr="10px">
            <MaterialCommunity name="clock" color="#707070" size={20} />
            <Text ml="5px" color="gray.700" fontSize="sm">
              60 <Text color="gray.500">min</Text>
            </Text>
          </Flex>

          {/* location */}
          <Flex direction="row" align="center">
            <MaterialIcons name="location-pin" color="#707070" size={20} />
            <Text ml="2px" color="gray.700" fontSize="sm">
              Amman
            </Text>
          </Flex>
        </Flex>

        {/* data */}
        <Text color="#808081">Sunday 15-5-2022</Text>
      </Box>

      {/* render btn  */}
      {children}
    </Flex>
  );
}
