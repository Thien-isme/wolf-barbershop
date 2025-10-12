import { Form, Input, Space } from 'antd';
import styles from './CustomerInfo.module.css';

const CustomerInfo = () => (
    <>
        <Space style={{ width: '100%', marginBottom: 12 }} size={170}>
            <Form.Item name='phone' style={{ flex: 1, width: '160%' }}>
                <Input
                    className={styles.antInput}
                    placeholder='Số điện thoại'
                />
            </Form.Item>
            <Form.Item name='name' style={{ flex: 1, width: '160%' }}>
                <Input className={styles.antInput} placeholder='Họ và tên' />
            </Form.Item>
        </Space>
    </>
);

export default CustomerInfo;
