import React, { Component, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container, Icon, View, Box } from 'native-base';
import { api_url, place_order, order_generation, get_payment_list, font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { orderServicePending, orderServiceError, orderServiceSuccess, paymentListPending, paymentListError, paymentListSuccess } from '../actions/PaymentActions';
import { reset } from '../actions/CartActions';
import { productReset } from '../actions/ProductActions';
import RazorpayCheckout from 'react-native-razorpay';

function Payment(props) {

    const [state, msetState] = useState({
        from: props.route.params.from,
        prescription_id: props.route.params.prescription_id,
        prescription_total: props.route.params.prescription_total,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }




    async function get_payment_modes() {
        setState({ isLoding: true });
        props.paymentListPending();
        await axios({
            method: 'get',
            url: api_url + get_payment_list
        })
            .then(async response => {
                setState({ isLoding: false });
                await props.paymentListSuccess(response.data);
            })
            .catch(error => {
                setState({ isLoding: false });
                props.paymentListError(error);
            });
    }

    useEffect(() => {
        get_payment_modes();
    }, []);

    place_order = async (payment_mode) => {
        setState({ isLoding: true });
        props.orderServicePending();
        await axios({
            method: 'post',
            url: api_url + place_order,
            data: { customer_id: global.id, vendor_id: props.current_vendor, payment_mode: payment_mode, delivery_charge: props.delivery_charge, tax: props.tax, total: props.total, discount: props.discount, sub_total: props.sub_total, promo_id: props.promo_id, items: JSON.stringify(Object.values(props.items)) }
        })
            .then(async response => {
                setState({ isLoding: false });
                await props.orderServiceSuccess(response.data);
                await move_orders();
            })
            .catch(error => {
                setState({ isLoding: false });
                props.orderServiceError(error);
            });
    }

    async function move_orders() {
        await props.reset();
        await props.productReset();
        props.navigation.navigate('myOrders');
    }

    place_prescription_order = async (payment_mode) => {
        setState({ isLoding: true });
        props.orderServicePending();
        await axios({
            method: 'post',
            url: api_url + order_generation,
            data: { customer_id: global.id, payment_mode: payment_mode, prescription_id: state.prescription_id }
        })
            .then(async response => {
                setState({ isLoding: false });
                await props.orderServiceSuccess(response.data);
                await move_orders();
            })
            .catch(error => {
                setState({ isLoding: false });
                props.orderServiceError(error);
            });
    }

    async function select_payment_method(payment_mode) {
        if (state.from == "prescription") {
            if (payment_mode == 1) {
                await place_prescription_order(payment_mode);
            } else {
                var options = {
                    currency: global.currency_short_code,
                    key: global.razorpay_key,
                    amount: state.prescription_total * 100,
                    name: global.application_name,
                    prefill: {
                        email: global.email,
                        contact: global.phone_number,
                        name: global.customer_name
                    },
                    theme: { color: colors.theme_fg }
                }
                RazorpayCheckout.open(options).then((data) => {
                    place_prescription_order(payment_mode);
                }).catch((error) => {
                    alert('Sorry something went wrong');
                });
            }
        } else {
            if (payment_mode == 1) {
                await place_order(payment_mode);
            } else {
                var options = {
                    currency: global.currency_short_code,
                    key: global.razorpay_key,
                    amount: props.total * 100,
                    name: global.application_name,
                    prefill: {
                        email: global.email,
                        contact: global.phone_number,
                        name: global.customer_name
                    },
                    theme: { color: colors.theme_fg }
                }
                RazorpayCheckout.open(options).then((data) => {
                    // handle success
                    //alert(`Success: ${data.razorpay_payment_id}`);
                    place_order(payment_mode);
                }).catch((error) => {
                    alert('Sorry something went wrong');
                    // handle failure
                    //alert(`Error: ${error.code} | ${error.description}`);
                });
            }
        }
    }


    const { isLoding, payment_modes } = props

    return (
        <Container>
            <View>
                <View style={styles.add_wallet_style1}>
                    <TouchableOpacity style={styles.add_wallet_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.add_wallet_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.add_wallet_style4} />
                    <Text style={styles.add_wallet_style5}>Add Wallet</Text>
                </View>
            </View>

            <View style={styles.add_wallet_style6} />

            <View style={styles.add_wallet_style7} >
                {payment_modes.map((row, index) => (
                    <Text style={styles.add_wallet_style8} onPress={() => select_payment_method(row.id)} >{row.payment_name}</Text>
                ))}
            </View>
            <Loader visible={isLoding} />
            <Loader visible={state.isLoding} />
        </Container>
    );
}


function mapStateToProps(state) {
    return {
        isLoding: state.payment.isLoding,
        error: state.payment.error,
        data: state.payment.data,
        message: state.payment.message,
        status: state.payment.status,
        payment_modes: state.payment.payment_modes,
        delivery_date: state.cart.delivery_date,
        total: state.cart.total_amount,
        sub_total: state.cart.sub_total,
        tax: state.cart.tax,
        current_vendor: state.cart.current_vendor,
        delivery_charge: state.cart.delivery_charge,
        discount: state.cart.promo_amount,
        promo_id: state.cart.promo_id,
        items: state.product.cart_items
    };
}

const mapDispatchToProps = (dispatch) => ({
    orderServicePending: () => dispatch(orderServicePending()),
    orderServiceError: (error) => dispatch(orderServiceError(error)),
    orderServiceSuccess: (data) => dispatch(orderServiceSuccess(data)),
    paymentListPending: () => dispatch(paymentListPending()),
    paymentListError: (error) => dispatch(paymentListError(error)),
    paymentListSuccess: (data) => dispatch(paymentListSuccess(data)),
    reset: () => dispatch(reset()),
    productReset: () => dispatch(productReset())
});


export default connect(mapStateToProps, mapDispatchToProps)(Payment);

const styles = StyleSheet.create({
    add_wallet_style1: { alignItems: 'flex-start', margin: 10 },
    add_wallet_style2: { width: 100, justifyContent: 'center' },
    add_wallet_style3: { color: colors.theme_fg_two, fontSize: 30 },
    add_wallet_style4: { margin: 5 },
    add_wallet_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    add_wallet_style6: { margin: 20 },
    add_wallet_style7: { padding: 20 },
    add_wallet_style8: { padding: 10, color: colors.theme_fg, fontSize: 16, fontFamily: font_title, borderBottomWidth: 1, borderColor: '#a3ada6' },
});
