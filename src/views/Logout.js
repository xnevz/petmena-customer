import React, { Component, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { height_20, font_description } from '../config/Constants';
import * as colors from '../assets/css/Colors';
export default function Logout(props) {

    const navigationOptions = {
        header: null
    };

    function resetMenu() {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
            })
        );
    }

    useEffect(() => {
        AsyncStorage.clear();
        resetMenu();
    }, []);


    return (
        <View style={styles.out_style1} >
            <View style={styles.out_style2} >
                <Text style={styles.out_style3}>Please wait...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    out_style1: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
    out_style2: { marginTop: height_20 },
    out_style3: { fontSize: 20, color: colors.theme_fg, fontFamily: font_description },
});
