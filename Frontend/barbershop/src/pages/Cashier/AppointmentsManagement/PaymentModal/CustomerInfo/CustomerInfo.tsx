import type { AppointmentDTO } from '../../../../../types/ResponseDTOs/appointmentDTO';
interface CustomerInfoProps {
    record: AppointmentDTO;
    // các props khác...
}
function CustomerInfo({ record }: CustomerInfoProps) {
    return (
        <div
            style={{
                backgroundColor: '#f5f5f5',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: 16,
                display: 'flex',
                // gap: '40px',
                justifyContent: 'space-between',
            }}
        >
            <div>
                <div style={{ marginBottom: 4 }}>
                    <strong>Khách hàng:</strong>{' '}
                    {record?.userDTO?.fullName || 'N/A'}
                </div>
                <div>
                    <strong>Số điện thoại:</strong>{' '}
                    {record?.userDTO?.phone || 'N/A'}
                </div>
                <div>
                    <strong>Số điểm:</strong>{' '}
                    <span style={{ color: 'green' }}>
                        {record?.userDTO?.loyaltyPointDTO?.totalPoints || 'N/A'}
                    </span>
                </div>
            </div>

            <div>
                <div style={{ marginBottom: 4 }}>
                    <strong>Thợ cắt:</strong>{' '}
                    {record?.employeeDTO?.fullName || 'N/A'}
                </div>
            </div>
        </div>
    );
}

export default CustomerInfo;
