import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Loader } from '../components/GeneralComponents';
import { img_url, api_url, font_title, font_description, home_details } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { Container, Row, Card, Image as Thumbnail, Box } from 'native-base';
import { Rating } from 'react-native-ratings';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export default function Home(props) {

    const [state, msetState] = useState({
        banners: [],
        category: [],
        symptoms_first: [],
        symptoms_second: [],
        doctors: [],
        home_result: [],
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }


    useEffect(() => {
        Home_details();

        const _unsubscribe = props.navigation.addListener('focus', async () => {
            await Home_details();
        });

        return _unsubscribe;

    }, []);

    async function Home_details() {
        setState({ isLoding: true });
        await axios({
            method: "post",
            url: api_url + home_details,
        })
            .then(async (response) => {
                setState({ isLoding: false });
                setState({
                    home_result: response.data.result,
                    banners: response.data.result.banners,
                    category: response.data.result.categories,
                    symptoms_first: response.data.result.symptoms_first,
                    symptoms_second: response.data.result.symptoms_second,
                    doctors: response.data.result.doctors
                })
            })
            .catch((error) => {
                setState({ isLoding: false });
                alert('Something went wrong');
            });
    };

    const category_doctor_list = (id, category_name) => {
        props.navigation.navigate('DoctorSubCategories', { id: id, type: 1, category_name: category_name });
    };

    const symptoms_doctor_list = (id) => {
        props.navigation.navigate('DoctorList', { id: id, type: 2 });
    };

    function top_doctor_list() {
        props.navigation.navigate('DoctorList', { id: 0, type: 3 });
    }

    const doctor_details = (data) => {
        props.navigation.navigate('DoctorDetail', { data: data });
    };

    const direct_appointment = (data) => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
            .then((data) => {
                props.navigation.navigate('DoctorMap', { categories: state.category });
            })
            .catch((err) => {

            });
    };


    return (
        <Container style={{ minWidth: '100%' }}>
            <View style={styles.home_style1}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {state.banners?.map((row, index) => (
                        <ImageBackground key={index} source={{ uri: img_url + row.url }} imageStyle={styles.home_style2} style={styles.home_style3}>
                        </ImageBackground>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.home_style4} />
            <Text style={styles.home_style5}>Categories</Text>
            <View style={styles.home_style6} />
            <View style={styles.home_style7}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {state.category?.map((row, index) => (
                        <TouchableOpacity key={index} onPress={() => category_doctor_list(row.id, row.category_name)} activeOpacity={1} style={styles.home_style8}>
                            <Image alt="-" style={styles.home_style9} source={{ uri: img_url + row.category_image }} />
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
                    {state.symptoms_first?.map((row, index) => (
                        <View key={index}>
                            <Card style={styles.home_style19}>
                                <TouchableOpacity activeOpacity={1} onPress={() => symptoms_doctor_list(row.id)} >
                                    <View style={styles.home_style20}>
                                        <Image alt="-" style={styles.home_style21} source={{ uri: img_url + row.service_image }} />
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
                    {state.symptoms_second?.map((row, index) => (
                        <View key={index}>
                            <Card style={styles.home_style25}>
                                <TouchableOpacity activeOpacity={1} onPress={() => symptoms_doctor_list(row.id)} >
                                    <View style={styles.home_style26}>
                                        <Image alt="-" style={styles.home_style27} source={{ uri: img_url + row.service_image }} />
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
                    <Text onPress={() => top_doctor_list()} style={styles.home_style33}>
                        View All
                    </Text>
                </View>
            </Row>

            <View style={styles.home_style34} />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                <View style={styles.home_style35}>
                    {state.doctors?.map((row, index) => (
                        <Card key={index} style={styles.home_style36}>
                            <TouchableOpacity activeOpacity={1} onPress={() => doctor_details(row)} style={styles.home_style37}>
                                <Thumbnail source={{ uri: img_url + row.profile_image }} />
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


            <Loader visible={state.isLoding} />
        </Container>
    );
}

const styles = StyleSheet.create({
    home_style1: { paddingTop: 10, flexDirection: 'row' },
    home_style2: { borderRadius: 10 },
    home_style3: {
        height: 140, width: 260,
        borderRadius: 10, marginRight: 10
    },
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

