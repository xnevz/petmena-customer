import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, Keyboard, View, Alert } from 'react-native';
import { Container, Icon, Textarea, Card, Box, Row } from 'native-base';
import { api_url, upload, image_upload, prescription, font_title, font_description, app_name } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/CreatePrescriptionActions';
import { reset } from '../actions/CartActions';

const options = {
    title: 'Select a photo',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
};

export function AddPrescription(props) {
    const [state, setState] = useState({
        image_one: { uri: upload },
        image_two: { uri: upload },
        image_three: { uri: upload },
        prescription_one: '',
        prescription_two: '',
        prescription_three: '',
        customer_notes: '',
        data: '',
        images: [],
        validation: true,
        isLoding: false
    });

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function select_photo(type) {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                if (type == 1) {
                    setState({
                        data: response.data,
                        image_one: { uri: response.uri }
                    });
                } else if (type == 2) {
                    setState({
                        data: response.data,
                        image_two: { uri: response.uri }
                    });
                } else if (type == 3) {
                    setState({
                        data: response.data,
                        image_three: { uri: response.uri }
                    });
                }
                image_update(type);
            }
        });
    }

    function image_update() {
        setState({ isLoding: true });
        // TODO
        // RNFetchBlob.fetch('POST', api_url + image_upload, {
        //     'Content-Type': 'multipart/Box-data',
        // }, [
        //     {
        //         name: 'image',
        //         filename: 'image.png',
        //         type: 'image/png',
        //         data: state.data
        //     }
        // ]).then((resp) => {
        //     setState({ isLoding: false });
        //     let data = JSON.parse(resp.data);
        //     if (data.status == 1 && type == 1) {
        //         setState({ prescription_one: data.result });
        //     } else if (data.status == 1 && type == 2) {
        //         setState({ prescription_two: data.result });
        //     } else if (data.status == 1 && type == 3) {
        //         setState({ prescription_three: data.result });
        //     }
        // }).catch((err) => {
        //     setState({ isLoding: false });
        //     alert("Error on while uploading,Try again");
        // })
    }

    async function add_prescription() {
        setState({ isLoding: true });
        Keyboard.dismiss();
        await make_images();
        checkValidate();
        if (state.validation) {
            props.serviceActionPending();
            await axios({
                method: 'post',
                url: api_url + prescription,
                data: { customer_id: global.id, images: state.images, customer_notes: state.customer_notes, vendor_id: props.current_vendor }
            })
                .then(async response => {
                    setState({ isLoding: false });
                    await props.serviceActionSuccess(response.data);
                    if (response.data.status == 1) {
                        Alert.alert(
                            'Success',
                            'Your prescription uploaded, ' + app_name + ' will contact you shortly.',
                            [
                                { text: 'OK', onPress: () => prescription_list() }
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Sorry something went wrong');
                    }
                })
                .catch(error => {
                    setState({ isLoding: false });
                    props.serviceActionError(error);
                });
        }
    }

    async function prescription_list() {
        props.navigation.navigate('Prescription');
    }

    async function make_images() {
        let images = [];
        if (state.prescription_one) {
            images = state.prescription_one;
        }
        if (state.prescription_two) {
            images = images + ',' + state.prescription_two;
        }
        if (state.prescription_three) {
            images = images + ',' + state.prescription_three;
        }

        setState({ images: images });
        return true;

    }

    function checkValidate() {
        if (state.prescription_one == '' && state.prescription_two == '' && state.prescription_three == '') {
            state.validation = false;
            alert("Please upload images");
            return true;
        } else {
            state.validation = true;
            return true;
        }
    }

    return (
        <Container>
            <View>
                <View style={styles.ap_style1}>
                    <TouchableOpacity style={styles.ap_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.ap_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.ap_style4} />
                    <Text style={styles.ap_style5}>Add Prescription</Text>
                </View>
            </View>
            <View style={styles.ap_style6} />
            <View padder>
                <Card>
                    <Box header>
                        <Text style={styles.ap_style7}>You can upload maximum 3 images</Text>
                    </Box>
                    <Box button>
                        <Box>
                            <TouchableOpacity onPress={select_photo.bind(this, 1)}>
                                <Image
                                    style={styles.ap_style8}
                                    resizeMode='cover'
                                    source={state.image_one}
                                />
                            </TouchableOpacity>
                        </Box>
                        <Box>
                            <TouchableOpacity onPress={select_photo.bind(this, 2)}>
                                <Image
                                    style={styles.ap_style8}
                                    resizeMode='cover'
                                    source={state.image_two}
                                />
                            </TouchableOpacity>
                        </Box>
                        <Box>
                            <TouchableOpacity onPress={select_photo.bind(this, 3)}>
                                <Image
                                    style={styles.ap_style8}
                                    resizeMode='cover'
                                    source={state.image_three}
                                />
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </Card>
                <Box>
                    <Textarea onChangeText={TextInputValue => setState({ customer_notes: TextInputValue })} rowSpan={5} bordered placeholder="Notes" />
                </Box>
            </View>
            <Box style={styles.ap_style9} >
                <TouchableOpacity activeOpacity={1} onPress={() => add_prescription()} style={styles.ap_style10}>
                    <Row>
                        <Box style={styles.ap_style11} >
                            <Text style={styles.ap_style12} >ADD PRESCRIPTION</Text>
                        </Box>
                    </Row>
                </TouchableOpacity>
            </Box>
            <Loader visible={state.isLoding} />
        </Container>);
}

function mapStateToProps(state) {
    return {
        isLoding: state.create_prescription.isLoding,
        error: state.create_prescription.error,
        data: state.create_prescription.data,
        message: state.create_prescription.message,
        status: state.create_prescription.status,
        address_id: state.create_prescription.address_id,
        address: state.create_prescription.address,
        current_vendor: state.cart.current_vendor,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
    reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPrescription);

const styles = StyleSheet.create({
    ap_style1: { alignItems: 'flex-start', margin: 10 },
    ap_style2: { width: 100, justifyContent: 'center' },
    ap_style3: { color: colors.theme_fg_two, fontSize: 30 },
    ap_style4: { margin: 5 },
    ap_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    ap_style6: { margin: 20 },
    ap_style7: { fontFamily: font_description },
    ap_style8: {
        width: 100,
        height: 70,
        alignSelf: 'center',
        borderColor: colors.theme_bg_three,
        borderWidth: 1
    },
    ap_style9: {
        backgroundColor: 'transparent'
    },
    ap_style10: {
        width: '100%',
        backgroundColor: colors.theme_bg
    },
    ap_style11: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    ap_style12: {
        color: colors.theme_fg_three,
        fontFamily: font_title
    }
});
