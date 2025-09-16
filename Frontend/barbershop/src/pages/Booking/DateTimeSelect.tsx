import { Card, Typography, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const DateTimeSelect = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timeSlots,
  disabledTimes = [],
}: {
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (date: dayjs.Dayjs | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  timeSlots: string[];
  disabledTimes?: string[];
}) => (
  <>
    <Card
      style={{ background: '#222', border: 'none', marginBottom: 24 }}
      bodyStyle={{ padding: 16, position: 'relative' }}
    >
      <Typography.Title level={5} style={{ color: 'white', marginBottom: 8 }}>
        Ngày đặt lịch <span style={{ color: '#ff4d4f' }}>*</span>
        <span style={{ fontStyle: 'italic', fontWeight: 700, marginLeft: 8 }}>
          {selectedDate
            ? `(Thứ ${selectedDate.day() === 0 ? 8 : selectedDate.day() + 1}, ${selectedDate.format('DD/MM/YYYY')})`
            : ''}
        </span>
      </Typography.Title>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        format="DD/MM/YYYY"
        style={{
          width: '100%',
          background: '#ffffffff',
          color: '#0a0a0aff',
          border: 'none',
          borderRadius: 24,
          fontWeight: 700,
          fontSize: 20,
          padding: '8px 16px',
          marginBottom: 16,
        }}
        popupStyle={{
          background: '#222',
          color: 'white',
          borderRadius: 8,
        }}
        inputReadOnly
        allowClear={false}
        placeholder="Chọn ngày"
      />
    </Card>
    {/* Chú thích trạng thái */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 18, height: 18, background: '#1677ff', borderRadius: 4 }} />
        <span style={{ color: 'white', fontSize: 14 }}>Đang chọn</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 18, height: 18, background: '#fff', borderRadius: 4, border: '2px solid #ccc' }} />
        <span style={{ color: 'white', fontSize: 14 }}>Có thể chọn</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{
          width: 18, height: 18, background: '#888', borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>X</span>
        </div>
        <span style={{ color: 'white', fontSize: 14 }}>Không thể chọn</span>
      </div>
    </div>
    <Card
      style={{ background: '#222', border: 'none', marginBottom: 24 }}
      bodyStyle={{ padding: 16, position: 'relative' }}
    >
      <Typography.Title level={5} style={{ color: 'white', marginBottom: 8 }}>
        Chọn khung giờ dịch vụ <span style={{ color: '#ff4d4f' }}>*</span>
      </Typography.Title>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        {timeSlots.map(slot => {
          const isDisabled = disabledTimes.includes(slot);
          const isSelected = selectedTime === slot;
          return (
            <Button
              key={slot}
              type="default"
              onClick={() => !isDisabled && setSelectedTime(slot)}
              disabled={isDisabled}
              style={{
                background: isSelected
                  ? '#1677ff'
                  : isDisabled
                    ? '#888'
                    : '#fff',
                color: isSelected
                  ? '#fff'
                  : isDisabled
                    ? '#fff'
                    : '#111',
                fontWeight: 700,
                fontSize: 18,
                borderRadius: 16,
                border: 'none',
                height: 48,
                boxShadow: isSelected ? '0 0 0 2px #d0021b33' : undefined,
                opacity: isDisabled ? 0.8 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              block
            >
              {isDisabled
                ? <span style={{ fontWeight: 700 }}>X</span>
                : slot}
            </Button>
          );
        })}
      </div>
    </Card>
  </>
);

export default DateTimeSelect;