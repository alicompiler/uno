import { useContext } from 'react';
import { MessageContext } from './MessageContext';

export const useDisplayMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('cannot find MessageProvider');
    }
    return context.displayMessage;
};
