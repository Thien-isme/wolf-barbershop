import { useState, useEffect } from "react";
import { Input, Button, Card, Row, Col, Typography } from "antd";
import { SearchOutlined, PlusOutlined, EnvironmentOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import SidebarLayout from "../Sidebar/AdminSidebarLayout";
import styles from "./BranchManagement.module.css";
import AddBranchModal from "./AddBranchModal"; // Import modal component
import { getBranchs } from "../../../api/branchApi";
import type { BranchDTO } from "../../../types/ResponseDTOs/branchDTO";
export default function BranchManagement() {
  const [branches, setBranches] = useState<BranchDTO[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBranchs().then(res => {
      // Nếu res.data là mảng chi nhánh
      setBranches(res.data);
      // Nếu res.data.data là mảng chi nhánh
      // setBranches(res.data.data);
    }).catch(console.error);
  }, []);

  const filteredBranches = branches.filter(b =>
    b.branchName.toLowerCase().includes(search.toLowerCase()) ||
    (b.locationDetail ?? "").toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <SidebarLayout>
      <div
        style={{
          minHeight: "100vh",
          padding: "32px 40px",
        }}
        >
    


      <Typography.Title
        level={2}
        style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 32,
          letterSpacing: 2,
          color: "#fff",
          margin: "0 0 4px 0",
          textShadow: "0 2px 12px #ff9800, 0 0px 24px #222",
          fontFamily: "'Oswald', 'Montserrat', Arial, sans-serif",
          lineHeight: 1.1,
          background: "linear-gradient(90deg, #ffd600 0%, #ff9800 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Quản lý chi nhánh Barbershop
      </Typography.Title>
      <div style={{ display: "flex", gap: 16, marginBottom: 24, justifyContent: "space-between", alignItems: "center" }}>
        <div className={styles["search-branch-wrapper"]}>
          <SearchOutlined className={styles["search-branch-icon"]} />
          <Input
            placeholder="Tìm chi nhánh..."
            allowClear
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles["search-branch"]}
            bordered={false}
          />
        </div>
        <Button
          type="primary"
          className={styles["add-branch-btn"]}
          icon={<PlusOutlined style={{ fontSize: 22 }} />}
          onClick={() => setModalOpen(true)}
        >
          <span>Thêm mới chi nhánh</span>
        </Button>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {filteredBranches.map((branch, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={idx}>
            <Card
              className={styles["branch-card"]}
              style={{
                background: "rgba(30,30,30,0.85)",
                border: "2px solid #ff9800",
                // borderImage: "linear-gradient(90deg, #222, #ff9800) 1",
                borderRadius: 20,
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                color: "#000000ff",
                position: "relative",
                overflow: "hidden",
                padding: 0,
              }}
              bodyStyle={{ padding: 0 }}
              hoverable
              // actions={[
              //   <EditOutlined key="edit" style={{ color: "#ffd600", fontSize: 20 }} />,
              //   <DeleteOutlined key="delete" style={{ color: "#ff4d4f", fontSize: 20 }} />,
              // ]}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1", // Chiều cao bằng chiều rộng
                  overflow: "hidden",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  background: "#222",
                }}
              >
                <img
                  src={branch.branchUrl}
                  alt={branch.branchName}
                  style={{
                    width: 500,
                    height: 500,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ padding: 18 }}>
                <Typography.Title level={4} style={{ color: "#ff9800", marginBottom: 8, fontWeight: 700 }}>
                  {branch.branchName}
                </Typography.Title>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                  <EnvironmentOutlined style={{ color: "#ffd600", marginRight: 8 }} />
                  <span style={{ color: "#fff", fontWeight: 500 }}>{branch.locationDetail}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                  <UserOutlined style={{ color: "#ff9800", marginRight: 8 }} />
                  <span style={{ color: "#fff" }}>Barber: <b>{branch.barbers || 0}</b></span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ClockCircleOutlined style={{ color: "#ffd600", marginRight: 8 }} />
                  <span style={{ color: "#fff" }}>Giờ mở cửa: <b>{branch.timeOn?.slice(0,5)} : {branch.timeOff?.slice(0,5)}</b></span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <AddBranchModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onAdd={branch => setBranches([branch, ...branches])}
      />
        </div>
    </SidebarLayout>
  );
}