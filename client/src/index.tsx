import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import { store } from './app/store';
import { Auth } from './components/auth';
import { Paths } from './constants/paths';
import { AddEmployee } from './pages/add-employee';
import { EditEmployee } from './pages/edit-employee';
import { Employee } from './pages/employee';
import { Employees } from './pages/employees';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Status } from './pages/status';
import reportWebVitals from './reportWebVitals';

import './index.css';

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Employees />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
	{
		path: Paths.employeeAdd,
		element: <AddEmployee />,
	},
	{
		path: `${Paths.employeeEdit}/:id`,
		element: <EditEmployee />,
	},
	{
		path: `${Paths.status}/:status`,
		element: <Status />,
	},
	{
		path: `${Paths.employee}/:id`,
		element: <Employee />,
	},
]);

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
	<StrictMode>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					algorithm: theme.darkAlgorithm,
				}}>
				<Auth>
					<RouterProvider router={router} />
				</Auth>
			</ConfigProvider>
		</Provider>
	</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
