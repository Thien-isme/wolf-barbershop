import { Card, Row, Col, Typography, Input, Button } from "antd";
import { useState, useEffect } from "react";
import SidebarLayout from "../Sidebar/AdminSidebarLayout";
import barberIcon from "../../../assets/symbol.png";
import { MdLocationOn } from "react-icons/md";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./BarberManagement.module.css";

const initialBarbers = [
  {
    name: "Quang Kao",
    branch: "Quận 1, TP. HCM",
    img: "https://photo.easysalon.vn/2024/05/44c8b87c-ca88-44a0-8dc9-bed0f7e0f444-202405231112442923622-a%20minh.png",
  },
  {
    name: "Hieu Man",
    branch: "P.1, Quận 4",
    img: "https://photo.easysalon.vn/2024/05/c15968f8-da4d-430f-bfba-d4cef4689e00-202405051243427319257-hong%20tp.jpg",
  },
  {
    name: "Trung Truc",
    branch: "P.1, Quận 4",
    img: "https://photo.easysalon.vn/2024/05/ad47e81b-b8f1-4dd7-a3b6-461e1c19f449-202405210548009815482-duy%20thai.jpg",
  },
  {
    name: "Nhi",
    branch: "P.5, Quận 3",
    img: "https://photo.easysalon.vn/2024/06/2565abff-1f17-4bc4-9845-173571737dc5-202406060114439866259-nguyen%20q2.jpg",
  },
  {
    name: "Pham Kien",
    branch: "P.2, Quận 4",
    img: "https://photo.easysalon.vn/2024/05/9622da16-9731-454c-bcf8-a7d8562ed6cc-202405210547546431518-phong%20trung.jpg",
  },
  {
    name: "Min",
    branch: "P.1, Quận 9",
    img: "https://photo.easysalon.vn/2024/05/7fbcd313-8e18-4c8d-b6b4-8d0c6e260678-202405051226215404926-mai%20TP.jpg",
  },
  {
    name: "Quang Kao",
    branch: "77 Yersin, Quận 1, TP. HCM",
    img: "https://photo.easysalon.vn/2024/05/44c8b87c-ca88-44a0-8dc9-bed0f7e0f444-202405231112442923622-a%20minh.png",
  },
  {
    name: "Hieu Man",
    branch: "P.1, Quận 4",
    img: "https://photo.easysalon.vn/2024/05/c15968f8-da4d-430f-bfba-d4cef4689e00-202405051243427319257-hong%20tp.jpg",
  },
  {
    name: "Hieu Man",
    branch: "P.1, Quận 4",
    img: "https://photo.easysalon.vn/2024/05/ad47e81b-b8f1-4dd7-a3b6-461e1c19f449-202405210548009815482-duy%20thai.jpg",
  },
  {
    name: "Hieu Man",
    branch: "P.1, Quận 4",
    img: "https://photo.easysalon.vn/2024/06/2565abff-1f17-4bc4-9845-173571737dc5-202406060114439866259-nguyen%20q2.jpg",
  },
  {
    name: "Hieu Man",
    branch: "P.1, Quận 4",
    img: "https://photo.easysalon.vn/2024/05/9622da16-9731-454c-bcf8-a7d8562ed6cc-202405210547546431518-phong%20trung.jpg",
  },
  {
    name: "Hieu Man",
    branch: "P.1, Quận 4",
    img: "https://photo.easysalon.vn/2024/05/7fbcd313-8e18-4c8d-b6b4-8d0c6e260678-202405051226215404926-mai%20TP.jpg",
  },
  // ...thêm các barber khác
];

function BarberItem({ barber, bubble }: { barber: typeof initialBarbers[0], bubble?: boolean }) {
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
          <span style={{ color: "#fff", fontSize: 24 }}>{barber.name}</span>
          <img src={barberIcon} alt="barber" style={{ width: 35, height: 35 , objectFit: "contain" }} />
        </span>
      </Typography.Title>
      <div className={styles["barber-img-wrapper"]} style={{ margin: "16px 0 0 0" }}>
        <img
          src={barber.img}
          alt={barber.name}
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
          <span style={{ color: "#ffd600", fontSize: 16 }}>{barber.branch}</span>
        </span>
      </Typography.Text>

    </Card>
  );
}


export default function BarberManagement() {
  const [barbers, setBarbers] = useState(initialBarbers);
  const [search, setSearch] = useState("");
  const [bubble, setBubble] = useState(true);

  useEffect(() => {
    setBubble(true);
    const timer = setTimeout(() => setBubble(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredBarbers = barbers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
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
        >
          <span style={{ fontFamily: "Montserrat, Arial, sans-serif", fontWeight: 700, letterSpacing: 1 }}>
            Thêm mới barber
          </span>
        </Button>
      </div>
      <Row gutter={[12, 12]} justify="center">
        {filteredBarbers.map((barber, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={idx}>
            <BarberItem barber={barber} bubble={bubble} />
          </Col>
        ))}
      </Row>
    </SidebarLayout>
  );
}