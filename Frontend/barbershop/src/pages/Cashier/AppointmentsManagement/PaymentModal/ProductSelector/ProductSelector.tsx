import { Select } from 'antd';
import type { ProductTypeDTO } from '../../../../../types/ResponseDTOs/productTypeDTO';

interface ProductSelectorProps {
    productTypes: ProductTypeDTO[];
    selectedValue?: string;
    onSelect: (value: string) => void;
    placeholder?: string;
}

const { Option, OptGroup } = Select;

export default function ProductSelector({
    productTypes,
    selectedValue,
    onSelect,
    placeholder = 'Chọn sản phẩm để thêm',
}: ProductSelectorProps) {
    // Nhóm sản phẩm theo loại
    const groupedProducts = productTypes.reduce(
        (acc: any, productType: ProductTypeDTO) => {
            const typeName = productType.productTypeName || 'Khác';

            if (productType.productDTOs && productType.productDTOs.length > 0) {
                productType.productDTOs.forEach((product: any) => {
                    if (!acc[typeName]) {
                        acc[typeName] = [];
                    }
                    acc[typeName].push(product);
                });
            }

            return acc;
        },
        {}
    );

    return (
        <div style={{ marginBottom: 16 }}>
            <Select
                showSearch
                placeholder={placeholder}
                style={{ width: '100%' }}
                value={selectedValue}
                onChange={onSelect}
                filterOption={(input, option) =>
                    String(option?.children || '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
            >
                {Object.entries(groupedProducts).map(([typeName, productsInType]) => (
                    <OptGroup key={typeName} label={typeName}>
                        {(productsInType as any[]).map((product: any) => (
                            <Option
                                key={`${product.productId}-${product.sizeId || 'no-size'}-${product.sizeName || 'no-name'}`}
                                value={`${product.productId}-${product.sizeId || ''}-${product.sizeName || ''}`} // ✅ Đúng format: productId-sizeId-sizeName
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>
                                        {product.productName}
                                        {product.sizeName ? ` (${product.sizeName})` : ''}
                                    </span>
                                    <span style={{ color: '#888' }}>
                                        {product.productPriceDTO
                                            ? (
                                                  product.productPriceDTO
                                                      .discountedPrice ||
                                                  product.productPriceDTO.originalPrice ||
                                                  0
                                              ).toLocaleString('vi-VN')
                                            : '0'}
                                        đ
                                    </span>
                                </div>
                            </Option>
                        ))}
                    </OptGroup>
                ))}
            </Select>
        </div>
    );
}
