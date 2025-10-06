import { Col, Slider, Checkbox, Collapse } from 'antd';
import type { ProductTypeDTO } from '../../../../types/ResponseDTOs/productTypeDTO';
import type { BrandDTO } from '../../../../types/ResponseDTOs/brandDTO';
const { Panel } = Collapse;

interface FilterProps {
    productTypes: ProductTypeDTO[];
    brands: BrandDTO[];
    filter: {
        brands: number[];
        productTypes: number[];
        price: number[];
    };
    setFilter: React.Dispatch<
        React.SetStateAction<{
            brands: number[];
            productTypes: number[];
            price: number[];
        }>
    >;
}

function FilterProduct({
    productTypes,
    brands,
    filter,
    setFilter,
}: FilterProps) {
    const productTypeNames = productTypes;
    const brandNames = brands;
    return (
        <Col xs={24} sm={8} md={6} lg={5} xl={4}>
            <div
                style={{
                    background: '#fff',
                    borderRadius: 8,
                    padding: 16,
                    border: '1px solid #eee',
                }}
            >
                <div style={{ marginBottom: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>
                        Khoảng giá
                    </div>
                    <Slider
                        range
                        min={0}
                        max={2000000}
                        value={filter.price}
                        onChange={value =>
                            setFilter(f => ({ ...f, price: value as number[] }))
                        }
                        tipFormatter={value => value?.toLocaleString() + 'đ'}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 13,
                        }}
                    >
                        <span>0đ</span>
                        <span>2.000.000đ</span>
                    </div>
                </div>
                <Collapse ghost defaultActiveKey={['1', '2', '3', '4']}>
                    <Panel header='Thương hiệu' key='1'>
                        <Checkbox.Group
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            value={filter.brands}
                            onChange={checkedValues =>
                                setFilter(f => ({
                                    ...f,
                                    brands: checkedValues as number[],
                                }))
                            }
                        >
                            {brandNames.map(b => (
                                <Checkbox key={b.brandId} value={b.brandId}>
                                    {b.brandName}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                        <a
                            style={{
                                fontSize: 13,
                                color: '#1890ff',
                            }}
                        >
                            Xem thêm
                        </a>
                    </Panel>
                    <Panel header='Loại hàng' key='2'>
                        <Checkbox.Group
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            onChange={checkedValues =>
                                setFilter(f => ({
                                    ...f,
                                    productTypes: checkedValues as number[],
                                }))
                            }
                        >
                            {productTypeNames.map(c => (
                                <Checkbox
                                    key={c.productTypeId}
                                    value={c.productTypeId}
                                >
                                    {c.productTypeName}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Panel>
                </Collapse>
            </div>
        </Col>
    );
}

export default FilterProduct;
