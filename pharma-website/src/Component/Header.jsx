import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import slide2 from "../assets/slide2.jpg";
import "swiper/css";
import "swiper/css/navigation";

import Swipercard from "./Swipercard";

const Header = () => {
  return (
    <Swiper
      navigation
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <Swipercard
          img={slide2}
          title="Precision Manufacturing"
          description="Advanced pharmaceutical manufacturing built around quality, safety, and innovation."
        />
      </SwiperSlide>

      <SwiperSlide>
        <Swipercard
          img={slide2}
          title="Global Impact"
          description="Serving patients across Russia and beyond with high-quality pharmaceutical products and innovative healthcare solutions."
        />
      </SwiperSlide>

      <SwiperSlide>
        <Swipercard
          img={slide2}
          title="Healthcare Solutions"
          description="Delivering reliable pharmaceutical solutions through advanced technology and expertise."
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Header;
