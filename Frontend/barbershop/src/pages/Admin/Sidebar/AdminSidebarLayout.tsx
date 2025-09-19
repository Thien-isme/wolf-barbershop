import AdminSidebar from "./AdminSidebar";
import { Layout } from "antd";

const { Content } = Layout;

export default function AdminSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <Layout style={{ marginLeft: "200px" }}> {/* Thêm margin bằng với width của sidebar */}
        <Content style={{ 
          margin: "24px",
          minHeight: "280px",
          overflow: "auto" // Cho phép scroll nội dung
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}