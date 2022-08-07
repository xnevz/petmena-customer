import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { serviceActionError, serviceActionPending, serviceActionSuccess } from '../actions/SplashActions';
import { globalStyles } from '../assets/css/global';
import logo from '../assets/img/logo.png';
import Background from '../components/Background';
import { api_url, settings } from '../config/Constants';
import { useAppNavigation } from '../../App';
import { AlertDialog } from 'native-base';
import { useAlertProps } from '../customHooks/uiHooks';
import getMyAlert from '../components/MyAlert';
import { ResultResponse } from '../serverResponses';


function Splash(props: (ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>)) {
    const navigation = useAppNavigation();

    const { alert, ui: alertBox } = getMyAlert();

    async function fetchSettings() {
        props.serviceActionPending();
        try {
            const { data } = await axios.get<ResultResponse>(settings);
            
            await props.serviceActionSuccess(data);
        } catch (error) {
            alert.showAlert('Network Error', error as string);
            props.serviceActionError(error);
        }
    };

    async function toNextRoute(data: any) {

        const user_id = await AsyncStorage.getItem("user_id");
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
            global.id = Number(user_id);

            const customer_name = await AsyncStorage.getItem("customer_name");
            const phone_number = await AsyncStorage.getItem("phone_number");
            const email = await AsyncStorage.getItem("email");

            global.customer_name = customer_name ?? '';
            global.phone_number = phone_number ?? '';
            global.email = email ?? '';

            navigation.reset({
                index: 0,
                routes: [{ name: 'homeScreen' }],
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
            });
        }
    };

    useEffect(() => {
        fetchSettings().then();
    }, []);

    useEffect(() => {
        if (props.data)
            toNextRoute(props.data);
    }, [props.data]);

    return (
        <Background useScroll={false} style={{ ...globalStyles.centerContent, alignItems: 'flex-end' }}>
            {alertBox}
            <Image style={{ width: '80%', resizeMode: 'contain', marginRight: '3%' }} source={logo} />
        </Background>
    );
}

function mapStateToProps(state: any) {
    return {
        isLoding: state.splash.isLoding,
        error: state.splash.error,
        data: state.splash.data,
        message: state.splash.message,
        status: state.splash.status,
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error: any) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data: any) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);