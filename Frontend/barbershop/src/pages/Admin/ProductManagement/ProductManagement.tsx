import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SidebarLayout from '../Sidebar/AdminSidebarLayout';
import { getAllProductType } from '../../../api/productTypeApi';
import type { ProductTypeDTO } from '../../../types/ResponseDTOs/productTypeDTO';
import { useState, useEffect } from 'react';
import { getAllProductsToManagement } from '../../../api/productApi';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import { getAllBrands } from '../../../api/brandApi';
import type { BrandDTO } from '../../../types/ResponseDTOs/brandDTO';
import ProductFilter from './ProductFilter';
import ProductGrid from './ProductList';

import { getBranchs } from '../../../api/branchApi';
import type { BranchDTO } from '../../../types/ResponseDTOs/branchDTO';
const { Title } = Typography;

import styled from './styled.module.scss';

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
    });

    useEffect(() => {
        getAllProductType().then(res => {
            if (res?.data) {
                setProductTypes(res.data);
            }
        });

        getAllProductsToManagement().then(res => {
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
        // if (filters.branch && product.branchId !== filters.branch) return false;
        if (filters.type && product.productTypeId !== filters.type) return false;
        if (filters.brand && product.brandId !== filters.brand) return false;
        if (
            filters.minPrice &&
            (!product.productPriceDTO ||
                product.productPriceDTO.discountedPrice === undefined ||
                product.productPriceDTO.discountedPrice < Number(filters.minPrice))
        )
            return false;

        if (
            filters.maxPrice &&
            (!product.productPriceDTO ||
                product.productPriceDTO.discountedPrice === undefined ||
                product.productPriceDTO.discountedPrice > Number(filters.maxPrice))
        )
            return false;
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
                    <ProductFilter
                        productTypes={productTypes}
                        brands={brands}
                        branches={branches}
                        filters={filters}
                        setFilters={setFilters}
                    />

                    {/* Products Grid */}
                    <ProductGrid productList={filteredProducts} />
                </div>
            </div>
        </SidebarLayout>
    );
}
