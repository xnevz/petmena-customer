import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Row, Icon, Box } from 'native-base';
import * as colors from '../assets/css/Colors';
import CardView from 'react-native-cardview';
import { doc, location, font_description, font_title } from '../config/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function App(props) {

    const [state, msetState] = useState({
        starCount: 4,
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    };

    function onStarRatingPress(rating) {
        setState({
            starCount: rating
        });
    }

    return (
        <Container>
            <View>
                <View style={styles.appointment_style1}>
                    <TouchableOpacity style={styles.appointment_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.appointment_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.appointment_style4} />
                    <Text style={styles.appointment_style5}>Appointment Info</Text>
                </View>
            </View>
            <View style={styles.appointment_style6}>
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}>
                    <View style={styles.appointment_style7}>
                        <Row>
                            <Box style={styles.appointment_style8}>
                                <View style={styles.appointment_style9}>
                                    <View style={styles.appointment_style10}>
                                        <Image style={styles.appointment_style11} source={doc} />
                                    </View>
                                </View>
                            </Box>
                            <Box style={styles.appointment_style12}>
                                <Text style={styles.appointment_style13}>
                                    Dr. Joseph Williamson
                                </Text>
                                <Text style={styles.appointment_style14}>
                                    Cadiac Surgeon
                                </Text>
                            </Box>
                        </Row>
                        <View style={styles.appointment_style15} />
                        <Row>
                            <Box style={styles.appointment_style16}>
                                <FontAwesome name='calendar'
                                    size={25}
                                    color='black'
                                    style={styles.appointment_style17}
                                />
                            </Box>
                            <Box style={styles.appointment_style18}>
                                <Text style={styles.appointment_style19}>
                                    Appointment date & Time
                                </Text>
                                <Text style={styles.appointment_style20}>
                                    12 March, 12:00 noon
                                </Text>
                                <Text style={styles.appointment_style21}>
                                    in 3 days
                                </Text>
                            </Box>
                        </Row>
                        <View style={styles.appointment_style22} />
                        <Row>
                            <Box style={styles.appointment_style23}>
                                <Image style={styles.appointment_style24} source={location} />
                            </Box>
                            <Box style={styles.appoinment_style25}>
                                <Text style={styles.appointment_style26}>
                                    Location
                                </Text>
                                <Text style={styles.appointment_style27}>
                                    At Apple Hospital
                                </Text>
                                <Text style={styles.appointment_style28}>
                                    walter street. wallington, new York
                                </Text>
                            </Box>
                        </Row>
                        <View style={styles.appoinment_style29} />
                    </View>
                </CardView>
                <View style={styles.appoinment_style30} />
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}>
                    <View style={styles.appoinment_style31}>
                        <View style={styles.appoinment_style32} />
                        <Row>
                            <Box style={styles.appoinment_style33}>
                                <FontAwesome name='check-square'
                                    size={25}
                                    color='black'
                                    style={styles.appoinment_style34}
                                />
                            </Box>
                            <Box style={styles.appoinment_style35}>
                                <Text style={styles.appoinment_style36}>
                                    Appointment booked for
                                </Text>
                                <Text style={styles.appoinment_style37}>
                                    Emmili Johnson
                                </Text>
                                <Text style={styles.appoinment_style38}>
                                    +1 9876543210
                                </Text>
                            </Box>
                        </Row>
                        <View style={styles.appoinment_style39} />
                        <Row>
                            <Box style={styles.appoinment_style40}>
                                <FontAwesome name='info-circle'
                                    size={25}
                                    color='black'
                                    style={styles.appoinment_style41}
                                />
                            </Box>
                            <Box style={styles.appoinment_style42}>
                                <Text style={styles.appoinment_style43}>
                                    Appointment Number
                                </Text>
                                <Text style={styles.appoinment_style44}>
                                    6654172
                                </Text>
                                <Text style={styles.appoinment_style45}>
                                    Justfor reference purpose
                                </Text>
                            </Box>
                        </Row>
                    </View>
                </CardView>
            </View>
        </Container>

    );
}


