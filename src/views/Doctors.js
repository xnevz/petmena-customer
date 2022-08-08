import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, Flex, FlatList, Text, Avatar} from 'native-base';
import PageHeader from '../components/PageHeader';
import FeatherIcon from 'react-native-vector-icons/Feather';
import UsersList from '../components/UsersList';
import SearchBar from '../components/SearchBar';

// dummy data
const doctors_list = [
  {
    picture:
      'https://www.thebalancecareers.com/thmb/4lDx9mk4AX7oVNDleqNc1hmN7xs=/300x300/filters:no_upscale():max_bytes(150000):strip_icc()/doctor-with-stethoscope-in-hospital-642394515-5aa9a0b8a9d4f90037431454.jpg',
    name: 'Asma Fares',
    location: 'Amman',
    duration: '20 Minutes',
    languages: ['AR', 'EN'],
    price: 20,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    name: 'Jamle Ahmeed',
    location: 'Amman',
    duration: '60 Minutes',
    languages: ['AR'],
    price: 30,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg',
    name: 'Samir Kheled',
    location: 'Amman',
    duration: '15 Minutes',
    languages: ['AR', 'EN', 'FR'],
    price: 15,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000',
    name: 'Asma Fares',
    location: 'Amman',
    duration: '20 Minutes',
    languages: ['AR', 'EN'],
    price: 80,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Jamle Ahmeed',
    location: 'Amman',
    duration: '60 Minutes',
    languages: ['AR'],
    price: 120,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://media.istockphoto.com/photos/portrait-of-mature-male-doctor-wearing-white-coat-standing-in-picture-id1203995945?k=20&m=1203995945&s=612x612&w=0&h=g0_ioNezBqP0NXrR_36-A5NDHIR0nLabFFrAQVk4PhA=',
    name: 'Samir Kheled',
    location: 'Amman',
    duration: '15 Minutes',
    languages: ['AR', 'EN', 'FR'],
    price: 20,
    rating: Math.floor(Math.random() * (4 + 1)),
  },
];
export default function Doctors({navigation}) {
  return (
    <Box flex={1} bg="gray.50">
      {/* header */}
      <PageHeader
        label="DOCTORS"
        iconColor="#000"
        textColor="#000"
        onBackPress={() => navigation.goBack()}
      />

      {/* search bar */}
      <SearchBar />

      {/* emergency line */}
      <EmergencyLine />

      {/* doctors */}
      <UsersList data={doctors_list} type="doctor_profile" />
    </Box>
  );
}

function EmergencyLine() {
  return (
    <Box mt={3}>
      {/* title */}
      <Flex direction="row" align="center" px={5}>
        <Box height={0.5} bg="teal.500" w="5" mr={3} />
        <Flex direction="row" align="center">
          <FeatherIcon name="phone-call" color="#FF0000" size={20} />

          <Text color="#FF0000" fontSize="md" ml={3}>
            EMERGENCY <Text color="#F6C719">LINE </Text>
          </Text>
        </Flex>
        <Box height={0.5} bg="teal.500" flex={1} ml={3} />
      </Flex>

      {/* users_list */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={doctors_list}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <User item={item} />}
      />
    </Box>
  );
}
function User({item}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        // TODO
      }}>
      <Flex align="center" w="80px" mt={3}>
        {/* avatar */}
        <Avatar
          bg="lightBlue.400"
          source={{
            uri: item.picture,
          }}
          size="lg">
          NB
          <Avatar.Badge bg="green.500" />
        </Avatar>
        {/* username */}
        <Text fontSize="xs" color="gray.600" numberOfLines={1}>
          {item.name}
        </Text>
      </Flex>
    </TouchableOpacity>
  );
}
