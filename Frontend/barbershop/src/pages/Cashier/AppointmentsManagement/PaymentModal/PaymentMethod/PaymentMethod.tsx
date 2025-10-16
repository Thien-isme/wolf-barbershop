import { Radio, Card, Image, Space, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { PaymentMethodDTO } from '../../../../../types/ResponseDTOs/paymentMethodDTO';
import styled from './style.module.scss';

interface PaymentMethodProps {
    total: number;
    paymentMethods: PaymentMethodDTO[];
    onSelectPaymentMethod?: (methodId: number) => void;
    selectedMethodId?: number;
    disabled?: boolean;
}

const { Title } = Typography;

function PaymentMethod({
    total,
    paymentMethods,
    onSelectPaymentMethod,
    selectedMethodId,
    disabled = false,
}: PaymentMethodProps) {
    const handleChange = (e: RadioChangeEvent) => {
        onSelectPaymentMethod?.(e.target.value);
    };

    console.log('Selected Payment Method ID:', selectedMethodId);

    const qrCodeLink = `https://img.vietqr.io/image/970415-0939626055-compact2.png?amount=${total}&addInfo=Thanh%20toan%20tai%20wolf-barbershop&accountName=Lai%20Thanh%20Nhat%20Thien`;
    console.log('QR Code Link:', qrCodeLink);
    return (
        <div style={{ marginBottom: 16 }}>
            <Title level={5}>Phương thức thanh toán</Title>
            <Radio.Group
                value={selectedMethodId}
                onChange={handleChange}
                disabled={disabled}
                style={{ width: '100%' }}
            >
                <Space direction='vertical' style={{ width: '100%' }}>
                    {paymentMethods.map(method => (
                        <Card
                            key={method.paymentMethodId}
                            hoverable={!disabled}
                            size='small'
                            style={{
                                border:
                                    selectedMethodId === method.paymentMethodId
                                        ? '2px solid #1677ff'
                                        : '1px solid #d9d9d9',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                            }}
                            bodyStyle={{ padding: '12px' }}
                        >
                            <Radio
                                value={method.paymentMethodId}
                                className={styled.radio}
                            >
                                <Space align='center'>
                                    <Image
                                        src={method.imgUrl || '/placeholder-payment.png'}
                                        alt={method.methodName}
                                        width={40}
                                        height={40}
                                        preview={false}
                                        fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+s2HolyEFOcgCHcAS5gRzgAI4gJ3AEObFrwBFkwSEcAYdwBId4C/s/0/GM+0f/mW7ec/7qhgk65wy0dAMTrF+O4/mz+A+mE3L+fDx+x8Z7P7wm0/h5j2Pj5W/h4t/H5R8vTdH/vFq+fhP95bHe+qf/Vwt1vxYt5p9vwG8d5lqH/XQb1nz+I5Af7I8AZDjf8pT7/gGvvfMzjt4+HrLLt3PffQBoMw7bdbP8Zc6+6KHfGa/K8/hLXfDC6z27fd4jWsy1j3v8iQvANvGftCa8XTe8PeY5T7pqe+Nvf9Yj3s0JVu6VdRwOh+PbPOdzNi8Nwg5wfJ1x/Xq53o0Hej6+7HUHxf3xPuv5gK6txxytqZCe7N0y8TUvpEJJ8UsvdT3G8n1c7LgOGf7WKlOXo4Lm/3LxdK/RfNi9XbW65c24Nq/Hp29/9HNHfA+5aeUB8JrZYv48F5+WdzjGIhT3XHmtfMkv7wR7vJ+KBzJdPbQ1n22TG6TtO3a24CzaNOJuXIgzqT2eCL3Pq8t/RFl36s6+iG9z4e3PaKv3fYbI+a7xE/S9WW5QrH1+Oubfn+3N/dM3f1YXfVZ+ZhPnfB2fLHHgMwAA'
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    {/* <div> */}
                                    <div style={{ fontWeight: 500, color: '#000' }}>
                                        {method.methodName}
                                    </div>
                                    {/* </div> */}
                                </Space>
                            </Radio>
                        </Card>
                    ))}
                </Space>
            </Radio.Group>
            {selectedMethodId === 2 && (
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Title level={5}>Quét mã QR để thanh toán</Title>
                    <img
                        src={qrCodeLink}
                        alt='QR Code'
                        style={{ width: 300, height: 300 }}
                    />
                </div>
            )}
        </div>
    );
}

export default PaymentMethod;
