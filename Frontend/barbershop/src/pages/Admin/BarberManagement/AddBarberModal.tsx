import { Modal, Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styles from "./AddBarberModalWolf.module.css";
import { getBranchs } from "../../../api/branchApi";
import type { BranchDTO } from "../../../types/branchDTO";
import { addBarber } from "../../../api/barbersApi";


interface AddBarberModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSuccess?: (barber: any) => void; // Thêm prop này
}
export default function AddBarberModal({ visible, onClose, onAddSuccess }: AddBarberModalProps) {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [branches, setBranches] = useState<BranchDTO[]>([]);

  useEffect(() => {
    if (visible) {
      getBranchs().then(res => {
        setBranches(res.data); // hoặc res nếu API trả về mảng trực tiếp
      });
    }
  }, [visible]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("FullName", values.full_name);
    formData.append("Phone", values.phone);
    formData.append("Dob", values.dob);
    formData.append("CCCD", values.cccd);
    formData.append("ExperienceYears", values.experience_years.toString());
    formData.append("Username", values.username);
    formData.append("Email", values.email);
    formData.append("Password", values.password);
    if (values.branchId) {
      formData.append("BranchId", values.branchId.toString());
    }
    if (values.img && values.img[0] && values.img[0].originFileObj) {
      formData.append("Avatar", values.img[0].originFileObj);
    }

    try {
      const result = await addBarber(formData);
      if (result.status === 200) {
        alert("Thêm barber thành công!");
        form.resetFields();
        setAvatarUrl("");
        console.log("Barber mới:", result.data);
          onAddSuccess?.(result.data); // Gọi callback với barber mới
          onClose();
      } else {
        alert(result.messageShow || "Có lỗi xảy ra!");
      }
    } catch (error: any) {
      alert(error?.message || "Có lỗi xảy ra khi gọi API!");
    }
  };

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
          onFinish={handleFinish}
        >
          <div className={styles.gridThreeCol}>
            {/* Cột 1: Avatar */}
            <div className={styles.colAvatar}>
              <label className={styles.label}>Ảnh đại diện</label>
              <Form.Item
                name="img"
                valuePropName="fileList"
                getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                className={styles.formItem}
                rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false} // Ngăn upload tự động
                  onChange={info => {
                    if (info.fileList && info.fileList[0]) {
                      setAvatarUrl(URL.createObjectURL(info.fileList[0].originFileObj));
                    } else {
                      setAvatarUrl("");
                    }
                  }}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                >
                  <div className={styles.uploadBtn}>
                    <UploadOutlined /> Chọn ảnh
                  </div>
                </Upload>
              </Form.Item>
              <div className={styles.avatarPreviewBox}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" className={styles.avatarPreview} />
                ) : (
                  <div className={styles.avatarPlaceholder}>Preview</div>
                )}
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
                label={
                  <span className={styles.label}>
                    <span style={{ color: "#ffd600", marginRight: 6 }}>🏢</span>
                    Chi nhánh làm việc
                  </span>
                }
                name="branchId"
              >
                <Select
                  className={styles.select}
                  style={{ width: "100%" }}
                  placeholder="Chọn chi nhánh làm việc (có thể bỏ trống)"
                  allowClear
                  showSearch
                  options={branches.map(branch => ({
                    label: branch.branchName,
                    value: branch.branchId,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label as string).toLowerCase().includes(input.toLowerCase())
                  }
                />
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