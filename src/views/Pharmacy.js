import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Loader } from '../components/GeneralComponents';
import { img_url, api_url, vendor_list, home_banners, font_title, font_description, no_data_lottie } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/HomeActions';
import { productListReset } from '../actions/ProductActions';
import { Icon, Divider, SearchBar } from 'react-native-elements';
import { Container, Row } from 'native-base';
import LottieView from 'lottie-react-native';

function Pharmacy(props) {
    const [state, msetState] = useState({
        isChecked: false,
        result: [],
        address: "Please choose address",
        last_active_address: 0,
        banners: [],
        search: '',
        isLoding: false,
        api_status: 0,
        vendor_list: []
    });

    function setState(nstate) {
        msetState({ ...state, ...mstate });
    }

    let _menu = null;

    setMenuRef = (ref) => {
        _menu = ref;
    };

    function hideMenu() {
        _menu.hide();
    };

    function showMenu() {
        _menu.show();
    };

    function open_filter() {
        RBSheet.open();
    };


    async function get_banners() {
        setState({ isLoding: true });
        await axios({
            method: "get",
            url: api_url + home_banners
        })
            .then(async (response) => {
                setState({ isLoding: false });
                setState({ banners: response.data.result });
            })
            .catch((error) => {
                setState({ isLoding: false });
                alert("Something went wrong");
            });
    }

    useEffect(() => {

        get_banners();

        const _unsubscribe = props.navigation.addListener('focus', () => {
            get_vendor();
        });

        return _unsubscribe;
    }, []);

    updateSearch = async (search) => {
        setState({ search: search });
        await get_vendor();
    };

    async function get_vendor() {
        //setState({ isLoding : true });
        //props.serviceActionPending();
        try {

            const response = await axios.post(api_url + vendor_list, {
                customer_id: global.id, search: state.search
            });

            setState({ vendor_list: response.data.result, api_status: 1 });
            await props.serviceActionSuccess(response.data);

            if (response.data.last_active_address) {
                setState({ last_active_address: response.data.last_active_address, address: response.data.address.address });
            }

        } catch (error) {
            //setState({ isLoding : false });
            await props.serviceActionError(error);
        };
    };

    move_to_category = async (data) => {
        if (data.online_status == 1) {
            await props.navigation.navigate("category", { vendor: data });
        }
    };

    function select_address() {
        props.navigation.navigate("addressList", { from: 'home' });
    }

    move_to_vendor_detail = async (id) => {
        await props.navigation.navigate("vendorDetails", { id: id });
    };


    const { isLoding, data } = props;
    return (
        <Container>
            <TouchableOpacity activeOpacity={1} onPress={select_address.bind(this)} style={styles.ph_style1}>
                <Icon style={styles.ph_style2} name='map' />
                <View style={styles.ph_style3} />
                <Text numberOfLines={1} style={styles.ph_style4}>{state.address}</Text>
            </TouchableOpacity>
            <View>
                <SearchBar
                    placeholder="Search vendor ..."
                    onChangeText={updateSearch}
                    value={state.search}
                    platform="ios"
                    inputContainerStyle={styles.ph_style5}
                    containerStyle={styles.ph_style6}
                />
                <View style={styles.ph_style7}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {state.banners?.map((item, index) => (
                            <ImageBackground key={index} source={{ uri: item.url }} imageStyle={styles.ph_style8} style={styles.ph_style9}>
                            </ImageBackground>
                        ))}
                    </ScrollView>
                </View>

                {data != 0 && data != undefined && (
                    <View>
                        {data?.map((item, index) => (
                            <TouchableOpacity key={index} onPress={move_to_category.bind(this, item)} activeOpacity={1} style={styles.ph_style10}>
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
                                                    name="star"
                                                    size={17}
                                                    type="font-awesome"
                                                    color="#eb9e3e"
                                                    iconStyle={styles.ph_style20}
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
                                <Divider style={styles.ph_style28} />
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
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.home.isLoding,
        error: state.home.error,
        data: state.home.data,
        message: state.home.message,
        status: state.home.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
    productListReset: () => dispatch(productListReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pharmacy);

const styles = StyleSheet.create({
    ph_style1: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderViewor: colors.theme_fg,
        alignItems: 'center',
    },
    ph_style2: { color: colors.theme_fg },
    ph_style3: { margin: 5 },
    ph_style4: { width: '80%', fontFamily: font_description },
    ph_style5: { backgroundViewor: colors.light_grey },
    ph_style6: { backgroundViewor: colors.theme_bg_three, height: 40 },
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
    ph_style18: { width: "15%" },
    ph_style19: { flexDirection: 'row' },
    ph_style20: { marginRight: 5 },
    ph_style21: { fontFamily: font_description },
    ph_style22: { alignSelf: 'center' },
    ph_style23: { fontSize: 12, color: '#C4C3C3', fontFamily: font_description },
    ph_style24: { alignSelf: 'center', width: '15%' },
    ph_style25: {
        fontSize: 10,
        color: colors.theme_bg_three,
        backgroundViewor: colors.green,
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
        backgroundViewor: colors.red,
        padding: 2,
        paddingLeft: 5,
        borderRadius: 10,
        width: 50,
        textAlign: 'center',
        fontFamily: font_description,
    },
    ph_style27: { margin: 10 },
    ph_style28: { backgroundViewor: colors.theme_fg },
    ph_style29: { height: 250, marginTop: '20%' },
});
