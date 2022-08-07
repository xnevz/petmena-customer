import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, Link } from '@react-navigation/native';
import axios from 'axios';
import { Box, Button, Checkbox, Divider, FormControl, Input, Text, View } from 'native-base';
import React, { useEffect } from 'react';
import { Image, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import { connect } from 'react-redux';
import { serviceActionError, serviceActionPending, serviceActionSuccess } from '../actions/LoginActions';
import * as colors from '../assets/css/Colors';
import Background from '../components/Background';
import { api_url, font_description, font_title, login_path } from '../config/Constants';
import login_icon from './../assets/img/login.png';
import { useCheck, useInput } from '../customHooks/uiHooks';
import PasswordInput from '../components/PasswordInput';
import { useFcmToken } from '../customHooks/logicHooks';
import getMyAlert from '../components/MyAlert';
import BusyOverlay from '../components/BusyOverlay';
import { useAppNavigation } from '../../App';

function Login(props: any) {

    const fcmToken = useFcmToken();
    const navigation = useAppNavigation();

    const email = useInput(4);
    const password = useInput(4);
    const rememberMe = useCheck();

    const { alert, ui: alertBox } = getMyAlert();
    const { ui: busyBox, setIsOpen: setBusy } = BusyOverlay('Logging in ...');

    function handleBackButtonClick() {
        props.navigation.goBack(null);
        return true;
    }

    async function doLogin() {
        Keyboard.dismiss();
        if (email.validate() && password.validate()) {
            setBusy(true);
            props.serviceActionPending();

            try {
                const response = await axios.post(login_path, {
                    email: email.value,
                    password: password.value,
                    fcm_token: fcmToken,
                });

                if (response.data?.status === 0)
                    throw response.data.message;
                    
                await props.serviceActionSuccess(response.data);
                await saveData();
            } catch (error) {
                alert.showAlert('Error', error as string);
                props.serviceActionError(error);
            }
            setBusy(false);
        }
    };

    async function saveData() {
        if (props.status == 1) {
            try {
                await AsyncStorage.setItem('user_id', props.data.id.toString());
                await AsyncStorage.setItem(
                    'customer_name',
                    props.data.customer_name.toString()
                );
                await AsyncStorage.setItem(
                    'phone_number',
                    props.data.phone_number.toString()
                );
                await AsyncStorage.setItem('email', props.data.email.toString());
                global.id = props.data.id;
                global.customer_name = props.data.customer_name;
                global.phone_number = props.data.phone_number;
                global.email = props.data.email;
                goToHomeScreen();
            } catch (e) { }
        }
    };

    function goToHomeScreen() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'homeScreen' }],
        });
    };

    return (
        <Background>
            {busyBox}
            {alertBox}
            <View style={{ margin: 40 }}>

                {/* icon */}
                <Box style={{
                    padding: 30, alignSelf: 'center',
                    borderRadius: 100, backgroundColor: 'white',
                    marginBottom: 50,
                }}>
                    <Image source={login_icon} />
                </Box>

                <FormControl isInvalid={email.invalid}>
                    <Input keyboardType='email-address' placeholderTextColor={'red'} placeholder='Username or email' {...email} />
                    <FormControl.ErrorMessage>Username must be at least 4 characters long</FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={password.invalid}>
                    <PasswordInput {...password} />
                    <FormControl.ErrorMessage>Password must be at least 4 characters long</FormControl.ErrorMessage>
                </FormControl>

                <Checkbox value='rememberMe' {...rememberMe}>
                    <Text>Remember Password?</Text>
                </Checkbox>

                <Button leftIcon={<Icon color='#f0f' size={30} name='done' />} onPress={doLogin} />

                {/* forgot password */}
                <View style={{ display: 'flex', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <SimpleLineIcon size={15} name='key' style={{ marginEnd: 10 }} />
                    <Text>Forgot Password?</Text>
                </View>
                <Divider height={0.5} my='3' bg='#fff3' />

                {/* signup */}
                <Link to='/register' style={{ alignSelf: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <FeatherIcon size={15} name='user-plus' style={{ marginEnd: 10 }} />
                        <Text>Sign up</Text>
                    </View>
                </Link>

                {/* or */}
                <View alignItems={'center'} mt='5'>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Box my='3' width='30%' height={0.5} backgroundColor={'white'} />
                        <Text mx={3}>OR</Text>
                        <Box my='3' width='30%' height={0.5} backgroundColor={'white'} />
                    </View>

                    <Text mb={2}>Login with</Text>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '40%'
                    }}>
                        <AntIcon size={25} name='google' />
                        <AntIcon size={25} name='facebook-square' />
                        <AntIcon size={25} name='linkedin-square' />

                    </View>
                </View>
            </View>
        </Background>
    );
}

function mapStateToProps(state: any) {
    return {
        error: state.login.error,
        data: state.login.data,
        message: state.login.message,
        status: state.login.status,
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error: any) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data: any) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);