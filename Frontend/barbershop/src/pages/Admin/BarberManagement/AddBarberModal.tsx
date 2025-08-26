import { Modal, Form, Input, Button } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./AddBarberModalWolf.module.css";

interface AddBarberModalProps {
  visible: boolean;
  onClose: () => void;
}
export default function AddBarberModal({ visible, onClose }: AddBarberModalProps) {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onClose}
      centered
      closeIcon={<CloseOutlined style={{ fontSize: 24, color: "#ff8c00" }} />}
      bodyStyle={{ padding: 0, background: "#000", borderRadius: 20, height: "800px" }}
      width={1200} // Giảm width modal
      className={styles.modalFadeIn}
    >
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Thêm mới barber</h2>
       
        <Form
          form={form}
          layout="vertical"
          className={styles.form}
        >
          <div className={styles.gridThreeCol}>
            {/* Cột 1: Avatar */}
            <div className={styles.colAvatar}>
              <label className={styles.label}>Ảnh đại diện</label>
              <div className={styles.avatarUpload}>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="avatar"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <label htmlFor="avatar" className={styles.uploadBtn}>
                  <UploadOutlined /> Chọn ảnh
                </label>
                <div className={styles.avatarPreviewBox}>
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className={styles.avatarPreview} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>Preview</div>
                  )}
                </div>
              </div>
            </div>
            {/* Cột 2: Thông tin cá nhân */}
            <div className={styles.colInfo}>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Tên barber</span>}
                name="full_name"
                rules={[{ required: true, message: "Vui lòng nhập tên barber!" }]}
              >
                <Input className={styles.input} placeholder="Nhập tên barber" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Số điện thoại</span>}
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
              >
                <Input className={styles.input} placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Ngày sinh</span>}
                name="dob"
                rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
              >
                <Input className={styles.input} type="date" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>CCCD</span>}
                name="cccd"
                rules={[{ required: true, message: "Vui lòng nhập CCCD!" }]}
              >
                <Input className={styles.input} placeholder="Nhập CCCD" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Số năm kinh nghiệm</span>}
                name="experience_years"
                rules={[{ required: true, message: "Vui lòng nhập số năm kinh nghiệm!" }]}
              >
                <Input className={styles.input} type="number" min={0} placeholder="Nhập số năm kinh nghiệm" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Địa chỉ chi tiết</span>}
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input className={styles.input} placeholder="Nhập địa chỉ chi tiết" />
              </Form.Item>
              
            </div>
            {/* Cột 3: Tài khoản */}
            <div className={styles.colAccount}>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Username</span>}
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập username!" }]}
              >
                <Input className={styles.input} placeholder="Nhập username" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" }
                ]}
              >
                <Input className={styles.input} placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={<span className={styles.label}>Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password className={styles.input} placeholder="Nhập mật khẩu" />
              </Form.Item>
              <div style={{textAlign: "left"}}>
              <Button
                htmlType="submit"
                type="primary"
                block
                className={styles.submitBtn}
                style={{ marginTop: 18 }}
                onClick={() => form.submit()}
                >
                Thêm barber
              </Button>
                  </div>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}