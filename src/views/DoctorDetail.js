import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Container, Left, Row, Col, Icon, Thumbnail } from 'native-base';
import { Button } from 'react-native-elements';
import { img_url, font_description, font_title } from '../config/Constants';
import * as colors from "../assets/css/Colors";
import { Loader } from '../components/GeneralComponents';
import { Rating } from 'react-native-ratings';
export default function App(props) {

    const [state, msetState] = useState({
        data: props.route.params.data
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    };

    appoinment_details = (type) => {
        if (type == 1) {
            props.navigation.navigate('CreateAppointment', { id: state.data.id, price_per_conversation: state.data.booking_settings.online_booking_fee, type: type });
        } else {
            props.navigation.navigate('CreateAppointment', { id: state.data.id, price_per_conversation: state.data.booking_settings.direct_appointment_fee, type: type });
        }
    }

    return (
        <Container>
            <View>
                <View style={styles.doc_style1}>
                    <View style={styles.doc_style2}>
                        <View style={styles.doc_style3}>
                            <TouchableOpacity style={styles.doc_style4} onPress={handleBackButtonClick} activeOpacity={1} >
                                <Icon onPress={handleBackButtonClick} style={styles.doc_style5} name='arrow-back' />
                            </TouchableOpacity>
                            <View style={styles.doc_style6} />
                            <Text style={styles.doc_style7}>Dr.{state.data.doctor_name}</Text>
                            <View style={styles.doc_style8} />
                            <Text style={styles.doc_style9}>
                                {state.data.specialist} ({state.data.qualification})
                            </Text>
                            <View style={styles.doc_style10} />
                            <Text style={styles.doc_style11}>
                                {state.data.experience} Years experience
                            </Text>

                            <View style={styles.doc_style12} />
                            {parseInt(state.data.overall_rating) > 0 &&
                                <Rating
                                    ratingCount={5}
                                    startingValue={state.data.overall_rating}
                                    imageSize={12}
                                    readonly={true}
                                />
                            }
                        </View>
                    </View>
                    <View style={styles.doc_style13}>
                        <View style={styles.doc_style14}>

                            <Thumbnail large source={{ uri: img_url + state.data.profile_image }} />

                        </View>
                    </View>
                </View>

            </View>
            <View padder>

                <Row>
                    <Box>
                        <Text style={styles.doc_style15}>
                            About Doctor
                        </Text>
                        <View style={styles.doc_style16} />
                        <Text style={styles.doc_style17}>
                            {state.data.description}
                        </Text>
                    </Box>
                </Row>
                <View style={styles.doc_style18} />
                <Row>
                    <Box>
                        <Text style={styles.doc_style19}>
                            Providing Services
                        </Text>
                    </Box>
                </Row>
                <View style={styles.doc_style20} />
                <View style={styles.doc_style21}>
                    <FlatList
                        data={state.data.providing_services}
                        renderItem={({ item, index }) => (
                            <Box style={styles.doc_style22}>
                                <View style={styles.doc_style23}>
                                    <Thumbnail square small style={styles.doc_style24} source={{ uri: img_url + item.service_image }} />
                                    <Text style={styles.doc_style25}>
                                        {item.service_name}
                                    </Text>
                                </View>
                            </Box>
                        )}
                        numColumns={2}
                    />
                </View>
                <View style={{ margin: 10 }} />
                {state.data.booking_settings.online_booking_status == 1 &&
                    <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: 'grey', borderWidth: 1 }}>
                        <View style={{ width: '100%', backgroundColor: colors.theme_light, borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 10 }}>
                            <Text style={{ fontFamily: font_title, fontSize: 15, color: colors.theme_fg_two }}>Online consultation - {global.currency}{state.data.booking_settings.online_booking_fee}</Text>
                        </View>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Text style={{ fontFamily: font_description, fontSize: 13, color: colors.grey }}>Doctor available with for online consultation, with chat and video call options. The persistent of doctor will be 10 min with negotiable fees.</Text>
                            <Text style={{ fontFamily: font_description, fontSize: 13, color: colors.grey }}>Consulting duration : <Text style={{ fontWeight: 'bold', color: colors.theme_fg_two }}>{state.data.booking_settings.online_booking_time} min</Text></Text>
                        </View>
                        <Button
                            title="Book now"
                            type="outline"
                            onPress={() => appoinment_details(1)}
                        />
                    </View>
                }
                <View style={{ margin: 10 }} />
                {state.data.booking_settings.direct_appointment_status == 1 &&
                    <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: 'grey', borderWidth: 1 }}>
                        <View style={{ width: '100%', backgroundColor: colors.theme_light, borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 10 }}>
                            <Text style={{ fontFamily: font_title, fontSize: 15, color: colors.theme_fg_two }}>Direct appointment - {global.currency}{state.data.booking_settings.direct_appointment_fee}</Text>
                        </View>
                        <View style={{ width: '100%', padding: 10 }}>
                            <Image source={{ uri: img_url + state.data.clinic_details.static_map }} style={{ width: '100%', height: 150 }} />
                        </View>
                        <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                            <Text style={{ fontFamily: font_title, fontSize: 16, color: colors.theme_fg_two }}>{state.data.clinic_details.clinic_name}</Text>
                            <Text style={{ fontFamily: font_description, fontSize: 13, color: colors.grey }}>{state.data.clinic_details.clinic_address}</Text>
                        </View>
                        <Button
                            title="Book now"
                            type="outline"
                            onPress={() => appoinment_details(2)}
                        />
                    </View>
                }
                <View style={{ margin: 10 }} />
                <Loader visible={state.isLoading} />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    doc_style1: { flexDirection: 'row' },
    doc_style2: { alignItems: 'flex-start', justifyContent: 'center', width: '60%' },
    doc_style3: { alignItems: 'flex-start', margin: 10 },
    doc_style4: { width: 100, justifyContent: 'center' },
    doc_style5: { color: colors.theme_fg_two, fontSize: 30 },
    doc_style6: { margin: 5 },
    doc_style7: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    doc_style8: { margin: 3 },
    doc_style9: { fontSize: 14, color: colors.grey, fontFamily: font_description },
    doc_style10: { margin: 3 },
    doc_style11: { fontSize: 14, color: colors.grey, fontFamily: font_description },
    doc_style12: { margin: 3 },
    doc_style13: { alignItems: 'center', justifyContent: 'center', width: '40%' },
    doc_style14: { alignItems: 'flex-start', margin: 20 },
    doc_style15: { fontSize: 16, color: colors.theme_fg_two, fontFamily: font_title },
    doc_style16: { margin: 5 },
    doc_style17: { fontSize: 14, color: colors.grey, fontFamily: font_description },
    doc_style18: { margin: 10 },
    doc_style19: { fontSize: 16, color: colors.theme_fg_two, fontFamily: font_title },
    doc_style20: { margin: 5 },
    doc_style21: { borderRadius: 10 },
    doc_style22: { height: "100%", width: "50%", marginLeft: 5 },
    doc_style23: { flexDirection: 'row', alignItems: 'center' },
    doc_style24: { width: 20, height: 20 },
    doc_style25: { fontSize: 12, color: colors.theme_fg_two, fontFamily: font_title, padding: 10 },
    doc_style26: { backgroundColor: '#1065cd' },
    doc_style27: { backgroundColor: '#1065cd', borderRadius: 5, height: 55, width: 380, alignSelf: 'center', fontFamily: font_title },
    doc_style28: { fontSize: 16, color: '#FFFFFF', alignSelf: 'center', fontFamily: font_title },
});
