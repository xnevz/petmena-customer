import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Image, Keyboard, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { Container, Icon } from 'native-base';
import { Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { height_50, GOOGLE_KEY, LATITUDE_DELTA, LONGITUDE_DELTA, api_url, address, pin, font_title, font_description, app_name } from '../config/Constants';
import Snackbar from 'react-native-snackbar';
import { serviceActionPending, serviceActionError, serviceActionSuccess, editServiceActionPending, editServiceActionError, editServiceActionSuccess, updateServiceActionPending, updateServiceActionError, updateServiceActionSuccess } from '../actions/AddressActions';
import axios from 'axios';
import { connect } from 'react-redux';
import { Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import Geolocation from '@react-native-community/geolocation';

function Address(props) {

    const [state, msetState] = useState({
        address: 'Please select your location...',
        door_no: '',
        mapRegion: null,
        validation: true,
        address_id: props.route.params.id,
        open_map: 0,
        pin_code: '',
        isLoading: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    const mapRef = useRef(null);

    async function add_address() {
        setState({ isLoading: true });
        Keyboard.dismiss();
        checkValidate();
        if (state.validation) {
            props.serviceActionPending();
            await axios({
                method: 'post',
                url: api_url + address,
                data: { customer_id: global.id, pin_code: state.pin_code, address: state.address.toString(), door_no: state.door_no, latitude: state.latitude, longitude: state.longitude }
            })
                .then(async response => {
                    setState({ isLoading: false });
                    await props.serviceActionSuccess(response.data);
                    if (response.data.status == 1) {
                        await redirect(response.data);
                    } else {
                        alert(response.data.message);
                    }

                })
                .catch(error => {
                    setState({ isLoading: false });
                    showSnackbar("Sorry something went wrong!");
                    props.serviceActionError(error);
                });
        }
    }

    redirect = async (data) => {
        if (data.status == 1) {
            handleBackButtonClick();
        } else {
            alert(data.message);
        }
    }

    function checkValidate() {
        if (state.door_no == '') {
            state.validation = false;
            showSnackbar("Please enter door number");
            return true;
        } else if (state.address == 'Please select your location...') {
            state.validation = false;
            showSnackbar("Please select your location in map");
            return true;
        } else if (state.pin_code == '') {
            state.validation = false;
            showSnackbar("Sorry something went wrong");
            return true;
        } else {
            state.validation = true;
        }

    }

    function showSnackbar(msg) {
        Snackbar.show({
            title: msg,
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    function set_location() {
        if (props.address != undefined) {
            mapRef.animateToCoordinate({
                latitude: props.lat,
                longitude: props.lng,
            }, 1000);
        }
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }


    useEffect(() => {
        (async () => {
            if (Platform.OS === "ios") {
                await findType();
            } else {
                await requestCameraPermission();
            }
        })();

        const _unsubscribe = props.navigation.addListener("focus", () => {
            set_location();
        });

        return _unsubscribe;

    }, []);

    async function requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                'title': 'Location Access Required',
                'message': app_name + ' needs to Access your location for tracking'
            }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await findType();
            } else {
                handleBackButtonClick();
            }
        } catch (err) {
            handleBackButtonClick();
        }
    }

    async function findType() {
        if (state.address_id == 0) {
            await getInitialLocation();
        } else {
            await edit_address();
        }
    }

    async function edit_address() {
        setState({ isLoading: true });
        props.editServiceActionPending();
        await axios({
            method: 'get',
            url: api_url + address + '/' + state.address_id + '/edit',
        })
            .then(async response => {
                setState({ isLoading: false });
                await props.editServiceActionSuccess(response.data);
                setState({ open_map: 1 })
                setLocation();
            })
            .catch(error => {
                setState({ isLoading: false });
                showSnackbar("Sorry something went wrong!");
                props.editServiceActionError(error);
            });
    }

    function setLocation() {
        let region = {
            latitude: parseFloat(props.data.latitude),
            longitude: parseFloat(props.data.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        setState({ pin_code: props.data.pin_code, address: props.data.address, door_no: props.data.door_no, mapRegion: region })
    }

    async function update_address() {
        setState({ isLoading: true });
        Keyboard.dismiss();
        checkValidate();
        if (state.validation) {
            props.updateServiceActionPending();
            await axios({
                method: 'patch',
                url: api_url + address + '/' + state.address_id,
                data: { customer_id: global.id, pin_code: state.pin_code, address: state.address.toString(), door_no: state.door_no, latitude: state.latitude, longitude: state.longitude }
            })
                .then(async response => {
                    setState({ isLoading: false });
                    await props.updateServiceActionSuccess(response.data);
                    if (response.data.status == 1) {
                        await redirect(response.data);
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    setState({ isLoading: false });
                    alert(JSON.stringify(error));
                    showSnackbar("Sorry something went wrong!");
                    props.updateServiceActionError(error);
                });
        }
    }

    async function getInitialLocation() {

        Geolocation.getCurrentPosition(async (position) => {
            setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            setState({ mapRegion: region, open_map: 1 });

        }, error => console.log(error),
            { enableHighAccuracy: false, timeout: 10000 });
    }


    onRegionChange = async (value) => {
        setState({ address: 'Please wait...' });
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + value.latitude + ',' + value.longitude + '&key=' + GOOGLE_KEY)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.results[0].formatted_address != undefined) {
                    let address = responseJson.results[0].address_components;
                    let pin_code = address[address.length - 1].long_name;
                    setState({ pin_code: pin_code, address: responseJson.results[0].formatted_address, latitude: value.latitude, longitude: value.longitude });
                } else {
                    setState({ address: 'Sorry something went wrong' });
                }
            })
    }

    function search() {
        props.navigation.navigate('LocationSearch');
    }


    const { isLoding } = props

    return (
        <Container keyboardShouldPersistTaps='always' style={styles.address_style1} >
            <View>
                <View style={styles.address_style2}>
                    <TouchableOpacity style={styles.address_style3} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.address_style4} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.address_style5} />
                    <Text style={styles.address_style6}>Address</Text>
                </View>
            </View>
            {state.open_map == 1 && <View keyboardShouldPersistTaps='always'>
                <View style={styles.address_style7} >
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={(ref) => { mapRef = ref }}
                        style={styles.address_style8}
                        initialRegion={state.mapRegion}
                        onRegionChangeComplete={(region) => {
                            onRegionChange(region);
                        }}
                    >
                    </MapView>
                    <View style={styles.address_style9}>
                        <View style={styles.address_style10} >
                            <Image
                                style={styles.address_style11}
                                source={pin}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.address_style12} >
                    <View style={styles.address_style13} >
                        <Box>
                            <Text style={styles.address_style14} >Door no / Landmark</Text>
                        </Box>
                    </View>
                    <View style={styles.address_style15} >
                        <TextInput
                            style={styles.address_style16}
                            onChangeText={TextInputValue =>
                                setState({ door_no: TextInputValue })}
                            value={state.door_no}
                        />
                    </View>
                    <View style={styles.address_style17} />
                    <View style={styles.address_style18} >
                        <Box>
                            <Text style={styles.address_style19} >Address</Text>
                        </Box>
                    </View>
                    <View style={styles.address_style20} >
                        <Box>
                            <Text style={styles.address_style21} >
                                {state.address}
                            </Text>
                        </Box>
                    </View>
                </View>
            </View>}
            {state.open_map == 1 && <Box style={styles.address_style22} >
                <View style={styles.address_style23}>
                    <Button
                        title="DONE"
                        onPress={state.address_id != 0 ? update_address : add_address}
                        buttonStyle={styles.address_style24}
                        titleStyle={styles.address_style25}
                    />
                </View>
            </Box>}
            <Loader visible={isLoding} />
            <Loader visible={state.isLoading} />
        </Container>
    );
}


