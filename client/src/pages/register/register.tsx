import { Row, Card, Form, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/custom-button';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input';
import { Paths } from '../../constants/paths';
import { Layout } from '../../components/layout';
import { useState } from 'react';
import { useRegisterMutation } from '../../app/services/auth';
import { User } from '@prisma/client';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { ErrorWithMessage } from '../../components/error-message';

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
        } catch (error) {
            if (isErrorWithMessage(error)) {
                setError(error.data.message);
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
