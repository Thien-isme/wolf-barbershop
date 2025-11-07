import {
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Upload,
    Button,
    Checkbox,
    Space,
    message,
} from 'antd';
import { addNewProduct } from '../../../../api/productApi';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { ProductTypeDTO } from '../../../../types/ResponseDTOs/productTypeDTO';
import type { BrandDTO } from '../../../../types/ResponseDTOs/brandDTO';
import style from './styled.module.scss';
import { getAllSizes } from '../../../../api/sizeApi';
import type { SizeDTO } from '../../../../types/ResponseDTOs/sizeDTO';

interface AddProductModalProps {
    visible: boolean;
    onClose: () => void;
    productTypes: ProductTypeDTO[];
    brands: BrandDTO[];
    onAddProductSuccess: () => void;
}

export default function AddProductModal({
    visible,
    onClose,
    productTypes,
    brands,
    onAddProductSuccess,
}: AddProductModalProps) {
    const [sizes, setSizes] = useState<SizeDTO[]>([]);
    useEffect(() => {
        getAllSizes().then(res => {
            if (res?.data) {
                const filteredSizes = res.data.filter(
                    (size: SizeDTO) => size.sizeName !== null
                );
                setSizes(filteredSizes);
            }
        });
    }, []);

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [hasDiscount, setHasDiscount] = useState(false);
    const [hasSize, setHasSize] = useState(false);

    // Thêm state để lưu URL preview
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Thêm state để quản lý size được chọn
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

    const { listPictureCard } = style;

    // Xử lý upload ảnh
    const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    // Xử lý preview ảnh trước khi upload
    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên file ảnh!');
        }
        return isImage || Upload.LIST_IGNORE;
    };

    // Thêm các hàm xử lý preview
    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleCancel = () => setPreviewOpen(false);

    // Thêm hàm xử lý chọn size
    const handleSizeClick = (sizeId: number) => {
        setSelectedSizes(prev => {
            if (prev.includes(sizeId)) {
                return prev.filter(s => s !== sizeId);
            }
            return [...prev, sizeId];
        });
        form.setFieldValue('sizes', selectedSizes);
    };

    // Thêm hàm xử lý ngăn nhập dấu âm
    const preventNegativeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '-' || e.key === 'e') {
            e.preventDefault();
        }
    };

    // Xử lý submit form
    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();

            // Thêm thông tin cơ bản
            formData.append('productName', values.productName);
            formData.append('brandId', values.brandId);
            formData.append('productTypeId', values.productTypeId);
            formData.append('originalPrice', values.originalPrice);
            formData.append('hasDiscount', values.hasDiscount);

            // Thêm thông tin giảm giá nếu có
            if (values.hasDiscount) {
                formData.append('discountedPrice', values.discountedPrice);
                formData.append('discountStartDate', values.discountDates[0].format());
                formData.append('discountEndDate', values.discountDates[1].format());
            }

            // Thêm thông tin size nếu có
            formData.append('hasSize', values.hasSize);
            if (values.hasSize && values.sizes) {
                selectedSizes.forEach((sizeId: number) => {
                    formData.append('sizeIds', sizeId.toString());
                });
            }

            // Thêm files ảnh
            fileList.forEach(file => {
                formData.append('images', file.originFileObj as File);
            });

            // Gọi API
            const response = await addNewProduct(formData);
            console.log('API response:', response);
            console.log('response.data.status === 200:', response.status);
            console.log('response.data.status === 200:', response.status === 200);
            if (response.status === 200) {
                message.success('Thêm sản phẩm thành công!');
                form.resetFields();
                setFileList([]);
                setHasDiscount(false);
                setHasSize(false);
                onClose();
                onAddProductSuccess();
            } else {
                message.error('Có lỗi xảy ra khi thêm sản phẩm!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('Có lỗi xảy ra khi thêm sản phẩm!');
        }
    };

    return (
        <Modal
            title={
                <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 600 }}>
                    Thêm sản phẩm mới
                </div>
            }
            open={visible}
            onCancel={onClose}
            width={900}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout='vertical'
                onFinish={handleSubmit}
                initialValues={{
                    hasDiscount: false,
                    hasSize: false,
                }}
            >
                <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ flex: '0 0 200px' }}>
                        {/* Cột trái - Upload ảnh */}
                        <Form.Item
                            name='images'
                            label='Chọn ảnh sản phẩm'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ảnh sản phẩm!',
                                },
                            ]}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Upload
                                listType='picture-card'
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={beforeUpload}
                                onPreview={handlePreview}
                                className={listPictureCard}
                            >
                                {fileList.length >= 4 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </div>
                    {/* Cột phải - Thông tin sản phẩm */}
                    <div style={{ flex: 1 }}>
                        <Form.Item
                            name='productName'
                            label='Tên sản phẩm'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm!',
                                },
                            ]}
                        >
                            <Input placeholder='Nhập tên sản phẩm' />
                        </Form.Item>

                        <Space style={{ display: 'flex', gap: 32 }}>
                            <Form.Item
                                name='brandId'
                                label='Thương hiệu'
                                style={{ flex: 1 }}
                            >
                                <Select placeholder='Chọn thương hiệu'>
                                    {brands.map(brand => (
                                        <Select.Option
                                            key={brand.brandId}
                                            value={brand.brandId}
                                        >
                                            {brand.brandName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name='productTypeId'
                                label='Phân loại'
                                style={{ flex: 1 }}
                            >
                                <Select placeholder='Chọn phân loại'>
                                    {productTypes.map(type => (
                                        <Select.Option
                                            key={type.productTypeId}
                                            value={type.productTypeId}
                                        >
                                            {type.productTypeName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Space>

                        <Form.Item
                            name='originalPrice'
                            label='Giá gốc'
                            rules={[
                                {
                                    required: hasDiscount,
                                    message: 'Vui lòng nhập giá gốc khi có giảm giá!',
                                },
                            ]}
                            dependencies={['hasDiscount']}
                        >
                            <Input
                                type='number'
                                min={0}
                                placeholder='Nhập giá gốc'
                                style={{ width: '100%' }}
                                onKeyDown={preventNegativeInput}
                            />
                        </Form.Item>

                        <Form.Item name='hasDiscount' valuePropName='checked'>
                            <Checkbox
                                checked={hasDiscount}
                                onChange={e => setHasDiscount(e.target.checked)}
                            >
                                Có giảm giá
                            </Checkbox>
                        </Form.Item>

                        {hasDiscount && (
                            <Space style={{ display: 'flex', gap: 130 }}>
                                <Form.Item
                                    name='discountedPrice'
                                    label='Giá sau giảm'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giá sau giảm!',
                                        },
                                        {
                                            validator: (_, value) =>
                                                form.getFieldValue('originalPrice') >
                                                Number(value)
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                          'Giá sau giảm phải nhỏ hơn giá gốc!'
                                                      ),
                                        },
                                    ]}
                                    style={{ width: '150%' }}
                                >
                                    <Input
                                        type='number'
                                        min={0}
                                        placeholder='Nhập giá sau giảm'
                                        onKeyDown={preventNegativeInput}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name='discountDates'
                                    label='Thời gian giảm giá'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn thời gian giảm giá!',
                                        },
                                    ]}
                                >
                                    <DatePicker.RangePicker />
                                </Form.Item>
                            </Space>
                        )}

                        <Form.Item name='hasSize' valuePropName='checked'>
                            <Checkbox
                                checked={hasSize}
                                onChange={e => setHasSize(e.target.checked)}
                            >
                                Có size
                            </Checkbox>
                        </Form.Item>

                        {hasSize && (
                            <Form.Item
                                name='sizes'
                                label='Chọn size'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ít nhất một size!',
                                    },
                                ]}
                            >
                                <div className={style.sizeSelector}>
                                    {sizes.map(size => (
                                        <div
                                            key={size.sizeId}
                                            className={`${style.sizeBox} ${
                                                selectedSizes.includes(size.sizeId)
                                                    ? style.selected
                                                    : ''
                                            }`}
                                            onClick={() => handleSizeClick(size.sizeId)}
                                        >
                                            {size.sizeName}
                                        </div>
                                    ))}
                                </div>
                            </Form.Item>
                        )}

                        <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{
                                    minWidth: 120,
                                    height: 40,
                                    borderRadius: 20,
                                    background: '#ffb300',
                                    fontWeight: 600,
                                }}
                            >
                                Thêm
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>

            {/* Thêm Modal preview ảnh - đặt trong phần return cuối cùng của component */}
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Modal>
    );
}
