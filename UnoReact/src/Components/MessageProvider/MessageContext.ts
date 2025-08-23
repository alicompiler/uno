import React from 'react';

export interface MessageContextType {
    displayMessage: (message: string) => void;
}
export const MessageContext = React.createContext<MessageContextType>({
    displayMessage: () => {
        throw new Error('there is no event messages provider');
    },
});
