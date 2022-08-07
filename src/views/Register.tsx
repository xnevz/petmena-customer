import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, Link } from '@react-navigation/native';
import axios from 'axios';
import { Box, Button, Checkbox, Divider, Input, Select, Text, View, Link as NBLink } from 'native-base';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, Keyboard } from 'react-native';
import Snackbar from 'react-native-snackbar';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { useAppNavigation } from '../../App';
import { serviceActionError, serviceActionPending, serviceActionSuccess } from '../actions/RegisterActions';
import Background from '../components/Background';
import { api_url, get_blood_list, register_path } from '../config/Constants';
import { useFcmToken } from '../customHooks/logicHooks';
import signup_icon from './../assets/img/signup.png';


function Register(props: any) {
    const navigation = useAppNavigation();

    const [state, setState] = useState({
        customer_name: '',
        phone_number: '',
        email: '',
        password: '',
        blood_group: '',
        validation: true,
        blood_group_list: [],
        fcm_token: global.fcm_token,
    });

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [bloodGroupList, setBloodGroupList] = useState<string[]>([]);
    const fcmToken = useFcmToken();

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {

        Get_blood_list();
        BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonClick
        );

        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick
            );
        };

    }, []);


    function handleBackButtonClick() {
        navigation.navigate('login');
        return true;
    }

    function login() {
        navigation.navigate('login');
    };

    function home() {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            })
        );
    };

    async function Register() {
        Keyboard.dismiss();
        checkValidate();
        if (state.validation) {
            props.serviceActionPending();
            await axios({
                method: 'post',
                url: api_url + register_path,
                data: {
                    customer_name: state.customer_name,
                    fcm_token: state.fcm_token,
                    phone_number: state.phone_number,
                    email: state.email,
                    password: state.password,
                    blood_group: state.blood_group
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
            method: 'get',
            url: api_url + get_blood_list
        })
            .then(async (response) => {
                setState({ ...state, blood_group_list: response.data.result });
            })
            .catch((error) => {
                // alert('Sorry, something went wrong!')
            });
    }

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
                global.id = await props.data.id;
                global.customer_name = await props.data.customer_name;
                global.phone_number = await props.data.phone_number;
                global.email = await props.data.email;
                home();
            } catch (e) { }
        } else {
            // alert(props.message);
        }
    };

    function checkValidate() {
        if (
            state.email == '' ||
            state.phone_number == '' ||
            state.password == '' ||
            state.blood_group == '' ||
            state.customer_name == ''
        ) {
            state.validation = false;
            showSnackbar('Please fill all the fields.');
            return true;
        } else {
            state.validation = true;
            return true;
        }
    }

    function select_blood_group(value: string) {
        setState({ ...state, blood_group: value });
    }

    function showSnackbar(msg: string) {
        Snackbar.show({
            text: msg,
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    const { isLoding, error, data, message, status } = props;

    let bl_list = state.blood_group_list.map((s, i) => {
        // return <Picker.Item key={i} value={s.blood_group} label={s.blood_group} />;
    });

    return (
        <Background>
            <View style={{ margin: 40 }}>

                {/* icon */}
                <Box style={{
                    padding: 30, alignSelf: 'center',
                    borderRadius: 100, backgroundColor: 'white',
                    marginBottom: 50,
                }}>
                    <Image source={signup_icon} />
                </Box>

                <Input placeholder='Full name' />
                <Input type={showPassword ? 'text' : 'password'} placeholder='Pasword' InputRightElement={
                    <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color='muted.400' onPress={() => setShowPassword(!showPassword)} style={{ marginEnd: 10 }} />
                } />
                <Input keyboardType='email-address' placeholder='Email' />
                <View display='flex' flexDirection='row'>
                    <Input keyboardType='phone-pad' placeholder='Phone number' flex={1} />
                    <Box w='1/3'>
                        <Select placeholder='+1' ml={3} children={
                            [1, 2, 3].map(i => (<Select.Item label={i.toString()} value={i.toString()} />))
                        } />
                    </Box>

                </View>

                <Checkbox value='aggreeToTerms'>
                        <Text>Aggree to</Text>
                        <Box>
                            <NBLink m={0}>Terms &amp; Conditions</NBLink>
                        </Box>
                </Checkbox>

                <Button leftIcon={<Icon color='#f0f' size={30} name='done' />} />

                <Divider height={0.5} my='3' bg='#fff3' />

                {/* signup */}
                <Link to='/login' style={{ alignSelf: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <AntIcon size={15} name='login' style={{ marginEnd: 10 }} />
                        <Text>Login</Text>
                    </View>
                </Link>

            </View>
        </Background>
    );
}

function mapStateToProps(state: any) {
    return {
        isLoding: state.register.isLoding,
        error: state.register.error,
        data: state.register.data,
        message: state.register.message,
        status: state.register.status,
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error: any) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data: any) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);