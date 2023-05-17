import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Descriptions, Divider, Modal, Space } from 'antd';

import { useAppSelector } from '../../app/hooks';
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { CustomButton } from '../../components/custom-button';
import { ErrorWithMessage } from '../../components/error-message';
import { Layout } from '../../components/layout';
import { Paths } from '../../constants/paths';
import { selectUser } from '../../features/auth/selectors';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const Employee = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);
	const [error, setError] = useState<string>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data, isLoading } = useGetEmployeeQuery(id || '');
	const [removeEmployee] = useRemoveEmployeeMutation();

	if (isLoading) {
		return <span>Загрузка</span>;
	}

	if (!data) {
		return <Navigate to={Paths.home} />;
	}

	const showModal = () => setIsModalOpen(true);
	const hideModal = () => setIsModalOpen(false);
	const handleDeleteUser = async () => {
		hideModal();
		try {
			await removeEmployee(data).unwrap();
			navigate(`${Paths.status}/deleted`);
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
			<Descriptions title='Информация о сотруднике' bordered>
				<Descriptions.Item label='Имя' span={3}>
					{`${data.firstName} ${data.lastName}`}
				</Descriptions.Item>
				<Descriptions.Item label='Возраст' span={3}>
					{data.age}
				</Descriptions.Item>
				<Descriptions.Item label='Адрес' span={3}>
					{data.address}
				</Descriptions.Item>
			</Descriptions>
			{user?.id === data.userId && (
				<>
					<Divider orientation='left'>Действия</Divider>
					<Space>
						<Link to={`${Paths.employeeEdit}/${data.id}`}>
							<CustomButton shape='round' type='default' icon={<EditOutlined />}>
								Редактировать
							</CustomButton>
						</Link>
						<CustomButton
							shape='round'
							onClick={showModal}
							danger
							icon={<DeleteOutlined />}>
							Удалить
						</CustomButton>
					</Space>
				</>
			)}
			<ErrorWithMessage message={error} />
			<Modal
				title='Подтвердите удаление'
				open={isModalOpen}
				onOk={handleDeleteUser}
				onCancel={hideModal}
				okText='Подтвердить'
				cancelText='Отменить'>
				Вы действительно хотите удалить сотрудника?
			</Modal>
		</Layout>
	);
};
