import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Employee } from '@prisma/client';

import { CustomButton } from '../../components/custom-button';
import { Layout } from '../../components/layout';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import { Paths } from '../../constants/paths';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/selectors';
import { useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';

const columns: ColumnsType<Employee> = [
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
    },
];

export const Employees = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const { data, isLoading } = useGetAllEmployeesQuery();

    const goToAddEmployee = () => navigate(Paths.employeeAdd);

    useEffect(() => {
        if (!user) {
            navigate(Paths.login);
        }
    }, [navigate, user]);

    return (
        <Layout>
            <CustomButton type='primary' onClick={goToAddEmployee} icon={<PlusCircleOutlined />}>
                Добавить
            </CustomButton>
            <Table
                loading={isLoading}
                dataSource={data}
                pagination={false}
                columns={columns}
                rowKey={(employee) => employee.id}
                onRow={(employee) => ({
                    onClick: () => navigate(`${Paths.employee}/${employee.id}`),
                })}
            />
        </Layout>
    );
};
