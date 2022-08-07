import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Container, Card, List, Box, Icon, Image } from 'native-base';
import { img_url, api_url, doctor_sub_category, font_title, doctor_list } from '../config/Constants';
import * as colors from "../assets/css/Colors";
import axios from 'axios';
import { Loader } from '../components/GeneralComponents';
import LottieView from 'lottie-react-native';

export default function DoctorSubCategories(props) {

    const [state, msetState] = useState({
        id: props.route.params.id,
        category_name: props.route.params.category_name,
        result: [],
        api_status: 0,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    async function get_sub_categories() {
        setState({ isLoding: true });
        await axios({
            method: "post",
            url: api_url + doctor_sub_category,
            data: { category_id: state.id }
        })
            .then(async (response) => {
                setState({ isLoding: false, api_status: 1 });
                setState({ result: response.data.result })
            })
            .catch((error) => {
                setState({ isLoding: false });
                alert('Something went wrong');
            });
    }

    useEffect(() => {
        get_sub_categories();
    }, []);

    function Doctor_list(data) {
        props.navigation.navigate('doctorList', { id: state.id, sub_id: data.id, type: 1 });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    };


    return (
        <Container>
            <View>
                <View style={styles.sub_style1}>
                    <TouchableOpacity style={styles.sub_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.sub_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.sub_style4} />
                    <Text style={styles.sub_style5}>{state.category_name}</Text>
                </View>
            </View>
            <View>
                <List>

                </List>
                <List>
                    <FlatList
                        data={state.result}
                        renderItem={({ item, index }) => (
                            <Box avatar activeOpacity={1} onPress={Doctor_list.bind(this, item)}>
                                <Box>
                                    <Image square style={styles.sub_style6} source={{ uri: img_url + item.sub_category_image }} />
                                </Box>
                                <Card>
                                    <Text style={styles.sub_style7}>{item.sub_category_name}</Text>
                                    <View style={styles.sub_style8} />
                                    <Text style={styles.sub_style9}>{item.description}</Text>
                                    <View style={styles.sub_style10} />
                                </Card>
                                <Box style={styles.sub_style11}>
                                    <Icon onPress={handleBackButtonClick} style={styles.sub_style12} name='arrow-forward' />
                                </Box>
                            </Box>
                        )}
                        keyExtractor={item => item.id}
                    />
                </List>
                {state.result.length == 0 && state.api_status == 1 &&
                    <View>
                        <View style={styles.sub_style13}>
                            <LottieView source={doctor_list} autoPlay loop />
                        </View>
                        <Text style={styles.sub_style14}>Sorry, no doctor list found</Text>
                    </View>
                }
            </View>
            <Loader visible={state.isLoding} />
        </Container>
    );
}


const styles = StyleSheet.create({
    sub_style1: { alignItems: 'flex-start', margin: 10 },
    sub_style2: { width: 100, justifyContent: 'center' },
    sub_style3: { color: colors.theme_fg_two, fontSize: 30 },
    sub_style4: { margin: 5 },
    sub_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    sub_style6: { borderRadius: 10 },
    sub_style7: { fontSize: 14, fontFamily: font_title, color: colors.theme_fg_two },
    sub_style8: { margin: 1 },
    sub_style9: { fontSize: 12, color: colors.grey, fontFamily: font_title },
    sub_style10: { margin: 1 },
    sub_style11: { alignItems: 'center', justifyContent: 'center' },
    sub_style12: { color: colors.theme_fg_two, fontSize: 20 },
    sub_style13: { height: 250, marginTop: '40%' },
    sub_style14: { alignSelf: 'center', fontFamily: font_title },
});