const styles = StyleSheet.create({
    appointment_style1: { alignItems: 'flex-start', margin: 10 },
    appointment_style2: { width: 100, justifyContent: 'center' },
    appointment_style3: { color: colors.theme_fg_two, fontSize: 30 },
    appointment_style4: { margin: 5 },
    appointment_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    appointment_style6: { backgroundColor: '#EEEEEE' },
    appointment_style7: { padding: 5 },
    appointment_style8: { height: "100%", width: "30%", alignSelf: 'center' },
    appointment_style9: { borderColor: colors.theme_fg_three, borderWidth: 1, height: 60, width: 60, alignSelf: 'center', borderRadius: 60, backgroundColor: colors.theme_bg_three, padding: 15, justifyContent: 'center', marginTop: 10 },
    appointment_style10: { borderColor: '#EEEEEE', borderWidth: 1, height: 60, width: 60, alignSelf: 'center', borderRadius: 60, backgroundColor: '#EEEEEE', justifyContent: 'center' },
    appointment_style11: { alignSelf: 'center', height: 60, width: 60, borderRadius: 30 },
    appointment_style12: { height: "100%", width: "70%", alignSelf: 'center' },
    appointment_style13: { fontSize: 18, color: '#808080', marginTop: 20, fontFamily: font_description },
    appointment_style14: { fontSize: 14, color: '#C4C3C3', fontFamily: font_description },
    appointment_style15: { margin: 15 },
    appointment_style16: { height: "100%", width: "30%", alignSelf: 'center' },
    appointment_style17: { color: colors.theme_fg, alignSelf: 'center' },
    appointment_style18: { height: "100%", width: "70%", alignSelf: 'center' },
    appointment_style19: { fontSize: 16, color: '#C4C3C3', fontFamily: font_title },
    appointment_style20: { fontSize: 18, color: '#000000', fontFamily: font_description },
    appointment_style21: { fontSize: 14, color: '#C4C3C3', fontFamily: font_description },
    appointment_style22: { margin: 15 },
    appointment_style23: { height: "100%", width: "30%", alignSelf: 'center' },
    appointment_style24: { alignSelf: 'center', height: 30, width: 30 },
    appoinment_style25: { height: "100%", width: "70%", alignSelf: 'center' },
    appointment_style26: { fontSize: 16, color: '#C4C3C3', fontFamily: font_title },
    appointment_style27: { fontSize: 18, color: '#000000', fontFamily: font_description },
    appointment_style28: { fontSize: 14, color: '#C4C3C3', fontFamily: font_description },
    appointment_style29: { margin: 10 },
    appointment_style30: { margin: 5 },
    appointment_style31: { padding: 5 },
    appointment_style32: { margin: 10 },
    appointment_style33: { height: "100%", width: "30%", alignSelf: 'center' },
    appointment_style34: { color: colors.theme_fg, alignSelf: 'center' },
    appointment_style35: { height: "100%", width: "70%", alignSelf: 'center' },
    appointment_style36: { fontSize: 16, color: '#C4C3C3', fontFamily: font_title },
    appointment_style37: { fontSize: 18, color: '#000000', fontFamily: font_description },
    appointment_style38: { fontSize: 14, color: '#C4C3C3', fontFamily: font_description },
    appointment_style39: { margin: 15 },
    appointment_style40: { height: "100%", width: "30%", alignSelf: 'center' },
    appointment_style41: { color: colors.theme_fg, alignSelf: 'center' },
    appointment_style42: { height: "100%", width: "70%", alignSelf: 'center' },
    appointment_style43: { fontSize: 16, color: '#C4C3C3', fontFamily: font_title },
    appointment_style44: { fontSize: 18, color: '#000000', fontFamily: font_description },
    appointment_style45: { fontSize: 14, color: '#C4C3C3', fontFamily: font_description },

    title: {
        fontSize: 18,
        fontFamily: font_title,
        color: colors.theme_fg_three,
        marginTop: 15,
        marginRight: 30
    },
    header: {
        marginRight: 10,
        marginTop: 10,
        alignSelf: 'center'
    },
    header: {
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
    header_card: {
        alignItems: "center",
        borderRadius: 15,
        justifyContent: "center",
    },
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






});
