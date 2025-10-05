import { Row, Col, Typography, Button, Image } from 'antd'; // Thay Card bằng Image
import { getBranchs } from '../../../api/branchApi';
import { useEffect, useState } from 'react';
import type { BranchDTO } from '../../../types/ResponseDTOs/branchDTO';

import styles from './branches.module.scss';

const { Title } = Typography;

const Branches = () => {
    const [branches, setBranches] = useState<BranchDTO[]>([]);

    useEffect(() => {
        const fetchBranches = async () => {
            const res = await getBranchs();
            setBranches(Array.isArray(res.data) ? res.data.slice(0, 8) : []);
        };

        fetchBranches();
    }, []);

    return (
        <div className={styles.container}>
            <Row gutter={32} align='middle'>
                <Col xs={24} md={10}>
                    <div style={{ padding: '0 20px' }}>
                        <Title level={2}>
                            Khám phá hệ thống chi nhánh WOLF trên toàn quốc.
                        </Title>
                        <p>
                            Dễ dàng tìm kiếm và trải nghiệm dịch vụ chất lượng
                            gần nơi bạn nhất.
                        </p>
                        <p>Hotline: 1900 4407</p>
                        <div className={styles.flex_center}>
                            <Button type='default' size='large'>
                                Xem thêm
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={14} style={{ padding: '5px  ' }}>
                    <Row gutter={[16, 16]}>
                        {branches.map((branch, idx) => (
                            <Col xs={12} sm={8} md={6} key={idx}>
                                <div className={styles.branch_image}>
                                    <Image
                                        alt={branch.branchName}
                                        src={
                                            branch.branchUrl ||
                                            'default-image-url.jpg'
                                        }
                                        preview={true}
                                    />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Branches;
