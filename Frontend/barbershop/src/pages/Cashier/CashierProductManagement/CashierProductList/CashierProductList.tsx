import { Table, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ProductDTO } from '../../../../types/ResponseDTOs/productDTO';
import { useState } from 'react';
import ProductQuantityModal from '../ProductQuantityModal/ProductQuantityModal';

interface ProductTableProps {
    productList: ProductDTO[];
    reloadProducts: () => void;
}

export default function ProductTable({ productList, reloadProducts }: ProductTableProps) {
    // State để quản lý quantity tạm thời trước khi gọi API
    // State cho modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{
        productId: number;
        productName: string | undefined;
        productImg: string | undefined;
        brandName: string;
        productTypeName: string;
        sizeId: number | undefined;
        sizeName: string;
        currentQuantity: number;
        price: number;
    } | null>(null);

    // Mở modal
    const showModal = (record: (typeof tableData)[0]) => {
        setSelectedProduct({
            productId: record.productId,
            productName: record.productName,
            productImg: record.productImg,
            brandName: record.brandName,
            productTypeName: record.productTypeName,
            sizeId: record.sizeId || undefined,
            sizeName: record.sizeName,
            currentQuantity: record.currentQuantity,
            price: record.discountedPrice || record.originalPrice || 0,
        });
        setIsModalVisible(true);
    };

    // Đóng modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
    };

    // Xử lý sau khi thành công (reload data hoặc update state)
    const handleSuccess = () => {
        // TODO: Reload danh sách sản phẩm hoặc update state
        reloadProducts();
    };

    // Chuẩn bị data cho table - SỬ DỤNG ĐÚNG STRUCTURE TỪ API
    const tableData = productList.map(product => ({
        key: `${product.productId}-${product.sizeName || 'no-size'}`,
        productId: product.productId,
        productName: product.productName,
        productImg: product.productImg,
        sizeId: product.sizeId,
        sizeName: product.sizeName || 'Không có',
        productTypeName: product.productTypeDTO?.productTypeName || 'Chưa có loại',
        brandName: product.brandDTO?.brandName || 'Chưa có thương hiệu',
        originalPrice: product.productPriceDTO?.originalPrice,
        discountedPrice: product.productPriceDTO?.discountedPrice,
        currentQuantity: product.quantity || 0,
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
            width: 100,
            align: 'center',
            render: (_, record) => (
                <Button type='primary' onClick={() => showModal(record)}>
                    Điều chỉnh số lượng
                </Button>
            ),
        },
    ];

    return (
        <>
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

            <ProductQuantityModal
                visible={isModalVisible}
                productData={selectedProduct}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
        </>
    );
}
