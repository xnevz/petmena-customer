import React, { Component, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Container, List, ListItem, Body, Col } from 'native-base';
import { api_url, search_products, height_30, no_data, font_title } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';

export default function Search(props) {

    const [state, msetState] = useState({
        search: '',
        data: [],
        count: undefined,
        on_search: 0,
        vendor_id: props.route.params.vendor_id,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    move_product_details = (item) => {
        props.navigation.navigate('ProductDetails', { data: item, vendor_id: state.vendor_id });
    }

    updateSearch = async (search) => {
        //setState({ isLoding : true });
        setState({ search: search, on_search: 1 });
        if (search != "") {
            await axios({
                method: 'post',
                url: api_url + search_products,
                data: { search: search, vendor_id: state.vendor_id }
            })
                .then(async response => {
                    //setState({ isLoding : false });
                    setState({ data: response.data.result, count: response.data.count, on_search: 0 });
                })
                .catch(error => {
                    //setState({ isLoding : false });
                    setState({ data: [], count: undefined, on_search: 0 });
                });
        } else {
            setState({ data: [], count: undefined, on_search: 0 });
        }
    };



    return (
        <Container>

            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={updateSearch}
                    value={state.search}
                    inputContainerStyle={styles.ser_style1}
                    containerStyle={styles.ser_style2}
                />
                {state.on_search == 1 && <ActivityIndicator size="large" color={colors.theme_fg} />}
                <List>
                    {state.data.map((item, index) => (
                        <Box onPress={() => move_product_details(item)}>
                            <Box>
                                <Text style={styles.ser_style3}>{item.product_name}</Text>
                                <Text style={styles.ser_style4}>{item.category_name}/{item.sub_category_name}</Text>
                            </Box>
                        </Box>
                    ))}
                </List>
                {state.count == 0 && <Card style={styles.ser_style5} >
                    <Text>{no_data}</Text>
                </Card>}
            </View>
            <Loader visible={state.isLoding} />
        </Container>
    );
}

const styles = StyleSheet.create({
    ser_style1: { backgroundColor: colors.theme_bg_three },
    ser_style2: { backgroundColor: colors.theme_bg },
    ser_style3: { color: colors.theme_fg, fontFamily: font_title },
    ser_style4: { fontSize: 10, fontFamily: font_title },
    ser_style5: { marginTop: height_30 },
});
