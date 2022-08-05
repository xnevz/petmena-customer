import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as colors from '../assets/css/Colors';
import { GiftedChat, Actions, } from 'react-native-gifted-chat';
import { fb } from '../config/firebaseConfig';
import { img_url, image_upload, api_url, chat_icon, font_title, chat_pusher } from '../config/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
const options = {
    title: "Select a photo",
    takePhotoButtonTitle: "Take a photo",
    chooseFromLibraryButtonTitle: "Choose from gallery",
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
};

export default function Chat(props) {

    const [state, msetState] = useState({
        messages: [],
        data: props.route.params.data,
        source: undefined,
        isLoding: false
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    const refOn = callback => {
        fb.ref('/chat/' + state.data.booking_id)
            .limitToLast(20)
            .on('child_added', snapshot => callback(parse(snapshot)));
    }

    useEffect(() => {
        refOn(message =>
            setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }, []);

    parse = snapshot => {
        const { text, user, image } = snapshot.val();
        const { key: _id } = snapshot;
        const message = { _id, text, user, image };
        return message;
    };

    onSend = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = { text, user };
            fb.ref('/chat/' + state.data.booking_id).push(message);
            chat_pusher(message.text);
        }
    };

    async function chat_pusher(async) {
        await axios({
            method: "post",
            url: api_url + chat_pusher,
            data: { type: 1, booking_id: state.data.booking_id, message: message },
        })
            .then(async (response) => {

            })
            .catch((error) => {

            });
    }

    function handleBackButtonClick() {
        props.navigation.goBack(null);
    }

    function select_photo() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                const source = { uri: response.uri };
                setState({
                    source: response.data,
                });
                profileimageupdate();
            }
        });
    }

    async function profileimageupdate() {
        setState({ isLoding: true });
        // TODO
        // RNFetchBlob.fetch(
        //     "POST",
        //     api_url + image_upload,
        //     {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     [
        //         {
        //             name: "image",
        //             filename: "image.png",
        //             type: "image/png",
        //             data: state.source,
        //         },
        //         {
        //             name: "booking_id",
        //             data: state.data.booking_id.toString(),
        //         },
        //     ]
        // )
        //     .then((resp) => {
        //         setState({ isLoding: false });
        //         let data = resp.data;
        //         data = JSON.parse(data);
        //         let message = {
        //             user: {
        //                 _id: global.id + '-Cr',
        //                 name: global.customer_name,
        //                 avatar: chat_icon
        //             },
        //             image: img_url + data.result
        //         };
        //         fb.ref('/chat/' + state.data.booking_id).push(message);
        //     })
        //     .catch((err) => {
        //         setState({ isLoding: false });
        //         //alert("Error on while uploading,Try again");
        //     });
    };

    function renderActions() {

        return (
            <Actions
                {...props}
                containerStyle={styles.chat_style1}
                icon={() => (
                    <FontAwesome name='paperclip'
                        size={25}
                        color='black'
                        style={styles.chat_style2}
                    />
                )}
                options={{
                    'Choose From Library': () => {
                        select_photo();
                    },
                    Cancel: () => {
                        console.log('Cancel');
                    },
                }}
                optionTintColor="#222B45"
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                messages={state.messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: global.id + '-Cr',
                    name: global.customer_name,
                    avatar: chat_icon
                }}
                renderActions={renderActions}
                showUserAvatar
            />
            <Loader visible={state.isLoading} />
        </View>
    );
}


const styles = StyleSheet.create({
    chat_style1: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginLeft: 4, marginRight: 4, marginBottom: 0 },
    chat_style2: { color: colors.theme_fg },
});
