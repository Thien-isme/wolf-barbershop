import { Form, Radio, Space, Typography } from 'antd';
import type { BranchDTO } from '../../../types/ResponseDTOs/branchDTO';

const BranchSelect = ({
    branches,
    selectedBranch,
    onChange,
}: {
    branches: BranchDTO[];
    selectedBranch: number | null;
    onChange: (branchId: number) => void;
}) => (
    <>
        <Typography.Title level={5} style={{ color: 'white', marginBottom: 16 }}>
            Chọn chi nhánh
        </Typography.Title>
        <Form.Item
            name='branch'
            rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn một chi nhánh',
                },
            ]}
        >
            <Radio.Group
                style={{ width: '100%' }}
                value={selectedBranch ?? undefined}
                onChange={e => onChange(e.target.value)}
            >
                <Space direction='vertical' style={{ width: '100%' }}>
                    {branches.map(branch => (
                        <Radio
                            key={branch.branchId}
                            value={branch.branchId}
                            style={{
                                backgroundColor: '#333',
                                padding: '8px 16px',
                                borderRadius: 8,
                                width: '100%',
                                color: 'white',
                            }}
                        >
                            {branch.locationDetail}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </Form.Item>
    </>
);

export default BranchSelect;
