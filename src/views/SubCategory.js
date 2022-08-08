import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Container, Left, Body, Icon, Footer, Row, Col, Card, CardItem } from 'native-base';
import { api_url, img_url, sub_category, no_data, height_30, font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/SubCategoryActions';
function SubCategory(props) {
    const [state, msetState] = useState({
        list: props.route.params.list,
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    useEffect(() => {
        getSubCategory();
    }, []);

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    };

    function cart() {
        props.navigation.navigate("cart");
    };

    async function getSubCategory() {
        props.serviceActionPending();
        await axios({
            method: "post",
            url: api_url + sub_category,
            data: {
                vendor_id: state.list.vendor_id,
                category_id: state.list.id,
            },
        })
            .then(async (response) => {
                await props.serviceActionSuccess(response.data);
                // alert(JSON.stringify(response.data.vendor))
            })
            .catch((error) => {
                props.serviceActionError(error);
                alert("Sorry something went wrong");
            });
    };

    const product = async (item) => {
        await props.navigation.navigate("product", { data: item });
    };


    const { isLoding, data, cart_count } = props;

    return (
        <Container>
            <View>
                <View style={styles.sub_style1}>
                    <TouchableOpacity style={styles.sub_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.sub_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.sub_style4} />
                    <Text style={styles.sub_style5}>SubCategories</Text>
                </View>
            </View>
            {data != 0 && data != undefined && (
                <View>
                    <ImageBackground
                        source={{ uri: img_url + data.vendor.store_image }}
                        style={styles.sub_style6}
                    >
                        <View style={styles.sub_style7}>
                            <Text style={[styles.textStyle, { paddingTop: 10 }]}>
                                {data.vendor.store_name}
                            </Text>
                        </View>
                    </ImageBackground>

                    <View style={styles.sub_style8} />
                    <Row style={styles.sub_style9}>
                        <FlatList
                            data={data.sub_categories}
                            renderItem={({ item, index }) => (
                                <Box style={styles.sub_style10}>
                                    <View style={styles.sub_style11}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => product(item, index)}
                                        >
                                            <Card
                                                style={styles.sub_style12}
                                            >
                                                <Box
                                                    cardBody
                                                    bordered
                                                    style={styles.sub_style13}
                                                >
                                                    <Image
                                                        source={{ uri: img_url + item.image }}
                                                        style={styles.sub_style14}
                                                    />
                                                </Box>
                                                <Box
                                                    bordered
                                                    footer
                                                    style={styles.sub_style15}
                                                >
                                                    <Box>
                                                        <Text style={styles.sub_style16}>
                                                            {item.sub_category_name}
                                                        </Text>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </TouchableOpacity>
                                    </View>
                                </Box>
                            )}
                            numColumns={2}
                        />
                    </Row>
                </View>
            )}
            {data == 0 && (
                <Card style={styles.sub_style17}>
                    <Text>{no_data}</Text>
                </Card>
            )}
            {cart_count ? (
                <Box style={styles.sub_style18}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => cart()}
                        style={styles.sub_style19}
                    >
                        <Row>
                            <Box style={styles.sub_style20}>
                                <Text style={styles.sub_style21}>VIEW CART</Text>
                            </Box>
                        </Row>
                    </TouchableOpacity>
                </Box>
            ) : null}
            <Loader visible={isLoding} />
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        isLoding: state.sub_category.isLoding,
        error: state.sub_category.error,
        data: state.sub_category.data,
        message: state.sub_category.message,
        status: state.sub_category.status,
        cart_count: state.product.cart_count,
    };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);

const styles = StyleSheet.create({
    sub_style1: { alignItems: 'flex-start', margin: 10 },
    sub_style2: { width: 100, justifyContent: 'center' },
    sub_style3: { color: colors.theme_fg_two, fontSize: 30 },
    sub_style4: { margin: 5 },
    sub_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    sub_style6: { height: 150 },
    sub_style7: { backgroundColor: colors.theme_opactiy_bg, height: '100%' },
    sub_style8: { margin: 10 },
    sub_style9: { width: "100%", paddingLeft: 10 },
    sub_style10: { width: "50%" },
    sub_style11: { paddingRight: 10, paddingBottom: 10 },
    sub_style12: { borderRadius: 10, alignItems: "center" },
    sub_style13: { borderRadius: 10, padding: 0, margin: 0 },
    sub_style14: { height: 100, width: 100, flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    sub_style15: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 0, margin: 0 },
    sub_style16: { fontSize: 13.5, fontFamily: font_title, color: colors.theme_fg },
    sub_style17: { marginTop: height_30 },
    sub_style18: { width: "50%" },
    sub_style19: { width: "100%", backgroundColor: colors.theme_bg },
    sub_style20: { alignItems: "center", justifyContent: "center" },
    sub_style21: { color: colors.theme_fg_three, fontFamily: font_title },
});
