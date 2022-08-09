import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Flex, Text, Image, ScrollView, Button} from 'native-base';
import {StatusBar} from '../components/GeneralComponents';
import PageHeader from '../components/PageHeader';
import * as colors from '../assets/css/Colors';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function TrainingsDetails({navigation}) {
  return (
    <Box flex={1} bg={colors.theme_bg}>
      <StatusBar backgroundColor={colors.theme_bg} />

      {/* header */}
      <PageHeader
        label="DETAILS"
        iconColor="#fff"
        textColor="#fff"
        onBackPress={() => navigation.goBack()}
      />

      {/* image */}
      <Image
        source={{
          uri: 'https://www.akc.org/wp-content/uploads/2018/05/German-Shorthaired-Pointer-being-trained-by-a-woman-at-the-beach.jpg',
        }}
        alt="details"
        h="300px"
        w="full"
      />

      {/* details */}
      <Box
        flex={1}
        w="full"
        bg="gray.50"
        borderTopRightRadius="50px"
        mt="-50px"
        pt="10px"
        px="10px">
        <ScrollView>
          {/* header */}
          <Flex direction="row" align="center" justify="space-between">
            <Text color="black" fontSize="xl" mt={0}>
              TRIANING TYPE
            </Text>
            {/* btn */}
            <Button bg="#5F67EC" mr="20px" mt={0} mb={0}>
              Book Consultation
            </Button>
          </Flex>

          {/* warning */}
          <Flex
            borderRadius={20}
            my="10px"
            direction="row"
            align="center"
            bg="#FFF0ED"
            justify="center"
            px="5px"
            py="5px">
            <MaterialIconsIcon name="error-outline" color="#F55F44" size={20} />
            <Text ml="10px" fontSize="sm" color="#F55F44">
              You need to add Pet before booking this training
            </Text>
          </Flex>

          {/* details */}
          <Flex
            direction="row"
            align="center"
            justify="space-between"
            px="20px"
            my="20px">
            {/* time */}
            <Flex direction="row" align="center">
              <MaterialCommunityIcon name="clock" color="#F6C719" size={25} />
              <Text ml="5px" color="gray.700" fontSize="lg">
                60 <Text color="gray.500">min</Text>
              </Text>
            </Flex>

            <Box h="full" bg="teal.600" w="1px" />

            {/* location */}
            <Flex direction="row" align="center">
              <MaterialIconsIcon
                name="location-pin"
                color="#F6C719"
                size={25}
              />
              <Text ml="5px" color="gray.700" fontSize="lg">
                Amman
              </Text>
            </Flex>

            <Box h="full" bg="teal.600" w="1px" />

            {/* cost */}
            <Flex direction="row" align="center">
              <FontAwesome5Icon
                name="money-bill-alt"
                color="#F6C719"
                size={20}
              />
              <Text ml="5px" color="gray.700" fontSize="lg">
                $50.00
              </Text>
            </Flex>
          </Flex>

          {/* about */}
          <Box mt="10px">
            <Text color="black" fontSize="lg">
              About Training
            </Text>
            <Text color="#777777" fontSize="md">
              {` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
- Utenim ad minim veniam, quis nostrud 
- exercitation ullamco laboris nisi ut aliquizp ex 
- commodo consequat. Duis aute irure dolor 
- in reprehenderit in voluptate velit esse cillum
- Utenim ad minim veniam, quis nostrud 
- exercitation ullamco laboris nisi ut aliquizp ex 
- commodo consequat. Duis aute irure dolor 
- in reprehenderit in voluptate velit esse cillum
- Utenim ad minim veniam, quis nostrud 
- exercitation ullamco laboris nisi ut aliquizp ex 
- commodo consequat. Duis aute irure dolor 
- in reprehenderit in voluptate velit esse cillum
- Utenim ad minim veniam, quis nostrud 
- exercitation ullamco laboris nisi ut aliquizp ex 
- commodo consequat. Duis aute irure dolor 
- in reprehenderit in voluptate velit esse cillum
- Utenim ad minim veniam, quis nostrud 
- exercitation ullamco laboris nisi ut aliquizp ex 
- commodo consequat. Duis aute irure dolor 
- in reprehenderit in voluptate velit esse cillum`}
            </Text>
          </Box>
        </ScrollView>

        {/* btn */}
        <Button mt="5px" bg="#5F67EC" borderRadius={20} _text={{fontSize: 18}}>
          BOOK NOW $50.00
        </Button>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({});
