import axios from 'axios';
import { Box, Button, Flex, Image, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, useWindowDimensions } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { useAppNavigation } from '../../App';
import * as colors from '../assets/css/Colors';
import Background from '../components/Background';
import { font_description, font_title, home_details, img_url } from '../config/Constants';
import { Banner, Category, Doctor, HomeDetailsResponse, Symptom } from '../serverResponses';
import ButtonImage from '../assets/css/tabBarButton.svg';
import AppointmentAbstract from '../components/AppointmentAbstract';
import dogFood from '../assets/img/dogFood.png';
import dogContract from '../assets/img/dogContract.png';

export default function Home() {
    const navigation = useAppNavigation();
    const [banners, setBanners] = useState<Banner[]>([]);
    const [category, setCategory] = useState<Category[]>([]);
    const [symptomsFirst, setSymptomsFirst] = useState<Symptom[]>([]);
    const [symptomsSecond, setSymptomsSecond] = useState<Symptom[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const wDims = useWindowDimensions();
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        fetchHomeDetails();
    }, []);

    async function fetchHomeDetails() {
        // set busy
        try {
            const result = await axios.post<HomeDetailsResponse>(home_details);
            setBanners(result.data.result.banners);
            setCategory(result.data.result.categories);
            setDoctors(result.data.result.doctors);
            setSymptomsFirst(result.data.result.symptoms_first);
            setSymptomsSecond(result.data.result.symptoms_second);
        } catch (error) {

        }

    };

    function goToDoctorsByCategory(id: number, category_name: string) {
        navigation.navigate('doctorSubCategories', { id, type: 1, category_name });
    }

    function goToDoctorList(id: number, type: number) {
        navigation.navigate('doctorList', { id, type });
    }

    function goToDoctorDetails(doctor: Doctor) {
        navigation.navigate('doctorDetail', { doctor });
    }

    async function direct_appointment() {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        });
        navigation.navigate('doctorMap', { categories: category });
    }

    function onCarouselScroll(data: NativeSyntheticEvent<NativeScrollEvent>) {
        const offset = data.nativeEvent.contentOffset.x;
        const val = offset / wDims.width;
        const round = Math.round(val);

        if (Math.abs(round - val) > 0.001)
            return;

        setCarouselIndex(round);
    }


    return (
        <Background>

            {/* carousel */}
            <View style={{ flexDirection: 'row' }}>
                <ScrollView mx={5} scrollEventThrottle={200}
                    onScroll={onCarouselScroll}
                    decelerationRate={0.001}
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {banners?.map((row, index) => (
                        <ImageBackground key={index} source={{ uri: img_url + row.url }} imageStyle={styles.home_style2} style={{
                            width: (wDims.width - 50),
                            aspectRatio: 2,
                            borderRadius: 10, margin: 5
                        }} />
                    ))}
                </ScrollView>
            </View>

            {/* carousel dots */}
            <Box alignSelf='center' display='flex' flexDirection='row' m={2} backgroundColor='white' rounded='sm' p={1}>
                {banners?.map((banner, index) => {
                    return (<Box key={index} style={{ backgroundColor: (index == carouselIndex ? '#0007' : '#0002') }} rounded='2xl' width={2} height={2} m={1} />);
                })}
            </Box>

            <Text textTransform='uppercase' mt={2} fontSize='2xl' alignSelf='center'>Choose your need</Text>
            
            {/* big buttons */}
            <Flex direction='row' mx={10} mb={-60} mt={-3} zIndex={1}>
                <Button shadow='9' px={30} rounded='2xl' m={0} py={7} p={0} flex={1}>
                    <Flex align='center'>
                        <Image source={dogFood} mb={5} />
                        <Text fontSize='lg' color={colors.primary} textTransform='uppercase' fontWeight='bold'>Doctors</Text>
                    </Flex>
                </Button>
                <Button shadow='9' px={30} rounded='2xl' m={0} py={0} flex={1} bg='gold' ml={10}>
                    <Flex align='center'>
                        <Image source={dogContract} mb={5} />
                        <Text fontSize='lg' textTransform='uppercase' color={colors.primary} fontWeight='bold'>Training</Text>
                    </Flex>
                </Button>
            </Flex>

            {/* appointment list */}
            <View style={{
                backgroundColor: '#fff',
                borderTopRightRadius: 50,
                flex: 1,
                paddingBottom: 90
            }}>
                {/* actual list */}
                <Flex direction='row' mx={5} mb={2} mt={50}>
                    <Text color={colors.primary} fontWeight='light' flex={1} textTransform='uppercase'>Appointment List</Text>
                    <Text color={colors.primary} fontWeight='light' alignSelf='flex-end' textTransform='uppercase'>See all</Text>
                </Flex>
                <View>
                    <AppointmentAbstract name='Appointment' description='With doctor maotaz' />
                    <AppointmentAbstract name='Appointment' description='With doctor maotazWith doctor maotazWith doctor maotaz' />
                    <AppointmentAbstract name='Appointment' description='With doctor maotaz' />
                    <AppointmentAbstract name='Appointment' description='With doctor maotaz' />
                    <AppointmentAbstract name='Appointment' description='With doctor maotaz' />
                    <AppointmentAbstract name='Appointment' description='With doctor maotaz' />
                    <AppointmentAbstract name='Appointment' description='With doctor maotaz' />
                </View>
            </View>

        </Background>
    );
}

