import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { api_url, settings, font_description, font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { StatusBar } from '../components/GeneralComponents';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/SplashActions';
import messaging from '@react-native-firebase/messaging';
import Background from '../components/Background';
import logo from '../assets/img/logo.png';
import { globalStyles } from '../assets/css/global';


function Splash(props) {
    const notifications = messaging();

    async function getToken() {
        //get the messeging token
        let fcmToken = await AsyncStorage.getItem("fcmToken");
        if (!fcmToken) {
            let fcmToken = await notifications.getToken();
            if (fcmToken) {
                try {
                    AsyncStorage.setItem("fcmToken", fcmToken);
                    global.fcm_token = fcmToken;
                } catch (e) { }
            }
        } else {
            global.fcm_token = fcmToken;
        }
    };

    async function getInitialNotification() {
        //get the initial token (triggered when app opens from a closed state)
        const notification = await notifications.getInitialNotification();
        console.log("getInitialNotification", notification);
        return notification;
    };

    function onNotificationOpenedListener() {

        //remember to remove the listener on un mount
        //this gets triggered when the application is in the background
        removeOnNotificationOpened = notifications.onNotificationOpened(
            (notification) => {
                console.log("onNotificationOpened", notification);
                //do something with the notification
            }
        );
    };

    function onNotificationListener() {
        //remember to remove the listener on un mount
        //this gets triggered when the application is in the forground/runnning
        //for android make sure you manifest is setup - else this wont work
        //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information
        removeOnNotification = notifications.onNotification((notification) => {
            //do something with the notification
            console.log("onNotification", notification);
        });
    };

    function onTokenRefreshListener() {
        //remember to remove the listener on un mount
        //this gets triggered when a new token is generated for the user
        removeonTokenRefresh = messages.onTokenRefresh((token) => {
            //do something with the new token
        });
    };

    const setBadge = async (number) => {
        //only works on iOS for now
        return await notifications.setBadge(number);
    };

    async function getBadge() {
        //only works on iOS for now
        return await notifications.getBadge();
    };

    async function hasPermission() {
        //only works on iOS
        return await notifications.hasPermission();
        //or     return await messages.hasPermission()
    };

    async function requestPermission() {
        //only works on iOS
        return await notifications.requestPermission();
        //or     return await messages.requestPermission()
    };

    async function Settings() {
        props.serviceActionPending();

        try {
            const { data } = await axios.get(api_url + settings);
            await props.serviceActionSuccess(data);
        } catch (error) {
            alert(error);
            //console.log(error);
            props.serviceActionError(error);
        }
    };

    async function home(data) {
        const user_id = await AsyncStorage.getItem("user_id");
        const customer_name = await AsyncStorage.getItem("customer_name");
        const phone_number = await AsyncStorage.getItem("phone_number");
        const email = await AsyncStorage.getItem("email");
        global.currency = data.default_currency;
        global.currency_short_code = data.currency_short_code;
        global.application_name = data.application_name;
        global.razorpay_key = data.razorpay_key;
        global.delivery_charge = data.delivery_charge;
        global.free_delivery_amount = data.free_delivery_amount;
        global.admin_phone = data.contact_number;
        global.admin_email = data.email;
        global.admin_address = data.address;
        if (user_id !== null) {
            global.id = user_id;
            global.customer_name = customer_name;
            global.phone_number = phone_number;
            global.email = email;
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "HomeScreen" }],
                })
            );
        } else {
            global.id = "";
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                })
            );
        }
    };


    useEffect(() => {

        (async () => {
            await getToken();
            await Settings();
        })();

        return () => {
            //remove the listener on unmount
            // if (removeOnNotificationOpened) {
            //     removeOnNotificationOpened();
            // }
            // if (removeOnNotification) {
            //     removeOnNotification();
            // }

            // if (removeonTokenRefresh) {
            //     removeonTokenRefresh();
            // }
        };

    }, []);

    useEffect(() => {
        if (props.data)
            home(props.data);
    }, [props.data]);

    return (
        <Background style={{ ...globalStyles.centerContent, alignItems: 'flex-end' }}>
            <Image style={{ width: '80%', resizeMode: 'contain', marginRight: '3%' }} source={logo} />
        </Background>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.splash.isLoding,
        error: state.splash.error,
        data: state.splash.data,
        message: state.splash.message,
        status: state.splash.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);