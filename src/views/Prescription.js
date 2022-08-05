import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, List, ListItem, Icon, } from 'native-base';
import { api_url, prescription_list, font_description, font_title, tablet, no_prescription_lottie } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import Moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/PrescriptionActions';
import ProgressCircle from 'react-native-progress-circle';
import LottieView from 'lottie-react-native';
function Prescription(props) {

    const [state, msetState] = useState({
        result: [],
        api_status: 0,
    });

    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    useEffect(() => {
        const _unsubscribe = props.navigation.addListener('focus', () => {
            Prescription();
        });
        return _unsubscribe;
    }, []);

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function view_prescription(data) {
        props.navigation.navigate('ViewPrescription', { data: data });
    }

    async function Prescription() {
        props.serviceActionPending();
        await axios({
            method: 'post',
            url: api_url + prescription_list,
            data: { customer_id: global.id }
        })
            .then(async response => {
                setState({ api_status: 1, result: response.data.result });
                await props.serviceActionSuccess(response.data)
            })
            .catch(error => {
                props.serviceActionError(error);
            });
    }

    const { isLoading, data } = props

    return (
        <Container>
            <View>
                <View style={styles.pre_style1}>
                    <TouchableOpacity style={styles.pre_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.pre_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.pre_style4} />
                    <Text style={styles.pre_style5}>Prescription</Text>
                </View>
            </View>
            <View style={styles.pre_style6} />

            <View>
                <List>
                    {data.map((row, index) => (
                        <Box onPress={() => view_prescription(row)}>
                            <Box style={styles.pre_style7}>
                                <ProgressCircle
                                    percent={row.status * 10}
                                    radius={30}
                                    borderWidth={3}
                                    color={colors.theme_fg}
                                    shadowColor="#e6e6e6"
                                    bgColor="#FFFFFF"
                                >
                                    <View style={styles.pre_style8} >
                                        <Image
                                            style={styles.pre_style9}
                                            source={tablet}
                                        />
                                    </View>
                                </ProgressCircle>
                            </Box>
                            <Box style={styles.pre_style10} >
                                <Text style={styles.pre_style11}>Prescription order Id : #{row.id}</Text>
                                <View style={styles.pre_style12} />
                                <Text style={styles.pre_style13} >{Moment(row.created_at).format('DD MMM-YYYY hh:mm')}</Text>
                                {row.status == 9 ? <Text style={styles.pre_style14} >{row.status_name}</Text> : <Text style={styles.pre_style15} >{row.status_name}</Text>}

                            </Box>
                        </Box>
                    ))}
                </List>
                {data.length == 0 && state.api_status == 1 &&
                    <View>
                        <View style={styles.pre_style16}>
                            <LottieView source={no_prescription_lottie} autoPlay loop />
                        </View>
                        <Text style={styles.pre_style17}>upload your first prescription</Text>
                    </View>
                }
            </View>
            <Loader visible={isLoading} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoading: state.prescription.isLoading,
        error: state.prescription.error,
        data: state.prescription.data,
        message: state.prescription.message,
        status: state.prescription.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Prescription);

const styles = StyleSheet.create({
    pre_style1: { alignItems: 'flex-start', margin: 10 },
    pre_style2: { width: 100, justifyContent: 'center' },
    pre_style3: { color: colors.theme_fg_two, fontSize: 30 },
    pre_style4: { margin: 5 },
    pre_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    pre_style6: { margin: 20 },
    pre_style7: { width: '30%' },
    pre_style8: { height: 30, width: 30 },
    pre_style9: { flex: 1, width: undefined, height: undefined },
    pre_style10: { width: '50%' },
    pre_style11: { fontFamily: font_description },
    pre_style12: { margin: 1 },
    pre_style13: { fontSize: 10, fontFamily: font_description },
    pre_style14: { color: colors.red },
    pre_style15: { color: colors.theme_fg },
    pre_style16: { height: 250, marginTop: '30%' },
    pre_style17: { alignSelf: 'center', fontFamily: font_title },
});
