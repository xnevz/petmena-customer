import React from 'react';
import {Box, Flex, Text} from 'native-base';
import PageHeader from '../components/PageHeader';
import UsersList from '../components/UsersList';
import SearchBar from '../components/SearchBar';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

// dummy data
const coaches_list = [
  {
    picture:
      'https://www.akc.org/wp-content/uploads/2018/05/German-Shorthaired-Pointer-being-trained-by-a-woman-at-the-beach.jpg',
    name: 'Asma Fares',
    location: 'Amman',
    duration: '20 Minutes',
    languages: ['AR', 'EN'],
    price: 20,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://www.akc.org/wp-content/uploads/2020/12/German-Shepherd-Dog-puppy-jumping-up-on-its-owner-in-the-park.jpeg',
    name: 'Jamle Ahmeed',
    location: 'Amman',
    duration: '60 Minutes',
    languages: ['AR'],
    price: 30,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKqiFD6dgPMVRE--61eOx_n9PCw5VhkYw3X3ZrjWqZhmnxYvav4i_DG9Yr0rHgLRaRakY&usqp=CAU',
    name: 'Samir Kheled',
    location: 'Amman',
    duration: '15 Minutes',
    languages: ['AR', 'EN', 'FR'],
    price: 15,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReMOivmpSPHyVIMsLs8wBEW_491bLjhUjspA&usqp=CAU',
    name: 'Asma Fares',
    location: 'Amman',
    duration: '20 Minutes',
    languages: ['AR', 'EN'],
    price: 80,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://www.dogcoachfrancis.com/wp-content/uploads/2012/04/420392_323300987718770_717644022_n-300x199.jpg',
    name: 'Jamle Ahmeed',
    location: 'Amman',
    duration: '60 Minutes',
    languages: ['AR'],
    price: 120,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://www.dogcoachfrancis.com/wp-content/uploads/2012/04/420392_323300987718770_717644022_n-300x199.jpg',
    name: 'Samir Kheled',
    location: 'Amman',
    duration: '15 Minutes',
    languages: ['AR', 'EN', 'FR'],
    price: 20,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
];
export default function Coaches({navigation}) {
  return (
    <Box flex={1} bg="gray.50">
      {/* header */}
      <PageHeader
        label="COACHES"
        iconColor="#000"
        textColor="#000"
        onBackPress={() => navigation.goBack()}
      />

      {/* search bar */}
      <SearchBar />

      {/* select coache */}
      <Flex
        direction="row"
        align="center"
        bg="#5F67EC"
        justify="center"
        mx="10px"
        my="5px"
        py="5px"
        borderRadius={15}>
        <MaterialIconsIcon name="error-outline" color="#fff" size={30} />
        <Text ml="10px" fontSize="xl" color="#fff">
          Select Coach
        </Text>
      </Flex>

      {/* coaches */}
      <UsersList data={coaches_list} />
    </Box>
  );
}
