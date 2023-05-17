import { Layout as AntdLayout } from 'antd';
import { Header } from '../header';

import styles from './layout.module.css';

type Props = {
    children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
    return (
        <div className={styles.main}>
            <Header />
            <AntdLayout.Content style={{ height: '100%' }}>{children}</AntdLayout.Content>
        </div>
    );
};
