import { Card, Typography, Form, Select, Input } from 'antd';
import {getVoucherOfUser} from '../../api/userVoucherApi';
import { useEffect, useState } from 'react';


const VoucherNote = ({ form }: { form: any }) => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await getVoucherOfUser();
        if (response && response.data) {
          setVouchers(response.data);
        }
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    }
    });

  return (
  <Card
    style={{ background: '#222', border: 'none', marginBottom: 24 }}
    bodyStyle={{ padding: 16, position: 'relative' }}
  >
    <Typography.Title level={5} style={{ color: 'white', marginBottom: 8 }}>
      Khuyến mãi
    </Typography.Title>
    <Form.Item name="voucherId" style={{ marginBottom: 16 }}>
      <Select
        placeholder="Chọn khuyến mãi"
        style={{
          width: '100%',
          background: '#fff',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {/* Nếu có danh sách voucher thì map ở đây */}
        {/* <Select.Option value={1}>Mã giảm 10%</Select.Option> */}
      </Select>
    </Form.Item>
    <Form.Item name="note" style={{ marginBottom: 16 }}>
      <Input.TextArea
        placeholder="Ghi chú"
        autoSize={{ minRows: 3, maxRows: 5 }}
        style={{
          background: '#fff',
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 16,
          color: '#111',
        }}
      />
    </Form.Item>
    <div style={{ color: 'white', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
      Với việc nhấn nút "Đặt lịch" đồng nghĩa bạn đã đồng ý với&nbsp;
      <a
        href="https://easysalon.vn/chinh-sach-bao-ve-du-lieu-ca-nhan"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#fff', textDecoration: 'underline', fontWeight: 700 }}
      >
        Chính sách bảo vệ dữ liệu cá nhân
      </a>
      &nbsp;của Easysalon.
    </div>
  </Card>
    )
};

export default VoucherNote;