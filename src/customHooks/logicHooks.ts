import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';

export function useFcmToken() {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (global.fcm_token !== undefined)
            setToken(global.fcm_token);
        else {
            //get the messaging token
            AsyncStorage.getItem("fcmToken").then(async result => {
                if (!result) {
                    let fcmToken = await messaging().getToken();
                    if (fcmToken) {
                        try {
                            AsyncStorage.setItem("fcmToken", fcmToken);
                            global.fcm_token = fcmToken;
                        } catch (e) { }
                    }
                } else {
                    global.fcm_token = result;
                }
            });
        }

    }, []);

    return token;
}
