import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  FlatList,
  Flex,
  ScrollView,
  Text,
} from 'native-base';
import {StatusBar} from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import PageHeader from '../components/PageHeader';
import overlay from '../assets/img/backOverlay.png';
import FiveStars from '../components/FiveStars';

const reviews_data = [
  {
    picture:
      'https://www.thebalancecareers.com/thmb/4lDx9mk4AX7oVNDleqNc1hmN7xs=/300x300/filters:no_upscale():max_bytes(150000):strip_icc()/doctor-with-stethoscope-in-hospital-642394515-5aa9a0b8a9d4f90037431454.jpg',
    name: 'Asma Fares',
    review: 'Excellent doctor and great treatment',
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    name: 'Jamle Ahmeed',
    review: 'Excellent doctor and great treatment',
    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg',
    name: 'Samir Kheled',
    review: 'Excellent doctor and great treatment',

    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=2000',
    name: 'Asma Fares',
    review: 'Excellent doctor and great treatment',

    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    name: 'Jamle Ahmeed',
    review: 'Excellent doctor and great treatment',

    rating: Math.floor(Math.random() * (4 + 1)),
  },
  {
    picture:
      'https://media.istockphoto.com/photos/portrait-of-mature-male-doctor-wearing-white-coat-standing-in-picture-id1203995945?k=20&m=1203995945&s=612x612&w=0&h=g0_ioNezBqP0NXrR_36-A5NDHIR0nLabFFrAQVk4PhA=',
    name: 'Samir Kheled',
    review: 'Excellent doctor and great treatment',

    rating: Math.floor(Math.random() * (4 + 1)),
  },
];

export default function DoctorProfile({navigation, route}) {
  const doctor_data = route.params.data;

  return (
    <Box flex={1} bg={colors.theme_bg}>
      <StatusBar backgroundColor={colors.theme_bg} />

      {/* header */}
      <PageHeader
        label="DOCTOR PROFILE"
        iconColor="#fff"
        textColor="#fff"
        onBackPress={() => navigation.goBack()}
      />
      {/* bar */}
      <Box h="80px" />
      {/* overlay */}
      <Image
        source={overlay}
        style={{width: '100%', height: '100%', position: 'absolute'}}
      />
      {/* details */}
      <View style={styles.details}>
        {/* user avatar && user name  */}
        <Center style={styles.avatar}>
          <Avatar
            bg="gray.500"
            source={{
              uri: doctor_data.picture,
            }}
            size={180}>
            PP
          </Avatar>
          {/* doctor name */}
          <Text color="gray.800" mt="10px" fontSize="xl">
            Dr. {doctor_data.name}
          </Text>

          {/* location */}
          <Text color="teal.600" fontSize="xs">
            {doctor_data.location}
          </Text>

          {/* stars */}
          <FiveStars yellowCount={doctor_data.rating} size={15} />
        </Center>

        {/* more infos */}
        <ScrollView px="10px">
          {/* btns */}
          <Flex direction="row" align="center">
            <Button bg="#5F67EC" flex={1} mr="5px">
              Book Consultation
            </Button>
            <Button transparent flex={1} _text={{color: '#5F67EC'}}>
              Send Message
            </Button>
          </Flex>

          {/* about  */}
          <Box>
            <Text color="gray.800" fontSize="lg" fontWeight="medium">
              ABOUT :
            </Text>
            <Text color="gray.600" fontSize="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            </Text>
          </Box>

          {/* reviews */}
          <Box mt="10px" py="5px" w="full">
            {/* title */}
            <Flex direction="row" align="center" justify="space-between">
              <Text color="gray.800" fontSize="lg" fontWeight="medium">
                REVIEWS :
              </Text>
              {/* see all btn */}
              <TouchableOpacity
                onPress={() => {
                  // TODO
                }}>
                <Text
                  color="gray.500"
                  fontSize="sm"
                  fontWeight="medium"
                  mr="10px">
                  see all
                </Text>
              </TouchableOpacity>
            </Flex>

            {/* reviews */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={reviews_data}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item}) => <Review item={item} />}
            />
          </Box>

          {/* certaficats */}
          <Box mt="10px" py="5px" w="full">
            {/* title */}
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              mb="10px">
              <Text color="gray.800" fontSize="lg" fontWeight="medium">
                CERTIFICATES :
              </Text>
              {/* see all btn */}
              <TouchableOpacity
                onPress={() => {
                  // TODO
                }}>
                <Text
                  color="gray.500"
                  fontSize="sm"
                  fontWeight="medium"
                  mr="10px">
                  see all
                </Text>
              </TouchableOpacity>
            </Flex>

            {/* reviews */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3]}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item}) => (
                <Box h="130px" w="200px" mr="10px">
                  <Image
                    source={{
                      uri: 'https://static8.depositphotos.com/1062042/972/v/450/depositphotos_9725775-stock-illustration-gold-detailed-certificate.jpg',
                    }}
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
              )}
            />
          </Box>
        </ScrollView>
      </View>
    </Box>
  );
}

function Review({item}) {
  return (
    <Box
      bg="#fff"
      shadow={1}
      p="10px"
      borderRadius={10}
      w="300px"
      mr="10px"
      my="10px">
      <Flex direction="row" align="flex-start">
        {/* avatar */}
        <Avatar
          bg="gray.200"
          source={{
            uri: item.picture,
          }}
          size="lg"
          _image={{
            borderRadius: 10,
          }}
          borderRadius="10px"
          mr="10px">
          NB
        </Avatar>
        {/* review infos */}
        <Box flex={1}>
          {/* name & rating */}
          <Flex direction="row" align="center" justify="space-between">
            {/* name */}
            <Text color="gray.800" fontSize="sm">
              {item.name}
            </Text>
            {/* rating */}
            <FiveStars yellowCount={item.rating} />
          </Flex>
          {/* review */}
          <Text color="gray.600" fontSize="xs" numberOfLines={2}>
            {item.review}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

const styles = StyleSheet.create({
  details: {
    backgroundColor: '#fff',
    position: 'relative',
    borderTopRightRadius: 50,
    flex: 1,
  },
  avatar: {
    top: -80,
    marginBottom: -80,
  },
});
