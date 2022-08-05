import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Keyboard } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Button, Icon } from 'native-base';
import { api_url, login, logo_with_name, font_description, font_title } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/LoginActions';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import * as colors from '../assets/css/Colors';
import { Input } from 'react-native-elements';
import Background from '../components/Background';

function Login(props) {
    const [state, msetState] = useState({
        email: "",
        validation: true,
        fcm_token: global.fcm_token,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
        return true;
    }

    async function login() {
        setState({ isLoding: true });
        Keyboard.dismiss();
        checkValidate();
        if (state.validation) {
            props.serviceActionPending();
            await axios({
                method: "post",
                url: api_url + login,
                data: {
                    email: state.email,
                    password: state.password,
                    fcm_token: state.fcm_token,
                },
            })
                .then(async (response) => {
                    setState({ isLoding: false });
                    await props.serviceActionSuccess(response.data);
                    await saveData();
                })
                .catch((error) => {
                    setState({ isLoding: false });
                    alert(error);
                    props.serviceActionError(error);
                });
        }
    };

    function checkValidate() {
        if (state.email == "" || state.password == "") {
            state.validation = false;
            showSnackbar("Please fill all the fields.");
            return true;
        } else {
            state.validation = true;
            return true;
        }
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
                await home();
            } catch (e) { }
        } else {
            alert(props.message);
        }
    };

    function register() {
        props.navigation.navigate("Register");
    };

    function forgot() {
        props.navigation.navigate("Forgot");
    };

    function home() {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
            })
        );
    };

    function showSnackbar(msg) {
        Snackbar.show({
            title: msg,
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    const { isLoding } = props;

    return (
        <Background>
            
        </Background>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.login.isLoding,
        error: state.login.error,
        data: state.login.data,
        message: state.login.message,
        status: state.login.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
const styles = StyleSheet.create({
    log_style1: { flex: 1, flexDirection: "column" },
    log_style2: { alignItems: 'flex-start', margin: 10 },
    log_style3: { margin: 5 },
    log_style4: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    log_style5: { height: "90%", justifyContent: "center", alignItems: "center" },
    log_style6: { marginTop: "20%" },
    log_style7: { height: 120, width: 120 },
    log_style8: { flex: 1, width: undefined, height: undefined },
    log_style9: { marginTop: "10%" },
    log_style10: { width: "80%", alignSelf: "center" },
    log_style11: { fontSize: 14, fontFamily: font_description },
    log_style12: { fontFamily: font_title },
    log_style13: { color: colors.theme_bg },
    log_style14: { width: "80%", alignSelf: "center" },
    log_style15: { fontSize: 14, fontFamily: font_description },
    log_style16: { fontFamily: font_title },
    log_style17: { color: colors.theme_bg },
    log_style18: { marginTop: "5%" },
    log_style19: { width: "80%", alignSelf: "center" },
    log_style20: { backgroundColor: colors.theme_bg, borderRadius: 5, height: 40 },
    log_style21: { color: colors.theme_fg_three, fontFamily: font_title, letterSpacing: 0.5 },
    log_style22: { marginTop: "3%" },
    log_style23: { width: "95%", alignItems: "flex-end" },
    log_style24: { fontSize: 15, color: colors.theme_fg_four, fontFamily: font_description },
    log_style25: { marginTop: "25%", height: "10%", justifyContent: "flex-end", alignItems: "center" },
    log_style26: { fontSize: 15, color: colors.theme_bg, marginBottom: "4%", fontFamily: font_description },
});
