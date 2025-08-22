import { buildOutgoingMessage, OutgoingMessageType } from './BaseResponse';

export interface ErrorMessagePayload {
    message: string;
    errorCode: string;
}

export function createErrorResponse(message: string, code: string): string {
    return buildOutgoingMessage({
        type: OutgoingMessageType.Error,
        payload: {
            message,
            errorCode: code,
        },
    });
}
