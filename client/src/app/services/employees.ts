// eslint-disable-next-line import/no-extraneous-dependencies
import { Employee } from '@prisma/client';

import { api } from './api';

export const employeesApi = api.enhanceEndpoints({ addTagTypes: ['Edit'] }).injectEndpoints({
	endpoints: (builder) => ({
		getAllEmployees: builder.query<Employee[], void>({
			query: () => ({ url: '/employees', method: 'GET' }),
			providesTags: ['Edit'],
		}),
		getEmployee: builder.query<Employee, string>({
			query: (id) => ({ url: `/employees/${id}`, method: 'GET' }),
			providesTags: ['Edit'],
		}),
		editEmployee: builder.mutation<string, Employee>({
			query: (employee) => ({
				url: '/employees/edit',
				method: 'PUT',
				body: employee,
			}),
			invalidatesTags: ['Edit'],
		}),
		removeEmployee: builder.mutation<string, Employee>({
			query: (employee) => ({
				url: '/employees/remove',
				method: 'POST',
				body: { id: employee.id },
			}),
			invalidatesTags: ['Edit'],
		}),
		addEmployee: builder.mutation<Employee, Employee>({
			query: (employee) => ({
				url: '/employees/add',
				method: 'POST',
				body: employee,
			}),
			invalidatesTags: ['Edit'],
		}),
	}),
});

export const {
	useGetAllEmployeesQuery,
	useGetEmployeeQuery,
	useEditEmployeeMutation,
	useRemoveEmployeeMutation,
	useAddEmployeeMutation,
	endpoints: { getAllEmployees, getEmployee, editEmployee, removeEmployee, addEmployee },
} = employeesApi;
