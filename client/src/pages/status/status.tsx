import { Link, useParams } from 'react-router-dom';
import { Button, Result, Row } from 'antd';

import { Paths } from '../../constants/paths';

const STATUSES: Record<string, string> = {
    created: 'Пользователь успешно создан',
    edited: 'Пользователь успешно обновлен',
    deleted: 'Пользователь успешно удален',
};

export const Status = () => {
    const { status } = useParams();

    return (
        <Row align='middle' justify='center'>
            <Result
                status={status ? 'success' : 404}
                title={status ? STATUSES[status] : 'Не найдено'}
                extra={
                    <Button>
                        <Link to={Paths.home}>На главную</Link>
                    </Button>
                }
            />
        </Row>
    );
};
