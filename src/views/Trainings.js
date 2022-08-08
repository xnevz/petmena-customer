import React from 'react';
import {Box, Center, FlatList, Flex, Image, Text} from 'native-base';
import PageHeader from '../components/PageHeader';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

// dummy data
const trainings_list = [
  {
    picture:
      'https://www.rspca.org.uk/documents/1494939/7712581/1178888-german-shepherd-training-banner_990x350.jpg/eb84a429-184a-a61b-304c-f2fed1ae6846?t=1653657451352',
    title: 'Train Dogs',
    description:
      'Train Dogs Lorem Ipsum valig Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
  },
  {
    picture:
      'https://blog.homesalive.ca/hubfs/Blog/2020/10%20Dog%20Training%20Tips%20for%20First%20Time%20Pet%20Owners/dog-training-tips-first-time-article-feature.jpg',
    title: 'Train Dogs',
    description:
      'Train Dogs Lorem Ipsum valig Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
  },
  {
    picture:
      'https://blog.homesalive.ca/hs-fs/hubfs/Blog/2019/Force%20Free%20Dog%20Training%20-%20Tips%20From%20an%20Expert/force-free-dog-training-article-feature.jpg?width=1000&name=force-free-dog-training-article-feature.jpg',
    title: 'Train Dogs',
    description:
      'Train Dogs Lorem Ipsum valig Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
  },
  {
    picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUN-OHHpncKkoi17-TDae6GXUycMLS5MiXyhckz1BnAjdP7GY3PRiAGogw8QK8TfhP4Xg&usqp=CAU',
    title: 'Train Dogs',
    description:
      'Train Dogs Lorem Ipsum valig Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. ',
  },
];
export default function Trainings({navigation}) {
  return (
    <Box flex={1} bg="gray.50">
      {/* header */}
      <PageHeader
        label="TRAININGS"
        iconColor="#000"
        textColor="#000"
        onBackPress={() => navigation.goBack()}
      />

      {/* trainings */}
      <TrainingsList />
    </Box>
  );
}

function TrainingsList() {
  return (
    <Box flex={1} px="10px">
      <FlatList
        data={trainings_list}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <Train item={item} />}
      />
    </Box>
  );
}

function Train({item}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        // TODO
      }}>
      <Flex
        h="230px"
        w="full"
        position="relative"
        justify="flex-end"
        mb="10px"
        borderRadius="10px">
        <Image
          source={{uri: item.picture}}
          alt="train image"
          h="full"
          w="full"
          position="absolute"
          borderRadius="10px"
        />

        {/* title & desc */}
        <Flex
          m="10px"
          borderRadius={10}
          px="15px"
          py="10px"
          bg="#F0F0F8"
          direction="row"
          align="center"
          justify="space-between">
          {/* title & desc */}
          <Box flex={1}>
            <Text color="gray.600" fontSize="lg" fontWeight="semibold">
              {item.title}
            </Text>
            <Text color="teal.700" fontSize="xs" numberOfLines={2}>
              {item.description}
            </Text>
          </Box>
          {/* icon */}

          <Box
            w="30px"
            h="30px"
            bg="#5F67EC"
            borderRadius={10}
            justifyContent="center"
            alignContent="center">
            <Center>
              <MaterialIconsIcon
                name="arrow-forward-ios"
                color="#fff"
                size={15}
              />
            </Center>
          </Box>
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
}
