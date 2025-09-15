import { Card, Typography, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const DateTimeSelect = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timeSlots,
}: {
  selectedDate: dayjs.Dayjs | null;
  setSelectedDate: (date: dayjs.Dayjs | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  timeSlots: string[];
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
        {timeSlots.map(slot => (
          <Button
            key={slot}
            type={selectedTime === slot ? 'primary' : 'default'}
            onClick={() => setSelectedTime(slot)}
            style={{
              background: selectedTime === slot ? '#1677ff' : '#fff',
              color: selectedTime === slot ? '#fff' : '#111',
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 16,
              border: 'none',
              height: 48,
              boxShadow: selectedTime === slot ? '0 0 0 2px #1677ff33' : undefined,
            }}
            block
          >
            {slot}
          </Button>
        ))}
      </div>
    </Card>
  </>
);

export default DateTimeSelect;