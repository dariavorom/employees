import { RootState } from '../../app/store';

export const selectEmployees = (state: RootState) => state.employees.employees;
