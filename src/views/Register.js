import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, BackHandler, Keyboard, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CommonActions } from '@react-navigation/native';
import { Icon, Button } from 'native-base';
import Snackbar from 'react-native-snackbar';
import { api_url, register, logo_with_name, font_title, font_description, get_blood_list } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/RegisterActions';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'react-native-elements';

function Register(props) {
    const [state, msetState] = useState({
        customer_name: "",
        phone_number: "",
        email: "",
        password: "",
        blood_group: "",
        validation: true,
        blood_group_list: [],
        fcm_token: global.fcm_token,
    });

    function setState(nstate) {
        msetState({ ...state, ...nstate });
    }

    useEffect(() => {

        Get_blood_list();
        BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonClick
        );

        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackButtonClick
            );
        };

    }, []);


    function handleBackButtonClick() {
        props.navigation.navigate("Login");
        return true;
    }

    function login() {
        props.navigation.navigate("Login");
    };

    function home() {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
            })
        );
    };

    async function Register() {
        Keyboard.dismiss();
        checkValidate();
        if (state.validation) {
            props.serviceActionPending();
            await axios({
                method: "post",
                url: api_url + register,
                data: {
                    customer_name: state.customer_name,
                    fcm_token: state.fcm_token,
                    phone_number: state.phone_number,
                    email: state.email,
                    password: state.password,
                    blood_group: state.blood_group,
                    fcm_token: state.fcm_token,
                },
            })
                .then(async (response) => {
                    await props.serviceActionSuccess(response.data);
                    await saveData();
                })
                .catch((error) => {
                    props.serviceActionError(error);
                });
        }
    };

    async function Get_blood_list() {
        await axios({
            method: "get",
            url: api_url + get_blood_list
        })
            .then(async (response) => {
                setState({ blood_group_list: response.data.result });
            })
            .catch((error) => {
                alert('Sorry, something went wrong!')
            });
    }

    async function saveData() {
        if (props.status == 1) {
            try {
                await AsyncStorage.setItem("user_id", props.data.id.toString());
                await AsyncStorage.setItem(
                    "customer_name",
                    props.data.customer_name.toString()
                );
                await AsyncStorage.setItem(
                    "phone_number",
                    props.data.phone_number.toString()
                );
                await AsyncStorage.setItem("email", props.data.email.toString());
                global.id = await props.data.id;
                global.customer_name = await props.data.customer_name;
                global.phone_number = await props.data.phone_number;
                global.email = await props.data.email;
                home();
            } catch (e) { }
        } else {
            alert(props.message);
        }
    };

    function checkValidate() {
        if (
            state.email == "" ||
            state.phone_number == "" ||
            state.password == "" ||
            state.blood_group == "" ||
            state.customer_name == ""
        ) {
            state.validation = false;
            showSnackbar("Please fill all the fields.");
            return true;
        } else {
            state.validation = true;
            return true;
        }
    }

    select_blood_group = (value) => {
        setState({ blood_group: value });
    }

    function showSnackbar(msg) {
        Snackbar.show({
            title: msg,
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    const { isLoding, error, data, message, status } = props;

    let bl_list = state.blood_group_list.map((s, i) => {
        return <Picker.Item key={i} value={s.blood_group} label={s.blood_group} />
    });

    return (
        <View style={styles.container}>
            <View>
                <StatusBar />
            </View>
            <Loader visible={isLoding} />
            <View>
                <View style={styles.reg_style1}>
                    <TouchableOpacity style={styles.reg_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.reg_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.reg_style4} />
                    <Text style={styles.reg_style5}>Register</Text>
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={styles.reg_style6}>

                    <View style={styles.reg_style8}>
                        <Image
                            style={styles.reg_style9}
                            source={logo_with_name}
                        />
                    </View>
                    <View style={styles.reg_style10} />
                    <View style={styles.reg_style11}>
                        <Input
                            inputStyle={styles.reg_style12}
                            label="User Name"
                            labelStyle={styles.reg_style13}
                            placeholder='john'
                            leftIcon={
                                <Icon
                                    name='person'
                                    size={20}
                                    color='black'
                                    style={styles.reg_style14}
                                />
                            }
                            onChangeText={(TextInputValue) =>
                                setState({ customer_name: TextInputValue })
                            }
                        />
                    </View>
                    <View style={styles.reg_style15}>
                        <Input
                            inputStyle={styles.reg_style16}
                            label="Phone Number"
                            labelStyle={styles.reg_style17}
                            placeholder='+91xxxxxxxxxx'
                            leftIcon={
                                <Icon
                                    name='call'
                                    size={20}
                                    color='black'
                                    style={styles.reg_style18}
                                />
                            }
                            keyboardType="phone-pad"
                            onChangeText={(TextInputValue) =>
                                setState({ phone_number: TextInputValue })
                            }
                        />
                    </View>
                    <View style={styles.reg_style19}>
                        <Input
                            inputStyle={styles.reg_style20}
                            label="Email Address"
                            labelStyle={styles.reg_style21}
                            placeholder="john@gmail.com"
                            leftIcon={
                                <Icon
                                    name='mail'
                                    size={20}
                                    color='black'
                                    style={styles.reg_style22}
                                />
                            }
                            keyboardType="email-address"
                            onChangeText={(TextInputValue) =>
                                setState({ email: TextInputValue })
                            }
                        />
                    </View>
                    <View style={styles.reg_style23}>
                        <Input
                            inputStyle={styles.reg_style24}
                            placeholder="**********"
                            label="Password"
                            labelStyle={styles.reg_style25}
                            leftIcon={
                                <Icon
                                    name='key'
                                    size={20}
                                    color='black'
                                    style={styles.reg_style26}
                                />
                            }
                            secureTextEntry={true}
                            onChangeText={(TextInputValue) =>
                                setState({ password: TextInputValue })
                            }
                        />
                    </View>
                    <View style={styles.reg_style27}>
                        <Text style={styles.reg_style28}>Blood Group</Text>
                        <Picker
                            selectedValue={state.blood_group}
                            style={styles.reg_style29}
                            onValueChange={(itemValue, itemIndex) => select_blood_group(itemValue)}
                        >
                            {bl_list}
                        </Picker>
                    </View>
                    <View style={styles.reg_style30} />
                    <View style={styles.reg_style31}>
                        <Button
                            block
                            style={styles.reg_style32}
                            onPress={Register}
                        >
                            <Text style={styles.reg_style33}>SUBMIT</Text>
                        </Button>
                    </View>
                    <View style={styles.reg_style34}>
                        <Text style={styles.reg_style35} onPress={login}>
                            Already have an account? <Text style={styles.reg_style36}>LOGIN HERE</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.register.isLoding,
        error: state.register.error,
        data: state.register.data,
        message: state.register.message,
        status: state.register.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    reg_style1: { alignItems: 'flex-start', margin: 10 },
    reg_style2: { width: 100, justifyContent: 'center' },
    reg_style3: { color: colors.theme_fg_two, fontSize: 30 },
    reg_style4: { margin: 5 },
    reg_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    reg_style6: { justifyContent: "center", alignItems: "center" },
    reg_style7: { marginTop: "10%" },
    reg_style8: { height: 120, width: 120 },
    reg_style9: { flex: 1, width: undefined, height: undefined },
    reg_style10: { marginTop: "10%" },
    reg_style11: { width: "80%", alignSelf: "center" },
    reg_style12: { fontSize: 14, fontFamily: font_description },
    reg_style13: { fontFamily: font_title },
    reg_style14: { color: colors.theme_bg },
    reg_style15: { width: "80%", alignSelf: "center" },
    reg_style16: { fontSize: 14, fontFamily: font_description },
    reg_style17: { fontFamily: font_title },
    reg_style18: { color: colors.theme_bg },
    reg_style19: { width: "80%", alignSelf: "center" },
    reg_style20: { fontSize: 14, fontFamily: font_description },
    reg_style21: { fontFamily: font_title },
    reg_style22: { color: colors.theme_bg },
    reg_style23: { width: "80%", alignSelf: "center" },
    reg_style24: { fontSize: 14, fontFamily: font_description },
    reg_style25: { fontFamily: font_title },
    reg_style26: { color: colors.theme_bg },
    reg_style27: { width: "80%", alignSelf: "center" },
    reg_style28: { color: 'grey', fontWeight: 'bold', fontSize: 15, marginLeft: '3%', fontFamily: font_description },
    reg_style29: { height: 50, width: '100%' },
    reg_style30: { marginTop: "5%" },
    reg_style31: { width: "80%", alignSelf: "center" },
    reg_style32: { backgroundColor: colors.theme_bg, borderRadius: 5, height: 40 },
    reg_style33: { color: colors.theme_fg_three, fontFamily: font_title, letterSpacing: 0.5 },
    reg_style34: { marginTop: "5%", justifyContent: "flex-end", alignItems: "center", position: "relative", bottom: 0 },
    reg_style35: { fontSize: 15, color: colors.theme_bg_two, marginTop: "8%", fontFamily: font_description, marginBottom: 20 },
    reg_style36: { color: colors.theme_fg },
});
