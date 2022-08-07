import { useRef, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData, useWindowDimensions } from "react-native";


export function useInput(minLength?: number) {
    const [value, onChangeText] = useState('');
    const [invalid, setInvalid] = useState(false);

    if (minLength === undefined)
        return {
            value,
            onChangeText,
            invalid,
            setInvalid,
            validate: () => true
        };
    else
        return {
            value,
            onChangeText,
            invalid,
            setInvalid,
            validate() {
                const val = value?.length < (minLength ?? 0);
                setInvalid(val);
                return !val;
            },
            onBlur() {
                setInvalid(value?.length < (minLength ?? 0));
            }
        };
}

export function useCheck() {
    const [isChecked, setIsChecked] = useState(false);

    return {
        isChecked,
        onChange: () => setIsChecked(!isChecked)
    };
}

export function useAlertProps(ptitle: string = '', pbody: string = '') {
    const [title, setTitle] = useState(ptitle);
    const [body, setBody] = useState(pbody);
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef(null);

    return {
        title,
        setTitle,

        body,
        setBody,

        isOpen,
        setIsOpen,

        cancelRef,

        async showAlert(title: string, body: string) {
            setTitle(title);
            setBody(body);
            setIsOpen(true);
        }
    };
}