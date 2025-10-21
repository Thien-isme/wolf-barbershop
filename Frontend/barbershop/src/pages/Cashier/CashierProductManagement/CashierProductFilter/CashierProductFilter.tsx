import { Select, Space, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import type { ProductTypeDTO } from '../../../../types/ResponseDTOs/productTypeDTO';
import type { BrandDTO } from '../../../../types/ResponseDTOs/brandDTO';
import type { BranchDTO } from '../../../../types/ResponseDTOs/branchDTO';

const borderColor = '#e0e0e0';

interface ProductFilterProps {
    productTypes: ProductTypeDTO[];
    brands: BrandDTO[];
    branches: BranchDTO[];
    filters: {
        branch: any;
        type: any;
        brand: any;
        minPrice: string;
        maxPrice: string;
        searchName: string;
    };
    setFilters: (filters: any) => void;
}

export default function ProductFilter({
    productTypes,
    brands,
    branches,
    filters,
    setFilters,
}: ProductFilterProps) {
    // State riêng cho search input để debounce
    const [searchValue, setSearchValue] = useState(filters.searchName || '');

    // Debounce search - chỉ update filter sau 300ms không gõ
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters({ ...filters, searchName: searchValue });
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Sync searchValue khi filters.searchName thay đổi từ bên ngoài (reset)
    useEffect(() => {
        setSearchValue(filters.searchName || '');
    }, [filters.searchName]);

    const handleReset = () => {
        setFilters({
            branch: undefined,
            type: undefined,
            brand: undefined,
            minPrice: '',
            maxPrice: '',
            searchName: '',
        });
        setSearchValue(''); // Reset search input
    };

    return (
        <div
            style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 8px #eee',
                padding: '18px 24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 32,
                marginBottom: 32,
                flexWrap: 'wrap',
            }}
        >
            <Select
                placeholder='CHI NHÁNH'
                value={filters.branch}
                onChange={value => setFilters({ ...filters, branch: value })}
                style={{
                    width: 180,
                    borderRadius: 12,
                    border: `1px solid ${borderColor}`,
                    background: '#f8f8fa',
                }}
                dropdownStyle={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px #eee',
                }}
                options={branches.map(branch => ({
                    value: branch.branchId,
                    label: branch.branchName,
                }))}
            />

            <Select
                placeholder='DANH MỤC'
                value={filters.type}
                onChange={value => setFilters({ ...filters, type: value })}
                style={{
                    width: 180,
                    borderRadius: 12,
                    border: `1px solid ${borderColor}`,
                    background: '#f8f8fa',
                }}
                dropdownStyle={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px #eee',
                }}
                options={productTypes.map(pt => ({
                    value: pt.productTypeId,
                    label: pt.productTypeName,
                }))}
            />

            <Select
                placeholder='THƯƠNG HIỆU'
                value={filters.brand}
                onChange={value => setFilters({ ...filters, brand: value })}
                style={{
                    width: 180,
                    borderRadius: 12,
                    border: `1px solid ${borderColor}`,
                    background: '#f8f8fa',
                }}
                dropdownStyle={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px #eee',
                }}
                options={brands.map(brand => ({
                    value: brand.brandId,
                    label: brand.brandName,
                }))}
            />

            <Space>
                <span style={{ fontWeight: 500, color: '#222' }}>Khoảng giá:</span>
                <Input
                    placeholder='0đ'
                    value={filters.minPrice}
                    onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
                    style={{
                        width: 100,
                        borderRadius: 12,
                        border: `1px solid ${borderColor}`,
                        background: '#f8f8fa',
                        textAlign: 'center',
                        fontWeight: 500,
                    }}
                />
                <span style={{ fontWeight: 500, color: '#222' }}>-</span>
                <Input
                    placeholder='2.000.000đ'
                    value={filters.maxPrice}
                    onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
                    style={{
                        width: 120,
                        borderRadius: 12,
                        border: `1px solid ${borderColor}`,
                        background: '#f8f8fa',
                        textAlign: 'center',
                        fontWeight: 500,
                    }}
                />
            </Space>

            <Button
                type='default'
                onClick={handleReset}
                style={{
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 16,
                    height: 40,
                    marginLeft: 8,
                    background: '#fff',
                    border: `1px solid ${borderColor}`,
                    boxShadow: '0 1px 4px #eee',
                    transition: 'all 0.2s',
                }}
            >
                Xóa lọc
            </Button>

            {/* TÌM KIẾM VỚI DEBOUNCE */}
            <Input
                placeholder='Tìm kiếm theo tên sản phẩm...'
                value={searchValue} // Dùng state riêng
                onChange={e => setSearchValue(e.target.value)} // Update state riêng
                prefix={<SearchOutlined style={{ color: '#999' }} />}
                style={{
                    width: 220,
                    borderRadius: 12,
                    border: `1px solid ${borderColor}`,
                    background: '#f8f8fa',
                    fontWeight: 500,
                }}
                allowClear
                onClear={() => setSearchValue('')}
            />
        </div>
    );
}
