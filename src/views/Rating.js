import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Card, Left, Body, Right, Icon, Row, Footer } from 'native-base';
import * as colors from '../assets/css/Colors';
import { app_name, heart, rating_update, api_url, font_title } from '../config/Constants';
import { AirbnbRating } from 'react-native-ratings';
import { Loader } from '../components/GeneralComponents';
import { Button as Btn } from 'react-native-elements';
import axios from 'axios';
export default function Rating(props) {

    const [state, msetState] = useState({
        data: props.route.params.data,
        rating: 5,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    rating_completed = (value) => {
        setState({ rating: value });
    }

    async function update_rating() {
        setState({ isLoding: true });
        await axios({
            method: "post",
            url: api_url + rating_update,
            data: {
                customer_id: state.data.customer_id,
                vendor_id: state.data.vendor_id,
                order_id: state.data.order_id,
                ratings: state.rating
            },
        })
            .then(async (response) => {
                setState({ isLoding: false });
                if (response.data.status == 1) {
                    handleBackButtonClick();
                }
            })
            .catch((error) => {
                setState({ isLoding: false });
                alert('Sorry something went wrong');
            });
    }


    return (
        <Container>
            <View style={styles.rat_style1} >
                <View style={styles.rat_style2}>
                    <Card style={styles.rat_style3}>
                        <Row style={styles.rat_style4}>
                            <Box style={styles.rat_style5}>
                                <TouchableOpacity style={styles.rat_style6} onPress={handleBackButtonClick} activeOpacity={1} >
                                    <Icon onPress={handleBackButtonClick} style={styles.rat_style7} name='ios-arrow-back' />
                                </TouchableOpacity>
                            </Box>
                            <Card style={styles.rat_style8}>
                                <Text
                                    style={styles.rat_style9}
                                >
                                    Rating
                                </Text>
                            </Card>
                            <Box />
                        </Row>
                    </Card>
                </View>
            </View>
            <View style={styles.rat_style10} />
            <View padder>
                <View style={styles.rat_style11} />
                <View style={styles.rat_style12}>
                    <Image
                        style={styles.rat_style13}
                        source={heart}
                    />
                </View>
                <Row style={styles.rat_style14}>
                    <Card>
                        <Text style={styles.rat_style15}>How would you rate your</Text>
                        <Text style={styles.rat_style16}>experience at <Text style={styles.rat_style17}>{app_name}</Text></Text>
                    </Card>
                </Row>
                <View style={styles.rat_style18} />
                <AirbnbRating
                    count={5}
                    reviews={["Bad", "Meh", "OK", "Good", "Very Good"]}
                    defaultRating={5}
                    onFinishRating={rating_completed}
                    size={30}
                />
            </View>
            <Box style={styles.rat_style19} >
                <View style={styles.rat_style20}>
                    <Btn
                        title="Submit"
                        onPress={update_rating}
                        buttonStyle={styles.rat_style21}
                    />
                </View>
            </Box>
            <Loader visible={state.isLoding} />
        </Container>
    );
}

const styles = StyleSheet.create({
    rat_style1: {
        justifyContent: "flex-start",
        height: "10%",
        backgroundColor: colors.theme_bg,
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        shadowOffset: { width: 0, height: 15 },
        shadowColor: colors.theme_bg,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    rat_style2: { position: 'absolute', top: '55%', alignSelf: 'center', width: '80%' },
    rat_style3: { alignItems: "center", borderRadius: 15, justifyContent: "center" },
    rat_style4: { padding: 10, justifyContent: 'center' },
    rat_style5: { flex: 1 },
    rat_style6: { width: 100, justifyContent: 'center' },
    rat_style7: { color: colors.theme_bg },
    rat_style8: { flex: 3, justifyContent: 'center' },
    rat_style9: { fontSize: 18, fontFamily: font_title, color: colors.theme_bg, justifyContent: 'center' },
    rat_style10: { margin: 20 },
    rat_style11: { margin: 20 },
    rat_style12: { height: 100, width: 100, alignSelf: 'center' },
    rat_style13: { flex: 1, width: undefined, height: undefined },
    rat_style14: { padding: 20 },
    rat_style15: { fontSize: 20, color: 'grey', fontFamily: font_title },
    rat_style16: { fontSize: 20, color: 'grey', fontFamily: font_title },
    rat_style17: { fontFamily: font_title, color: colors.theme_fg_two },
    rat_style18: { margin: 20 },
    rat_style19: { backgroundColor: colors.theme_bg_three },
    rat_style20: { width: '90%', justifyContent: 'center' },
    rat_style21: { backgroundColor: colors.theme_bg, fontFamily: font_title },

    header_card_item: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowOffset: { width: 0, height: 15 },
        shadowColor: colors.theme_bg,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    icon: {
        color: colors.theme_fg_two
    },
    header_body: {
        flex: 3,
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        color: colors.theme_fg_two,
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: font_title
    },

});
