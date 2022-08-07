import { AlertDialog } from 'native-base';
import React, { useRef, useState } from 'react';

export default function BusyOverlay(content?: string) {

    const [text, setText] = useState(content ?? 'Loading ...');
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef(null);

    const ui = (
        <AlertDialog closeOnOverlayClick={false} leastDestructiveRef={cancelRef} isOpen={isOpen}>
            <AlertDialog.Content>
                <AlertDialog.Header>
                    Please wait
                </AlertDialog.Header>
                <AlertDialog.Body>
                    {text}
                </AlertDialog.Body>

            </AlertDialog.Content>
        </AlertDialog>);

    return {
        setIsOpen, ui
    };
}
