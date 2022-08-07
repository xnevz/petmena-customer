import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, ImageBackground, useWindowDimensions } from 'react-native';
import { img_url, font_title, font_description, home_details } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { ScrollView, Row, Card, Image, View, Box } from 'native-base';
import { Rating } from 'react-native-ratings';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { useAppNavigation } from '../../App';
import { Banner, Category, Doctor, HomeDetailsResponse, Symptom } from '../serverResponses';
import Background from '../components/Background';

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

        //     const _unsubscribe = navigation.addListener('focus', async () => {
        //         await fetchHomeDetails();
        //     });

        //     return _unsubscribe;
    }, []);

    async function fetchHomeDetails() {
        // set busy
        try {
            const result = await axios.post<HomeDetailsResponse>(home_details);
            setBanners(result.data.result.banners);
            setCategory(result.data.result.category);
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
        console.log(Math.abs(round - val));
        
        if (Math.abs(round - val) > 0.3)
            return;

        setCarouselIndex(round);
    }


    return (
        <Background>

            <View style={{ paddingTop: 10, flexDirection: 'row' }}>
                <ScrollView scrollEventThrottle={200} onScroll={onCarouselScroll} decelerationRate='fast' pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {banners?.map((row, index) => (
                        <ImageBackground key={index} source={{ uri: img_url + row.url }} imageStyle={styles.home_style2} style={{
                            width: (wDims.width - 10),
                            aspectRatio: 2,
                            borderRadius: 10, margin: 5
                        }} />
                    ))}
                </ScrollView>
            </View>

            <Box alignSelf='center' display='flex' flexDirection='row' m={2} backgroundColor='white' rounded='sm' p={1}>
                {banners?.map((banner, index) => {
                    return (<Box backgroundColor={index == carouselIndex ? '#0007' : '#0002'} rounded='2xl' width={2} height={2} m={1} />);
                })}
            </Box>

            <View style={styles.home_style4} />
            <Text style={styles.home_style5}>Categories</Text>
            <View style={styles.home_style6} />
            <View style={styles.home_style7}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {category?.map((row, index) => (
                        <TouchableOpacity key={index} onPress={() => goToDoctorsByCategory(row.id, row.category_name)} activeOpacity={1} style={styles.home_style8}>
                            <Image alt='alt' style={styles.home_style9} source={{ uri: img_url + row.category_image }} />
                            <Text style={styles.home_style10}>{row.category_name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.home_style14} />
            <Row>
                <View style={styles.home_style15}>
                    <Text style={styles.home_style16}>Common Symptoms</Text>
                </View>
            </Row>
            <View style={styles.home_style17} />
            <View style={styles.home_style18}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {symptomsFirst?.map((row, index) => (
                        <View key={index}>
                            <Card style={styles.home_style19}>
                                <TouchableOpacity activeOpacity={1} onPress={() => goToDoctorList(row.id, 2)} >
                                    <View style={styles.home_style20}>
                                        <Image alt='alt' style={styles.home_style21} source={{ uri: img_url + row.service_image }} />
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Text style={styles.home_style22}>{row.service_name}</Text>
                        </View>

                    ))}
                </ScrollView>
            </View>
            <View style={styles.home_style23} />
            <View style={styles.home_style24}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {symptomsSecond?.map((row, index) => (
                        <View key={index}>
                            <Card style={styles.home_style25}>
                                <TouchableOpacity activeOpacity={1} onPress={() => goToDoctorList(row.id, 2)} >
                                    <View style={styles.home_style26}>
                                        <Image alt='alt' style={styles.home_style27} source={{ uri: img_url + row.service_image }} />
                                    </View>
                                </TouchableOpacity>
                            </Card>
                            <Text style={styles.home_style28}>{row.service_name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.home_style29} />
            <Row>
                <View style={styles.home_style30}>
                    <Text style={styles.home_style31}>Top Doctors</Text>
                </View>

                <View style={styles.home_style32}>
                    <Text onPress={() => goToDoctorList(0, 3)} style={styles.home_style33}>
                        View All
                    </Text>
                </View>
            </Row>

            <View style={styles.home_style34} />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                <View style={styles.home_style35}>
                    {doctors?.map((row, index) => (
                        <Card key={index} style={styles.home_style36}>
                            <TouchableOpacity activeOpacity={1} onPress={() => goToDoctorDetails(row)} style={styles.home_style37}>
                                <Image alt='alt' source={{ uri: img_url + row.profile_image }} />
                                <View style={styles.home_style38} />
                                <Text style={styles.home_style39}>{row.doctor_name}</Text>
                                <View style={styles.home_style40} />
                                <Text style={styles.home_style41}>Specialist : {row.specialist}</Text>
                                <View style={styles.home_style42} />
                                {row.overall_rating > 0 &&
                                    <Rating
                                        ratingCount={5}
                                        startingValue={row.overall_rating}
                                        imageSize={12}
                                        readonly={true}
                                    />
                                }
                                <View style={styles.home_style43} />
                                <Text style={styles.home_style44}>View Profile</Text>
                            </TouchableOpacity>
                        </Card>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.home_style45} />
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

