import { Modal, Input, Space, Button, Image } from 'antd';
import { useState } from 'react';
import type { PlusOrSubQuantityRequest } from '../../../../types/RequestDTOs/PlusOrSubQuantityRequest';
import {
    PlusQuantityProduct,
    SubQuantityProduct,
} from '../../../../api/branchesProductApi';
import { toast } from 'react-toastify';

interface ProductQuantityModalProps {
    visible: boolean;
    productData: {
        productId: number;
        productName: string | undefined;
        productImg: string | undefined;
        brandName: string;
        productTypeName: string;
        sizeId: number | undefined;
        sizeName: string;
        currentQuantity: number;
        price: number;
    } | null;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function ProductQuantityModal({
    visible,
    productData,
    onClose,
    onSuccess,
}: ProductQuantityModalProps) {
    const [adjustValue, setAdjustValue] = useState<number>(0);

    // Reset adjustValue khi modal đóng
    const handleClose = () => {
        setAdjustValue(0);
        onClose();
    };

    // Xử lý thêm số lượng
    const handleAdd = async () => {
        if (productData && adjustValue > 0) {
            try {
                const plusOrSubQuantityRequest: PlusOrSubQuantityRequest = {
                    productId: productData.productId,
                    sizeId: productData.sizeId || undefined,
                    quantity: adjustValue,
                };

                console.log('plusOrSubQuantityRequest', plusOrSubQuantityRequest);

                var res = await PlusQuantityProduct(plusOrSubQuantityRequest);
                console.log('res', res);
                if (res.status === 200) {
                    Modal.success({
                        title: 'Thành công',
                        content: `Đã thêm ${adjustValue} sản phẩm vào kho`,
                    });
                    handleClose();
                    onSuccess?.();
                } else {
                    Modal.error({
                        title: 'Lỗi',
                        content:
                            res.message ||
                            'Không thể thêm số lượng sản phẩm. Vui lòng thử lại!',
                    });
                }
            } catch (error) {
                Modal.error({
                    title: 'Lỗi',
                    content: 'Không thể thêm số lượng sản phẩm. Vui lòng thử lại!',
                });
            }
        }
    };

    // Xử lý giảm số lượng
    const handleReduce = async () => {
        if (productData && adjustValue > 0) {
            if (adjustValue > productData.currentQuantity) {
                console.log('adjustValue', adjustValue);
                toast.error(
                    'Số lượng giảm không được lớn hơn số lượng hiện có trong kho'
                );
                return;
            }

            try {
                const plusOrSubQuantityRequest: PlusOrSubQuantityRequest = {
                    productId: productData.productId,
                    sizeId: productData.sizeId || undefined,
                    quantity: adjustValue,
                };

                var res = await SubQuantityProduct(plusOrSubQuantityRequest);
                console.log('res', res);
                console.log('status', res.status);
                if (res.status === 200) {
                    toast.success(res.messageShow);
                    handleClose();
                    onSuccess?.();
                } else {
                    toast.error(
                        res.messageShow ||
                            'Không thể giảm số lượng sản phẩm. Vui lòng thử lại!'
                    );
                }
                handleClose();
                onSuccess?.();
            } catch (error) {
                toast.error('Không thể giảm số lượng sản phẩm. Vui lòng thử lại!');
            }
        }
    };

    if (!productData) return null;

    return (
        <Modal
            title={
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 600,
                        width: '100%',
                    }}
                >
                    Thông tin sản phẩm
                </div>
            }
            open={visible}
            onCancel={handleClose}
            footer={null}
            width={700}
            centered
        >
            <div style={{ display: 'flex', gap: 24 }}>
                {/* Hình ảnh sản phẩm */}
                <div style={{ flex: '0 0 200px' }}>
                    <Image
                        src={
                            productData.productImg ||
                            'https://via.placeholder.com/200?text=No+Image'
                        }
                        alt={productData.productName}
                        style={{
                            width: '100%',
                            borderRadius: 8,
                            border: '1px solid #f0f0f0',
                        }}
                        fallback='https://via.placeholder.com/200?text=No+Image'
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 12 }}>
                        <div
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                marginBottom: 4,
                            }}
                        >
                            {productData.productName}
                        </div>
                        <div style={{ fontSize: 14, color: '#666' }}>
                            Thương hiệu: {productData.brandName}
                        </div>
                        <div style={{ fontSize: 14, color: '#666' }}>
                            Phân loại: {productData.productTypeName}
                        </div>
                    </div>

                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#ff9800',
                            marginBottom: 12,
                        }}
                    >
                        Giá: {productData.price.toLocaleString('vi-VN')}đ
                    </div>

                    <div
                        style={{
                            fontSize: 16,
                            marginBottom: 16,
                            color:
                                productData.currentQuantity > 0 ? '#52c41a' : '#ff4d4f',
                        }}
                    >
                        Số lượng hiện tại ở shop:{' '}
                        <strong>{productData.currentQuantity}</strong>
                    </div>

                    <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: 8,
                                color: '#ff5722',
                                fontWeight: 500,
                            }}
                        >
                            Nhập số lượng muốn thêm/giảm:
                        </label>
                        <Input
                            type='number'
                            min={0}
                            value={adjustValue}
                            onChange={e => setAdjustValue(Number(e.target.value))}
                            style={{ width: '80px' }}
                            placeholder='Nhập số lượng'
                        />
                    </div>

                    <Space
                        size='middle'
                        style={{ width: '100%', justifyContent: 'flex-end' }}
                    >
                        <Button
                            type='primary'
                            size='large'
                            style={{
                                background: '#4CAF50', // Màu xanh lá
                                borderColor: '#4CAF50',
                                borderRadius: 20,
                                minWidth: 100,
                            }}
                            onClick={handleAdd}
                            disabled={adjustValue <= 0}
                        >
                            Thêm
                        </Button>
                        <Button
                            type='primary'
                            size='large'
                            style={{
                                background: '#f44336', // Màu đỏ
                                borderColor: '#f44336',
                                borderRadius: 20,
                                minWidth: 100,
                            }}
                            onClick={handleReduce}
                            disabled={adjustValue <= 0}
                        >
                            Giảm
                        </Button>
                    </Space>
                </div>
            </div>
        </Modal>
    );
}
