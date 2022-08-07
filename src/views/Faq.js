import React, { Component, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { Container, List, ListItem, Left, Right, Icon, View } from 'native-base';
import { api_url, faq, font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/FaqActions';

function Faq(props) {

    async function mFaq() {
        props.serviceActionPending();
        await axios({
            method: 'get',
            url: api_url + faq
        })
            .then(async response => {
                await props.serviceActionSuccess(response.data)
            })
            .catch(error => {
                props.serviceActionError(error);
            });
    }

    useEffect(() => {
        mFaq();
    }, []);

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    faq_details = (data) => {
        props.navigation.navigate('faqDetails', { data: data });
    }

    const { isLoding, error, data, message, status } = props

    return (
        <Container>
            <View>
                <View style={styles.faq_style1}>
                    <TouchableOpacity style={styles.faq_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.faq_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.faq_style4} />
                    <Text style={styles.faq_style5}>Faq</Text>
                </View>
            </View>
            <View>
                <List>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => (
                            <Box onPress={() => faq_details(item)} >
                                <Box>
                                    <Text style={styles.faq_style6} >{item.question}</Text>
                                </Box>
                                <Box>
                                    <Icon style={styles.faq_style7} name="ios-arrow-forward" />
                                </Box>
                            </Box>
                        )}
                        keyExtractor={item => item.question}
                    />
                </List>
            </View>
            <Loader visible={isLoding} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.faq.isLoding,
        error: state.faq.error,
        data: state.faq.data,
        message: state.faq.message,
        status: state.faq.status,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Faq);

const styles = StyleSheet.create({
    faq_style1: { alignItems: 'flex-start', margin: 10 },
    faq_style2: { width: 100, justifyContent: 'center' },
    faq_style3: { color: colors.theme_fg_two, fontSize: 30 },
    faq_style4: { margin: 5 },
    faq_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    faq_style6: { color: colors.theme_fg_two, fontFamily: font_title, fontSize: 15 },
    faq_style7: { color: colors.theme_fg_two },

    container: {
        alignItems: 'center'
    },
    header: {
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
    header_card: {
        alignItems: "center",
        borderRadius: 15,
        justifyContent: "center",
    },
    header_card_item: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowOffset: { width: 0, height: 15 },
        shadowColor: colors.theme_bg,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    header_body: {
        flex: 3,
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        color: colors.theme_fg_two,
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: font_title,
    },

});
