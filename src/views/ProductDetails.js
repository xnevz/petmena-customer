import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Container, Left, Body, Right, Icon, Row, Col, Footer, Card, CardItem } from 'native-base';
import * as colors from '../assets/css/Colors';
import { img_url, api_url, related_products, font_title, font_description } from '../config/Constants';
import UIStepper from 'react-native-ui-stepper';
import { Loader } from '../components/GeneralComponents';
import { addToCart, productReset } from '../actions/ProductActions';
import { subTotal, deliveryCharge, productVendor, reset } from '../actions/CartActions';
import { connect } from 'react-redux';
import axios from 'axios';

function ProductDetails(props) {

    const [state, msetState] = useState({
        data: props.route.params.data,
        vendor_id: props.route.params.vendor_id,
        related_products_list: [],
        view_value: true,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    useEffect(() => {
        get_related_products();
    }, []);

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function cart() {
        props.navigation.navigate('cart');
    }

    async function get_related_products() {
        setState({ isLoding: true });
        if (state.data.slug) {
            await axios({
                method: 'post',
                url: api_url + related_products,
                data: { product_id: state.data.id, slug: state.data.slug, vendor_id: state.data.vendor_id }
            })
                .then(async response => {
                    setState({ isLoding: false });
                    setState({ related_products_list: response.data.result });
                })
                .catch(error => {
                    setState({ isLoding: false });
                });
        }
    };

    add_to_cart = async (qty, product_id, product_name, price, image, description) => {

        if (await check_vendor()) {
            let cart_items = props.cart_items;
            let old_product_details = cart_items[product_id];
            let sub_total = parseFloat(props.sub_total);
            let total_price = parseFloat(qty * price);

            if (old_product_details != undefined && total_price > 0) {

                let final_price = parseFloat(total_price) - parseFloat(old_product_details.price);
                sub_total = parseFloat(sub_total) + parseFloat(final_price);

            } else if (total_price > 0) {
                let final_price = parseFloat(qty * price);
                sub_total = parseFloat(sub_total) + parseFloat(final_price);
            }

            if (qty > 0) {
                let product_data = {
                    product_id: product_id,
                    product_name: product_name,
                    qty: qty,
                    unit_price: price,
                    image: image,
                    description: description,
                    price: parseFloat(qty * price)
                }
                cart_items[product_id] = product_data;
                await props.addToCart(cart_items);
                await props.subTotal(sub_total.toFixed(2));
                if (sub_total < global.free_delivery_amount) {
                    await props.deliveryCharge(global.delivery_charge.toFixed(2));
                } else {
                    await props.deliveryCharge(0.00);
                }
            } else {
                delete cart_items[product_id];
                sub_total = parseFloat(sub_total) - parseFloat(price);
                await props.addToCart(cart_items);
                await props.subTotal(sub_total);
                if (sub_total < global.free_delivery_amount) {
                    await props.deliveryCharge(global.delivery_charge);
                } else {
                    await props.deliveryCharge(0);
                }
            }
        }

    }

    move_product_details = async (item) => {
        await setState({ data: item });
        await get_related_products();
    }

    async function check_vendor() {
        if (props.current_vendor == props.product_vendor || props.product_vendor == 0) {
            setState({ view_value: true });
            return true;
        } else {
            setState({ view_value: false });
            Alert.alert(
                "Reset !",
                "You are select another vendors product. Can we remove existing vendor items from cart?",
                [
                    {
                        text: "Cancel",
                        onPress: () => { return false; },
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            await props.productReset();
                            await props.reset();
                            props.productVendor(props.current_vendor);
                            setState({ view_value: false });
                            alert('Now you can add products');
                            return true;
                        }
                    }
                ],
                { cancelable: false }
            );

        }
    }

    function cart() {
        props.navigation.navigate('cart');
    }



    const { cart_items, cart_count } = props

    return (
        <Container>
            <View>
                <View style={styles.product_style1}>
                    <TouchableOpacity style={styles.product_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.product_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.product_style4} />
                    <Text style={styles.product_style5}>Product Details</Text>
                </View>
            </View>
            <View>
                <View>
                    <Image source={{ uri: img_url + state.data.image }} style={styles.product_style6} />
                </View>
                <View style={styles.product_style7} />
                <Card>
                    <Box>
                        <Card>
                            <Text style={styles.product_style8}>{state.data.product_name}</Text>
                        </Card>
                    </Box>
                </Card>
                <View style={styles.product_style9} />
                <Card>
                    <Box bordered>
                        <Card>
                            <Text style={styles.product_style10}>About product</Text>
                        </Card>
                    </Box>
                    <Box>
                        <Card>
                            <Text style={styles.product_style11}>{state.data.description}</Text>
                        </Card>
                    </Box>
                </Card>
                <View style={styles.product_style12}>
                    <Row>
                        <Box>
                            <Row>
                                <Box>
                                    <Text style={styles.product_style13}>{global.currency}{state.data.marked_price}/ {state.data.unit}</Text>
                                </Box>
                                <Box style={styles.product_style14}>
                                    <Text style={styles.product_style15}>{state.data.discount}% OFF</Text>
                                </Box>
                            </Row>
                            <Text style={styles.product_style16}>{global.currency}{state.data.price} <Text style={styles.product_style17}>/ {state.data.unit}</Text></Text>
                        </Box>
                        <Box>
                            <UIStepper
                                onValueChange={(value) => { add_to_cart(value, state.data.id, state.data.product_name, state.data.price, state.data.image, state.data.description) }}
                                displayValue={state.view_value}
                                initialValue={cart_items[state.data.id] ? cart_items[state.data.id].qty : 0}
                                value={cart_items[state.data.id] ? cart_items[state.data.id].qty : 0}
                                borderColor={colors.theme_fg}
                                textColor={colors.theme_fg}
                                tintColor={colors.theme_fg}
                            />
                        </Box>
                    </Row>
                </View>
                <View style={styles.product_style18} />
                <Text style={styles.product_style19}>Related product</Text>
                <View style={styles.product_style20}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        {state.related_products_list.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{ width: 200 }}
                                onPress={() => move_product_details(item)}
                            >
                                <View style={styles.product_style21}>
                                    <Card
                                        style={styles.product_style22}
                                    >
                                        <Box
                                            cardBody
                                            bordered
                                            style={styles.product_style23}
                                        >
                                            <Image
                                                source={{
                                                    uri: img_url + item.image,
                                                }}
                                                style={styles.product_style24}
                                            />
                                        </Box>
                                        <Box
                                            bordered
                                            footer
                                            style={styles.product_style25}
                                        >
                                            <Box>
                                                <Text style={styles.product_style26}>
                                                    {item.product_name}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Card>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            {cart_count ?
                <Box style={styles.product_style27} >
                    <TouchableOpacity activeOpacity={1} style={styles.product_style28}>
                        <Row>
                            <Box onPress={() => handleBackButtonClick()} style={styles.product_style29} >
                                <Text style={styles.product_style30}>CONTINUE SHOPPING</Text>
                            </Box>
                            <Box onPress={() => cart()} style={styles.product_style31} >
                                <Text style={styles.product_style32}>VIEW CART( {global.currency}{props.sub_total} )</Text>
                            </Box>
                        </Row>
                    </TouchableOpacity>
                </Box> : null}
            <Loader visible={state.isLoding} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.product.isLoding,
        error: state.product.error,
        data: state.product.data,
        message: state.product.message,
        status: state.product.status,
        cart_items: state.product.cart_items,
        cart_count: state.product.cart_count,
        sub_total: state.cart.sub_total,
        delivery_charge: state.cart.delivery_charge,
        current_vendor: state.cart.current_vendor,
        product_vendor: state.cart.product_vendor
    };
}

const mapDispatchToProps = (dispatch) => ({
    addToCart: (data) => dispatch(addToCart(data)),
    subTotal: (data) => dispatch(subTotal(data)),
    productVendor: (data) => dispatch(productVendor(data)),
    deliveryCharge: (data) => dispatch(deliveryCharge(data)),
    productReset: () => dispatch(productReset()),
    reset: () => dispatch(reset())

});


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

const styles = StyleSheet.create({
    product_style1: { alignItems: 'flex-start', margin: 10 },
    product_style2: { width: 100, justifyContent: 'center' },
    product_style3: { color: colors.theme_fg_two, fontSize: 30 },
    product_style4: { margin: 5 },
    product_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    product_style6: { width: '100%', height: 200 },
    product_style7: { margin: 10 },
    product_style8: { fontSize: 15, alignSelf: 'center', fontFamily: font_description },
    product_style9: { margin: 5 },
    product_style10: { fontSize: 15, fontFamily: font_title, color: colors.theme_fg_two },
    product_style11: { fontSize: 14, fontFamily: font_description },
    product_style12: { padding: 10 },
    product_style13: { textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 12, color: '#FF0000' },
    product_style14: { marginRight: '20%' },
    product_style15: { color: '#006400', fontSize: 12, fontFamily: font_title, padding: 1 },
    product_style16: { color: colors.theme_fg, fontSize: 25, fontFamily: font_title },
    product_style17: { fontSize: 10, color: colors.theme_fg_two },
    product_style18: { margin: 10 },
    product_style19: { fontSize: 15, fontFamily: font_title, color: colors.theme_fg_two, marginLeft: 10 },
    product_style20: { flexDirection: 'row' },
    product_style21: { marginRight: 5 },
    product_style22: { borderRadius: 10, alignItems: "center" },
    product_style23: { borderRadius: 10, padding: 0, margin: 0 },
    product_style24: { width: 200, height: 100, flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    product_style25: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 0, margin: 0 },
    product_style26: { fontSize: 15, fontFamily: font_title, color: colors.theme_fg },
    product_style27: { backgroundColor: 'transparent' },
    product_style28: { width: '100%', backgroundColor: colors.theme_bg },
    product_style29: { alignItems: 'center', justifyContent: 'center' },
    product_style30: { color: colors.theme_fg_three, fontFamily: font_title },
    product_style31: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 0, margin: 0 },
    product_style32: { marginRight: 5 },
});
