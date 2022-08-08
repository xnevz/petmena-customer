import React from 'react';
import {Box, FlatList} from 'native-base';
import UserCard from './UserCard';

export default function UsersList({data, type}) {
  return (
    <Box flex={1} mt="10px">
      <FlatList
        px="5px"
        data={data}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <UserCard item={item} type={type} />}
        numColumns={2}
        contentContainerStyle={{justifyContent: 'space-between'}}
      />
    </Box>
  );
}
