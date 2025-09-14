import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Radio, Row, Col, Card, Typography, Space, Button, List, Select, Image } from 'antd';
import './BookingBody.css';

import {getBranchs} from '../../api/branchApi';
import type { BranchDTO } from '../../types/branchDTO';
import { getBarbersInBranch } from '../../api/barbersApi';
import type { EmployeeDTO } from '../../types/employeeDTO';
import { getEmployeeImgHair } from '../../api/employeeImgHairApi';
import type { EmployeeImgHairDTO } from '../../types/employeeImgHairDTO';
import { getServices } from '../../api/serviceApi';
import type { ServiceTypeDTO } from '../../types/serviceTypeDTO';

const { Title } = Typography;

const BookingBody: React.FC = () => {
  const [form] = Form.useForm();
  const [branches, setBranches] = useState<BranchDTO[]>([]);
  const [barbers, setBarbers] = useState<EmployeeDTO[]>([]);
  const [employeeImgHairs, setEmployeeImgHairs] = useState<EmployeeImgHairDTO[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [showServiceList, setShowServiceList] = useState(false);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const serviceListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await getBranchs();
        const activeBranches = response.data.filter((branch: BranchDTO) => branch.isActive);
        setBranches(activeBranches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();
        // Lọc các loại dịch vụ và các dịch vụ con đang hoạt động
        const activeServiceTypes = response.data
          .filter((st: ServiceTypeDTO) => st.isActive)
          .map((st: ServiceTypeDTO) => ({
            ...st,
            services: st.services.filter(s => s.isActive),
          }));
        setServiceTypes(activeServiceTypes);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
    fetchServices();
    
  }, []);



  // Thêm hàm xử lý khi branch thay đổi
  const handleBranchChange = async (selectedBranch: number) => {
    try {
      setLoading(true);
      const response = await getBarbersInBranch(selectedBranch);
      setBarbers(response.data);
      setSelectedBranch(selectedBranch);
    } catch (error) {
      console.error('Error fetching barbers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarberChange = async (barberId: number) => {
    setSelectedBarber(barberId);
    try {
      setLoading(true);
      const res = await getEmployeeImgHair({ employeeId: barberId });
      setEmployeeImgHairs(res.data || []);
    } catch (error) {
      setEmployeeImgHairs([]);
    } finally {
      setLoading(false);
    }
  };

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    if (!showServiceList) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        serviceListRef.current &&
        !serviceListRef.current.contains(event.target as Node)
      ) {
        setShowServiceList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showServiceList]);



  // Tính toán tổng tiền và thời lượng
  const selectedServiceObjects = selectedServices
    .map(id => serviceTypes.flatMap(t => t.services).find(s => s.serviceId === id))
    .filter(Boolean);

  const totalPrice = selectedServiceObjects.reduce((sum, s) => sum + (s?.price || 0), 0);
  const totalDuration = selectedServiceObjects.reduce((sum, s) => sum + (s?.durationMin || 0), 0);

  return (
    <Card className="booking-card" style={{ maxWidth: 700, margin: '0 auto', background: '#1f1f1f', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img 
          src="https://res.cloudinary.com/duzh5dnul/image/upload/v1756147091/dj0cctqnth2gislbxliz.webp" 
          alt="Wolf Barbershop Logo" 
          style={{ width: 550, marginBottom: 16 }}
        />
        <Title level={2} style={{ color: 'white', marginBottom: 24 }}>
          Đặt lịch cắt tóc tại WOLF BarberShop
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        style={{ color: 'white' }}
      >
        <Typography.Text style={{ color: 'white', marginBottom: 16, display: 'block' }}>
          Quý khách vui lòng cho biết thông tin
        </Typography.Text>

        <Space style={{ width: '100%', marginBottom: 12 }} size={170}>
          <Form.Item
            name="phone"
            style={{ flex: 1, width: '160%' }}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="name"
            style={{ flex: 1, width: '160%' }}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
        </Space>
        <Title level={4} style={{ color: 'white', marginBottom: 16 }}>
          Thông tin dịch vụ
        </Title>
        
        <Title level={5} style={{ color: 'white', marginBottom: 16 }}>
          Chọn chi nhánh
        </Title>
        <Form.Item name="branch">
          <Radio.Group 
            style={{ width: '100%' }}
            onChange={(e) => handleBranchChange(e.target.value)}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {branches.map((branch, index) => (
                <Radio 
                  key={index} 
                  value={branch.branchId}
                  style={{ 
                    backgroundColor: '#333',
                    padding: '8px 16px',
                    borderRadius: 8,
                    width: '100%',
                    color: 'white'
                  }}
                >
                  {branch.locationDetail}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Title level={5} style={{ color: 'white', marginBottom: 16 }}>
          Chọn kỹ thuật viên
        </Title>
        <Form.Item name="barber">
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Danh sách barbers */}
            <div style={{ flex: '0 0 180px' }}>
              <Radio.Group 
                onChange={(e) => handleBarberChange(e.target.value)}
                style={{ width: '100%' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {barbers?.map((barber, index) => (
                    <Radio 
                      key={index} 
                      value={barber.employeeId}
                      style={{ 
                        backgroundColor: '#333',
                        padding: '8px 16px',
                        borderRadius: 8,
                        width: '100%',
                        color: 'white',
                        marginBottom: '8px'
                      }}
                    >
                      {barber.userDTO?.fullName}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>

            {/* Ảnh đại diện của barber */}
            {selectedBarber && (
            <Card
              style={{ 
                flex: '0 0 200px', // Giữ nguyên flex để duy trì layout
                background: '#333',
                border: 'none',
                borderRadius: '8px',
              }}
              bodyStyle={{ 
                padding: '16px',
                height: '300px' // Điều chỉnh chiều cao để tạo tỷ lệ 2:3
              }}
            >
              <img 
                src={barbers?.find(b => b.employeeId === selectedBarber)?.avatarUrl || 'default-avatar.jpg'}
                alt="Barber Avatar"
                style={{
                  width: '100%',
                  height: '100%', // Chiều cao 100% của container
                  objectFit: 'cover',
                  borderRadius: '8px',
                  aspectRatio: '2/3' // Đảm bảo tỷ lệ 2:3
                }}
              />
            </Card>
          )}

            {/* Các tác phẩm */}
            {selectedBarber && (
              <Card
                title="Các tác phẩm"
                style={{ flex: 1, background: '#333', border: 'none', borderRadius: '8px' }}
                headStyle={{
                  color: 'white',
                  borderBottom: '1px solid #444',
                  padding: '16px'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <Image.PreviewGroup>
                  <Row gutter={[8, 8]}>
                    {employeeImgHairs.map((img, index) => (
                      <Col span={12} key={index}>
                        <Card
                          style={{ background: '#444', border: 'none', borderRadius: '4px' }}
                          bodyStyle={{ padding: 0 }}
                        >
                          <Image
                            src={img.imgUrl}
                            alt={`Work ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                            preview={{ mask: <span>Xem chi tiết</span> }}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Image.PreviewGroup>
              </Card>
            )}
          </div>
        </Form.Item>

        <Card
          style={{ background: '#222', border: 'none', marginBottom: 24, marginTop: 32 }}
          bodyStyle={{ padding: 16, position: 'relative' }}
        >
          <Title level={5} style={{ color: 'white', marginBottom: 8 }}>
            Chọn dịch vụ
          </Title>
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn dịch vụ"
            style={{ width: '100%', marginBottom: 16 }}
            value={selectedServices}
            onChange={setSelectedServices}
            optionLabelProp="label"
            maxTagCount={0}
            maxTagPlaceholder="Chọn dịch vụ"
          >
            {serviceTypes.map(type => (
              <Select.OptGroup key={type.serviceTypeId} label={type.serviceTypeName}>
                {type.services.map(service => (
                  <Select.Option
                    key={service.serviceId}
                    value={service.serviceId}
                    label={service.serviceName}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{service.serviceName}</span>
                      <span style={{ fontWeight: 600 }}>{service.price}k</span>
                    </div>
                  </Select.Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
          {/* Hiển thị danh sách dịch vụ đã chọn */}
          <div>
            {selectedServices.map(id => {
              const found = serviceTypes.flatMap(t => t.services).find(s => s.serviceId === id);
              if (!found) return null;
              return (
                <div
                  key={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 8,
                    background: 'white',
                    borderRadius: 6,
                    padding: '8px 12px',
                    borderBottom: '3px solid #fff',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ flex: 1, color: '#111', fontWeight: 700, fontSize: 18 }}>
                    {found.serviceName}
                  </span>
                  <span style={{ marginRight: 16, color: '#111', fontWeight: 700, fontSize: 18 }}>
                    {found.price}k
                  </span>
                  <Button
                    danger
                    size="middle"
                    style={{
                      background: '#d0021b',
                      border: 'none',
                      color: 'white',
                      fontWeight: 700,
                      borderRadius: 12,
                      minWidth: 56,
                    }}
                    onClick={() => setSelectedServices(selectedServices.filter(sid => sid !== id))}
                  >
                    Xóa
                  </Button>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ color: 'white', fontStyle: 'italic', fontWeight: 700 }}>
              Tạm tính: <span style={{ fontWeight: 700 }}> {totalPrice.toLocaleString()} vnđ</span>
            </div>
            <div style={{ color: 'white', fontStyle: 'italic', fontWeight: 700 }}>
              Tổng tiền: <span style={{ fontWeight: 700 }}> {totalPrice.toLocaleString()} vnđ</span>
            </div>
            <div style={{ color: 'white', fontStyle: 'italic', fontWeight: 700 }}>
              Thời lượng dự kiến: <span style={{ fontWeight: 700 }}>{totalDuration} Phút</span>
            </div>
          </div>
        </Card>


      </Form>
    </Card>
  );
};

export default BookingBody;