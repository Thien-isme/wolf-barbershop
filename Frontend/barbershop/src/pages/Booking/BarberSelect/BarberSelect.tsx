import { Form, Radio, Space, Card, Row, Col, Image, Typography } from 'antd';
import type { EmployeeDTO } from '../../../types/ResponseDTOs/employeeDTO';
import type { EmployeeImgHairDTO } from '../../../types/ResponseDTOs/employeeImgHairDTO';

const BarberSelect = ({
    barbers,
    selectedBarber,
    onChange,
    employeeImgHairs,
}: {
    barbers: EmployeeDTO[];
    selectedBarber: number | null;
    onChange: (barberId: number) => void;
    employeeImgHairs: EmployeeImgHairDTO[];
}) => (
    <>
        <Typography.Title
            level={5}
            style={{ color: 'white', marginBottom: 16 }}
        >
            Chọn kỹ thuật viên
        </Typography.Title>
        <Form.Item name='barber'>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: '0 0 180px' }}>
                    <Radio.Group
                        onChange={e => onChange(e.target.value)}
                        value={selectedBarber ?? undefined}
                        style={{ width: '100%' }}
                    >
                        <Space direction='vertical' style={{ width: '100%' }}>
                            {barbers?.map(barber => (
                                <Radio
                                    key={barber.employeeId}
                                    value={barber.employeeId}
                                    style={{
                                        backgroundColor: '#333',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        width: '100%',
                                        color: 'white',
                                        marginBottom: '8px',
                                    }}
                                >
                                    {barber.userDTO?.fullName}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
                {selectedBarber && (
                    <Card
                        style={{
                            flex: '0 0 200px',
                            background: '#333',
                            border: 'none',
                            borderRadius: '8px',
                            height: '300px',
                        }}
                        bodyStyle={{
                            padding: '16px',
                            height: '300px',
                        }}
                    >
                        <img
                            src={
                                barbers?.find(
                                    b => b.employeeId === selectedBarber
                                )?.avatarUrl || 'default-avatar.jpg'
                            }
                            alt='Barber Avatar'
                            style={{
                                width: '168px',
                                height: '268px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                aspectRatio: '2/3',
                            }}
                        />
                    </Card>
                )}
                {selectedBarber && (
                    <Card
                        title='Các tác phẩm'
                        style={{
                            flex: 1,
                            background: '#333',
                            border: 'none',
                            borderRadius: '8px',
                        }}
                        headStyle={{
                            color: 'white',
                            borderBottom: '1px solid #444',
                            padding: '16px',
                        }}
                        bodyStyle={{ padding: '16px' }}
                    >
                        <Image.PreviewGroup>
                            <Row gutter={[8, 8]}>
                                {employeeImgHairs.map((img, index) => (
                                    <Col span={12} key={index}>
                                        <Card
                                            style={{
                                                background: '#444',
                                                border: 'none',
                                                borderRadius: '4px',
                                            }}
                                            bodyStyle={{ padding: 0 }}
                                        >
                                            <Image
                                                src={img.imgUrl}
                                                alt={`Work ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '120px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                }}
                                                preview={{
                                                    mask: (
                                                        <span>
                                                            Xem chi tiết
                                                        </span>
                                                    ),
                                                }}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Image.PreviewGroup>
                    </Card>
                )}
            </div>
        </Form.Item>
    </>
);

export default BarberSelect;
