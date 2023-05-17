import { ErrorWithMessage } from '../types';

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object';
