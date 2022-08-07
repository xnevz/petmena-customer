import React, { Component, useState } from 'react';
import { StyleSheet, Text, Image, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Icon, Card, CardItem, Col, Footer, Row } from 'native-base';
import { api_url, img_url, reject_order, font_title, font_description } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import { Divider, Button } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ViewPrescriptionActions';
import ImageView from 'react-native-image-view';
function ViewPrescription(props) {

    const [state, msetState] = useState({
        data: props.route.params.data,
        image: [],
        isImageViewVisible: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function accept_order() {
        props.navigation.navigate('payment', { from: 'prescription', prescription_id: state.data.id, prescription_total: state.data.total });
    }

    async function reject_order() {
        props.serviceActionPending();
        await axios({
            method: 'post',
            url: api_url + reject_order,
            data: { prescription_id: state.data.id }
        })
            .then(async response => {
                await props.serviceActionSuccess(response.data)
                if (response.data.status == 1) {
                    Alert.alert(
                        "Rejected",
                        "This prescription successfully rejected.",
                        [
                            { text: "OK", onPress: () => props.navigation.goBack(null) }
                        ],
                        { cancelable: false }
                    );

                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                props.serviceActionError(error);
            });
    }

    view_image = (data) => {
        let image = [
            {
                source: {
                    uri: img_url + data,
                },
                title: 'Prescription Image',
                width: 806,
                height: 720
            }
        ]

        setState({ image: image, isImageViewVisible: true });
    }

    function close_popup() {
        setState({ isImageViewVisible: false });
    }



    const { isLoding } = props

    return (
        <Container>
            <View>
                <View style={styles.view_style1}>
                    <TouchableOpacity style={styles.view_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.view_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.view_style4} />
                    <Text style={styles.view_style5}>View Prescription</Text>
                </View>
            </View>
            <View style={styles.view_style6} />
            <View>
                <ImageView
                    images={state.image}
                    imageIndex={0}
                    isVisible={state.isImageViewVisible}
                    onClose={() => close_popup()}
                />
                <Card>
                    <Box header>
                        <Text style={styles.view_style7}>Prescription images</Text>
                    </Box>
                    <Box>
                        {state.data.images.map((row, index) => (
                            <Box onPress={() => view_image(row)}>
                                <Image
                                    style={styles.view_style8}
                                    resizeMode='cover'
                                    source={{ uri: img_url + row }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Card>
                {state.data.customer_notes &&
                    <Card>
                        <Box header>
                            <Text style={styles.view_style9}>Your Notes</Text>
                        </Box>
                        <Box>
                            <Text style={styles.view_style10}>{state.data.customer_notes}</Text>
                        </Box>
                    </Card>
                }

                <Card>
                    <Box header>
                        <Text style={styles.view_style11}>Delivery Address</Text>
                    </Box>
                    <View style={styles.view_style12}>
                        <Text style={styles.view_style13}>{state.data.door_no},</Text>
                        <Text style={styles.view_style14}>{state.data.address}</Text>
                    </View>
                </Card>
                {state.data.status != 1 &&
                    <Card>
                        <Box header>
                            <Text style={styles.view_style15}>Cart Items</Text>
                        </Box>
                        {state.data.items.map((row, index) => (
                            <Box>
                                <Row>
                                    <Box style={styles.view_style16} >
                                        <Text style={styles.view_style17} >{row.qty}x</Text>
                                    </Box>
                                    <Box style={styles.view_style18}>
                                        <Text style={styles.view_style19}>{row.product_name}</Text>
                                    </Box>
                                    <Box style={styles.view_style20} >
                                        <Text style={styles.view_style21}>{global.currency}{row.price}</Text>
                                    </Box>
                                </Row>
                            </Box>
                        ))}
                        <Divider style={styles.view_style22} />
                        <Row style={styles.view_style23} >
                            <Box>
                                <Text style={styles.view_style24}>Subtotal</Text>
                            </Box>
                            <Box style={styles.view_style25} >
                                <Text style={styles.view_style26}>{global.currency}{state.data.sub_total}</Text>
                            </Box>
                        </Row>
                        <Row style={styles.view_style27} >
                            <Box>
                                <Text style={styles.view_style28}>Delivery Charge</Text>
                            </Box>
                            <Box style={styles.view_style29} >
                                <Text style={styles.view_style30}>{global.currency}{state.data.delivery_charge}</Text>
                            </Box>
                        </Row>
                        <Row style={styles.view_style31} >
                            <Box>
                                <Text style={styles.view_style32}>Tax</Text>
                            </Box>
                            <Box style={styles.view_style33} >
                                <Text style={styles.view_style34}>{global.currency}{state.data.tax}</Text>
                            </Box>
                        </Row>
                        <View style={styles.view_style35} />
                        <Divider style={styles.view_style36} />
                        <Row style={styles.view_style37} >
                            <Box>
                                <Text style={styles.view_style38}>Total</Text>
                            </Box>
                            <Box style={styles.view_style39} >
                                <Text style={styles.view_style40} >{global.currency}{state.data.total}</Text>
                            </Box>
                        </Row>
                        <View style={styles.view_style41} />
                    </Card>
                }
            </View>
            {state.data.status == 9 &&
                <Box style={styles.view_style42} >
                    <Row style={styles.view_style43}>
                        <Box>
                            <Button
                                title="Reject"
                                onPress={reject_order}
                                buttonStyle={styles.view_style44}
                            />
                        </Box>
                        <Box style={styles.view_style45} />
                        <Box>
                            <Button
                                title="Accept"
                                onPress={accept_order}
                                buttonStyle={styles.view_style46}
                            />
                        </Box>
                    </Row>
                </Box>
            }
            <Loader visible={isLoding} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.view_prescription.isLoding,
        error: state.view_prescription.error,
        data: state.view_prescription.data,
        message: state.view_prescription.message,
        status: state.view_prescription.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(ViewPrescription);

const styles = StyleSheet.create({
    view_style1: { alignItems: 'flex-start', margin: 10 },
    view_style2: { width: 100, justifyContent: 'center' },
    view_style3: { color: colors.theme_fg_two, fontSize: 30 },
    view_style4: { margin: 5 },
    view_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    view_style6: { margin: 20 },
    view_style7: { fontFamily: font_title, color: colors.theme_fg_two },
    view_style8: {
        width: 100,
        height: 70,
        alignSelf: 'center',
        borderColor: colors.theme_bg_three,
        borderWidth: 1
    },
    view_style9: { fontFamily: font_title, color: colors.theme_fg_two },
    view_style10: { fontFamily: font_description },
    view_style11: { fontFamily: font_title, color: colors.theme_fg_two },
    view_style12: { paddingLeft: 20, paddingRight: 20, paddingBottom: 10 },
    view_style13: { fontFamily: font_description },
    view_style14: { fontFamily: font_description },
    view_style15: { fontFamily: font_title, color: colors.theme_fg_two },
    view_style16: { width: 40 },
    view_style17: { fontFamily: font_title },
    view_style18: { width: '70%' },
    view_style19: { fontFamily: font_description },
    view_style20: { width: 80 },
    view_style21: { fontFamily: font_description },
    view_style22: {
        backgroundColor: colors.theme_fg_two,
        width: '90%',
        alignSelf: 'center'
    },
    view_style23: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    view_style24: { fontFamily: font_title },
    view_style25: { width: 80 },
    view_style26: { fontFamily: font_description },
    view_style27: {
        backgroundColor: colors.theme_fg_two,
        width: '90%',
        alignSelf: 'center'
    },
    view_style28: { fontFamily: font_title },
    view_style29: { width: 80 },
    view_style30: { fontFamily: font_description },
    view_style31: {
        backgroundColor: colors.theme_fg_two,
        width: '90%',
        alignSelf: 'center'
    },
    view_style32: { fontFamily: font_title },
    view_style33: { width: 80 },
    view_style34: { fontFamily: font_description },
    view_style35: { marginBottom: 20 },
    view_style36: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    view_style37: {
        backgroundColor: colors.theme_fg_two,
        width: '90%',
        alignSelf: 'center'
    },
    view_style38: { fontFamily: font_title },
    view_style39: { width: 80 },
    view_style40: { fontFamily: font_title },
    view_style41: { marginBottom: 20 },
    view_style42: { backgroundColor: 'transparent' },
    view_style43: { padding: 10 },
    view_style44: { backgroundColor: colors.red, fontFamily: font_title },
    view_style45: { width: 10 },
    view_style46: { backgroundColor: colors.theme_fg, fontFamily: font_title },
});
