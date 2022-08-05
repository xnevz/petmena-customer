import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Left, Body, Right, Icon, Row, Card, } from 'native-base';
import { otp_image, font_title, font_description } from '../config/Constants';
import { StatusBar } from '../components/GeneralComponents';
import { connect } from 'react-redux';
import * as colors from '../assets/css/Colors';
import CodeInput from 'react-native-confirmation-code-input';
function Otp(props) {
    const [state, msetState] = useState({
        id: props.route.params.id,
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
        return true;
    }

    function _onFinishCheckingCode2(code) {
        if (code != props.otp) {
            alert("Code not match!");
        } else {
            reset();
        }
    }

    function reset() {
        props.navigation.navigate("Reset", { id: state.id });
    }

    const { otp } = props;

    return (
        <View style={styles.otp_style1}>
            <View>
                <StatusBar />
            </View>
            <View style={styles.otp_style2}>
                <View
                    style={styles.otp_style3}
                >
                    <Card style={styles.otp_style4}>
                        <Row style={styles.otp_style5}>
                            <Box style={styles.otp_style6}>
                                <TouchableOpacity style={styles.otp_style7} onPress={handleBackButtonClick} activeOpacity={1} >
                                    <Icon onPress={handleBackButtonClick} style={styles.otp_style8} name='ios-arrow-back' />
                                </TouchableOpacity>
                            </Box>
                            <Card style={styles.otp_style9}>
                                <Text
                                    style={styles.otp_style10}
                                >
                                    ENTER OTP
                                </Text>
                            </Card>
                            <Box />
                        </Row>
                    </Card>
                </View>
            </View>
            <View style={styles.otp_style11}>
                <View style={styles.otp_style12} />
                <View style={styles.otp_style13}>
                    <Image
                        style={styles.otp_style14}
                        source={otp_image}
                    />
                </View>
                <View style={styles.otp_style15} />
                <View style={styles.otp_style16}>
                    <Text style={styles.otp_style17}>
                        Enter the code you have received by E-mail in order to verify
                        account.
                    </Text>
                </View>

                <View style={styles.otp_style18}>
                    <CodeInput
                        ref="codeInputRef2"
                        keyboardType="numeric"
                        codeLength={4}
                        autoFocus={false}
                        activeColor={colors.theme_bg}
                        inactiveColor={colors.theme_bg}
                        className="border-circle"
                        onFulfill={(isValid) => _onFinishCheckingCode2(isValid)}
                        codeInputStyle={styles.otp_style20}
                    />
                </View>
                <View style={styles.otp_style21} />
            </View>
        </View>
    );
}


function mapStateToProps(state) {
    return {
        otp: state.forgot.data.otp,
    };
}

export default connect(mapStateToProps, null)(Otp);
const styles = StyleSheet.create({
    otp_style1: { flex: 1 },
    otp_style2: {
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
    otp_style3: { position: "absolute", top: "55%", alignSelf: "center", width: "80%" },
    otp_style4: { alignItems: "center", borderRadius: 15, justifyContent: "center" },
    otp_style5: { padding: 10, justifyContent: 'center' },
    otp_style6: { flex: 1 },
    otp_style7: { width: 50, justifyContent: 'center' },
    otp_style8: { color: colors.theme_bg },
    otp_style9: { flex: 3, justifyContent: 'center' },
    otp_style10: { fontSize: 18, fontFamily: font_title, color: colors.theme_bg, justifyContent: 'center' },
    otp_style11: { flex: 7, alignItems: "center" },
    otp_style12: { marginTop: "12%" },
    otp_style13: { height: 120, width: 150 },
    otp_style14: { width: 120, height: 120, alignSelf: 'center' },
    otp_style15: { marginTop: "5%" },
    otp_style16: { paddingLeft: 20, paddingRight: 20 },
    otp_style17: {
        marginTop: 20,
        fontSize: 15,
        textAlign: "center",
        color: colors.theme_fg_dark,
        fontFamily: font_description
    },
    otp_style18: { width: "80%", alignSelf: "center" },
    otp_style19: { fontWeight: "800" },
    otp_style20: { borderWidth: 1.5 },
    otp_style21: { marginTop: "5%" },
});
