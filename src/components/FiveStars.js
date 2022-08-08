import React from 'react';
import {Flex} from 'native-base';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export default function FiveStars({yellowCount = -1, size = 10}) {
  return (
    <Flex direction="row" align="center">
      {Array.from(Array(5).keys()).map(star => (
        <IoniconsIcon
          key={star}
          name="star"
          size={size}
          color={star <= yellowCount ? '#F6C719' : 'lightgray'}
        />
      ))}
    </Flex>
  );
}
