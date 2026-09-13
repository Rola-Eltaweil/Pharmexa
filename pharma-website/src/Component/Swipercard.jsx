import { SwiperSlide } from "swiper/react";

const Swipercard = ({ img, title, description }) => {
  return (
    <>
      <div className="w-full  ">
        <img src={img} className="h-110  w-full object-cover relative" />
        <div className="absolute inset-0 bg-black/35 w-full h-full"></div>
      </div>

      <div className="absolute px-5 inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
        <h3 className="text-2xl  lg:text-4xl font-bold">{title}</h3>

        <p className="max-w-2xl  md:text-md text-sm lg:text-xl">
          {description}
        </p>
      </div>
    </>
  );
};

export default Swipercard;
