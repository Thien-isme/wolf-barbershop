import { Form, Input, Button, Checkbox, Typography, Row, Col } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import './LoginBody.css';

import {loginWithGoogle} from '../../api/authApi';
const { Title } = Typography;

const LoginBody = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#eaf6fa' }}>
      <Col>
        <div
          style={{
            background: '#111',
            borderRadius: 40,
            padding: '48px 48px 32px 48px',
            minWidth: 600,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Title level={2} style={{ color: 'white', textAlign: 'center', marginBottom: 32 }}>
            Đăng nhập
          </Title>
          <Form layout="vertical" style={{ width: '100%' }}>
            <Form.Item label={<span style={{ color: 'white', fontWeight: 500 }}>Tên đăng nhập</span>} name="username">
              <Input
                size="large"
                style={{
                  borderRadius: 24,
                  fontSize: 18,
                  background: '#fff',
                  border: 'none',
                  paddingLeft: 20,
                }}
                placeholder="Tên đăng nhập"
              />
            </Form.Item>
            <Form.Item label={<span style={{ color: 'white', fontWeight: 500 }}>Mật khẩu</span>} name="password">
              <Input.Password
                size="large"
                style={{
                  borderRadius: 24,
                  fontSize: 18,
                  background: '#fff',
                  border: 'none',
                  paddingLeft: 20,
                }}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <Checkbox style={{ color: 'white' }}>Lưu thông tin đăng nhập</Checkbox>
              <div style={{ flex: 1 }} />
              <a href="#" style={{ color: '#1890ff', fontSize: 14 }}>
                Quên mật khẩu?
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <span style={{ color: 'white', fontSize: 14 }}>
                Bạn chưa có tài khoản?{' '}
                <a href="#" style={{ color: '#1890ff', fontWeight: 500 }}>
                  Đăng ký
                </a>
              </span>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 24,
                  fontWeight: 700,
                  fontSize: 18,
                  background: '#ff9800',
                  border: 'none',
                  marginBottom: 0,
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <GoogleLogin
              width="100%"
              logo_alignment="left"
              text="continue_with"
              shape="pill"
              onSuccess={ async credentialResponse => {
                // Xử lý credentialResponse.credential ở đây
                const token = credentialResponse.credential;
                if (token) {
                  // Gọi API đăng nhập với token Google
                  const response = await loginWithGoogle(token);
                  console.log('Login response:', response);
                }
              }}
              onError={() => {
                console.log('Google Login Failed');
              }}
              prompt="select_account"
              // Custom nút bằng render prop
              render={renderProps => (
                <Button
                  icon={
                    <img
                      src="https://res.cloudinary.com/duzh5dnul/image/upload/v1758119667/image_2025-09-17_213424313_ps49vr.png"
                      alt="Google"
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                  }
                  style={{
                    width: '100%',
                    height: 44,
                    borderRadius: 24,
                    fontWeight: 500,
                    fontSize: 16,
                    background: '#fff',
                    border: 'none',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', // căn giữa nội dung
                    textAlign: 'center',      // căn giữa chữ
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Tiếp tục sử dụng dịch vụ bằng Google
                </Button>
              )}
            />
            <Button
              icon={
                <img
                  src="https://res.cloudinary.com/duzh5dnul/image/upload/v1758119609/image_2025-09-17_213326733_drhnsx.png"
                  alt="Facebook"
                  style={{ width: 30, height: 30, marginRight: 8 }}
                />
            } 
              style={{
                width: '100%',
                height: 44,
                borderRadius: 24,
                fontWeight: 500,
                fontSize: 16,
                background: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Đăng nhập bằng Facebook
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginBody;