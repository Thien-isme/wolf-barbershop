import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ServicesOutstanding from './ServicesOutstanding/ServicesOutstanding';
import ProductsOutstanding from './ProductsOutstanding/ProductsOutstanding';
import Branches from './Branches/Branches';
import OutstandingHair from './HairStylesOutstanding/OutstandingHair';
import OurService from './OurService/OurService';
import ShortVideos from './ShortVideo/ShortVideos';
import Banner from './Banner/Banner';

const sliderSettings = (slidesToShow = 3) => ({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 992,
            settings: { slidesToShow: Math.max(1, slidesToShow - 1) },
        },
        { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
});
const HomePage = () => {
    return (
        <>
            {/* Banner */}
            <div style={{ marginBottom: 32 }}>
                <Slider autoplay {...sliderSettings(1)}>
                    <Banner />
                    {/* Thêm các banner khác nếu muốn */}
                </Slider>
            </div>
            <ServicesOutstanding />
            <ProductsOutstanding />
            <Branches />
            <OutstandingHair />
            <OurService />
            <ShortVideos />
        </>
    );
};

export default HomePage;
