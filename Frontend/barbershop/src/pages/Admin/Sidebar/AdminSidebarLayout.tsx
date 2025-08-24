import { Layout } from "antd";
import AdminSidebar from "./AdminSidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider width={220} style={{ background: "#070707" }}>
        <AdminSidebar />
      </Layout.Sider>
      <Layout.Content style={{ padding: 32 }}>
        {children}
      </Layout.Content>
    </Layout>
  );
}