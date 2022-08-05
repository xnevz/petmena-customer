import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Container, Body, Left, Icon, Right, Card, CardItem, List, ListItem, Thumbnail } from 'native-base';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { Loader } from '../components/GeneralComponents';
import { wallet_icon, api_url, get_wallet, add_wallet, font_description, font_title, no_wallet_lottie } from '../config/Constants';
import { Button } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import Moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import LottieView from 'lottie-react-native';
function Wallet(props) {

    const [state, msetState] = useState({
        isDialogVisible: false,
        wallet: 0,
        wallet_histories: [],
        isLoding: false,
        api_status: 0
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    useEffect(() => {
        get_wallet();
    }, []);


    async function get_wallet() {
        setState({ isLoding: true });
        await axios({
            method: "post",
            url: api_url + get_wallet,
            data: { id: global.id }
        })
            .then(async (response) => {
                setState({ isLoding: false, api_status: 1 });
                setState({ wallet: response.data.result.wallet, wallet_histories: response.data.result.wallet_histories })
            })
            .catch((error) => {
                setState({ isLoding: false });
                alert("Something went wrong");
            });
    }

    add_wallet_success = async (amount) => {
        setState({ isLoding: true });
        await axios({
            method: "post",
            url: api_url + add_wallet,
            data: { id: global.id, amount: amount }
        })
            .then(async (response) => {
                setState({ isLoding: false });
                get_wallet();
            })
            .catch((error) => {
                setState({ isLoding: false });
                alert("Your transaction declined");
            });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function open_dialog() {
        setState({ isDialogVisible: true });
    }

    function add_wallet(amount) {
        if (!isNaN(amount)) {
            var options = {
                currency: global.currency_short_code,
                key: global.razorpay_key,
                amount: amount * 100,
                name: global.application_name,
                prefill: {
                    email: global.email,
                    contact: global.phone_number,
                    name: global.customer_name
                },
                theme: { color: colors.theme_fg }
            }
            RazorpayCheckout.open(options).then((data) => {
                add_wallet_success(amount);
            }).catch((error) => {
                alert('Sorry something went wrong');
            });
        } else {
            alert('Please enter valid amount');
        }
        setState({ isDialogVisible: false });
    }


    return (
        <Container>
            <View>
                <View style={styles.wall_style1}>
                    <TouchableOpacity style={styles.wall_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.wall_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.wall_style4} />
                    <Text style={styles.wall_style5}>Wallet</Text>
                </View>
            </View>
            <View padder>
                <Card style={styles.wall_style6}>
                    <Box header bordered style={styles.wall_style7}>
                        <Box>
                            <View>
                                <Icon style={styles.wall_style8} name='ios-wallet' />
                            </View>
                            <View style={styles.wall_style9} />
                            <View>
                                <Text style={styles.wall_style10}>{global.currency}{state.wallet}</Text>
                                <Text style={styles.wall_style11} >Your balance</Text>
                            </View>
                        </Box>
                        <Box>
                            <Button
                                title="+ Add Money"
                                onPress={open_dialog}
                                type="outline"
                            />
                        </Box>
                    </Box>
                </Card>
                <View style={styles.wall_style12} />
                <Text style={styles.wall_style13}>Wallet transactions</Text>
                <List>
                    <FlatList
                        data={state.wallet_histories}
                        renderItem={({ item, index }) => (
                            <Box avatar>
                                <Box>
                                    <Thumbnail square source={wallet_icon} style={styles.wall_style14} />
                                </Box>
                                <Card>
                                    <Text style={styles.wall_style15}>{item.message}</Text>
                                    <Text style={styles.wall_style16}>{Moment(item.created_at).format('DD MMM-YYYY hh:mm')}</Text>
                                </Card>
                                <Box>
                                    <Text style={styles.wall_style17}>{global.currency}{item.amount} {item.transaction_type == 1 ? <Text style={styles.wall_style18}>Cr</Text> : <Text style={styles.wall_style19}>Dr</Text>}</Text>
                                </Box>
                            </Box>
                        )}
                        keyExtractor={item => item.menu_name}
                    />
                </List>
                <Loader visible={state.isLoding} />
                {state.wallet_histories.length == 0 && state.api_status == 1 &&
                    <View>
                        <View style={styles.wall_style20}>
                            <LottieView source={no_wallet_lottie} autoPlay loop />
                        </View>
                        <Text style={styles.wall_style21}>No transactions found</Text>
                    </View>
                }
            </View>
            <DialogInput isDialogVisible={state.isDialogVisible}
                title={"Add Wallet"}
                message={"Please enter your amount here"}
                hintInput={"Enter amount"}
                keyboardType="numeric"
                submitInput={(inputText) => { add_wallet(inputText) }}
                closeDialog={() => { setState({ isDialogVisible: false }) }}>
            </DialogInput>
        </Container>
    );
}

export default Wallet;

const styles = StyleSheet.create({
    wall_style1: { alignItems: 'flex-start', margin: 10 },
    wall_style2: { width: 100, justifyContent: 'center' },
    wall_style3: { color: colors.theme_fg_two, fontSize: 30 },
    wall_style4: { margin: 5 },
    wall_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    wall_style6: { borderRadius: 8 },
    wall_style7: { borderRadius: 8 },
    wall_style8: { fontSize: 30, color: colors.theme_fg },
    wall_style9: { margin: 5 },
    wall_style10: {
        fontSize: 18,
        fontFamily: font_description
    },
    wall_style11: {
        fontSize: 13,
        color: colors.theme_fg,
        fontFamily: font_title
    },
    wall_style12: { margin: 10 },
    wall_style13: { fontSize: 16, fontFamily: font_title },
    wall_style14: { height: 35, width: 35 },
    wall_style15: {
        fontSize: 14,
        color: colors.theme_fg_two,
        fontFamily: font_description
    },
    wall_style16: { fontSize: 12, color: colors.theme_fg_four, fontFamily: font_description },
    wall_style17: {
        fontSize: 16,
        color: colors.theme_fg_two,
        fontFamily: font_description
    },
    wall_style18: { color: "green" },
    wall_style19: { color: "red" },
    wall_style20: { height: 200, marginTop: '30%' },
    wall_style21: { alignSelf: 'center', fontFamily: font_title },

});
