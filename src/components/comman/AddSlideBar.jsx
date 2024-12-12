import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import banner from "../../assest/mainbanner.png";
import Link from "next/link";

const AddSlideBar = () => {
  const { ads } = useSelector((state) => state.news);

  return (
    <>
      <div className="flex justify-center items-center -mb-30 lg:mt-0 mt-[110px] ">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          // onSwiper={(swiper) => console.log(swiper)}
          className=""
        >
          {Array.isArray(ads) &&
            ads.map(
              (currElem, index) =>
                currElem?.type === "top-add" && (
                  <SwiperSlide key={index}>
                    <Link
                      href={currElem?.url}
                      target="_blank"
                      className="max-h-[200px]"
                    >
                      <img
                        src={currElem?.image}
                        alt="not found"
                        className="w-full max-h-[200px]"
                      />
                    </Link>
                  </SwiperSlide>
                )
            )}
        </Swiper>

        {/* <div className="mb-4">
        <img src={banner} alt="" />
      </div> 
      
      
      
      
           <Link href={currElem?.url} target="_blank" className="min-h-[200px] w-full overflow-hidden flex items-center justify-center border border-black shadow-2xl bg-gray-200">
                    <img
                      src={currElem?.image}
                      alt="not found"
                      className="object-cover w-full h-full min-h-[200px] min-w-full max-w-[200px] max-h-[200px]"



                    />
                  </Link>
      
      
      
      */}
      </div>
    </>
  );
};

export default AddSlideBar;
