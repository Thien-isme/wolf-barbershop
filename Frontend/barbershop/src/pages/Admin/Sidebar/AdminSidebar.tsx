import { Menu } from "antd";
import { UserOutlined, HomeOutlined, ShopOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';

const items = [
  { key: "dashboard", icon: <HomeOutlined />, label: "Dashboard", path: "/admin" },
  { key: "barber", icon: <UserOutlined />, label: "Barber", path: "/admin/barber" },
  { key: "branch", icon: <ShopOutlined />, label: "Chi nhánh", path: "/admin/branch" },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Đăng xuất",
    path: "/login",
    onClick: () => {
      // Xóa thông tin đăng nhập khi đăng xuất
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const selectedKey = items.find(item => item.path === location.pathname)?.key || "dashboard";

  const handleMenuClick = (item: any) => {
    if (item.key === "logout") {
      logout();
      navigate("/login");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#070707ff",
        color: "#fff",
        paddingTop: 24,
        boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed", // Thêm position fixed
        width: "200px", // Thêm chiều rộng cố định
        left: 0, // Cố định bên trái
        top: 0 // Cố định ở trên cùng
      }}
    >
      <div>
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <img
            src="https://res.cloudinary.com/duzh5dnul/image/upload/v1755951808/logo6_nqy39c.png"
            alt="BarberShop Logo"
            style={{ height: 150, marginBottom: 8, cursor: "pointer" }}
            onClick={() => navigate("/admin")}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            background: "transparent",
            color: "#fff",
            fontSize: 16,
            fontWeight: 500,
            borderRight: 0,
          }}
          items={items.slice(0, -1).map(item => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => handleMenuClick(item),
          }))}
        />
      </div>
      
      {/* Menu đăng xuất tách riêng */}
      <Menu
        theme="dark"
        mode="inline"
        style={{
          background: "transparent",
          color: "#fff",
          fontSize: 16,
          fontWeight: 500,
          borderRight: 0,
          marginBottom: 20
        }}
        items={[{
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
          onClick: () => handleMenuClick(items[items.length - 1])
        }]}
      />
    </div>
  );
}