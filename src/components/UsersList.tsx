import React from 'react';
import {Box, FlatList} from 'native-base';
import DoctorDard from './UserCard';
import { Doctor } from '../serverResponses/doctors';

export default function UsersList({data, type}: {data: Doctor[], type: string}) {
  return (
    <Box flex={1} mt="10px">
      <FlatList
        px="5px"
        data={data}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <DoctorDard item={item} type={type} />}
        numColumns={2}
        contentContainerStyle={{justifyContent: 'space-between'}}
      />
    </Box>
  );
}
