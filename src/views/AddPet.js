import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
    Avatar,
    Input,
    Box,
    Center,
    HStack,
    ScrollView,
    Flex,
    Select,
    CheckIcon,
    TextArea,
    Button,
} from 'native-base';
import PageHeader from '../components/PageHeader';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const AddPet = ({ navigation }) => {
    const [sex, setSex] = useState(null);
    const [weight, setWeight] = useState(null);
    const [infos, setInfos] = useState({
        name: null,
        age: null,
        type: null,
        more_info: null,
    });
    return (
        <Box bg="white" flex={1}>
            {/* header */}
            <PageHeader
                label="ADD PET"
                iconColor="#000"
                textColor="#000"
                onBackPress={() => navigation.goBack()}
            />
            {/* add picture */}
            <Center mt={5}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        //TODO
                    }}>
                    <Avatar bg="white" shadow={1} size="2xl">
                        <IoniconsIcon name="person-add-outline" color="#F08148" size={30} />
                    </Avatar>
                </TouchableOpacity>
            </Center>

            {/* inputs */}
            <ScrollView flex={1} px={5}>
                {/* name */}
                <Input
                    value={infos.name}
                    placeholder="Name"
                    size="xl"
                    color="gray.600"
                    selectionColor="gray.200"
                />
                {/* Age */}
                <Input
                    value={infos.age}
                    onChangeText={age => setInfos(prev => ({ ...prev, age }))}
                    borderColor="gray.100"
                    borderWidth={1}
                    variant="unstyled"
                    placeholder="Age"
                    keyboardType="numeric"
                    size="xl"
                    color="gray.600"
                    selectionColor="gray.200"
                />
                {/* Type */}
                <Input
                    value={infos.type}
                    onChangeText={type => setInfos(prev => ({ ...prev, type }))}
                    borderColor="gray.100"
                    borderWidth={1}
                    variant="unstyled"
                    placeholder="Type"
                    size="xl"
                    color="gray.600"
                    selectionColor="gray.200"
                />
                {/* sex & weight */}
                <Flex direction="row" align="center">
                    <Box flex={1} mr={1}>
                        <Select
                            selectedValue={sex}
                            borderColor="gray.100"
                            borderWidth={1}
                            accessibilityLabel="Sex"
                            placeholder="Sex"
                            _selectedItem={{
                                bg: 'gray.200',
                                borderRadius: 20,
                                endIcon: <CheckIcon size="5" />,
                            }}
                            size="xl"
                            color="gray.600"
                            onValueChange={v => setSex(v)}>
                            <Select.Item label="Male" value="Male" />
                            <Select.Item label="Female" value="Female" />
                        </Select>
                    </Box>
                    <Box flex={1}>
                        <Select
                            borderColor="gray.100"
                            borderWidth={1}
                            selectedValue={weight}
                            accessibilityLabel="Weight"
                            placeholder="Weight"
                            _selectedItem={{
                                bg: 'gray.200',
                                borderRadius: 20,
                                endIcon: <CheckIcon size="5" />,
                            }}
                            size="xl"
                            color="gray.600"
                            onValueChange={v => setWeight(v)}>
                            {Array.from(Array(100).keys()).map(item => (
                                <Select.Item label={`${item} kg`} value={item} key={item} />
                            ))}
                        </Select>
                    </Box>
                </Flex>

                {/* more infos */}
                <TextArea
                    value={infos.more_info}
                    onChangeText={more_info => setInfos(prev => ({ ...prev, more_info }))}
                    borderColor="gray.100"
                    borderWidth={1}
                    h={150}
                    size="lg"
                    placeholder="More Info"
                    selectionColor="gray.200"
                />

                {/* submit btn */}
                <Button bg="#F6C719" borderRadius={10} shadow={1}>
                    <CheckIcon size="25" color="white" />
                </Button>
            </ScrollView>
        </Box>
    );
};

export default AddPet;

const styles = StyleSheet.create({});
