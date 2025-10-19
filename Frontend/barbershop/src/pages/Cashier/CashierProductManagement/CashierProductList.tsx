import { Table, Button, InputNumber, Space, Image } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import { useState } from 'react';

interface ProductTableProps {
    productList: ProductDTO[];
}

export default function ProductTable({ productList }: ProductTableProps) {
    // State để quản lý quantity tạm thời trước khi gọi API
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    // Hàm xử lý tăng số lượng
    const handleIncrease = async (productId: number, sizeName?: string) => {
        const key = `${productId}-${sizeName || 'no-size'}`;
        const currentQty = quantities[key] || 0;
        const newQty = currentQty + 1;

        setQuantities(prev => ({ ...prev, [key]: newQty }));

        // TODO: Gọi API để cập nhật số lượng
        console.log('Increase quantity:', { productId, sizeName, newQuantity: newQty });
        // await updateProductQuantity(productId, sizeName, newQty);
    };

    // Hàm xử lý giảm số lượng
    const handleDecrease = async (productId: number, sizeName?: string) => {
        const key = `${productId}-${sizeName || 'no-size'}`;
        const currentQty = quantities[key] || 0;

        if (currentQty > 0) {
            const newQty = currentQty - 1;
            setQuantities(prev => ({ ...prev, [key]: newQty }));

            // TODO: Gọi API để cập nhật số lượng
            console.log('Decrease quantity:', {
                productId,
                sizeName,
                newQuantity: newQty,
            });
            // await updateProductQuantity(productId, sizeName, newQty);
        }
    };

    // Hàm xử lý thay đổi số lượng trực tiếp
    const handleQuantityChange = async (
        value: number | null,
        productId: number,
        sizeName?: string
    ) => {
        if (value !== null && value >= 0) {
            const key = `${productId}-${sizeName || 'no-size'}`;
            setQuantities(prev => ({ ...prev, [key]: value }));

            // TODO: Gọi API để cập nhật số lượng
            console.log('Change quantity:', { productId, sizeName, newQuantity: value });
            // await updateProductQuantity(productId, sizeName, value);
        }
    };

    // Chuẩn bị data cho table - SỬ DỤNG ĐÚNG STRUCTURE TỪ API
    const tableData = productList.map(product => ({
        key: `${product.productId}-${product.sizeName || 'no-size'}`,
        productId: product.productId,
        productName: product.productName,
        productImg: product.productImg,
        sizeName: product.sizeName || 'Không có',
        productTypeName: product.productTypeDTO?.productTypeName || 'Chưa có loại',
        brandName: product.brandDTO?.brandName || 'Chưa có thương hiệu',
        originalPrice: product.productPriceDTO?.originalPrice,
        discountedPrice: product.productPriceDTO?.discountedPrice,
        currentQuantity: product.quantity || 0, // Số lượng hiện tại từ API
        temporaryQuantity:
            quantities[`${product.productId}-${product.sizeName || 'no-size'}`] || 0, // Số lượng tạm thời
    }));

    const columns: ColumnsType<(typeof tableData)[0]> = [
        {
            title: 'Hình ảnh',
            dataIndex: 'productImg',
            key: 'productImg',
            width: 80,
            render: (img: string, record) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                        src={img || 'https://via.placeholder.com/60x60?text=No+Image'}
                        alt={record.productName}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                        fallback='https://via.placeholder.com/60x60?text=No+Image'
                    />
                </div>
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: 250,
            render: (text: string, record) => (
                <div>
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>{text}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>
                        {record.brandName} • {record.productTypeName}
                    </div>
                </div>
            ),
        },
        {
            title: 'Size',
            dataIndex: 'sizeName',
            key: 'sizeName',
            width: 80,
            align: 'center',
            render: (text: string) => (
                <span
                    style={{
                        padding: '4px 8px',
                        background: text === 'Không có' ? '#f5f5f5' : '#e6f7ff',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 500,
                        color: text === 'Không có' ? '#999' : '#1890ff',
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            align: 'right',
            render: (_, record) => {
                // Kiểm tra có giá không
                if (!record.originalPrice && !record.discountedPrice) {
                    return (
                        <div style={{ textAlign: 'right', color: '#999' }}>
                            Chưa có giá
                        </div>
                    );
                }

                // Có giá khuyến mãi
                if (
                    record.discountedPrice &&
                    record.originalPrice &&
                    record.discountedPrice < record.originalPrice
                ) {
                    return (
                        <div style={{ textAlign: 'right' }}>
                            <div
                                style={{
                                    color: '#888',
                                    textDecoration: 'line-through',
                                    fontSize: 12,
                                }}
                            >
                                {record.originalPrice.toLocaleString('vi-VN')}đ
                            </div>
                            <div
                                style={{
                                    color: '#ff5722',
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                }}
                            >
                                {record.discountedPrice.toLocaleString('vi-VN')}đ
                            </div>
                        </div>
                    );
                }

                // Chỉ có giá gốc hoặc giá khuyến mãi không nhỏ hơn giá gốc
                const displayPrice = record.discountedPrice || record.originalPrice;
                return (
                    <div
                        style={{
                            color: '#ffb300',
                            fontWeight: 'bold',
                            fontSize: 14,
                            textAlign: 'right',
                        }}
                    >
                        {displayPrice?.toLocaleString('vi-VN')}đ
                    </div>
                );
            },
        },
        {
            title: 'Số lượng hiện tại',
            dataIndex: 'currentQuantity',
            key: 'currentQuantity',
            width: 120,
            align: 'center',
            render: (quantity: number) => (
                <span
                    style={{
                        color: quantity > 0 ? '#52c41a' : '#ff4d4f',
                        fontWeight: 500,
                        fontSize: 16,
                    }}
                >
                    {quantity}
                </span>
            ),
        },
        {
            title: 'Điều chỉnh số lượng',
            key: 'quantityControl',
            width: 200,
            align: 'center',
            render: (_, record) => {
                const currentTempQty = record.temporaryQuantity;

                return (
                    <Space>
                        <Button
                            type='primary'
                            icon={<MinusOutlined />}
                            size='small'
                            onClick={() =>
                                handleDecrease(
                                    record.productId,
                                    record.sizeName === 'Không có'
                                        ? undefined
                                        : record.sizeName
                                )
                            }
                            disabled={currentTempQty <= 0}
                            style={{ width: 32, height: 32 }}
                        />

                        <InputNumber
                            min={0}
                            max={9999}
                            value={currentTempQty}
                            onChange={value =>
                                handleQuantityChange(
                                    value,
                                    record.productId,
                                    record.sizeName === 'Không có'
                                        ? undefined
                                        : record.sizeName
                                )
                            }
                            style={{ width: 80 }}
                            size='small'
                        />

                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            size='small'
                            onClick={() =>
                                handleIncrease(
                                    record.productId,
                                    record.sizeName === 'Không có'
                                        ? undefined
                                        : record.sizeName
                                )
                            }
                            style={{ width: 32, height: 32 }}
                        />
                    </Space>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 120,
            align: 'center',
            render: (_, record) => (
                <Space direction='vertical' size='small'>
                    <Button
                        type='link'
                        size='small'
                        style={{ padding: 0, height: 'auto' }}
                        onClick={() => {
                            console.log('Edit product:', record.productId);
                            // TODO: Mở modal edit
                        }}
                    >
                        Điều chỉnh
                    </Button>
                    <Button
                        type='link'
                        danger
                        size='small'
                        style={{ padding: 0, height: 'auto' }}
                        onClick={() => {
                            console.log('Stop business:', record.productId);
                            // TODO: Ngưng kinh doanh
                        }}
                    >
                        Ngưng KD
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={tableData}
            pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} của ${total} sản phẩm`,
            }}
            scroll={{ x: 1200 }}
            size='small'
            bordered
            style={{
                background: '#fff',
                borderRadius: 8,
                overflow: 'hidden',
            }}
        />
    );
}
