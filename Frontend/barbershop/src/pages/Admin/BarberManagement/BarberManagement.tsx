import { Card, Row, Col, Typography, Input, Button } from "antd";
import { useState, useEffect } from "react";
import SidebarLayout from "../Sidebar/AdminSidebarLayout";
import barberIcon from "../../../assets/symbol.png";
import { MdLocationOn } from "react-icons/md";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./BarberManagement.module.css";
import AddBarberModal from "./AddBarberModal";
import {getBarbers} from "../../../api/barbersApi";
import type { EmployeeDTO } from "../../../types/ResponseDTOs/employeeDTO";


function BarberItem({ barber, bubble }: { barber: EmployeeDTO, bubble?: boolean }) {
  
  return (
    <Card
      style={{
        background: "#fff",
        backgroundImage: "url('https://i.pinimg.com/736x/d9/94/af/d994af8bcccddb08943565a3b0e36013.jpg')",
        color: "#111",
        textAlign: "center",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        padding: 0,
        border: "2px solid #222",
        position: "relative",
        overflow: "hidden",
      }}
      bodyStyle={{ padding: 0 }}
      hoverable
      className={`${styles["barber-bubble-card"]} ${bubble ? styles["bubble-animate"] : ""}`}
    >
      <Typography.Title level={4} style={{ margin: "12px 0 0 0", fontWeight: 700 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <img src={barberIcon} alt="barber" style={{ width: 35, height: 35, objectFit: "contain"}} />
          <span style={{ color: "#fff", fontSize: 24 }}>{barber.userDTO?.fullName}</span>
          <img src={barberIcon} alt="barber" style={{ width: 35, height: 35 , objectFit: "contain" }} />
        </span>
      </Typography.Title>
      <div className={styles["barber-img-wrapper"]} style={{ margin: "16px 0 0 0" }}>
        <img
          src={barber.avatarUrl}
          alt={barber.userDTO?.fullName}
          style={{
            width: 210,
            height: 315,
            objectFit: "cover",
            display: "block",
            borderRadius: 10,
            margin: '0px auto',
            border: "none",
            boxShadow: "none",
          }}
        />
        <img
          src="https://res.cloudinary.com/duzh5dnul/image/upload/v1755951808/logo6_nqy39c.png"
          alt="logo"
          className={styles["barber-logo-corner"]}
        />
      </div>
      <Typography.Text style={{ display: "block", margin: "12px 0 12px 0", fontSize: 16, fontWeight: 500, color: "#222" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <MdLocationOn style={{ width: 18, height: 18, color: "#ffd600" }} />
          <span style={{ color: "#ffd600", fontSize: 16 }}>{barber.branchId}</span>
        </span>
      </Typography.Text>

    </Card>
  );
}


export default function BarberManagement() {
  const [barbers, setBarbers] = useState<EmployeeDTO[]>([]);

  
  const [search, setSearch] = useState("");
  const [bubble, setBubble] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Hàm này sẽ được gọi khi thêm thành công
  const handleAddBarberSuccess = (newBarber: EmployeeDTO) => {
    setBarbers([newBarber,...barbers]);
    setShowAddModal(false);
  };

  useEffect(() => {
      getBarbers().then(res => {
        // Nếu res.data là mảng barber
        setBarbers(res.data);
        // Nếu res.data.data là mảng barber
        // setBarbers(res.data.data);
      }).catch(console.error);
    }, []);

    console.log(barbers);
  useEffect(() => {
    setBubble(true);
    const timer = setTimeout(() => setBubble(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredBarbers = barbers?.filter(b =>
    b.userDTO?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarLayout>
      <Typography.Title
          level={2}
          style={{
            textAlign: "center",
            fontWeight: 900,
            fontSize: 38,
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
          ĐỘI NGŨ BARBER ĐỈNH CAO
      </Typography.Title>
      <div
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: 2,
          textShadow: "0 2px 8px #222, 0 0px 16px #ff9800",
          fontFamily: "'Oswald', 'Montserrat', Arial, sans-serif",
          marginBottom: 18,
          background: "linear-gradient(90deg, #ff9800 0%, #ffd600 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        WOLF - Phong cách dẫn đầu
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24, justifyContent: "space-between", alignItems: "center" }}>
        <div className={styles["search-barber-wrapper"]}>
          <SearchOutlined className={styles["search-barber-icon"]} />
          <Input
            placeholder="Tìm barber đỉnh cao..."
            allowClear
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles["search-barber"]}
            bordered={false}
          />
        </div>
        <Button
          type="primary"
          className={styles["add-barber-btn"]}
          icon={<PlusOutlined style={{ fontSize: 22 }} />}
          onClick={() => setShowAddModal(true)}
        >
          <span style={{ fontFamily: "Montserrat, Arial, sans-serif", fontWeight: 700, letterSpacing: 1 }}>
            Thêm mới barber
          </span>
        </Button>
      </div>
      <Row gutter={[12, 12]} justify="center">
        {filteredBarbers?.map((barber, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={idx}>
            <BarberItem barber={barber} bubble={bubble} />
          </Col>
        ))}
      </Row>
      <AddBarberModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddSuccess={handleAddBarberSuccess}
      />
    </SidebarLayout>
  );
}