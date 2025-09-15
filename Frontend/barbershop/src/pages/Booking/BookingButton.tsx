import { Button } from 'antd';

const BookingButton = () => (
  <Button
    type="primary"
    htmlType="submit"
    icon={<span className="anticon anticon-calendar" style={{ marginRight: 8 }}>📅</span>}
    style={{
      width: '100%',
      height: 48,
      borderRadius: 24,
      fontWeight: 700,
      fontSize: 20,
      background: '#fff',
      color: '#111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    Đặt lịch
  </Button>
);

export default BookingButton;