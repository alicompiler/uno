import type React from 'react';
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { MessageContext } from './MessageContext';

interface Props extends PropsWithChildren {
    duration: number;
}

export const MessageProvider: React.FC<Props> = ({ children, duration }) => {
    const [message, setMessage] = useState<string>('');

    const displayMessage = useCallback((message: string) => {
        setMessage(message);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMessage('');
        }, duration);

        return () => clearTimeout(timeoutId);
    }, [message, duration]);

    const contextValue = useMemo(
        () => ({
            displayMessage,
        }),
        [displayMessage]
    );

    return (
        <MessageContext.Provider value={contextValue}>
            {message !== '' ? (
                <div className="fixed top-10 w-screen flex items-center justify-center flex-col z-50">
                    <p className="text-xl text-black bg-white p-2">{message}</p>
                </div>
            ) : null}
            {children}
        </MessageContext.Provider>
    );
};
