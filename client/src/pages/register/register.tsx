import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@prisma/client';
import { Card, Form, Row, Space, Typography } from 'antd';

import { useRegisterMutation } from '../../app/services/auth';
import { CustomButton } from '../../components/custom-button';
import { CustomInput } from '../../components/custom-input';
import { ErrorWithMessage } from '../../components/error-message';
import { Layout } from '../../components/layout';
import { PasswordInput } from '../../components/password-input';
import { Paths } from '../../constants/paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

type RegisterData = Omit<User, 'id'> & { confirmPassword: string };

export const Register = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string>();

	const [registerUser] = useRegisterMutation();

	const register = async (data: RegisterData) => {
		try {
			await registerUser(data).unwrap();
			setError('');
			navigate(Paths.home);
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
				<Card title='Регистрация' style={{ width: '30rem' }}>
					<Form onFinish={register}>
						<CustomInput name='name' placeholder='Имя' />
						<CustomInput type='email' name='email' placeholder='Email' />
						<PasswordInput name='password' placeholder='Пароль' />
						<PasswordInput name='confirmPassword' placeholder='Повторите пароль' />
						<CustomButton type='primary' htmlType='submit'>
							Зарегистрироваться
						</CustomButton>
					</Form>
					<Space direction='vertical' size='large'>
						<Typography.Text>
							Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
						</Typography.Text>
						<ErrorWithMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
