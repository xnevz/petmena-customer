import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckIcon,
  Flex,
  Input,
  Select,
  Text,
  ScrollView,
} from 'native-base';
import PageHeader from '../components/PageHeader';
import {useCheck} from '../customHooks/uiHooks';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function Payment() {
  const [cardType, setCardType] = useState('VISA');
  const [paymentSent, setPaymentSent] = useState(false);
  const accept_terms = useCheck();

  // payment sent component
  if (paymentSent) return <PaymentSent setPaymentSent={setPaymentSent} />;

  return (
    <Box flex={1} bg="gray.50">
      {/* header */}
      <PageHeader
        label="PAYMENT"
        iconColor="#000"
        textColor="#000"
        onBackPress={() => navigation.goBack()}
      />
      {/* details */}
      <Box px="20px" flex={1}>
        {/* infos */}
        <Box mt="20px">
          <Text color="black" fontSize="md">
            Credit card information
          </Text>
          <Text color="#777777" fontSize="sm">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr
          </Text>
        </Box>

        {/* card details */}
        <Box mt="30px" flex={1}>
          <ScrollView flex={1}>
            <Flex direction="row" align="center" justify="space-between">
              {/* visa type */}
              <Box flex={1}>
                <Text color="gray.500" ml="10px" mb="5px">
                  Credit Card Type
                </Text>
                <Select
                  selectedValue={cardType}
                  marginTop={0}
                  borderColor="gray.200"
                  borderWidth={1.5}
                  accessibilityLabel="Sex"
                  placeholder="VISA"
                  _selectedItem={{
                    bg: 'gray.200',
                    borderRadius: 20,
                    endIcon: <CheckIcon size="5" />,
                  }}
                  size="xl"
                  color="gray.600"
                  borderRadius={10}
                  onValueChange={v => setCardType(v)}>
                  <Select.Item label="VISA" value="VISA" />
                  <Select.Item label="MASTERCARD" value="MASTERCARD" />
                </Select>
              </Box>
              {/* Expire date */}
              <CustomInput
                placeholder="05/22"
                label="Expire Date"
                w="1/4"
                ml="5px"
              />
              {/* CCV */}
              <CustomInput placeholder="CCV" w="1/4" ml="5px" />
            </Flex>
            {/* card number */}
            <Box mt="10px">
              <CustomInput
                placeholder="2632-3856-4961-4956"
                w="full"
                label="Card Number"
              />
            </Box>
            {/* name */}
            <Box mt="10px">
              <CustomInput
                placeholder="Khaled Japri"
                w="full"
                label="Name On Card"
              />
            </Box>

            {/* terms */}
            <Checkbox
              value="accept_terms"
              {...accept_terms}
              colorScheme="blue"
              _icon={{borderRadius: 5}}
              borderRadius={5}
              size="sm"
              color="gray.300">
              I agree on terms & conditions
            </Checkbox>

            {/* total ammount */}
            <Text color="gray.600" mt="20px" fontSize="md">
              Total Amount : <Text color="teal.600">$50.00</Text>
            </Text>

            {/* btn */}
            <Button
              mt="20px"
              bg="amber.500"
              borderRadius={10}
              shadow={1}
              _text={{fontSize: 18, fontWeight: 'medium'}}
              onPress={() => setPaymentSent(true)}>
              Confirm
            </Button>
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
}

function PaymentSent({setPaymentSent}) {
  const navigation = useNavigation();
  return (
    <Box flex={1} bg="gray.50">
      {/* header */}
      <PageHeader
        label="PAYMENT"
        iconColor="#000"
        textColor="#000"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView flex={1} mt="10px" px="10px">
        <Center>
          {/* check icon */}
          <Ionicons name="md-checkmark-circle" size={150} color="#5F67EC" />

          <Text fontSize="lg" color="black" mt="20px">
            Payment Sent Successfully
          </Text>
        </Center>

        {/* payment infos */}
        <Box
          mt="50px"
          rounded="xl"
          borderColor="gray.200"
          shadow={1}
          p="10px"
          px="20px"
          w="full"
          bg="white">
          {/* titles */}
          <Flex direction="row" align="center">
            <Text fontSize="sm" flex={2} color="gray.500">
              Item
            </Text>
            <Text fontSize="sm" flex={2} color="gray.500">
              Duration
            </Text>
            <Text fontSize="sm" flex={2} color="gray.500">
              Time
            </Text>
            <Text fontSize="sm" flex={1} color="gray.500">
              Price
            </Text>
          </Flex>
          {/* divider */}
          <Box w="full" h="2px" bg="teal.600" my="5px" />

          {/* data */}
          <Flex direction="row" align="flex-start" minH="100px">
            <Text fontSize="sm" flex={2} color="gray.500">
              Item name test text here BeTMENA
            </Text>
            <Text fontSize="sm" flex={2} color="gray.500">
              60 min
            </Text>
            <Text fontSize="sm" flex={2} color="gray.500">
              15-5-2022 15:00
            </Text>
            <Text fontSize="sm" flex={1} color="gray.500">
              $50.00
            </Text>
          </Flex>

          {/* divider */}
          <Box w="full" h="2px" bg="teal.600" my="5px" />

          <Flex direction="row" align="center" justify="flex-end">
            <Text fontSize="lg" color="gray.500">
              Total $50.00
            </Text>
          </Flex>
        </Box>

        {/* done btn */}
        <Button
          mt="50px"
          bg="amber.500"
          borderRadius={10}
          shadow={1}
          _text={{fontSize: 18, fontWeight: 'medium'}}
          onPress={() => setPaymentSent(false)}>
          Done
        </Button>
      </ScrollView>
    </Box>
  );
}

function CustomInput({label, w, placeholder, value, onChangeText, ...props}) {
  return (
    <Box w={w}>
      <Text color="gray.500" ml="10px" mb="5px">
        {label ?? placeholder}
      </Text>
      <Input
        placeholder={placeholder}
        marginTop={0}
        borderColor="gray.200"
        borderWidth={1.5}
        borderRadius={10}
        color="gray.600"
        {...props}
      />
    </Box>
  );
}

const styles = StyleSheet.create({});
