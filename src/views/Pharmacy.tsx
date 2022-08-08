import axios from 'axios';
import LottieView from 'lottie-react-native';
import { Input, Row, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { serviceActionError, serviceActionPending, serviceActionSuccess } from '../actions/HomeActions';
import { productListReset } from '../actions/ProductActions';
import * as colors from '../assets/css/Colors';
import Background from '../components/Background';
import { Loader } from '../components/GeneralComponents';
import { api_url, font_description, font_title, home_banners, img_url, no_data_lottie, vendor_list } from '../config/Constants';
import { Banner } from '../serverResponses';

function Pharmacy(props: any) {
    const [state, setState] = useState({
        isChecked: false,
        result: [],
        address: 'Please choose address',
        last_active_address: 0,
        search: '',
        isLoding: false,
        api_status: 0,
        vendor_list: []
    });

    const [banners, setBanners] = useState<Banner[]>([]);

    async function get_banners() {
        setState({ ...state, isLoding: true });
        console.log('fetching');
        try {
            const response = await axios.get(home_banners);
            console.log(response.data);
            setState({ ...state, isLoding: false });
            setBanners(response.data.result);
        } catch (error) {
            console.log(error);
            setState({ ...state, isLoding: false });
        }
    }

    useEffect(() => {
        get_banners();
    }, []);

    async function updateSearch(search: string) {
        setState({ ...state, search });
        await get_vendor();
    }

    async function get_vendor() {
        //setState({ ...state, isLoding : true });
        //props.serviceActionPending();
        try {

            const response = await axios.post(vendor_list, {
                customer_id: global.id, search: state.search
            });

            setState({
                ...state,
                vendor_list: response.data.result,
                api_status: 1
            });
            await props.serviceActionSuccess(response.data);

            if (response.data.last_active_address) {
                setState({
                    ...state,
                    last_active_address: response.data.last_active_address,
                    address: response.data.address.address
                });
            }

        } catch (error) {
            //setState({ ...state, isLoding : false });
            await props.serviceActionError(error);
        };
    };

    async function move_to_category(data: any) {
        if (data.online_status == 1) {
            await props.navigation.navigate('category', { vendor: data });
        }
    }

    function select_address() {
        props.navigation.navigate('addressList', { from: 'home' });
    }

    async function move_to_vendor_detail(id: number) {
        await props.navigation.navigate('vendorDetails', { id: id });
    }

    const { isLoding, data } = props;

    return (
        <Background useBackPattern={false} color='grey'>
            <TouchableOpacity activeOpacity={1} onPress={select_address} style={styles.ph_style1}>
                <IconFontAwesome size={20} style={styles.ph_style2} name='map' />
                <View style={styles.ph_style3} />
                <Text numberOfLines={1} style={styles.ph_style4}>{state.address}</Text>
            </TouchableOpacity>
            <View>
                <Input
                    size='md' mx={5} color={colors.primary}
                    placeholder='Search vendor ...'
                    InputLeftElement={
                        <View ml={4}>
                            <Icon size={20} name='search1' />
                        </View>
                    } textTransform='uppercase'
                    onChangeText={updateSearch}
                    value={state.search}
                />

                <View style={styles.ph_style7}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {banners?.map((item, index) => (
                            <ImageBackground key={index} source={{ uri: item.url }} style={styles.ph_style9} />
                        ))}
                    </ScrollView>
                </View>

                {data != 0 && data != undefined && (
                    <View>
                        {data?.map((item: any, index: number) => (
                            <TouchableOpacity key={index} onPress={() => move_to_category(item)} activeOpacity={1} style={styles.ph_style10}>
                                <View style={styles.ph_style11} />
                                <Image style={styles.ph_style12} source={{ uri: img_url + item.store_image }} />
                                <View style={styles.ph_style13} />
                                <View style={styles.ph_style14}>
                                    <Text style={styles.ph_style15}>
                                        {item.store_name}
                                    </Text>
                                    <Text style={styles.ph_style16} numberOfLines={1} >{item.manual_address}</Text>
                                </View>
                                <View style={styles.ph_style17} />
                                <Row>
                                    <View style={styles.ph_style18}>
                                        {item.overall_ratings != 0 &&
                                            <View style={styles.ph_style19}>
                                                <Icon
                                                    name='star'
                                                    size={17}
                                                    color='#eb9e3e'
                                                />
                                                <Text style={styles.ph_style21}>{item.overall_ratings}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.ph_style22}>
                                        <Text style={styles.ph_style23}>
                                            ({item.no_of_ratings} customers reviews)
                                        </Text>
                                    </View>
                                    <View style={styles.ph_style24}>
                                        {item.online_status == 1 ?
                                            <Text style={styles.ph_style25} >
                                                Open
                                            </Text>
                                            :
                                            <Text style={styles.ph_style26} >
                                                Closed
                                            </Text>
                                        }
                                    </View>
                                </Row>
                                <View style={styles.ph_style27} />
                                <Divider />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                {state.vendor_list?.length == 0 && state.api_status == 1 &&
                    <View style={styles.ph_style29}>
                        <LottieView source={no_data_lottie} autoPlay loop />
                    </View>
                }
                <Loader visible={isLoding} />
                <Loader visible={state.isLoding} />
            </View>
        </Background>
    );
}

function mapStateToProps(state: any) {
    return {
        isLoding: state.home.isLoding,
        error: state.home.error,
        data: state.home.data,
        message: state.home.message,
        status: state.home.status,
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error: any) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data: any) => dispatch(serviceActionSuccess(data)),
    productListReset: () => dispatch(productListReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pharmacy);

const styles = StyleSheet.create({
    ph_style1: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    ph_style2: { color: colors.theme_fg },
    ph_style3: { margin: 5 },
    ph_style4: { width: '80%', fontFamily: font_description },
    ph_style7: { paddingLeft: 10, paddingRight: 10, paddingTop: 10, flexDirection: 'row' },
    ph_style8: { borderRadius: 10 },
    ph_style9: { height: 140, width: 260, borderRadius: 10, marginRight: 10 },
    ph_style10: { padding: 10 },
    ph_style11: { margin: 5 },
    ph_style12: { alignSelf: 'center', height: 220, width: 335, borderRadius: 10 },
    ph_style13: { margin: 5 },
    ph_style14: { alignItems: 'center' },
    ph_style15: { color: colors.theme_fg, fontSize: 16, fontFamily: font_title },
    ph_style16: { fontSize: 11, color: 'grey', fontFamily: font_description },
    ph_style17: { margin: 5 },
    ph_style18: { width: '15%' },
    ph_style19: { flexDirection: 'row' },
    ph_style20: { marginRight: 5 },
    ph_style21: { fontFamily: font_description },
    ph_style22: { alignSelf: 'center' },
    ph_style23: { fontSize: 12, color: '#C4C3C3', fontFamily: font_description },
    ph_style24: { alignSelf: 'center', width: '15%' },
    ph_style25: {
        fontSize: 10,
        color: colors.theme_bg_three,
        padding: 2,
        paddingLeft: 5,
        borderRadius: 10,
        width: 50,
        textAlign: 'center',
        fontFamily: font_description,
    },
    ph_style26: {
        fontSize: 10,
        color: colors.theme_bg_three,
        padding: 2,
        paddingLeft: 5,
        borderRadius: 10,
        width: 50,
        textAlign: 'center',
        fontFamily: font_description,
    },
    ph_style27: { margin: 10 },
    ph_style29: { height: 250, marginTop: '20%' },
});
