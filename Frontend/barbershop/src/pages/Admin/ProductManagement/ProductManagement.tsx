import { Button, Card, Input, Select, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SidebarLayout from "../Sidebar/AdminSidebarLayout";
import {getProductType} from '../../../api/productTypeApi';
import type { ProductTypeDTO } from '../../../types/ResponseDTOs/productTypeDTO';
import { useState, useEffect } from "react";
import {getAllProductsToManagement} from '../../../api/productApi';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import {getAllBrands} from '../../../api/brandApi';
import type { BrandDTO } from '../../../types/ResponseDTOs/brandDTO';
const { Title } = Typography;



const brandColor = "#ffb300"; // vàng đồng
const editColor = "#1976d2"; // xanh đậm
const deleteColor = "#d32f2f"; // đỏ đậm
const cardBg = "#fafafa";
const borderColor = "#e0e0e0";
const shadow = "0 2px 12px rgba(0,0,0,0.08)";

export default function ProductManagement() {
  const [productTypes, setProductTypes] = useState<ProductTypeDTO[]>([]);
  const [productList, setProductList] = useState<ProductDTO[]>([]);
  const [brands, setBrands] = useState<BrandDTO[]>([]);
  useEffect(() => {
    getProductType().then((res) => {
      if (res?.data) {
        setProductTypes(res.data);
      }
    });

    getAllProductsToManagement().then((res) => {
      if (res?.data) {
        setProductList(res.data);
      }
    });

    getAllBrands().then((res) => {
      if (res?.data) {
        setBrands(res.data);
      }
    });
  }, []);

  return (
    <SidebarLayout>
      <div
        style={{
          background: "#f5f5f7",
          minHeight: "100vh",
          padding: "32px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1480, // tăng maxWidth cho vừa 5 card
            margin: "0 auto",
            padding: "0 0px", // bỏ padding để sát hai bên
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "32px",
              position: "relative",
            }}
          >
            <Title
              level={1}
              style={{
                color: "#222",
                fontWeight: 900,
                letterSpacing: 2,
                margin: 0,
                fontSize: 44,
                fontFamily: "Montserrat, Arial, sans-serif",
                textShadow: "0 2px 8px #e0e0e0",
              }}
            >
              Quản lý sản phẩm
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                position: "absolute",
                right: 0,
                background: brandColor,
                border: "none",
                borderRadius: 20,
                height: 44,
                fontWeight: 700,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 2px 8px #ffe082",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#ffa000")}
              onMouseLeave={e => (e.currentTarget.style.background = brandColor)}
            >
              Thêm mới sản phẩm
            </Button>
          </div>

          {/* Filters */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px #eee",
              padding: "18px 24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 32,
              marginBottom: 32,
            }}
          >
            <Select
              placeholder="DANH MỤC"
              style={{
                width: 180,
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                background: "#f8f8fa",
              }}
              dropdownStyle={{
                borderRadius: 12,
                boxShadow: "0 2px 8px #eee",
              }}
              options={productTypes.map(pt => ({
                value: pt.productTypeId,
                label: pt.productTypeName
              }))}
            />
            <Select
              placeholder="THƯƠNG HIỆU"
              style={{
                width: 180,
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                background: "#f8f8fa",
              }}
              dropdownStyle={{
                borderRadius: 12,
                boxShadow: "0 2px 8px #eee",
              }}
              options={brands.map(brand => ({
                value: brand.brandId,
                label: brand.brandName
              }))}
            />
            <Space>
              <span style={{ fontWeight: 500, color: "#222" }}>Khoảng giá:</span>
              <Input
                placeholder="0đ"
                style={{
                  width: 100,
                  borderRadius: 12,
                  border: `1px solid ${borderColor}`,
                  background: "#f8f8fa",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              />
              <span style={{ fontWeight: 500, color: "#222" }}>-</span>
              <Input
                placeholder="2.000.000đ"
                style={{
                  width: 120,
                  borderRadius: 12,
                  border: `1px solid ${borderColor}`,
                  background: "#f8f8fa",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              />
            </Space>
            <Button
              type="default"
              style={{
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 16,
                height: 40,
                marginLeft: 8,
                background: "#fff",
                border: `1px solid ${borderColor}`,
                boxShadow: "0 1px 4px #eee",
                transition: "all 0.2s",
              }}
              onClick={() => {
                // Xóa lọc: reset các state filter về giá trị mặc định
                // Ví dụ:
                // setSelectedProductType(undefined);
                // setSelectedBrand(undefined);
                // setPriceRange([0, 2000000]);
              }}
            >
              Xóa lọc
            </Button>
          </div>

          {/* Products Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 280px)", // 5 card, mỗi card 280px
              gap: "20px",
            }}
          >
            {productList.map((item) => (
              <Card
                key={item.productId}
                hoverable
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                      background: "#fff",
                      borderRadius: 16,
                      boxShadow: "0 1px 6px #eee",
                      margin: "0",
                    }}
                  >
                    <img
                      alt="product"
                      src={item.productImg}
                      style={{
                        maxHeight: 160,
                        maxWidth: "90%",
                        objectFit: "contain",
                        borderRadius: 12,
                        boxShadow: "0 2px 8px #e0e0e0",
                        background: "#fff",
                      }}
                      onError={e => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/160?text=No+Image";
                      }}
                    />
                  </div>
                }
                style={{
                  width: 280, // cố định chiều rộng card
                  borderRadius: 20,
                  boxShadow: shadow,
                  textAlign: "center",
                  border: "none",
                  background: cardBg,
                  paddingBottom: 72,
                  position: "relative",
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  transition: "box-shadow 0.2s",
                }}
                bodyStyle={{ padding: "20px 20px 0 20px" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.16)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = shadow)}
              >
                <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8, color: "#222" }}>
                  {item.productName}
                </div>
                <div
                  style={{
                    color: brandColor,
                    fontWeight: "bold",
                    fontSize: 24,
                    margin: "10px 0 18px 0",
                    fontFamily: "Montserrat, Arial, sans-serif",
                  }}
                >
                  {item.productPrices?.[0]?.originalPrice.toLocaleString()}đ
                </div>
                {/* Nút sát viền dưới */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    width: "100%",
                    gap: 12,
                    padding: "0 20px 16px 20px",
                    background: "transparent",
                  }}
                >
                  <Button
                    icon={<EditOutlined />}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      background: editColor,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 17,
                      border: "none",
                      height: 44,
                      boxShadow: "0 2px 8px #e3f2fd",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#1565c0")}
                    onMouseLeave={e => (e.currentTarget.style.background = editColor)}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      background: deleteColor,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 17,
                      border: "none",
                      height: 44,
                      boxShadow: "0 2px 8px #ffcdd2",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#b71c1c")}
                    onMouseLeave={e => (e.currentTarget.style.background = deleteColor)}
                  >
                    Xóa
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}