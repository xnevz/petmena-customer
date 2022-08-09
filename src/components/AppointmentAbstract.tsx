import { View, Text, Box, Flex } from 'native-base';
import React, { Suspense } from 'react';

export default function AppointmentAbstract({ name, description }: { name: string, description: string; }) {
    return (
        <Suspense fallback={<Text>Loading ...</Text>}>
            <Flex direction='row' align='center' backgroundColor='white' shadow='9' mx={5} mb={4} p={3} rounded='md'>
                <Box h={50} w={50} rounded='sm' bg='gray.100' />
                <View ml={5} flex={1}>
                    <Text color='black'>{name}</Text>
                    <Text fontWeight='light' color='black'>{description}</Text>
                </View>
            </Flex>
        </Suspense>
    );
}