import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Container, Icon, Row } from 'native-base';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import { api_url, privacy, font_title, font_description } from '../config/Constants';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/PrivacyActions';

function PrivacyPolicy(props) {

    useEffect(() => privacy_policy(), []);

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    async function privacy_policy() {
        props.serviceActionPending();
        await axios({
            method: 'get',
            url: api_url + privacy
        })
            .then(async response => {
                await props.serviceActionSuccess(response.data)
            })
            .catch(error => {
                props.serviceActionError(error);
            });
    }

    const { isLoding, error, data, message, status } = props

    return (
        <Container>
            <View>
                <View style={styles.pri_style1}>
                    <TouchableOpacity style={styles.pri_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.pri_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.pri_style4} />
                    <Text style={styles.pri_style5}>Privacy Policy</Text>
                </View>
            </View>
            <View style={styles.pri_style6} >
                {data.map((row, index) => (
                    <View>
                        <Row>
                            <Text style={styles.pri_style7}>{row.title}</Text>
                        </Row>
                        <Row>
                            <Text style={styles.pri_style8}>{row.description}</Text>
                        </Row>
                        <View style={styles.pri_style9} />
                    </View>
                ))}
            </View>
            <Loader visible={isLoding} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.privacy.isLoding,
        error: state.privacy.error,
        data: state.privacy.data,
        message: state.privacy.message,
        status: state.privacy.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);

const styles = StyleSheet.create({
    pri_style1: { alignItems: 'flex-start', margin: 10 },
    pri_style2: { width: 100, justifyContent: 'center' },
    pri_style3: { color: colors.theme_fg_two, fontSize: 30 },
    pri_style4: { margin: 5 },
    pri_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    pri_style6: { padding: 10 },
    pri_style7: { fontSize: 16, fontFamily: font_title, color: '#202028' },
    pri_style8: { fontSize: 13, marginTop: 5, fontFamily: font_description },
    pri_style9: { margin: 10 },
});
