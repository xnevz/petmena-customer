import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Container, Body, Row, Icon } from 'native-base';
import * as colors from '../assets/css/Colors';
import { logo_with_name, font_title } from '../config/Constants';
import { Divider } from 'react-native-elements';

function ContactUs(props) {


    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function show_alert(message) {
        dropDownAlertRef.alertWithType('error', 'Error', message);
    }

    return (
        <Container>
            <View>
                <View style={styles.con_style1}>
                    <TouchableOpacity style={styles.con_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.con_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.con_style4} />
                    <Text style={styles.con_style5}>Contact Us</Text>
                </View>
            </View>

            <View padder>
                <View style={styles.con_style6} />
                <Row>
                    <Card>
                        <View style={styles.con_style7}>
                            <Image
                                style={styles.con_style8}
                                source={logo_with_name}
                            />
                        </View>
                    </Card>
                </Row>
                <Divider style={styles.con_style9} />
                <View style={styles.con_style10} />
                <Row>
                    <Text style={styles.con_style11}>Contact details</Text>
                </Row>
                <View style={styles.con_style12} />
                <Row>
                    <Icon style={styles.con_style13} name='call' /><Text style={styles.con_style14}>{global.admin_phone}</Text>
                </Row>
                <View style={styles.con_style15} />
                <Row>
                    <Icon style={styles.con_style16} name='mail' /><Text style={styles.con_style17}>{global.admin_email}</Text>
                </Row>
                <View style={styles.con_style18} />
                <Row>
                    <Icon style={styles.con_style19} name='pin' /><Text style={styles.con_style20}>{global.admin_address}</Text>
                </Row>
            </View>
        </Container>
    );
}

export default ContactUs;

const styles = StyleSheet.create({
    con_style1: { alignItems: 'flex-start', margin: 10 },
    con_style2: { width: 100, justifyContent: 'center' },
    con_style3: { color: colors.theme_fg_two, fontSize: 30 },
    con_style4: { margin: 5 },
    con_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    con_style6: { margin: 10 },
    con_style7: { height: 100, width: 100 },
    con_style8: { flex: 1, width: undefined, height: undefined, borderRadius: 50 },
    con_style9: { marginTop: 20, marginBottom: 20 },
    con_style10: { margin: 10 },
    con_style11: { fontSize: 18, fontFamily: font_title, color: colors.theme_fg_two },
    con_style12: { margin: 10 },
    con_style13: { fontSize: 18, marginRight: 10 },
    con_style14: { fontSize: 14, color: colors.theme_fg_four },
    con_style15: { margin: 5 },
    con_style16: { fontSize: 18, marginRight: 10 },
    con_style17: { fontSize: 14, color: colors.theme_fg_four },
    con_style18: { margin: 5 },
    con_style19: { fontSize: 18, marginRight: 10 },
    con_style20: { fontSize: 14, color: colors.theme_fg_four },
});
