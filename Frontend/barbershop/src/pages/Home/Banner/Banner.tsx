import { Button } from 'antd';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Chào mừng đến với WOLF BarberShop!</h1>
                <p>
                    Địa chỉ làm đẹp dành cho phái mạnh, phong cách chuyên
                    nghiệp, dịch vụ tận tâm.
                </p>
                <div className={styles.btnContainer}>
                    <Button
                        type='primary'
                        size='large'
                        className={styles.customBtn}
                        onClick={() => navigate('/booking')}
                    >
                        Đặt lịch ngay
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Banner;
