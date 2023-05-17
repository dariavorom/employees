import { Button, Form } from 'antd';

type Props = {
    children?: React.ReactNode;
    htmlType?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed';
    danger?: boolean;
    loading?: boolean;
    shape?: 'default' | 'circle' | 'round';
    icon?: React.ReactNode;
};

export const CustomButton = ({
    children,
    htmlType = 'button',
    onClick,
    type,
    danger,
    loading,
    shape,
    icon,
}: Props) => {
    return (
        <Form.Item>
            <Button
                onClick={onClick}
                htmlType={htmlType}
                type={type}
                danger={danger}
                loading={loading}
                shape={shape}
                icon={icon}>
                {children}
            </Button>
        </Form.Item>
    );
};
