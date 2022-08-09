import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Box, Flex, Text, Avatar, Center } from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FiveStars from './FiveStars';
import { Doctor } from '../serverResponses/doctors';
import { useAppNavigation } from '../../App';
import { img_url } from '../config/Constants';

export default function DoctorDard({ item, type }: { item: Doctor, type: string; }) {
    const navigation = useAppNavigation();
    return (
        <Box w="1/2" px="5px" py="5px">
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    navigation.navigate('doctorDetail', { doctor: item });
                }}>
                <Box
                    shadow={1}
                    bg="white"
                    borderColor="gray.100"
                    borderWidth={1}
                    borderRadius={10}>
                    {/* doctor pic */}
                    <Avatar
                        source={{ uri: img_url + item.profile_image }}
                        _image={{ borderRadius: 10 }}
                        bg="gray.200"
                        h="150px"
                        borderRadius={10}
                        w="full">
                        {item.doctor_name}
                    </Avatar>

                    {/* innfos */}
                    <Box p="10px">
                        {/* username */}
                        <Flex direction="row" align="center" justify="space-between">
                            <Text color="gray.700" fontSize="sm" numberOfLines={1} flex={1}>
                                DR. {item.doctor_name}
                            </Text>

                            {/* stars */}
                            <FiveStars yellowCount={item.overall_rating} />
                        </Flex>

                        {/* infos */}
                        {/* location */}
                        <Flex direction="row" align="center" mt="5px">
                            <FeatherIcon name="phone" size={20} color="gray" />
                            <Text ml={1} fontSize="xs" color="gray.600">
                                {item.phone_number}
                            </Text>
                        </Flex>
                        {/* duration */}
                        <Flex direction="row" align="center" mt="5px">
                            <FeatherIcon name="clock" size={20} color="gray" />
                            <Text ml={1} fontSize="xs" color="gray.600">
                                {item.experience} Year{item.experience == 1 ? '' : 's'}
                            </Text>
                        </Flex>
                        {/* languages */}
                        <Flex direction="row" align="center" mt="5px">
                            <MaterialCommunityIcon name="file-certificate" size={20} color="gray" />
                            <Text ml={1} fontSize="xs" color="gray.600">
                                {item.qualification}
                            </Text>
                        </Flex>
                    </Box>

                    {/* price */}
                    {/* <Center my="5px">
                        <Text fontWeight="medium" color="gray.600" fontSize="lg">
                            {item.wallet}$
                        </Text>
                    </Center> */}
                </Box>
            </TouchableOpacity>
        </Box>
    );
}
