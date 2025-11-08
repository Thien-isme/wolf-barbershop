import dayjs from 'dayjs';
import { Button, Card, Checkbox, Image, Input, Space, Table } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { GetProductInCartsOfUser } from '../../../api/cartApi';
import type { CartDTO } from '../../../types/ResponseDTOs/cartDTO';
import type { PlusOrSubQuantityProductInCartRequest } from '../../../types/RequestDTOs/plusOrSubQuantityProductInCartRequest';
import {
    PlusQuantityInCart,
    SubQuantityInCart,
    RemoveProductInCart,
} from '../../../api/cartApi';
// Types
interface CartItem {
    id: number;
    productName: string;
    price: number;
    originalPrice: number;
    discountedPrice: number | undefined;
    quantity: number;
    size: string | undefined;
    image: string;
}
// Dữ liệu mẫu

function CartPage() {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const [carts, setCarts] = useState<CartDTO[]>([]);

    // Tách hàm fetch data ra ngoài
    const fetchCartItems = async () => {
        try {
            const response = await GetProductInCartsOfUser();
            setCarts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', error);
        }
    };

    // useEffect chỉ gọi hàm fetch khi component mount
    useEffect(() => {
        fetchCartItems();
    }, []);

    console.log('carts', carts);
    const dataSource =
        carts?.map(cart => {
            const isDiscountValid = cart.productPriceDTO?.discountEndDate
                ? dayjs(cart.productPriceDTO.discountEndDate).isAfter(dayjs())
                : false;

            return {
                id: cart.cartId,
                productName: cart.productDTO?.productName || 'Tên sản phẩm',
                price: cart.productPriceDTO?.originalPrice || 0,
                originalPrice: cart.productPriceDTO?.originalPrice || 0,
                discountedPrice: isDiscountValid
                    ? cart.productPriceDTO?.discountedPrice
                    : undefined,
                quantity: cart.quantity || 1,
                size: cart.sizeName || undefined,
                image: cart.productDTO?.productImg || 'https://via.placeholder.com/80',
            };
        }) || [];

    console.log('dataSource', dataSource);
    // Xử lý chọn item
    const handleSelect = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    //Tăng số lượng
    const handleQuantityIncrease = async (item: CartItem) => {
        const updatedItem: PlusOrSubQuantityProductInCartRequest = {
            cartId: item.id,
            quantity: 1,
        };

        // Call API
        const response = await PlusQuantityInCart(updatedItem);
        if (response.status === 200) {
            fetchCartItems();
        }
    };

    //Giảm số lượng
    const handleQuantityDecrease = async (item: CartItem) => {
        if (item.quantity > 1) {
            const updatedItem: PlusOrSubQuantityProductInCartRequest = {
                cartId: item.id,
                quantity: 1,
            };

            //call api
            const response = await SubQuantityInCart(updatedItem);
            if (response.status === 200) {
                fetchCartItems();
            }
        }
    };

    const handleRemoveItem = async (cartId: number) => {
        // Call API
        const response = await RemoveProductInCart(cartId);
        if (response.status === 200) {
            fetchCartItems();
            setSelectedItems(prev => prev.filter(id => id !== cartId));
        }
    };

    const columns = [
        {
            title: 'Sản phẩm',
            key: 'product',
            // width: 600,
            render: (item: CartItem) => (
                <Space>
                    <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelect(item.id)}
                        style={{
                            transform: 'scale(1.5)', // Tăng kích thước lên 1.5 lần
                            marginRight: '16px', // Thêm khoảng cách để tránh bị chạm
                        }}
                    />
                    <Image
                        src={item.image}
                        alt={item.productName}
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover' }}
                    />
                    <div>
                        <div style={{ fontWeight: 600 }}>{item.productName}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Size',
            key: 'size',
            render: (item: CartItem) => <span>{item.size}</span>,
        },
        {
            title: 'Đơn giá',
            key: 'price',
            render: (item: CartItem) => (
                <div>
                    {item.discountedPrice ? (
                        <>
                            <span
                                style={{
                                    textDecoration: 'line-through',
                                    color: '#999',
                                    marginRight: 8,
                                }}
                            >
                                {item.price.toLocaleString('vi-VN')}đ
                            </span>
                            <span style={{ color: '#ff4d4f', fontWeight: 600 }}>
                                {item.discountedPrice?.toLocaleString('vi-VN')}đ
                            </span>
                        </>
                    ) : (
                        <span>{item.price.toLocaleString('vi-VN')}đ</span>
                    )}
                </div>
            ),
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            render: (item: CartItem) => (
                <Space>
                    <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleQuantityDecrease(item)}
                    />
                    <Input
                        value={item.quantity}
                        style={{ width: 50, textAlign: 'center' }}
                        readOnly
                    />
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleQuantityIncrease(item)}
                    />
                </Space>
            ),
        },
        {
            title: 'Số tiền',
            key: 'total',
            render: (item: CartItem) => (
                <span style={{ color: '#ff4d4f', fontWeight: 600 }}>
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </span>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (item: CartItem) => (
                <Button
                    type='text'
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(item.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const totalAmount = carts
        .filter(item => selectedItems.includes(item.cartId || 0))
        .reduce((sum, item) => {
            const price = item.productPriceDTO?.originalPrice || 0; // Thêm kiểm tra null/undefined
            const totalItemPrice = price * (item.quantity || 0);
            return sum + totalItemPrice;
        }, 0);

    return (
        <div style={{ padding: 24 }}>
            <Card>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    rowKey='id'
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 24,
                        padding: '16px 0',
                        borderTop: '1px solid #f0f0f0',
                    }}
                >
                    <Space size='large'>
                        <span>
                            Tổng thanh toán ({selectedItems.length} sản phẩm):
                            <span
                                style={{
                                    color: '#ff4d4f',
                                    fontSize: 20,
                                    marginLeft: 8,
                                    fontWeight: 600,
                                }}
                            >
                                {totalAmount.toLocaleString('vi-VN')}đ
                            </span>
                        </span>
                        <Button type='primary' size='large'>
                            Mua hàng
                        </Button>
                    </Space>
                </div>
            </Card>
        </div>
    );
}

export default CartPage;
