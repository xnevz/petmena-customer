import React from 'react';
import {Box, Button, FlatList, Flex, Text} from 'native-base';
import PageHeader from '../components/PageHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Appointment from '../components/Appointment';

export default function AppointmentsList({navigation}) {
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
          <MaterialIcons name="error-outline" color="#F55F44" size={20} />
          <Text ml="10px" fontSize="sm" color="#F55F44">
            You need to add Pet before booking this training
          </Text>
        </Flex>

        {/* title */}
        <Text
          color="black"
          fontWeight="light"
          fontSize="lg"
          textAlign="center"
          mt="10px">
          AVAILABLE APPOINTMENTS LIST
        </Text>

        {/* details */}
        <FlatList
          mt="20px"
          data={[1, 2, 3, 4]}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => (
            <Appointment item={item}>
              <Button bg="#F6C719" _text={{color: 'black'}} m={0} py="5px">
                $50.00
              </Button>
            </Appointment>
          )}
        />
      </Box>
    </Box>
  );
}
