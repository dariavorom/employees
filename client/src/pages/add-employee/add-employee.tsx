import { useEffect, useState } from 'react';
import { Row } from 'antd';
import { Layout } from '../../components/layout';
import { EmployeeForm } from '../../components/employee-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/selectors';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { Paths } from '../../constants/paths';
import { Employee } from '@prisma/client';
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
        } catch (error) {
            if (isErrorWithMessage(error)) {
                setError(error.data.message);
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
