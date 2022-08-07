import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Container, Box, Icon } from 'native-base';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { Loader } from '../components/GeneralComponents';
import { listServiceActionPending, listServiceActionError, listServiceActionSuccess, deleteServiceActionPending, deleteServiceActionError, deleteServiceActionSuccess } from '../actions/AddressListActions';
import { selectAddress } from '../actions/CartActions';
import { api_url, address_list, address_delete, img_url, last_active_address, font_title, font_description, no_address_lottie } from '../config/Constants';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import * as colors from '../assets/css/Colors';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import LottieView from 'lottie-react-native';

function AddressList(props) {

    const [state, msetState] = useState({
        dialogVisible: false,
        deleting_address: 0,
        from: props.route.params.from,
        isLoding: false,
        api_status: 0,
        result: []
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    useEffect(() => {
        const _unsubscribe = props.navigation.addListener('focus', () => {
            Address_list();
        });

        return _unsubscribe;

    }, []);


    async function Address_list() {
        setState({ isLoding: true });
        setState({ dialogVisible: false })
        props.deleteServiceActionPending();
        await axios({
            method: 'post',
            url: api_url + address_list,
            data: { customer_id: global.id }
        })
            .then(async response => {
                //alert(JSON.stringify(response));
                setState({ isLoding: false, result: response.data.result, api_status: 1 });
                await props.deleteServiceActionSuccess(response.data);
            })
            .catch(error => {
                setState({ isLoding: false });
                props.deleteServiceActionError(error);
            });
    }

    async function address_delete() {
        setState({ isLoding: true });
        setState({ dialogVisible: false })
        props.deleteServiceActionPending();
        await axios({
            method: 'post',
            url: api_url + address_delete,
            data: { customer_id: global.id, address_id: state.deleting_address }
        })
            .then(async response => {
                setState({ isLoding: false });
                await props.deleteServiceActionSuccess(response.data);
                await setState({ deleting_address: 0 });

            })
            .catch(error => {
                setState({ isLoding: false });
                props.deleteServiceActionError(error);
            });
    }

    function open_popup(id) {
        setState({ dialogVisible: true, deleting_address: id })
    }

    function close_popup() {
        setState({ dialogVisible: false, deleting_address: 0 })
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function add_address() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {
                props.navigation.navigate('address', { id: 0 });
            }).catch(err => {
                alert('Please enable your location');
            });
    }

    edit_address = (id) => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {
                props.navigation.navigate('address', { id: id });
            }).catch(err => {
                alert('Please enable your location');
            });

    }

    let select_address = async (id) => {
        setState({ isLoding: true });
        await axios({
            method: 'post',
            url: api_url + last_active_address,
            data: { customer_id: global.id, address_id: id }
        })
            .then(async response => {
                setState({ isLoding: false });
                if (response.data.status == 1) {
                    handleBackButtonClick();
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                setState({ isLoding: false });
                alert('Sorry something went wrong');
            });
    }

    const { isLoding, data } = props

    const address_list_view = data.map((row, key) => {
        return (
            <View style={styles.add_list_style1} >
                <View style={styles.add_list_style2} >
                    <Box>
                        <Text style={styles.add_list_style3} >Address #{key + 1}</Text>
                    </Box>
                </View>
                <View style={styles.add_list_style4} >
                    <Image
                        style={styles.add_list_style5}
                        source={{ uri: img_url + row.static_map }}
                    />
                </View>
                <View style={styles.add_list_style6} >
                    <Box>
                        <Text style={styles.add_list_style7} >
                            {row.door_no}
                        </Text>
                        <Text style={styles.add_list_style7} >
                            {row.address}
                        </Text>
                    </Box>
                </View>
                <View style={styles.add_list_style8} >
                    <Box style={styles.add_list_style9} >
                        <Text onPress={edit_address.bind(this, row.id)} style={styles.add_list_style10} >EDIT</Text>
                    </Box>
                    {/*<Box style={{ width:'25%' }}>
              <Text onPress={open_popup.bind(this,row.id)} style={styles.btn} >DELETE</Text>
            </Box>*/}
                    {state.from == 'home' &&
                        <Box style={styles.add_list_style11}>
                            <Text onPress={select_address.bind(this, row.id)} style={styles.add_list_style12} >SELECT</Text>
                        </Box>
                    }
                </View>
            </View>
        )
    })

    return (
        <Container style={styles.add_list_style13} >
            <View>
                <View style={styles.add_list_style14}>
                    <TouchableOpacity style={styles.add_list_style15} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.add_list_style16} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.add_list_style17} />
                    <Text style={styles.add_list_style18}>Address List</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.add_list_style19} >
                    {address_list_view}
                    {data.length == 0 && state.api_status == 1 &&
                        <View>
                            <View style={styles.add_list_style20}>
                                <LottieView source={no_address_lottie} autoPlay loop />
                            </View>
                            <Text style={styles.add_list_style21}>How can we find you?</Text>
                        </View>
                    }
                </View>
            </ScrollView>
            <Box style={styles.add_list_style22} >
                <View style={styles.add_list_style23}>
                    <Button
                        title="ADD NEW ADDRESS"
                        onPress={add_address}
                        buttonStyle={styles.add_list_style24}
                        titleStyle={styles.add_list_style25}
                    />
                </View>
            </Box>
            <Loader visible={isLoding} />
            <Loader visible={state.isLoding} />
            <ConfirmDialog
                title="Confirm Dialog"
                message="Are you sure about that?"
                animationType="fade"
                visible={state.dialogVisible}
                onTouchOutside={() => setState({ dialogVisible: false })}
                positiveButton={{
                    title: "YES",
                    onPress: address_delete,
                    titleStyle: {
                        color: colors.theme_fg,
                        fontFamily: font_description
                    },
                }}
                negativeButton={{
                    title: "NO",
                    onPress: () => setState({ dialogVisible: false }),
                    titleStyle: {
                        color: colors.theme_fg,
                        fontFamily: font_description
                    },
                }}
            />
        </Container>
    );
}


