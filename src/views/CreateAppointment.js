import React, { Component, useState } from "react";
import * as colors from "../assets/css/Colors";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Container, Body, Button, Icon, Row, Col, Footer } from "native-base";
import { create_booking, api_url, font_title, font_description, check_available_timing } from "../config/Constants";
import { Loader } from '../components/GeneralComponents';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { Input } from 'react-native-elements';

export default function CreateAppointment(props) {

    const [state, setState] = useState(state = {
        description: '',
        title: '',
        deliveryDatePickerVisible: false,
        delivery_date: '',
        delivery_time: '',
        start_time: '',
        doctor_id: props.route.params.id,
        type: props.route.params.type,
        price_per_conversation: props.route.params.price_per_conversation,
        isLoding: false
    });

    handleBackButtonClick = () => {
        props.navigation.goBack(null);
    }

    create_booking = async () => {
        setState({ isLoding: true });
        await axios({
            method: 'post',
            url: api_url + create_booking,
            data: {
                patient_id: global.id,
                doctor_id: state.doctor_id,
                start_time: state.start_time,
                payment_mode: 2,
                title: state.title,
                description: state.description,
                total_amount: state.price_per_conversation,
                booking_type: state.type
            },
        })
            .then(async response => {
                setState({ isLoding: false });
                if (response.data.status == 0) {
                    alert(response.data.message);
                } else {
                    setState({ title: '', description: '', start_time: '' });
                }

                if (response.data.status == 1) {
                    Alert.alert(
                        'Success',
                        'Your order has been successfully placed.',
                        [
                            { text: 'OK', onPress: () => my_orders() }
                        ],
                        { cancelable: false }
                    );
                }
            })
            .catch(error => {
                alert('something went wrong');
                setState({ isLoding: false });
            });
    }

    check_timing = async () => {
        setState({ isLoding: true });
        await axios({
            method: 'post',
            url: api_url + check_available_timing,
            data: {
                doctor_id: state.doctor_id,
                start_time: state.start_time,
                booking_type: state.type
            }
        })
            .then(async response => {
                setState({ isLoding: false });
                if (response.data.status == 0) {
                    alert(response.data.message);
                } else {
                    make_payment();
                }
            })
            .catch(error => {
                alert('something went wrong');
                setState({ isLoding: false });
            });
    }

    check_validation = () => {
        if (state.title == "") {
            alert('Please write title');
        } else if (state.description == "") {
            alert('Please write description');
        } else if (state.start_time == "") {
            alert('Please choose booking time');
        } else {
            check_timing();
        }
    }

    make_payment = () => {

        var options = {
            currency: global.currency_short_code,
            key: global.razorpay_key,
            amount: state.price_per_conversation * 100,
            name: global.application_name,
            prefill: {
                email: global.email,
                contact: global.phone_number,
                name: global.customer_name
            },
            theme: { color: colors.theme_fg }
        }
        RazorpayCheckout.open(options).then(() => {
            create_booking();
        }).catch((error) => {
            alert('Your transaction declined')
        });
    }

    function my_orders() {
        props.navigation.navigate('MyOrders');
    }

    function showDeliveryDatePicker() {
        setState({ deliveryDatePickerVisible: true });
    };

    function hideDeliveryDatePicker() {
        setState({ deliveryDatePickerVisible: false });
    };

    async function handleDeliveryDatePicked(date) {
        var d = new Date(date);
        let delivery_date = d.getDate() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear();
        let hr = d.getHours();
        let min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        let ampm = "AM";
        if (hr > 12) {
            hr -= 12;
            ampm = "PM";
        }
        let delivery_time = hr + ':' + min + ' ' + ampm;

        let start_time = delivery_date + ' ' + delivery_time;
        setState({ start_time: start_time, delivery_date: delivery_date, deliveryDatePickerVisible: false, delivery_time: delivery_time });
    };

    function AppointmentList() {
        props.navigation.navigate('AppointmentDetail');
    }


    return (
        <Container>
            <View>
                <View style={styles.create_style1}>
                    <TouchableOpacity style={styles.create_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.create_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.create_style4} />
                    <Text style={styles.create_style5}>New Appointment</Text>
                </View>
            </View>
            <View padder>
                <View style={styles.create_style6} />
                <Input
                    inputStyle={styles.create_style7}
                    label="Title"
                    labelStyle={styles.create_style8}
                    placeholder="I have viral fever last two days..."
                    onChangeText={(TextInputValue) =>
                        setState({ title: TextInputValue })
                    }
                />
                <View style={styles.create_style9} />
                <Input
                    inputStyle={styles.create_style10}
                    label="Description"
                    labelStyle={styles.create_style11}
                    placeholder="Write short description..."

                    onChangeText={(TextInputValue) =>
                        setState({ description: TextInputValue })
                    }
                />
                <View style={styles.create_style12} />
                <Row>
                    <Card>
                        <Button onPress={showDeliveryDatePicker} style={{ width: 100 }} transparent>
                            <Icon style={styles.create_style13} name='time' />
                        </Button>
                        <Text style={styles.create_style14}>(Select your date & time)</Text>
                        <View style={styles.create_style15} />
                        <Text style={styles.create_style16}>{state.start_time}</Text>
                        <DateTimePicker
                            isVisible={state.deliveryDatePickerVisible}
                            onConfirm={handleDeliveryDatePicked}
                            onCancel={hideDeliveryDatePicker}
                            minimumDate={new Date()}
                            mode='datetime'
                        />
                    </Card>
                </Row>
                <Loader visible={state.isLoding} />
            </View>
            <Box style={styles.create_style17} >
                <TouchableOpacity activeOpacity={1} style={styles.create_style18} onPress={check_validation}>
                    <Row>
                        <Box style={styles.create_style19} >
                            <Text style={styles.create_style20} >SUBMIT</Text>
                        </Box>
                    </Row>
                </TouchableOpacity>
            </Box>
        </Container>
    );
}

const styles = StyleSheet.create({
    create_style1: { alignItems: 'flex-start', margin: 10 },
    create_style2: { width: 100, justifyContent: 'center' },
    create_style3: { color: colors.theme_fg_two, fontSize: 30 },
    create_style4: { margin: 5 },
    create_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    create_style6: { margin: 10 },
    create_style7: { fontSize: 14 },
    create_style8: { fontFamily: font_title },
    create_style9: { margin: 10 },
    create_style10: { fontSize: 14, height: 80 },
    create_style11: { fontFamily: font_title },
    create_style12: { margin: 10 },
    create_style13: { fontSize: 50, color: colors.theme_fg },
    create_style14: { fontSize: 12, color: colors.grey, fontFamily: font_description },
    create_style15: { margin: 10 },
    create_style16: { fontFamily: font_description },
    create_style17: { backgroundColor: 'transparent' },
    create_style18: { width: '100%', backgroundColor: colors.theme_bg },
    create_style19: { alignItems: 'center', justifyContent: 'center' },
    create_style20: { color: colors.theme_fg_three, fontFamily: font_title, fontSize: 18 },

});