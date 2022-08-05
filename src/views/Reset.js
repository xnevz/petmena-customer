import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Keyboard, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';
import Snackbar from 'react-native-snackbar';
import { api_url, reset, reset_password, font_description, font_title } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ResetActions';
import * as colors from '../assets/css/Colors';
import { CommonActions } from '@react-navigation/native';
import { Input } from 'react-native-elements';
function Reset(props) {

    const [state, msetState] = useState({
        password: "",
        confirm_password: "",
        validation: true,
        id: props.route.params.id,
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
        return true;
    }

    async function reset_password() {
        Keyboard.dismiss();
        await checkValidate();
        if (state.validation) {
            props.serviceActionPending();
            await axios({
                method: "post",
                url: api_url + reset,
                data: { id: state.id, password: state.password },
            })
                .then(async (response) => {
                    await props.serviceActionSuccess(response.data);
                    await login();
                })
                .catch((error) => {
                    props.serviceActionError(error);
                });
        }
    };

    function login() {
        alert(props.message);
        if (props.status == 1) {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                })
            );
        } else {
            showSnackbar(props.message);
        }
    }

    function checkValidate() {
        if (state.confirm_password == "" || state.password == "") {
            state.validation = false;
            showSnackbar("Please fill all the fields.");
            return true;
        } else if (state.confirm_password != state.password) {
            state.validation = false;
            showSnackbar("Password and confirm password does not match");
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


    const { isLoding } = props;

    return (
        <View style={styles.res_style1}>
            <View>
                <StatusBar />
            </View>
            <Loader visible={isLoding} />
            <View>
                <View style={styles.res_style2}>
                    <TouchableOpacity style={styles.res_style3} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.res_style4} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.res_style5} />
                    <Text style={styles.res_style6}>Reset Password</Text>
                </View>
            </View>
            {/*<View style={styles.res_style7}>
          <View
            style={styles.res_style8}
          >
            <Card style={styles.res_style9}>
              <Row style={styles.res_style10}>
                <Box style={styles.res_style11}>
                  <TouchableOpacity style={styles.res_style12} onPress={handleBackButtonClick} activeOpacity={1} >
                     <Icon onPress={handleBackButtonClick} style={styles.res_style13} name='ios-arrow-back' />
                  </TouchableOpacity>  
                </Box>
                <Card style={styles.res_style14}>
                  <Text
                    style={styles.res_style15}
                  >
                    Reset
                  </Text>
                </Card>
                <Box />
              </Row>
            </Card>

          </View>
        </View>*/}
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={styles.res_style16}>
                    <View style={styles.res_style17} />
                    <View style={styles.res_style18}>
                        <Image
                            style={styles.res_style19}
                            source={reset_password}
                        />
                    </View>
                    <View style={styles.res_style20} />

                    <View style={styles.res_style21}>
                        <Input
                            inputStyle={styles.res_style22}
                            label="Enter New Password"
                            labelStyle={styles.res_style23}
                            placeholder="**********"
                            leftIcon={
                                <Icon
                                    name='key'
                                    size={20}
                                    color='black'
                                    style={styles.res_style24}
                                />
                            }
                            secureTextEntry={true}
                            onChangeText={(TextInputValue) =>
                                setState({ password: TextInputValue })
                            }
                        />
                    </View>
                    <View style={styles.res_style25}>
                        <Input
                            inputStyle={styles.res_style26}
                            label="Confirm Password"
                            labelStyle={styles.res_style27}
                            placeholder="**********"
                            leftIcon={
                                <Icon
                                    name='key'
                                    size={20}
                                    color='black'
                                    style={styles.res_style28}
                                />
                            }
                            secureTextEntry={true}
                            onChangeText={(TextInputValue) =>
                                setState({ confirm_password: TextInputValue })
                            }
                        />
                    </View>
                    <View style={styles.res_style29} />

                    <View style={styles.res_style30}>
                        <Button
                            block
                            style={styles.res_style31}
                            onPress={reset_password}
                        >
                            <Text style={styles.res_style32}>SUBMIT</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.res_style33}></View>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.reset.isLoding,
        error: state.reset.error,
        data: state.reset.data,
        message: state.reset.message,
        status: state.reset.status,
        id: state.forgot.data.id,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);

const styles = StyleSheet.create({
    res_style1: { flex: 1, flexDirection: "column" },
    res_style2: { alignItems: 'flex-start', margin: 10 },
    res_style3: { width: 100, justifyContent: 'center' },
    res_style4: { color: colors.theme_fg_two, fontSize: 30 },
    res_style5: { margin: 5 },
    res_style6: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    res_style7: {
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
    res_style8: { position: "absolute", top: "55%", alignSelf: "center", width: "80%" },
    res_style9: { alignItems: "center", borderRadius: 15, justifyContent: "center" },
    res_style10: { padding: 10, justifyContent: 'center' },
    res_style11: { flex: 1 },
    res_style12: { width: 100, justifyContent: 'center' },
    res_style13: { color: colors.theme_bg },
    res_style14: { flex: 3, justifyContent: 'center' },
    res_style15: { fontSize: 18, fontFamily: font_title, color: colors.theme_bg, justifyContent: 'center' },
    res_style16: { height: "80%", justifyContent: "center", alignItems: "center" },
    res_style17: { marginTop: "20%" },
    res_style18: { height: 120, width: 120 },
    res_style19: { flex: 1, width: undefined, height: undefined },
    res_style20: { marginTop: "10%" },
    res_style21: { width: "80%", alignSelf: "center" },
    res_style22: { fontSize: 14, fontFamily: font_description },
    res_style23: { fontFamily: font_title },
    res_style24: { color: colors.theme_bg },
    res_style25: { width: "80%", alignSelf: "center" },
    res_style26: { fontSize: 14, fontFamily: font_description },
    res_style27: { fontFamily: font_title },
    res_style28: { color: colors.theme_bg },
    res_style29: { marginTop: "5%" },
    res_style30: { width: "80%", alignSelf: "center" },
    res_style31: { backgroundColor: colors.theme_bg, borderRadius: 5, height: 40, fontFamily: font_title },
    res_style32: { color: colors.theme_fg_three, fontFamily: font_title, letterSpacing: 0.5 },
    res_style33: { height: "10%", justifyContent: "flex-end", alignItems: "center", position: "relative", bottom: 0 },
});
