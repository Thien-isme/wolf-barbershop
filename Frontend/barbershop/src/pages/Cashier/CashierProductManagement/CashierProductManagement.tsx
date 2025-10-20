import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SidebarLayout from '../Sidebar/SidebarLayout';
import { getAllProductType } from '../../../api/productTypeApi';
import type { ProductTypeDTO } from '../../../types/ResponseDTOs/productTypeDTO';
import { useState, useEffect } from 'react';
import { GetAllProductInBranch } from '../../../api/branchesProductApi';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import { getAllBrands } from '../../../api/brandApi';
import type { BrandDTO } from '../../../types/ResponseDTOs/brandDTO';
import CashierProductFilter from './CashierProductFilter/CashierProductFilter';
import CashierProductTable from './CashierProductList/CashierProductList';

import { getBranchs } from '../../../api/branchApi';
import type { BranchDTO } from '../../../types/ResponseDTOs/branchDTO';

// add quantity
const { Title } = Typography;

import styled from './style.module.scss';

const brandColor = '#ffb300'; // vàng đồng

export default function ProductManagement() {
    const [productTypes, setProductTypes] = useState<ProductTypeDTO[]>([]);
    const [productList, setProductList] = useState<ProductDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [branches, setBranches] = useState<BranchDTO[]>([]);
    const [filters, setFilters] = useState({
        branch: undefined,
        type: undefined,
        brand: undefined,
        minPrice: '',
        maxPrice: '',
        searchName: '',
    });

    useEffect(() => {
        getAllProductType().then(res => {
            if (res?.data) {
                setProductTypes(res.data);
            }
        });

        GetAllProductInBranch().then(res => {
            if (res?.data) {
                setProductList(res.data);
            }
        });

        getAllBrands().then(res => {
            if (res?.data) {
                setBrands(res.data);
            }
        });

        getBranchs().then(res => {
            if (res?.data) {
                setBranches(res.data);
            }
        });
    }, []);

    const filteredProducts = productList.filter(product => {
        // Filter theo chi nhánh (nếu cần)
        // if (filters.branch && product.branchId !== filters.branch) return false;

        // Filter theo loại sản phẩm
        if (filters.type && product.productTypeId !== filters.type) return false;

        // Filter theo thương hiệu
        if (filters.brand && product.brandId !== filters.brand) return false;

        // Filter theo giá tối thiểu
        if (filters.minPrice) {
            const minPrice = Number(filters.minPrice);
            const productPrice =
                product.productPriceDTO?.discountedPrice ||
                product.productPriceDTO?.originalPrice ||
                0;
            if (productPrice < minPrice) return false;
        }

        // Filter theo giá tối đa
        if (filters.maxPrice) {
            const maxPrice = Number(filters.maxPrice);
            const productPrice =
                product.productPriceDTO?.discountedPrice ||
                product.productPriceDTO?.originalPrice ||
                0;
            if (productPrice > maxPrice) return false;
        }

        // ✅ THÊM LOGIC FILTER THEO TÊN SẢN PHẨM
        if (filters.searchName) {
            const searchTerm = filters.searchName.toLowerCase().trim();
            const productName = product.productName?.toLowerCase() || '';
            if (!productName.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });

    return (
        <SidebarLayout>
            <div
                style={{
                    background: '#f5f5f7',
                    minHeight: '100vh',
                    padding: '32px 40px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        minWidth: 1560,
                        margin: '0 auto',
                        padding: '0 0px',
                    }}
                >
                    {/* Header */}
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <Title
                            level={1}
                            style={{
                                textAlign: 'center',
                                fontWeight: 900,
                                fontSize: 32,
                                letterSpacing: 2,
                                color: '#fff',
                                margin: '0 0 4px 0',
                                textShadow: '0 2px 12px #ff9800, 0 0px 24px #222',
                                fontFamily: "'Oswald', 'Montserrat', Arial, sans-serif",
                                lineHeight: 1.1,
                                background:
                                    'linear-gradient(90deg, #ffd600 0%, #ff9800 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Quản lý sản phẩm
                        </Title>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginBottom: '32px',
                            position: 'relative',
                        }}
                    >
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            className={styled['add-product-btn']}
                            onMouseEnter={e =>
                                (e.currentTarget.style.background = '#ffa000')
                            }
                            onMouseLeave={e =>
                                (e.currentTarget.style.background = brandColor)
                            }
                        >
                            Thêm mới sản phẩm
                        </Button>
                    </div>

                    {/* Filters */}
                    <CashierProductFilter
                        productTypes={productTypes}
                        brands={brands}
                        branches={branches}
                        filters={filters}
                        setFilters={setFilters}
                    />

                    {/* Products Grid với số lượng kết quả */}
                    <div
                        style={{
                            marginBottom: 16,
                            color: '#666',
                            textAlign: 'right',
                        }}
                    >
                        Hiển thị {filteredProducts.length} / {productList.length} sản phẩm
                    </div>

                    <CashierProductTable productList={filteredProducts} />

                    {/* Hiển thị message khi không có kết quả */}
                    {filteredProducts.length === 0 && (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '60px 20px',
                                color: '#999',
                                fontSize: 16,
                            }}
                        >
                            Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
