import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Row, Space, Typography } from 'antd';

import { useLoginMutation, UserData } from '../../app/services/auth';
import { CustomButton } from '../../components/custom-button';
import { CustomInput } from '../../components/custom-input';
import { ErrorWithMessage } from '../../components/error-message';
import { Layout } from '../../components/layout';
import { PasswordInput } from '../../components/password-input';
import { Paths } from '../../constants/paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const Login = () => {
	const navigate = useNavigate();
	const [loginUser] = useLoginMutation();
	const [error, setError] = useState<string>();

	const login = async (data: UserData) => {
		try {
			await loginUser(data).unwrap();
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
				<Card title='Войдите' style={{ width: '30rem' }}>
					<Form onFinish={login}>
						<CustomInput type='email' name='email' placeholder='Email' />
						<PasswordInput name='password' placeholder='Пароль' />
						<CustomButton type='primary' htmlType='submit'>
							Войти
						</CustomButton>
					</Form>
					<Space direction='vertical' size='large'>
						<Typography.Text>
							Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
						</Typography.Text>
						<ErrorWithMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
