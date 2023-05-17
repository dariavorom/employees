import { Link, useNavigate } from 'react-router-dom';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Paths } from '../../constants/paths';
import { logout } from '../../features/auth/authSlice';
import { selectUser } from '../../features/auth/selectors';
import { CustomButton } from '../custom-button';

import styles from './header.module.css';

export const Header = () => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onLogoutClick = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate(Paths.login);
	};

	return (
		<Layout.Header className={styles.header}>
			<Space>
				<TeamOutlined className={styles.teamIcon} />
				<Link to={Paths.home}>
					<CustomButton type='ghost'>
						<Typography.Title level={2}>Сотрудники</Typography.Title>
					</CustomButton>
				</Link>
			</Space>
			{user ? (
				<CustomButton type='ghost' icon={<LoginOutlined />} onClick={onLogoutClick}>
					Выйти
				</CustomButton>
			) : (
				<Space>
					<Link to={Paths.register}>
						<CustomButton type='ghost' icon={<UserOutlined />}>
							<Typography.Text>Зарегистрироваться</Typography.Text>
						</CustomButton>
					</Link>
					<Link to={Paths.login}>
						<CustomButton type='ghost' icon={<LoginOutlined />}>
							<Typography.Text>Войти</Typography.Text>
						</CustomButton>
					</Link>
				</Space>
			)}
		</Layout.Header>
	);
};