const styles = StyleSheet.create({
    home_style2: { borderRadius: 10 },
    home_style4: { marginTop: 30 },
    home_style5: { fontFamily: font_title, fontSize: 18, color: colors.theme_fg_two, marginLeft: 15 },
    home_style6: { margin: 5 },
    home_style7: { flexDirection: 'row' },
    home_style8: {
        borderColor: colors.theme_fg_three,
        borderWidth: 1,
        height: 105,
        width: 105,
        marginRight: 10,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: colors.theme_bg,
        justifyContent: 'center'
    },
    home_style9: { alignSelf: 'center', height: 50, width: 50 },
    home_style10: { alignSelf: 'center', fontSize: 14, color: colors.theme_fg_three, marginTop: 10, fontFamily: font_description },
    home_style11: { margin: 15 },
    home_style12: { backgroundColor: colors.theme_bg, width: '100%', borderRadius: 20, padding: 10, alignSelf: 'center', fontFamily: font_title },
    home_style13: { fontSize: 16, color: '#FFFFFF', alignSelf: 'center', fontFamily: font_title },
    home_style14: { margin: 15 },
    home_style15: { height: "100%", width: "60%", alignSelf: 'center' },
    home_style16: { fontFamily: font_title, fontSize: 18, color: colors.theme_fg_two, marginLeft: 15 },
    home_style17: { margin: 3 },
    home_style18: { flexDirection: 'row' },
    home_style19: { borderRadius: 20, marginLeft: 5 },
    home_style20: {
        borderColor: colors.theme_fg_three,
        borderWidth: 1,
        height: 80,
        width: 80,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: colors.theme_bg_three,
        padding: 12
    },
    home_style21: { alignSelf: 'center', height: 50, width: 50 },
    home_style22: { alignSelf: 'center', fontSize: 14, color: colors.theme_fg_two, padding: 5, fontFamily: font_description },
    home_style23: { margin: 5 },
    home_style24: { flexDirection: 'row' },
    home_style25: { borderRadius: 20, marginLeft: 5 },
    home_style26: {
        borderColor: colors.theme_fg_three,
        borderWidth: 1,
        height: 80,
        width: 80,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: colors.theme_bg_three,
        padding: 12
    },
    home_style27: { alignSelf: 'center', height: 50, width: 50 },
    home_style28: { alignSelf: 'center', fontSize: 14, color: colors.theme_fg_two, padding: 5, fontFamily: font_description },
    home_style29: { margin: 13 },
    home_style30: { height: "100%", width: "80%", alignSelf: 'center', marginTop: 10 },
    home_style31: { fontFamily: font_title, fontSize: 18, color: colors.theme_fg_two, marginLeft: 15 },
    home_style32: { height: "100%", width: "20%", alignSelf: 'center', marginTop: 15 },
    home_style33: { alignSelf: 'center', fontSize: 12, color: colors.theme_fg_two, marginLeft: 20, fontFamily: font_description },
    home_style34: { margin: 3 },
    home_style35: { flexDirection: 'row' },
    home_style36: { width: 200, borderRadius: 10 },
    home_style37: { alignItems: 'center', justifyContent: 'center', padding: 10, fontFamily: font_description },
    home_style38: { margin: 5 },
    home_style39: { fontSize: 16, color: colors.theme_fg_two, fontFamily: font_description },
    home_style40: { margin: 2 },
    home_style41: { fontSize: 14, color: colors.grey, fontFamily: font_description },
    home_style42: { margin: 2 },
    home_style43: { borderBottomWidth: 1, borderColor: colors.grey, width: '100%', margin: 10 },
    home_style44: { fontSize: 14, color: colors.theme_fg_two, fontFamily: font_title },
    home_style45: { margin: 10 },

});

