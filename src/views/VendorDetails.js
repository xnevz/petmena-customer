import React, { Component, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Card, Left, Body, Right, Col, Row, View, Icon, ListItem, List } from 'native-base';
import { img_url, api_url, height_20, vendor_detail, font_description, font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import { Avatar } from 'react-native-elements';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/VendorActions';
import axios from 'axios';
import { connect } from 'react-redux';
function VendorDetails(props) {
    const [state, msetState] = useState({
        id: props.route.params.id,
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    useEffect(() => {
        getSubCategory();
    }, []);

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    };

    async function getSubCategory() {
        props.serviceActionPending();
        await axios({
            method: "post",
            url: api_url + vendor_detail,
            data: { vendor_id: state.id },
        })
            .then(async (response) => {
                await props.serviceActionSuccess(response.data);
            })
            .catch((error) => {
                props.serviceActionError(error);
                alert("Sorry something went wrong");
            });
    };


    const { isLoding, data } = props;
    return (
        <Container>
            <View style={styles.ven_style1} >
                <View style={styles.ven_style2}>
                    <Card style={styles.ven_style3}>
                        <Row style={styles.ven_style4}>
                            <Box style={styles.ven_style5}>
                                <TouchableOpacity style={styles.ven_style6} onPress={handleBackButtonClick} activeOpacity={1} >
                                    <Icon onPress={handleBackButtonClick} style={styles.ven_style7} name='ios-arrow-back' />
                                </TouchableOpacity>
                            </Box>
                            <Card style={styles.ven_style8}>
                                <Text
                                    style={styles.ven_style9}
                                >
                                    Vendor Details
                                </Text>
                            </Card>
                            <Box />
                        </Row>
                    </Card>
                </View>
            </View>
            <View style={styles.ven_style10} />
            <View>
                <View style={styles.ven_style11} />
                <View style={styles.ven_style12}>
                    <Card
                        style={styles.ven_style13}
                    >
                        <Avatar
                            rounded
                            size="large"
                            source={{ uri: img_url + data.store_image }}
                            containerStyle={{
                                borderWidth: 1,
                                borderColor: colors.theme_fg,
                                marginTop: -60,
                                backgroundColor: colors.theme_bg_three,
                            }}
                        />
                        <View style={styles.ven_style14} />
                        <Text
                            style={styles.ven_style15}
                        >
                            {data.store_name}
                        </Text>
                        <Text style={styles.ven_style16}>
                            {data.email}
                        </Text>
                        <View style={styles.ven_style17} />
                        <Row>
                            <Box style={styles.ven_style18}>
                                <Text
                                    style={styles.ven_style19}
                                >
                                    Shop Status
                                </Text>
                                {data.status == 1 ? (
                                    <Text style={styles.ven_style20}>
                                        Open
                                    </Text>
                                ) : (
                                    <Text style={styles.ven_style21}>
                                        Closed
                                    </Text>
                                )}
                            </Box>
                            <Box style={styles.ven_style22} />
                            <Box style={styles.ven_style23}>
                                <Text
                                    style={styles.ven_style24}
                                >
                                    Ratings
                                </Text>
                                <Text style={styles.ven_style25}>
                                    {data.overall_ratings}
                                </Text>
                            </Box>
                        </Row>
                    </Card>
                    <View style={styles.ven_style26} />
                    <Card
                        style={styles.ven_style27}
                    >
                        <View style={styles.ven_style28} />
                        <List>
                            <Box icon>
                                <View style={styles.ven_style29}>
                                    <Box style={styles.ven_style30}>
                                        <Text
                                            style={styles.ven_style31}
                                        >
                                            Shop Name
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style32}>
                                        <Text style={styles.ven_style33}>
                                            {data.store_name}
                                        </Text>
                                    </Box>
                                </View>
                            </Box>
                            <Box icon>
                                <View style={styles.ven_style34}>
                                    <Box style={styles.ven_style35}>
                                        <Text
                                            style={styles.ven_style36}
                                        >
                                            Owner Name
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style37}>
                                        <Text style={styles.ven_style38}>
                                            {data.first_name} {data.last_name}
                                        </Text>
                                    </Box>
                                </View>
                            </Box>
                            <Box icon>
                                <View style={styles.ven_style39}>
                                    <Box style={styles.ven_style40}>
                                        <Text
                                            style={styles.ven_style41}
                                        >
                                            Email
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style42}>
                                        <Text style={styles.ven_style43}>
                                            {data.email}
                                        </Text>
                                    </Box>
                                </View>
                            </Box>
                            <Box icon>
                                <View style={styles.ven_style44}>
                                    <Box style={styles.ven_style45}>
                                        <Text
                                            style={styles.ven_style46}
                                        >
                                            Phone
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style47}>
                                        <Text style={styles.ven_style48}>
                                            {data.phone_number}
                                        </Text>
                                    </Box>
                                </View>
                            </Box>
                            <Box icon>
                                <View style={styles.ven_style49}>
                                    <Box style={styles.ven_style50}>
                                        <Text
                                            style={styles.ven_style51}
                                        >
                                            Address
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style52}>
                                        <Text style={styles.ven_style53}>
                                            {data.address} - {data.pin_code}{" "}
                                        </Text>
                                    </Box>
                                </View>
                            </Box>

                            <Box icon>
                                <View style={styles.ven_style54}>
                                    <Box style={styles.ven_style55}>
                                        <Text
                                            style={styles.ven_style56}
                                        >
                                            Opening Time
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style57}>
                                        <Text
                                            style={styles.ven_style58}
                                        >
                                            {data.opening_time}
                                        </Text>
                                    </Box>
                                </View>
                            </Box>
                            <Box icon>
                                <View style={styles.ven_style59}>
                                    <Box style={styles.ven_style60}>
                                        <Text
                                            style={styles.ven_style61}
                                        >
                                            Closing Time
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style62}>
                                        <Text
                                            style={styles.ven_style63}
                                        >
                                            {data.closing_time}
                                        </Text>
                                    </Box>
                                </View>
                            </Box>
                            <Box icon>
                                <View style={styles.ven_style64}>
                                    <Box style={styles.ven_style65}>
                                        <Text
                                            style={styles.ven_style66}
                                        >
                                            Documents
                                        </Text>
                                    </Box>
                                    <Box style={styles.ven_style67}>
                                        <Text
                                            style={styles.ven_style68}
                                        >
                                            Verified
                                        </Text>
                                    </Box>
                                </View>
                            </Box>
                        </List>
                    </Card>
                </View>
            </View>
            <Loader visible={isLoding} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.vendor.isLoding,
        error: state.vendor.error,
        data: state.vendor.data,
        message: state.vendor.message,
        status: state.vendor.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetails);

