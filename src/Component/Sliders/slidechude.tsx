import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import Icon from '../Icon';

export default function slidechude () {
    return(
        <>
        <Swiper
        slidesPerView={3.4}
        spaceBetween={1}
        modules={[Pagination]}  
        className="mySwiper"
      >     
      <SwiperSlide className="bg-blue-400 rounded-xl hover:-translate-y-[10px] transition-all duration-300">
        <a href="/the-loai/vien-tuong" >
            <div className=" flex pl-5 pr-5 py-8 h-full">
                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                    <div className="text-[10px] font-bold max-[376px]:line-clamp-1">
                        Viễn Tưởng
                    </div>
                    
                </div>
            </div>
         </a>
      </SwiperSlide>
      <SwiperSlide className='bg-[#8282AC] rounded-xl hover:-translate-y-[10px] transition-all duration-300'>
        <a href="/the-loai/the-thao">
            <div className=" flex pl-5 pr-5 py-8 h-full">
                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                    <div className="text-[10px] font-bold max-[376px]:line-clamp-1">
                        Thể Thao
                    </div>
                    
                </div>
            </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className=" bg-[#409984] rounded-xl hover:-translate-y-[10px] transition-all duration-300">
        <a href="/the-loai/am-nhac" >
                            <div className=" flex pl-5 pr-5 py-8 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[10px] font-bold max-[376px]:line-clamp-1">
                                        Âm Nhạc
                                    </div>
                                </div>
                            </div>
                        </a>
      </SwiperSlide>
      <SwiperSlide className=" bg-[#9281C2] rounded-xl hover:-translate-y-[10px] transition-all duration-300">
        <a href="/the-loai/gia-dinh">
                            <div className=" flex pl-5 pr-5 py-8 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[10px] font-bold max-[376px]:line-clamp-1">
                                        Gia Đình
                                    </div>
                                    
                                </div>
                            </div>
                        </a>
      </SwiperSlide>
      <SwiperSlide className=" bg-[#D6947B] rounded-xl hover:-translate-y-[10px] transition-all duration-300">
        <a href="/the-loai/hoc-duong">
                            <div className=" flex pl-5 pr-5 py-8 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[10px] font-bold max-[376px]:line-clamp-1">
                                        Học Đường
                                    </div>
                                    
                                </div>
                            </div>
                        </a>
      </SwiperSlide>
      <SwiperSlide className=" bg-[#B75C5C] rounded-xl hover:-translate-y-[10px] transition-all duration-300">
        <a href="/the-loai/co-trang" >
                            <div className=" flex pl-5 pr-5 py-8 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[10px] font-bold max-[376px]:line-clamp-1">
                                        Cổ Trang
                                    </div>
                                    
                                </div>
                            </div>
                        </a>
      </SwiperSlide>
      <SwiperSlide className=" bg-[#525565] rounded-xl hover:-translate-y-[10px] transition-all duration-300">
        <a href="/chu-de" >
                            <div className=" flex px-5 py-8 h-full">
                                <div className="flex flex-col justify-center items-center w-full gap-5 h-full text-white">
                                    <div className="text-[10px] font-bold max-[376px]:line-clamp-1">
                                        +4 Chủ Đề
                                    </div>
                                </div>
                            </div>
                        </a>
      </SwiperSlide>
      </Swiper>
        </>
    )
}