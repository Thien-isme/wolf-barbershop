import { Menu } from "antd";
import { UserOutlined, HomeOutlined, ShopOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const items = [
  { key: "dashboard", icon: <HomeOutlined />, label: "Dashboard", path: "/wolf-barbershop/admin" },
  { key: "barber", icon: <UserOutlined />, label: "Barber", path: "/wolf-barbershop/admin/barber" },
  { key: "branch", icon: <ShopOutlined />, label: "Chi nhánh", path: "/wolf-barbershop/admin/branch" },
  // Thêm các mục khác nếu cần
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Xác định key đang chọn dựa vào pathname
  const selectedKey = items.find(item => item.path === location.pathname)?.key || "dashboard";

    console.log("Selected Key:", selectedKey);

  return (
    <div
      style={{
        height: "100vh",
        background: "#070707ff",
        color: "#fff",
        paddingTop: 24,
        boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 0 }}>
        <img
          src="https://res.cloudinary.com/duzh5dnul/image/upload/v1755951808/logo6_nqy39c.png"
          alt="BarberShop Logo"
          style={{ height: 150, marginBottom: 8, cursor: "pointer" }}
          onClick={() => navigate("/wolf-barbershop/admin")}
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
        items={items.map(item => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          onClick: () => navigate(item.path),
        }))}
      />
    </div>
  );
}