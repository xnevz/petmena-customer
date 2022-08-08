import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, Flex, Text, Avatar, Center} from 'native-base';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import FiveStars from './FiveStars';

export default function UserCard({item, type}) {
  const navigation = useNavigation();
  return (
    <Box w="1/2" px="5px" py="5px">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate(type, {data: item});
        }}>
        <Box
          shadow={1}
          bg="white"
          borderColor="gray.100"
          borderWidth={1}
          borderRadius={10}>
          {/* doctor pic */}
          <Avatar
            source={{uri: item.picture}}
            _image={{borderRadius: 10}}
            bg="gray.200"
            h="150px"
            borderRadius={10}
            w="full">
            {item.username}
          </Avatar>

          {/* innfos */}
          <Box p="10px">
            {/* username */}
            <Flex direction="row" align="center" justify="space-between">
              <Text color="gray.700" fontSize="sm" numberOfLines={1} flex={1}>
                DR. {item.name}
              </Text>

              {/* stars */}
              <FiveStars yellowCount={item.rating} />
            </Flex>

            {/* infos */}
            {/* location */}
            <Flex direction="row" align="center" mt="5px">
              <FeatherIcon name="map-pin" size={20} color="gray" />
              <Text ml={1} fontSize="xs" color="gray.600">
                {item.location}
              </Text>
            </Flex>
            {/* duration */}
            <Flex direction="row" align="center" mt="5px">
              <FeatherIcon name="clock" size={20} color="gray" />
              <Text ml={1} fontSize="xs" color="gray.600">
                {item.duration}
              </Text>
            </Flex>
            {/* languages */}
            <Flex direction="row" align="center" mt="5px">
              <MaterialIconsIcon name="language" size={20} color="gray" />
              <Text ml={1} fontSize="xs" color="gray.600">
                {item.languages.map(
                  (lang, i) =>
                    `${lang}${i < item.languages.length - 1 ? ' | ' : ''}`,
                )}
              </Text>
            </Flex>
          </Box>

          {/* price */}
          <Center my="5px">
            <Text fontWeight="medium" color="gray.600" fontSize="lg">
              {item.price}$
            </Text>
          </Center>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