function mapStateToProps(state) {
    return {
        isLoding: state.address_list.isLoding,
        message: state.address_list.isLoding,
        status: state.address_list.isLoding,
        data: state.address_list.data,
        address_count: state.address_list.address_count
    };
}

const mapDispatchToProps = (dispatch) => ({
    listServiceActionPending: () => dispatch(listServiceActionPending()),
    listServiceActionError: (error) => dispatch(listServiceActionError(error)),
    listServiceActionSuccess: (data) => dispatch(listServiceActionSuccess(data)),
    deleteServiceActionPending: () => dispatch(deleteServiceActionPending()),
    deleteServiceActionError: (error) => dispatch(deleteServiceActionError(error)),
    deleteServiceActionSuccess: (data) => dispatch(deleteServiceActionSuccess(data)),
    selectAddress: (data) => dispatch(selectAddress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);

const styles = StyleSheet.create({
    add_list_style1: {
        width: '100%',
        padding: 10,
        backgroundColor: colors.theme_bg_three,
        marginBottom: 10
    },
    add_list_style2: { flexDirection: 'row' },
    add_list_style3: {
        fontSize: 15,
        fontFamily: font_title,
        color: colors.theme_fg_two
    },
    add_list_style4: {
        height: 100,
        width: '100%',
        marginTop: 10
    },
    add_list_style5: { flex: 1, width: undefined, height: undefined },
    add_list_style6: { flexDirection: 'row' },
    add_list_style7: {
        fontSize: 15,
        marginTop: 5,
        fontFamily: font_description
    },
    add_list_style8: {
        flexDirection: 'row',
        marginTop: 10
    },
    add_list_style9: { width: '25%' },
    add_list_style10: {
        fontSize: 14,
        fontFamily: font_title,
        color: colors.theme_fg,
        fontFamily: font_title
    },
    add_list_style11: { width: '25%' },
    add_list_style12: {
        fontSize: 14,
        fontFamily: font_title,
        color: colors.theme_fg,
        fontFamily: font_title
    },
    add_list_style13: { backgroundColor: colors.theme_bg_two },
    add_list_style14: { alignItems: 'flex-start', margin: 20 },
    add_list_style15: { width: 100, justifyContent: 'center' },
    add_list_style16: { color: colors.theme_fg_two, fontSize: 30 },
    add_list_style17: { margin: 5 },
    add_list_style18: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    add_list_style19: {
        alignItems: 'center'
    },
    add_list_style20: { height: 250, marginTop: '30%' },
    add_list_style21: { alignSelf: 'center', fontFamily: font_title },
    add_list_style22: {
        backgroundColor: colors.theme_bg_three
    },
    add_list_style23: {
        width: '90%',
        justifyContent: 'center'
    },
    add_list_style24: {
        backgroundColor: colors.theme_bg,
        fontFamily: font_title
    },
    add_list_style25: { color: colors.theme_bg_three, fontFamily: font_description },

});

