import React, { Component, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container, Body, Icon, Card, CardItem, View } from 'native-base';
import { font_title, font_description } from '../config/Constants';
import * as colors from '../assets/css/Colors';

export default function FaqDetails(props) {

    const [state, msetState] = useState({
        data: props.route.params.data
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    return (
        <Container>
            <View>
                <View style={styles.detail_style1}>
                    <TouchableOpacity style={styles.detail_style2} onPress={handleBackButtonClick} activeOpacity={1} >
                        <Icon onPress={handleBackButtonClick} style={styles.detail_style3} name='arrow-back' />
                    </TouchableOpacity>
                    <View style={styles.detail_style4} />
                    <Text style={styles.detail_style5}>Faq Details</Text>
                </View>
            </View>
            <View style={styles.detail_style6} />
            <View>
                <Card>
                    <Box>
                        <Card>
                            <Text style={styles.detail_style7}>{state.data.answer}</Text>
                        </Card>
                    </Box>
                </Card>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    detail_style1: { alignItems: 'flex-start', margin: 10 },
    detail_style2: { width: 100, justifyContent: 'center' },
    detail_style3: { color: colors.theme_fg_two, fontSize: 30 },
    detail_style4: { margin: 5 },
    detail_style5: { fontSize: 25, color: colors.theme_fg_two, fontFamily: font_title },
    detail_style6: { margin: 20 },
    detail_style7: { fontFamily: font_description },
});