const styles = StyleSheet.create({
    ven_style1: {
        justifyContent: "flex-start",
        height: "10%",
        backgroundColor: colors.theme_bg,
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        shadowOffset: { width: 0, height: 15 },
        shadowColor: colors.theme_bg,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    ven_style2: { position: 'absolute', top: '55%', alignSelf: 'center', width: '75%' },
    ven_style3: {
        alignItems: "center",
        borderRadius: 15,
        justifyContent: "center",
    },
    ven_style4: { padding: 10, justifyContent: 'center' },
    ven_style5: { flex: 1 },
    ven_style6: { width: 100, justifyContent: 'center' },
    ven_style7: { color: colors.theme_bg },
    ven_style8: { flex: 3, justifyContent: 'center' },
    ven_style9: { fontSize: 18, fontFamily: font_title, color: colors.theme_bg, justifyContent: 'center' },
    ven_style10: { margin: 20 },
    ven_style11: { height: height_20, backgroundColor: colors.theme_bg },
    ven_style12: { padding: 10, marginTop: -100 },
    ven_style13: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.theme_bg_three,
        padding: 20,
    },
    ven_style14: { margin: 10 },
    ven_style15: { fontSize: 20, color: colors.theme_fg_two, fontFamily: font_title },
    ven_style16: { fontSize: 14, color: colors.theme_fg_four, fontFamily: font_description },
    ven_style17: { margin: 10 },
    ven_style18: { alignItems: "center", justifyContent: "center" },
    ven_style19: { fontSize: 15, color: colors.theme_fg_two, fontFamily: font_title },
    ven_style20: { fontSize: 14, color: colors.green, fontFamily: font_description },
    ven_style21: { fontSize: 14, color: colors.red, fontFamily: font_description },
    ven_style22: { borderLeftWidth: 1, width: 2 },
    ven_style23: { alignItems: "center", justifyContent: "center" },
    ven_style24: { fontSize: 15, color: colors.theme_fg_two, fontFamily: font_title },
    ven_style25: { fontSize: 14, color: colors.theme_fg_four, fontFamily: font_description },
    ven_style26: { margin: 10 },
    ven_style27: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.theme_bg_three,
        padding: 20,
    },
    ven_style28: { margin: 5 },
    ven_style29: { flexDirection: "row" },
    ven_style30: { justifyContent: "center" },
    ven_style31: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style32: { justifyContent: "center" },
    ven_style33: { fontSize: 13, letterSpacing: 1, fontFamily: font_description },
    ven_style34: { flexDirection: "row" },
    ven_style35: { justifyContent: "center" },
    ven_style36: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style37: { justifyContent: "center" },
    ven_style38: { fontSize: 13, letterSpacing: 1, fontFamily: font_description },
    ven_style39: { flexDirection: "row" },
    ven_style40: { justifyContent: "center" },
    ven_style41: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style42: { justifyContent: "center" },
    ven_style43: { fontSize: 13, letterSpacing: 1, fontFamily: font_description },
    ven_style44: { flexDirection: "row" },
    ven_style45: { justifyContent: "center" },
    ven_style46: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style47: { justifyContent: "center" },
    ven_style48: { fontSize: 13, letterSpacing: 1, fontFamily: font_description },
    ven_style49: { flexDirection: "row" },
    ven_style50: { justifyContent: "center" },
    ven_style51: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style52: { justifyContent: "center" },
    ven_style53: { fontSize: 13, letterSpacing: 1, fontFamily: font_description },
    ven_style54: { flexDirection: "row" },
    ven_style55: { justifyContent: "center" },
    ven_style56: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style57: { justifyContent: "center" },
    ven_style58: { fontSize: 13, letterSpacing: 1, color: colors.success, fontFamily: font_description },
    ven_style59: { flexDirection: "row" },
    ven_style60: { justifyContent: "center" },
    ven_style61: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style62: { justifyContent: "center" },
    ven_style63: { fontSize: 13, letterSpacing: 1, color: colors.success, fontFamily: font_description },
    ven_style64: { flexDirection: "row" },
    ven_style65: { justifyContent: "center" },
    ven_style66: { fontSize: 15, letterSpacing: 1, color: colors.theme_fg_four, fontFamily: font_title },
    ven_style67: { justifyContent: "center" },
    ven_style68: { fontSize: 13, letterSpacing: 1, color: colors.success, fontFamily: font_title },
});
