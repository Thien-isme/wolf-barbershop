import { useEffect, useState } from 'react';
import { Row } from 'antd';
import ProductList from './ProductList/ProductList';
import { getAllProductsForSaleAsync } from '../../../api/productApi';
import { getAllProductType } from '../../../api/productTypeApi';
import { getAllBrands } from '../../../api/brandApi';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import type { ProductTypeDTO } from '../../../types/ResponseDTOs/productTypeDTO';
import type { BrandDTO } from '../../../types/ResponseDTOs/brandDTO';

import FilterProduct from './FilterProduct/FiterProduct';
function ProductPage() {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [productType, setProductTypes] = useState<ProductTypeDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [filter, setFilter] = useState({
        brands: [] as number[],
        productTypes: [] as number[],
        price: [0, 2000000],
    });

    useEffect(() => {
        getAllProductType().then(res => {
            if (res?.data) {
                setProductTypes(res.data);
            }
        });
    }, []);

    useEffect(() => {
        getAllProductsForSaleAsync().then(res => {
            if (res?.data) {
                setProducts(res.data);
            }
        });
    }, []);

    useEffect(() => {
        getAllBrands().then(res => {
            if (res?.data) {
                setBrands(res.data);
            }
        });
    }, []);

    const filteredProducts = products.filter(product => {
        // Lọc theo brand
        if (
            filter.brands.length &&
            (product.brandId === undefined ||
                !filter.brands.includes(product.brandId))
        ) {
            return false;
        }
        // Lọc theo loại hàng
        if (
            filter.productTypes.length &&
            (product.productTypeId === undefined ||
                !filter.productTypes.includes(product.productTypeId))
        )
            return false;
        // Lọc theo giá
        const price =
            product.productPriceDTO?.discountedPrice ??
            product.productPriceDTO?.originalPrice ??
            0;

        if (price < filter.price[0] || price > filter.price[1]) return false;
        return true;
    });

    return (
        <div style={{ padding: 24 }}>
            <Row gutter={32} align='top'>
                <FilterProduct
                    productTypes={productType}
                    brands={brands}
                    filter={filter}
                    setFilter={setFilter}
                />
                <ProductList products={filteredProducts} />
            </Row>
        </div>
    );
}

export default ProductPage;
