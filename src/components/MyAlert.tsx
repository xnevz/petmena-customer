import { AlertDialog } from 'native-base';
import React from 'react';
import { useAlertProps } from '../customHooks/uiHooks';

export default function getMyAlert(title?: string, body?: string, onClose?: () => void) {

    const alert = useAlertProps(title, body);
    const ui = (
        <AlertDialog leastDestructiveRef={alert.cancelRef} onClose={onClose} isOpen={alert.isOpen}>
            <AlertDialog.Content>
                <AlertDialog.Header>
                    <AlertDialog.CloseButton onPress={() => alert.setIsOpen(false)} />
                    {alert.title}
                </AlertDialog.Header>
                <AlertDialog.Body>
                    {alert.body}
                </AlertDialog.Body>

            </AlertDialog.Content>
        </AlertDialog>);

    return {
        alert, ui
    };
}
