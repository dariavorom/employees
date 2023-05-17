import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { authApi } from '../app/services/auth';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(
		authApi.endpoints.login.matchFulfilled,
		authApi.endpoints.register.matchFulfilled
	),
	effect: (action, listenerApi) => {
		const token = (action.payload as { token: string }).token;
		listenerApi.cancelActiveListeners();

		if (token) {
			localStorage.setItem('token', token);
		}
	},
});
