import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Icon, List, Button, Box, FlatList } from 'native-base';
import * as colors from '../assets/css/Colors';
import { Divider } from '../components/GeneralComponents';
import { menus, font_description, font_title } from '../config/Constants';
import Dialog from "react-native-dialog";

export default function More(props) {

    const [state, msetState] = useState({
        dialogVisible: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    function navigate(route) {
        if (route == 'Logout') {
            showDialog();
        } else if (route == 'AddressList') {
            props.navigation.navigate(route, { from: 'More' });
        } else {
            props.navigation.navigate(route);
        }
    }

    function showDialog() {
        setState({ dialogVisible: true });
    }

    function closeDialog() {
        setState({ dialogVisible: false });
    }

    function handleCancel() {
        setState({ dialogVisible: false });
    }

    async function handleLogout() {
        closeDialog();
        await props.navigation.navigate('logout');
    }

    return (
        <Container style={styles.more_style1} >
            <View style={styles.more_style2} >
                <Text style={styles.more_style3} >More</Text>
            </View>
            <Divider />
            <View style={styles.more_style4} >
                <Dialog.Container visible={state.dialogVisible}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Description>
                        Do you want to logout?.
                    </Dialog.Description>
                    <Dialog.Button label="Yes" onPress={handleLogout} />
                    <Dialog.Button label="No" onPress={handleCancel} />
                </Dialog.Container>

                <List>
                    <FlatList
                        data={menus}
                        renderItem={({ item, index }) => (
                            <Box icon onPress={() => navigate(item.route)}>
                                <Box>
                                    <Button style={styles.more_style5}>
                                        <Icon active name={item.icon} />
                                    </Button>
                                </Box>
                                <Box>
                                    <Text style={styles.more_style6} >{item.menu_name}</Text>
                                </Box>
                            </Box>
                        )}
                        keyExtractor={item => item.menu_name}
                    />
                </List>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    more_style1: { backgroundColor: colors.theme_bg_two },
    more_style2: { backgroundColor: colors.theme_bg_three, padding: 10 },
    more_style3: { fontSize: 16, color: colors.theme_fg_two, fontFamily: font_title },
    more_style4: { backgroundColor: colors.theme_bg_three },
    more_style5: { backgroundColor: colors.theme_bg },
    more_style6: { fontSize: 16, color: colors.theme_fg_two, fontFamily: font_description },
});

