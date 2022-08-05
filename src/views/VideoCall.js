import React, { Component, useEffect, useState } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { Icon, Row, Col } from 'native-base';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo
} from 'react-native-twilio-video-webrtc'
import { request, PERMISSIONS } from 'react-native-permissions';
import * as colors from '../assets/css/Colors';
import { api_url, get_access_token_for_video } from '../config/Constants';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
export default function VideoCall(props) {

    const [state, msetState] = useState({
        isAudioEnabled: true,
        isVideoEnabled: true,
        status: 'disconnected',
        booking_id: props.route.params.booking_id,
        participants: new Map(),
        videoTracks: new Map(),
        roomName: '',
        token: ''
    });
    function setState(mstate) {
        msetState({ ...state, ...mstate });
    }

    useEffect(() => {
        permission_check();
    }, []);

    async function getAccessTokenFromServer() {
        setState({ isLoading: true });
        await axios({
            method: "get",
            url: api_url + get_access_token_for_video + '/' + state.booking_id
        })
            .then(async (response) => {
                setState({ isLoading: false });
                refs.twilioVideo.connect({ roomName: state.booking_id.toString(), accessToken: response.data.result, status: 'connecting' })
            })
            .catch((error) => {
                setState({ isLoading: false });
            });
    };

    handleBackButtonClick = () => {
        props.navigation.goBack(null);
    }

    async function permission_check() {
        /*check(PERMISSIONS.ANDROID.RECORD_AUDIO)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              alert(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              alert(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              alert('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              alert('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {
          // …
        });*/
        await request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
            setState({ audio_permission: result });
        });

        await request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
            setState({ video_permission: result });
        });

        if (state.audio_permission == "granted" && state.video_permission == "granted") {
            await getAccessTokenFromServer();
        } else {
            alert('Sorry permission not granted');
        }


    }

    function _onEndButtonPress() {
        refs.twilioVideo.disconnect()
    }

    function _onMuteButtonPress() {
        refs.twilioVideo.setLocalAudioEnabled(!state.isAudioEnabled)
            .then(isEnabled => setState({ isAudioEnabled: isEnabled }))
    }

    function _onFlipButtonPress() {
        refs.twilioVideo.flipCamera()
    }

    function _onRoomDidConnect() {
        setState({ status: 'connected' })
    }

    _onRoomDidDisconnect = ({ roomName, error }) => {
        setState({ status: 'disconnected' })
        handleBackButtonClick();
    }

    _onRoomDidFailToConnect = (error) => {
        alert("ERROR: 2")

        setState({ status: 'disconnected' })
    }

    _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantAddedVideoTrack: ", participant, track)

        setState({
            videoTracks: new Map([
                ...state.videoTracks,
                [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
            ]),
        });
    }

    _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track)

        const videoTracks = state.videoTracks
        videoTracks.delete(track.trackSid)

        setState({ videoTracks: new Map([...videoTracks]) });
    }


    return (
        <View style={styles.vid_style1}>
            <Loader visible={state.isLoading} />
            {
                (state.status === 'connected' || state.status === 'connecting') &&
                <View style={styles.vid_style2}>
                    {
                        state.status === 'connected' &&
                        <View style={styles.vid_style3}>
                            {
                                Array.from(state.videoTracks, ([trackSid, trackIdentifier]) => {
                                    return (
                                        <TwilioVideoParticipantView
                                            style={styles.vid_style4}
                                            key={trackSid}
                                            trackIdentifier={trackIdentifier}
                                        />
                                    )
                                })
                            }
                        </View>
                    }
                    <Row
                        style={styles.vid_style5}>
                        <Box style={styles.vid_style6}>
                            <TouchableOpacity
                                style={styles.vid_style7}
                                activeOpacity={1}
                                onPress={_onMuteButtonPress}>
                                {state.isAudioEnabled ?
                                    <Icon style={styles.vid_style8} name='mic' />
                                    :
                                    <Icon style={styles.vid_style9} name='mic-off' />
                                }
                            </TouchableOpacity>
                        </Box>
                        <Box style={styles.vid_style10}>
                            <TouchableOpacity
                                style={styles.vid_style11}
                                activeOpacity={1}
                                onPress={_onEndButtonPress}>
                                <Icon style={styles.vid_style12} name='call' />
                            </TouchableOpacity>
                        </Box>
                        <Box style={styles.vid_style13}>
                            <TouchableOpacity
                                style={styles.vid_style14}
                                activeOpacity={1}
                                onPress={_onFlipButtonPress}>
                                <Icon style={styles.vid_style15} name='refresh' />
                            </TouchableOpacity>
                        </Box>
                        <TwilioVideoLocalView
                            enabled={true}
                            style={styles.vid_style16}
                        />
                    </Row>
                </View>
            }

            <TwilioVideo
                ref="twilioVideo"
                onRoomDidConnect={_onRoomDidConnect}
                onRoomDidDisconnect={_onRoomDidDisconnect}
                onRoomDidFailToConnect={_onRoomDidFailToConnect}
                onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
                onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    vid_style1: { flex: 1, backgroundColor: 'white' },
    vid_style2: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    },
    vid_style3: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    vid_style4: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        height: '100%',
    },
    vid_style5: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        backgroundColor: 'transparent',
        flexDirection: "row",
        alignItems: "center"
    },
    vid_style6: { alignItems: 'center', justifyContent: 'center' },
    vid_style7: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: "center"
    },
    vid_style8: { color: colors.theme_fg_three },
    vid_style9: { color: colors.theme_fg_three },
    vid_style10: { alignItems: 'center', justifyContent: 'center' },
    vid_style11: {
        width: 70,
        height: 70,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: "center"
    },
    vid_style12: { color: colors.theme_fg_three },
    vid_style13: { alignItems: 'center', justifyContent: 'center' },
    vid_style14: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: "center"
    },
    vid_style15: { color: colors.theme_fg_three },
    vid_style16: {
        flex: 1,
        width: 130,
        height: 200,
        position: "absolute",
        right: 10,
        bottom: 100
    }
});

AppRegistry.registerComponent('VideoCall', () => VideoCall);