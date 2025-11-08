import { Form, Input, Space } from 'antd';
import styles from './CustomerInfo.module.css';

const CustomerInfo = () => {
    // Hàm chỉ cho phép nhập số
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValid = /^[0-9\b]+$/.test(keyValue);
        if (!isValid) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Space style={{ width: '100%', marginBottom: 12 }} size={170}>
                <Form.Item
                    name='phone'
                    style={{ flex: 1, width: '160%' }}
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Vui lòng chỉ nhập số!',
                        },
                        {
                            min: 10,
                            max: 11,
                            message: 'Số điện thoại phải từ 10 đến 11 số!',
                        },
                    ]}
                >
                    <Input
                        className={styles.antInput}
                        placeholder='Số điện thoại'
                        onKeyPress={onKeyPress}
                        maxLength={11}
                    />
                </Form.Item>
                <Form.Item
                    name='name'
                    style={{ flex: 1, width: '160%' }}
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                >
                    <Input className={styles.antInput} placeholder='Họ và tên' />
                </Form.Item>
            </Space>
        </>
    );
};

export default CustomerInfo;
