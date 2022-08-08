import {Box, Flex, Input} from 'native-base';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function SearchBar() {
  return (
    <Flex
      direction="row"
      align="center"
      alignItems="center"
      justify="center"
      px={5}>
      <Input
        borderRadius={10}
        marginTop={0}
        onChangeText={val => {}}
        flex={1}
        borderColor="gray.200"
        borderWidth={1}
        variant="unstyled"
        placeholder="Search"
        size="xl"
        color="gray.600"
        selectionColor="gray.200"
        leftElement={
          <Box ml={3}>
            <IoniconsIcon name="search-outline" color="lightgray" size={25} />
          </Box>
        }
      />

      <Box
        ml={1}
        borderRadius={10}
        borderColor="gray.200"
        borderWidth={1}
        h={50}
        w={50}
        alignItems="center"
        justifyContent="center">
        <IoniconsIcon name="options-outline" color="#5F67EC" size={30} />
      </Box>
    </Flex>
  );
}
