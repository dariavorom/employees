import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Employee } from '@prisma/client';
import { Row } from 'antd';

import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import { EmployeeForm } from '../../components/employee-form';
import { Layout } from '../../components/layout';
import { Paths } from '../../constants/paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const EditEmployee = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState<string>();
	const { data, isLoading } = useGetEmployeeQuery(id || '');
	const [editEmployee] = useEditEmployeeMutation();

	if (isLoading) {
		return <span>Загрузка</span>;
	}

	const handleEditEmplyee = async (employee: Employee) => {
		try {
			const editedEmployee = {
				...data,
				...employee,
			};
			await editEmployee(editedEmployee).unwrap();

			navigate(`${Paths.status}/edited`);
		} catch (err) {
			if (isErrorWithMessage(err)) {
				setError(err.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	};

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm
					title='Редактировать сотрудника'
					btnText='Редактировать'
					onFinish={handleEditEmplyee}
					error={error}
					employee={data}
				/>
			</Row>
		</Layout>
	);
};
