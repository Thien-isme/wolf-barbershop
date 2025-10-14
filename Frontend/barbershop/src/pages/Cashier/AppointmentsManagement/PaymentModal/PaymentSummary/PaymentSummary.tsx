interface PaymentSummaryProps {
    subtotal: number;
    discount?: number;
    total: number;
}

export default function PaymentSummary({
    subtotal,
    discount = 0,
    total,
}: PaymentSummaryProps) {
    return (
        <div
            style={{
                backgroundColor: '#f9f9f9',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: 16,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                }}
            >
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                }}
            >
                <span>Giảm giá:</span>
                <span style={{ color: discount > 0 ? '#ff4d4f' : '#666' }}>
                    -{discount.toLocaleString('vi-VN')}đ
                </span>
            </div>
            <hr
                style={{
                    margin: '8px 0',
                    border: 'none',
                    borderTop: '1px solid #ddd',
                }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    fontSize: '16px',
                }}
            >
                <span>Tổng tiền:</span>
                <span style={{ color: '#ff6600' }}>
                    {total.toLocaleString('vi-VN')}đ
                </span>
            </div>
        </div>
    );
}
