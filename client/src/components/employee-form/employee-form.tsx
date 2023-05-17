// eslint-disable-next-line import/no-extraneous-dependencies
import { Employee } from '@prisma/client';
import { Card, Form, Space } from 'antd';

import { CustomButton } from '../custom-button';
import { CustomInput } from '../custom-input';
import { ErrorWithMessage } from '../error-message';

type Props<T> = {
	onFinish: (values: T) => void;
	btnText: string;
	title: string;
	error?: string;
	employee?: T;
};

export const EmployeeForm = ({ onFinish, btnText, title, employee, error }: Props<Employee>) => {
	return (
		<Card title={title} style={{ width: '30rem' }}>
			<Form name='employee-form' onFinish={onFinish} initialValues={employee}>
				<CustomInput name='firstName' placeholder='Имя' />
				<CustomInput name='lastName' placeholder='Фамилия' />
				<CustomInput type='number' name='age' placeholder='Возраст' />
				<CustomInput name='address' placeholder='Адрес' />
				<Space>
					<ErrorWithMessage message={error} />
				</Space>
				<CustomButton type='primary' htmlType='submit'>
					{btnText}
				</CustomButton>
			</Form>
		</Card>
	);
};
