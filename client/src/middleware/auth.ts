import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '../app/services/auth';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(
        authApi.endpoints.login.matchFulfilled,
        authApi.endpoints.register.matchFulfilled
    ),
    effect: async (action, listenerApi) => {
        const token = action.payload.token;
        listenerApi.cancelActiveListeners();

        if (token) {
            localStorage.setItem('token', token);
        }
    },
});
