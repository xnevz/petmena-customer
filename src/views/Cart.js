import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Body, Icon, Row, List } from 'native-base';
import { Button, Divider } from 'react-native-elements';
import { Loader } from '../components/GeneralComponents';
import { connect } from 'react-redux';
import { subTotal, total, calculatePricing, selectDate, disableLoading } from '../actions/CartActions';
import Snackbar from 'react-native-snackbar';
import * as colors from '../assets/css/Colors';
import { height_30, no_data, get_taxes, api_url, font_title, font_description } from '../config/Constants';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
function Cart(props) {

    const [state, msetState] = useState({
        deliveryDatePickerVisible: false,
        taxes_list: [],
        tax_count: 0.00,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    };


    useEffect(() => {
        const _unsubscribe = props.navigation.addListener('focus', async () => {
            await get_taxes();
            await calculate_total();
        });

        return _unsubscribe;

    }, [])

    function showDeliveryDatePicker() {
        setState({ deliveryDatePickerVisible: true });
    };

    function hideDeliveryDatePicker() {
        setState({ deliveryDatePickerVisible: false });
    };

    handleDeliveryDatePicked = async (date) => {
        setState({ deliveryDatePickerVisible: false })
        var d = new Date(date);
        let delivery_date = d.getDate() + '/' + ("0" + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
        await props.selectDate(delivery_date);
    };

    function calculate_total() {
        props.calculatePricing();
        promo = props.promo;
        if (promo == undefined) {
            let net_total = parseFloat(props.sub_total) + parseFloat(props.delivery_charge);
            let tax = calculate_taxes(net_total);
            let total = net_total + tax;
            props.total({ promo_amount: 0.00, total: total.toFixed(2), tax: tax.toFixed(2) });
        } else {
            if (promo.promo_type == 1) {
                let total_without_discount = parseFloat(props.sub_total - promo.discount);
                let net_total = total_without_discount + parseFloat(props.delivery_charge);
                let tax = calculate_taxes(net_total);
                let total = net_total + tax;
                if (total >= 0) {
                    props.total({ promo_amount: promo.discount.toFixed(2), total: total.toFixed(2), tax: tax.toFixed(2) });
                } else {
                    props.disableLoading();
                    alert('Sorry this promo is not valid!')
                }

            } else {
                let discount = (promo.discount / 100) * props.sub_total;
                let total_without_discount = parseFloat(props.sub_total - discount);
                let net_total = total_without_discount + parseFloat(props.delivery_charge);
                let tax = calculate_taxes(net_total);
                let total = net_total + tax;
                if (total >= 0) {
                    props.total({ promo_amount: discount.toFixed(2), total: total.toFixed(2), tax: tax.toFixed(2) });
                } else {
                    props.disableLoading();
                    alert('Sorry this promo is not valid!')
                }
            }
        }
    }

    function address_list() {
        props.navigation.navigate('addressList');
    }

    calculate_taxes = (net_total) => {
        let tax = 0;
        if (state.tax_count == 0) {
            return tax;
        } else {
            state.taxes_list.forEach(function (value) {
                let percentage = (net_total / 100) * parseFloat(value.percentage);
                tax = tax + percentage;
            });
            return tax;
        }
    }

    function checkout() {
        if (props.delivery_date != undefined) {
            props.navigation.navigate('payment', { from: 'cart' });
        } else {
            showSnackbar('Please choose delivery date');
        }
    }

    function showSnackbar(msg) {
        Snackbar.show({
            title: msg,
            duration: Snackbar.LENGTH_SHORT,
        });
    }

    async function get_taxes() {
        setState({ isLoding: true });
        await axios({
            method: "post",
            url: api_url + get_taxes,
        })
            .then(async (response) => {
                setState({ isLoding: false });
                let data = response.data;
                setState({ tax_count: data.count, taxes_list: data.result });
            })
            .catch((error) => {
                setState({ isLoding: false });
                alert('Sorry something went wrong');
            });
    };

    function Promo() {
        props.navigation.navigate('promo');
    }

    function pharmacy() {
        props.navigation.navigate('pharmacy');
    }

    edit_product = (data) => {
        props.navigation.navigate('editProduct', { data: data });
    }


    const { isLoding, cart_items, cart_count, sub_total, total_amount, tax, promo_amount, promo, delivery_date, delivery_charge } = props

    return (
        <Container>
            <View>
                <View style={styles.cart_style1}>
                    <TouchableOpacity style={styles.cart_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.cart_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.cart_style4} />
                    <Text style={styles.cart_style5}>Cart</Text>
                </View>
            </View>
            <View style={styles.cart_style6} />
            {cart_count > 0 &&
                <ScrollView>
                    <View>
                        <Divider style={styles.cart_style7} />
                        <Row style={styles.cart_style8} >
                            <Box>
                                <Text style={styles.cart_style9}>Your items</Text>
                            </Box>
                        </Row>
                        <List>
                            {Object.keys(cart_items).map((key) => {
                                return <Box onPress={() => edit_product(cart_items[key])}>
                                    <Row>
                                        <Box style={styles.cart_style10} >
                                            <Text style={styles.cart_style11} >{cart_items[key].qty}x</Text>
                                        </Box>
                                        <Box>
                                            <Text style={styles.cart_style12}>{cart_items[key].product_name}</Text>
                                        </Box>
                                        <Box style={styles.cart_style13} >
                                            <Text style={styles.cart_style14}>{global.currency}{cart_items[key].price}</Text>
                                        </Box>
                                    </Row>
                                </Box>
                            })}
                        </List>
                        {promo === undefined ?
                            <Row style={styles.cart_style15} >
                                <Box style={styles.cart_style16} >
                                    <Icon style={styles.cart_style17} name='pricetag' />
                                </Box>
                                <Box>
                                    <Text style={styles.cart_style18} >No promotion applied.Choose your promotion here.</Text>
                                    <Text onPress={() => Promo()} style={styles.cart_style19}>Choose promotion</Text>
                                </Box>
                            </Row> :
                            <Row style={styles.cart_style20} >
                                <Box style={styles.cart_style21} >
                                    <Icon style={styles.cart_style22} name='pricetag' />
                                </Box>
                                <Box>
                                    <Text style={styles.cart_style23} >Promotion applied</Text>
                                    <Text style={styles.cart_style24} >You are saving {global.currency}{promo_amount}</Text>
                                    <Text onPress={() => Promo()} style={styles.cart_style25}>Change promo</Text>
                                </Box>
                            </Row>
                        }
                        <Divider style={styles.cart_style26} />
                        <Row style={styles.cart_style27} >
                            <Box>
                                <Text style={styles.cart_style28}>Subtotal</Text>
                            </Box>
                            <Box style={styles.cart_style29} >
                                <Text style={styles.cart_style30} >{global.currency}{sub_total}</Text>
                            </Box>
                        </Row>
                        <Row style={styles.cart_style31} >
                            <Box>
                                <Text style={styles.cart_style32}>Discount</Text>
                            </Box>
                            <Box style={styles.cart_style33} >
                                <Text style={styles.cart_style34} >{global.currency}{promo_amount}</Text>
                            </Box>
                        </Row>
                        <Row style={styles.cart_style35} >
                            <Box>
                                <Text style={styles.cart_style36}>Delivery Charge</Text>
                            </Box>
                            <Box style={styles.cart_style37} >
                                <Text style={styles.cart_style38} >{global.currency}{delivery_charge}</Text>
                            </Box>
                        </Row>
                        <Row style={styles.cart_style39} >
                            <Box>
                                <Text style={styles.cart_style40}>Tax</Text>
                            </Box>
                            <Box style={styles.cart_style41} >
                                <Text style={styles.cart_style42} >{global.currency}{tax}</Text>
                            </Box>
                        </Row>
                        <Row style={styles.cart_style43} >
                            <Box>
                                <Text style={styles.cart_style44}>Total</Text>
                            </Box>
                            <Box style={styles.cart_style45} >
                                <Text style={styles.cart_style46} >{global.currency}{total_amount}</Text>
                            </Box>
                        </Row>
                        <Divider style={styles.cart_style47} />
                        <Row style={styles.cart_style48} >
                            <Box>
                                <Button
                                    title="Choose Expected Delivery Date"
                                    type="outline"
                                    buttonStyle={styles.cart_style49}
                                    titleStyle={styles.cart_style50}
                                    onPress={showDeliveryDatePicker}
                                />
                                <DateTimePicker
                                    isVisible={state.deliveryDatePickerVisible}
                                    onConfirm={handleDeliveryDatePicked}
                                    onCancel={hideDeliveryDatePicker}
                                    minimumDate={new Date()}
                                    mode='date'
                                />
                            </Box>
                        </Row>
                        {delivery_date != undefined &&
                            <Row style={styles.cart_style51} >
                                <Text style={styles.cart_style152}>{delivery_date}</Text>
                            </Row>
                        }
                        <Box style={styles.cart_style53} >
                            <View style={styles.cart_style54}>
                                <Button
                                    onPress={checkout}
                                    title="Checkout"
                                    buttonStyle={styles.cart_style55}
                                    titleStyle={styles.cart_style56}
                                />
                            </View>
                        </Box>
                    </View>
                </ScrollView>
            }
            {cart_count == 0 &&
                <Card>
                    <Text style={styles.cart_style57}>{no_data}</Text>
                    <View style={styles.cart_style58} />
                    <Button
                        onPress={pharmacy}
                        title="Go To Home"
                        buttonStyle={styles.cart_style59}
                        titleStyle={styles.cart_style60}
                    />
                </Card>

            }
            {cart_count == undefined &&
                <Card>
                    <Text style={styles.cart_style61}>{no_data}</Text>
                </Card>
            }
            <Loader visible={isLoding} />
            <Loader visible={state.isLoding} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        cart_items: state.product.cart_items,
        cart_count: state.product.cart_count,
        sub_total: state.cart.sub_total,
        tax: state.cart.tax,
        delivery_charge: state.cart.delivery_charge,
        promo: state.cart.promo,
        total_amount: state.cart.total_amount,
        promo_amount: state.cart.promo_amount,
        isLoding: state.cart.isLoding,
        delivery_date: state.cart.delivery_date
    };
}

const mapDispatchToProps = (dispatch) => ({
    subTotal: (data) => dispatch(subTotal(data)),
    total: (data) => dispatch(total(data)),
    calculatePricing: () => dispatch(calculatePricing()),
    selectDate: (data) => dispatch(selectDate(data)),
    disableLoading: () => dispatch(disableLoading())
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
    cart_style1: { alignItems: 'flex-start', margin: 10 },
    cart_style2: { width: 100, justifyContent: 'center' },
    cart_style3: { color: colors.theme_fg_two, fontSize: 30 },
    cart_style4: { margin: 5 },
    cart_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    cart_style6: { margin: 20 },
    cart_style7: { backgroundColor: colors.theme_fg_two },
    cart_style8: { padding: 10 },
    cart_style9: { fontFamily: font_description },
    cart_style10: { width: 40 },
    cart_style11: { fontSize: 15, color: colors.theme_fg, fontFamily: font_title },
    cart_style12: { fontFamily: font_description },
    cart_style13: { width: 50 },
    cart_style14: { fontFamily: font_description },
    cart_style15: { padding: 20 },
    cart_style16: { width: 50 },
    cart_style17: { color: colors.theme_fg_two },
    cart_style18: { fontSize: 12, fontFamily: font_description },
    cart_style19: { color: colors.theme_fg, fontFamily: font_title },
    cart_style20: { padding: 20 },
    cart_style21: { width: 50 },
    cart_style22: { color: colors.theme_fg },
    cart_style23: { fontSize: 15, color: colors.theme_fg, fontFamily: font_title },
    cart_style24: { fontSize: 12, fontFamily: font_description },
    cart_style25: { color: colors.theme_fg, fontSize: 13, fontFamily: font_description },
    cart_style26: { backgroundColor: colors.theme_fg_two },
    cart_style27: { paddingLeft: 20, paddingRight: 20, paddingTop: 10 },
    cart_style28: { fontFamily: font_title },
    cart_style29: { width: 70 },
    cart_style30: { fontFamily: font_description, alignSelf: 'flex-end' },
    cart_style31: { paddingLeft: 20, paddingRight: 20, paddingTop: 10 },
    cart_style32: { fontFamily: font_title },
    cart_style33: { width: 70 },
    cart_style34: { fontFamily: font_description, alignSelf: 'flex-end' },
    cart_style35: { paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 },
    cart_style36: { fontFamily: font_title },
    cart_style37: { width: 70 },
    cart_style38: { fontFamily: font_description, alignSelf: 'flex-end' },
    cart_style39: { paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 },
    cart_style40: { fontFamily: font_title },
    cart_style41: { width: 70 },
    cart_style42: { fontFamily: font_description, alignSelf: 'flex-end' },
    cart_style43: { paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10 },
    cart_style44: { fontFamily: font_title },
    cart_style45: { width: 100 },
    cart_style46: { fontFamily: font_title, color: colors.theme_fg_two, alignSelf: 'flex-end', fontSize: 18 },
    cart_style47: { backgroundColor: colors.theme_fg_two },
    cart_style48: { padding: 20, justifyContent: 'center' },
    cart_style49: { borderColor: colors.theme_fg },
    cart_style50: { color: colors.theme_fg, fontFamily: font_title },
    cart_style51: { justifyContent: 'center' },
    cart_style52: { color: colors.theme_fg, marginBottom: 20, fontFamily: font_description },
    cart_style53: { backgroundColor: 'transparent' },
    cart_style54: { width: '90%' },
    cart_style55: { backgroundColor: colors.theme_bg, fontFamily: font_title },
    cart_style56: { color: colors.theme_bg_three, fontFamily: font_description },
    cart_style57: { marginTop: height_30, fontFamily: font_description },
    cart_style58: { margin: 20 },
    cart_style59: { backgroundColor: colors.theme_bg, fontFamily: font_title },
    cart_style60: { color: colors.theme_bg_three, fontFamily: font_description },
    cart_style61: { marginTop: height_30, fontFamily: font_description },

});

