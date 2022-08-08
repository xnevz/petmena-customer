import {FlatList, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../components/PageHeader.js';
import {Avatar, Text, Box, Flex} from 'native-base';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../assets/css/Colors';
import {useNavigation} from '@react-navigation/native';

// dummy data
const pets = [
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
  {
    name: 'Chief Wiggum',
    description: 'loream ipsum dolor sit amet',
    picture:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
    sex: 'Male',
    age: 1,
    weight: 8,
  },
];

const PetsList = ({navigation}) => {
  return (
    <Box bg="white" flex={1}>
      {/* header */}
      <Header
        label="PETS LIST"
        iconColor="#000"
        textColor="#000"
        onBackPress={() => navigation.goBack()}
      />

      <View style={{paddingHorizontal: 10, flex: 1}}>
        {/* add pet */}
        <TouchableOpacity
          style={{width: '100%'}}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('add_pet');
          }}>
          <Flex
            align="center"
            justify="space-between"
            direction="row"
            backgroundColor={colors.theme_yellow}
            px={5}
            py={3}
            borderRadius={15}>
            <Flex align="center" direction="row">
              <View style={{backgroundColor: '#000', borderRadius: 1000}}>
                <AntDesignIcon name="pluscircle" color="#fff" size={25} />
              </View>
              <Text color="#000" ml={10}>
                Add Pet
              </Text>
            </Flex>
            <MaterialIcon name="arrow-forward-ios" color="#000" size={20} />
          </Flex>
        </TouchableOpacity>

        {/* pets list */}
        <FlatList
          data={pets}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{paddingHorizontal: 5}}
          renderItem={({item}) => <PetInfos item={item} />}
        />
      </View>
    </Box>
  );
};

function PetInfos({item}) {
  return (
    <Box borderRadius={10} p={5} my={3} shadow={2} bg="white">
      {/* user name & pic */}
      <Flex align="center" justify="space-between" direction="row">
        {/* pet name & pic */}
        <Flex align="center" direction="row">
          <Avatar
            bg="gray.300"
            mr="5"
            borderRadius={10}
            size="lg"
            _image={{borderRadius: 10}}
            source={{
              uri: item.picture,
            }}>
            {item.name[0]}
          </Avatar>
          <View>
            <Text color="black" fontWeight="semibold" fontSize="md">
              {item.name}
            </Text>
            <Text color="gray.400" fontWeight="semibold" fontSize="sm">
              {item.description}
            </Text>
          </View>
        </Flex>

        {/* icon */}
        <MaterialIcon name="arrow-forward-ios" color="lightgray" size={20} />
      </Flex>

      {/* pet infos */}
      <Flex align="center" justify="space-between" direction="row" mt={5}>
        {/* age */}
        <Box
          flex={1}
          mr={2}
          px={3}
          py={2}
          borderRadius={10}
          borderColor="gray.300"
          borderWidth={0.5}>
          <Flex align="center" direction="row">
            <MaterialIcon name="pets" size={22} color="#F08148" />
            <Text ml={2} fontSize="md" color="gray.400">
              Age
            </Text>
          </Flex>

          <Text ml={2} fontSize="md" color="gray.600">
            {item.age} years
          </Text>
        </Box>
        {/* sex */}
        <Box
          flex={1}
          mr={2}
          px={3}
          py={2}
          borderRadius={10}
          borderColor="gray.300"
          borderWidth={0.5}>
          <Flex align="center" direction="row">
            <MaterialIcon name="pets" size={22} color="#F08148" />
            <Text ml={2} fontSize="md" color="gray.400">
              Sex
            </Text>
          </Flex>

          <Text ml={2} fontSize="md" color="gray.600">
            {item.sex}
          </Text>
        </Box>
        {/* weight */}
        <Box
          flex={1}
          px={3}
          py={2}
          borderRadius={10}
          borderColor="gray.300"
          borderWidth={0.5}>
          <Flex align="center" direction="row">
            <MaterialIcon name="pets" size={22} color="#F08148" />
            <Text ml={2} fontSize="md" color="gray.400">
              Weight
            </Text>
          </Flex>

          <Text ml={2} fontSize="md" color="gray.600">
            {item.weight} kg
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default PetsList;
