import { useNavigate } from 'react-router-dom';

const logo = () => {
    const navigate = useNavigate();


    return (
        <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          cursor: 'pointer', // Đổi con trỏ khi hover
          transition: 'transform 0.2s',
        }}
        onClick={() => navigate('//')}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src="https://res.cloudinary.com/duzh5dnul/image/upload/v1755951808/logo6_nqy39c.png"
          alt="BarberShop Logo"
          style={{
            height: 70,
            transition: 'box-shadow 0.2s',
            boxShadow: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
        />
      </div>
    );
}


export default logo;










