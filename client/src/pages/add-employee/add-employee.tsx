import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Employee } from '@prisma/client';
import { Row } from 'antd';

import { useAppSelector } from '../../app/hooks';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { EmployeeForm } from '../../components/employee-form';
import { Layout } from '../../components/layout';
import { Paths } from '../../constants/paths';
import { selectUser } from '../../features/auth/selectors';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const AddEmployee = () => {
	const [error, setError] = useState<string>();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);
	const [addEmployee] = useAddEmployeeMutation();

	const handleAddEmplyee = async (data: Employee) => {
		try {
			await addEmployee(data).unwrap();
			navigate(`${Paths.status}/created`);
		} catch (err) {
			if (isErrorWithMessage(err)) {
				setError(err.data.message);
			} else {
				setError('Неизвестная ошибка');
			}
		}
	};

	useEffect(() => {
		if (!user) {
			navigate(Paths.login);
		}
	}, [navigate, user]);

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<EmployeeForm
					title='Добавьте сотрудника'
					btnText='Добавить'
					onFinish={handleAddEmplyee}
					error={error}
				/>
			</Row>
		</Layout>
	);
};
