import React from 'react';
import {Box, Button, FlatList, Flex, Text} from 'native-base';
import PageHeader from '../components/PageHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Appointment from '../components/Appointment';
import {TouchableOpacity} from 'react-native';

export default function MyAppointmentsList({navigation}) {
  return (
    <Box flex={1} bg="gray.50">
      {/* header */}
      <PageHeader
        label="APPOINTMENTS LIST"
        iconColor="#000"
        textColor="#000"
        onBackPress={() => navigation.goBack()}
      />

      <Box px="10px" flex={1}>
        {/* title */}
        <Text
          color="black"
          fontWeight="light"
          fontSize="lg"
          textAlign="center"
          my="20px">
          YOUR APPOINTMENTS LIST
        </Text>

        {/* details */}
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => (
            <Appointment item={item}>
              <TouchableOpacity>
                <MaterialIcons name="more-vert" color="#C5C5C5" size={25} />
              </TouchableOpacity>
            </Appointment>
          )}
        />
      </Box>
    </Box>
  );
}
