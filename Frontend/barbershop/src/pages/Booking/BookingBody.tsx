import { useState } from "react";
import { Form, Input, Select, DatePicker, TimePicker, Button, Card, Row, Col, Typography, message } from "antd";
import moment from "moment";
// import "moment/locale/vi";

const { Title } = Typography;
const { Option } = Select;

const branches = [
  { name: "WOLF Quận 1", img: "/src/assets/logo1.png" },
  { name: "WOLF Quận 3", img: "/src/assets/logo2.webp" },
  { name: "WOLF Quận 7", img: "/src/assets/logo3.png" },
];

const technicians = [
  { name: "Nguyễn Văn A", img: "/src/assets/logo5.png" },
  { name: "Trần Văn B", img: "/src/assets/logo6.png" },
  { name: "Lê Văn C", img: "/src/assets/react.svg" },
];

const services = [
  "Cắt tóc nam",
  "Gội đầu thư giãn",
  "Tạo kiểu",
  "Uốn tóc",
  "Nhuộm tóc",
  "Cạo mặt với khăn nóng",
];

export default function BookingBody() {
  const [loading, setLoading] = useState(false);

  const onFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Đặt lịch thành công!");
    }, 1200);
  };

  return (
    <div style={{ maxWidth: 800, margin: "32px auto", padding: 24 }}>
      <Card
        style={{ borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
        cover={
          <img
            src="https://res.cloudinary.com/duzh5dnul/image/upload/v1755951798/banner_lmlmue.webp"
            alt="Barber Banner"
            style={{ height: 220, objectFit: "cover", borderRadius: "16px 16px 0 0" }}
          />
        }
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Đặt lịch cắt tóc tại WOLF BarberShop
        </Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 16 }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  { pattern: /^0\d{9,10}$/, message: "Số điện thoại không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" maxLength={11} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên khách hàng"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input placeholder="Nhập tên của bạn" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Chi nhánh"
                name="branch"
                rules={[{ required: true, message: "Vui lòng chọn chi nhánh!" }]}
              >
                <Select placeholder="Chọn chi nhánh">
                  {branches.map(b => (
                    <Option key={b.name} value={b.name}>
                      <img src={b.img} alt={b.name} style={{ width: 24, marginRight: 8, verticalAlign: "middle" }} />
                      {b.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Kĩ thuật viên"
                name="technician"
                rules={[{ required: true, message: "Vui lòng chọn kĩ thuật viên!" }]}
              >
                <Select placeholder="Chọn kĩ thuật viên">
                  {technicians.map(t => (
                    <Option key={t.name} value={t.name}>
                      <img src={t.img} alt={t.name} style={{ width: 24, marginRight: 8, verticalAlign: "middle" }} />
                      {t.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Dịch vụ"
                name="service"
                rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
              >
                <Select placeholder="Chọn dịch vụ">
                  {services.map(s => (
                    <Option key={s} value={s}>{s}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item
                label="Ngày"
                name="date"
                rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  disabledDate={d => d && d < moment().startOf("day")}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item
                label="Khung giờ"
                name="time"
                rules={[{ required: true, message: "Vui lòng chọn khung giờ!" }]}
              >
                <TimePicker
                  style={{ width: "100%" }}
                  format="HH:mm"
                  minuteStep={15}
                  disabledHours={() => [...Array(8).keys(), ...Array(24).keys()].filter(h => h < 8 || h > 20)}
                  hideDisabledOptions
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Mã khuyến mãi" name="promo">
                <Input placeholder="Nhập mã khuyến mãi (nếu có)" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea placeholder="Nhập ghi chú cho barber..." autoSize={{ minRows: 1, maxRows: 3 }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
            <Button type="primary" htmlType="submit" size="large" loading={loading}>
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}