function mapStateToProps(state) {
    return {
        isLoding: state.address.isLoding,
        message: state.address.isLoding,
        status: state.address.isLoding,
        address: state.address.address,
        lat: state.address.lat,
        lng: state.address.lng,
        data: state.address.data
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
    editServiceActionPending: () => dispatch(editServiceActionPending()),
    editServiceActionError: (error) => dispatch(editServiceActionError(error)),
    editServiceActionSuccess: (data) => dispatch(editServiceActionSuccess(data)),
    updateServiceActionPending: () => dispatch(updateServiceActionPending()),
    updateServiceActionError: (error) => dispatch(updateServiceActionError(error)),
    updateServiceActionSuccess: (data) => dispatch(updateServiceActionSuccess(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);

const styles = StyleSheet.create({

    address_style1: { backgroundColor: colors.theme_bg_three },
    address_style2: { alignItems: 'flex-start', margin: 10 },
    address_style3: { width: 100, justifyView: 'center' },
    address_style4: { color: colors.theme_fg_two, fontSize: 30 },
    address_style5: { margin: 5 },
    address_style6: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    address_style7: { alignItems: 'center', justifyView: 'center' },
    address_style8: { width: '100%', height: height_50 },
    address_style9: { position: 'absolute' },
    address_style10: { height: 30, width: 25, top: -15 },
    address_style11: { flex: 1, width: undefined, height: undefined },
    address_style12: { width: '100%', padding: 20, backgroundColor: colors.theme_bg_three, marginBottom: 10 },
    address_style13: { flexDirection: 'row' },
    address_style14: { fontSize: 15, fontFamily: font_title, color: colors.theme_fg_two },
    address_style15: { width: '100%', marginTop: 5 },
    address_style16: { borderColor: colors.theme_fg, borderBottomWidth: 1, padding: 10, borderRadius: 5, height: 40, fontFamily: font_description },
    address_style17: { marginTop: 20 },
    address_style18: { flexDirection: 'row' },
    address_style19: { fontSize: 15, fontFamily: font_title, color: colors.theme_fg_two },
    address_style20: { flexDirection: 'row' },
    address_style21: { fontSize: 15, marginTop: 5, fontFamily: font_description },
    address_style22: { backgroundColor: colors.theme_bg_three },
    address_style23: { width: '90%', justifyView: 'center' },
    address_style24: { backgroundColor: colors.theme_bg, fontFamily: font_title },
    address_style25: { color: colors.theme_bg_three, fontFamily: font_description },

});

