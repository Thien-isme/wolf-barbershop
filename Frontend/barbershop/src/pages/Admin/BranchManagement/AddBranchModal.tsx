import { Modal, Form, Input, Select, Upload, Button, message, Row, Col, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";

interface AddBranchModalProps {
  open: boolean;
  onCancel: () => void;
  onAdd: (branch: any) => void;
}

const cities = [
  { value: "TP. HCM", label: "TP. HCM" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
  // ...thêm các tỉnh/thành khác
];

const wards = [
  { value: "Quận 1", label: "Quận 1" },
  { value: "Quận 4", label: "Quận 4" },
  { value: "Quận 3", label: "Quận 3" },
  { value: "Quận 9", label: "Quận 9" },
  // ...thêm các phường/xã khác
];

const AddBranchModal: React.FC<AddBranchModalProps> = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onAdd({
      ...values,
      img: values.img?.[0]?.url || "",
      barbers: values.barbers || 0,
      open: values.open || "09:00 - 21:00",
    });
    form.resetFields();
    message.success("Thêm chi nhánh thành công!");
    onCancel();
  };

  return (
    <Modal
      open={open}
      title={
        <span style={{
          color: "#ff9800",
          fontWeight: 700,
          fontSize: 22,
          fontFamily: "'Oswald', 'Montserrat', Arial, sans-serif",
          textShadow: "0 2px 8px #222, 0 0px 16px #ff9800"
        }}>
          Thêm mới chi nhánh
        </span>
      }
      onCancel={onCancel}
      footer={null}
      centered
      bodyStyle={{
        background: "#222",
        borderRadius: 16,
        boxShadow: "0 4px 24px #ff980080",
        padding: 24,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ color: "#fff" }}
      >
        {/* Thông tin cơ bản */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ color: "#ff9800", fontWeight: 600, fontSize: 15 }}>Thông tin cơ bản</span>
        </div>
        {/* Tên chi nhánh: chiếm 1 row */}
        <Form.Item
          label={<span style={{ color: "#ff9800", fontWeight: 500 }}>Tên chi nhánh</span>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên chi nhánh!" }]}
        >
          <Input placeholder="Nhập tên chi nhánh" />
        </Form.Item>
        {/* Quận/Huyện và Phường/Xã: 2 cột */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<span style={{ color: "#ff9800", fontWeight: 500 }}>Quận/Huyện</span>}
              name="city"
              rules={[{ required: true, message: "Chọn quận/huyện!" }]}
            >
              <Select
                placeholder="Chọn quận/huyện"
                options={cities}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<span style={{ color: "#ff9800", fontWeight: 500 }}>Phường/Xã</span>}
              name="ward"
              rules={[{ required: true, message: "Chọn phường/xã!" }]}
            >
              <Select
                placeholder="Chọn phường/xã"
                options={wards}
                showSearch
              />
            </Form.Item>
          </Col>
        </Row>
        {/* Địa chỉ chi tiết: chiếm 1 row, nằm dưới Quận/Huyện */}
        <Form.Item
          label={<span style={{ color: "#ff9800", fontWeight: 500 }}>Địa chỉ chi tiết</span>}
          name="address"
          rules={[{ required: true, message: "Nhập địa chỉ chi tiết!" }]}
        >
          <Input placeholder="Nhập địa chỉ chi tiết" />
        </Form.Item>

        <Divider style={{ background: "#444", margin: "12px 0" }} />

        {/* Thời gian */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ color: "#ff9800", fontWeight: 600, fontSize: 15 }}>Giờ mở cửa</span>
        </div>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="openStart"
              label={<span style={{ color: "#ff9800", fontWeight: 500 }}>Giờ bắt đầu</span>}
              rules={[{ required: true, message: "Chọn giờ bắt đầu!" }]}
            >
              <Select
                placeholder="Chọn giờ bắt đầu"
                options={[
                  { value: "07:00", label: "07:00" },
                  { value: "08:00", label: "08:00" },
                  { value: "09:00", label: "09:00" },
                  { value: "10:00", label: "10:00" },
                  // ...thêm các khung giờ khác
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="openEnd"
              label={<span style={{ color: "#ff9800", fontWeight: 500 }}>Giờ kết thúc</span>}
              rules={[{ required: true, message: "Chọn giờ kết thúc!" }]}
            >
              <Select
                placeholder="Chọn giờ kết thúc"
                options={[
                  { value: "18:00", label: "18:00" },
                  { value: "19:00", label: "19:00" },
                  { value: "20:00", label: "20:00" },
                  { value: "21:00", label: "21:00" },
                  // ...thêm các khung giờ khác
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ background: "#444", margin: "12px 0" }} />

        {/* Ảnh đại diện */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ color: "#ff9800", fontWeight: 600, fontSize: 15 }}>Ảnh đại diện chi tiết</span>
        </div>
        <Form.Item
          name="img"
          valuePropName="fileList"
          getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
          style={{ marginBottom: 0 }}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            showUploadList={true}
            customRequest={({ onSuccess, file }) => {
              setTimeout(() => {
                onSuccess && onSuccess("ok");
              }, 500);
            }}
            beforeUpload={file => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("Chỉ được chọn ảnh!");
              }
              return isImage;
            }}
          >
            <Button icon={<UploadOutlined />} style={{ background: "#ff9800", color: "#fff", border: "none" }}>
              Chọn
            </Button>
          </Upload>
        </Form.Item>

        {/* Nút thêm chi nhánh */}
        <Form.Item style={{ marginTop: 24, textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: "linear-gradient(90deg, #ff9800 0%, #222 100%)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 8,
              minWidth: 180,
              height: 40,
              fontSize: 16,
              letterSpacing: 1,
              boxShadow: "0 2px 8px #ff9800a0",
            }}
          >
            Thêm chi nhánh
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBranchModal;