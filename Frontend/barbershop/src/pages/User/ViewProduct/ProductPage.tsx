import { useEffect, useState } from 'react';
import ProductBody from './ProductBody';
import { getAllProductType } from '../../../api/productTypeApi';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import type { ProductTypeDTO } from '../../../types/ResponseDTOs/productTypeDTO';

function ProductPage() {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [productType, setProductTypes] = useState<ProductTypeDTO[]>([]);

    useEffect(() => {
        getAllProductType().then(res => {
            if (res?.data) {
                setProductTypes(res.data);
            }
        });
    }, []);

    return (
        <div>
            <ProductBody products={products} productTypes={productType} />
        </div>
    );
}

export default ProductPage;
