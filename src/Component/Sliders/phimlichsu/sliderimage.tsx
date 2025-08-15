import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import { useState, useEffect } from 'react';
import type { TheloaiResponse } from '../../../types/Phimtype';
import { slidePhimTheLoai} from '../../../Services/API';
import { Link } from 'react-router-dom'
import Icon from '../../Icon';
import "./stylephimlichsu.css"

function SliderImage() {
    const [Theloailichsu, setTheloailichsu] = useState<TheloaiResponse | null>(null);
    const [selectedServer] = useState<string | null>(null)
    useEffect(() => {
        const LoadingTheLoaiLichSuData = async () => {
            try{
                
                
                const theloailichsuData = await slidePhimTheLoai('/lich-su')
                if(theloailichsuData){
                    setTheloailichsu(theloailichsuData);
                    
                }
            } catch (error) {
                console.error("Error fetching Theloai data:", error);
            } 
        }
        LoadingTheLoaiLichSuData();
    }, []);

        
     
    return (
        <Swiper
            slidesPerView={8}
            spaceBetween={12}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
                1024:{ slidesPerView: 5, spaceBetween: 8 },
                1440:{ slidesPerView: 7, spaceBetween: 20 },
                768:{ slidesPerView: 3, spaceBetween: 20 },
                1658:{ slidesPerView: 8, spaceBetween: 8 },
                425:{slidesPerView: 2, spaceBetween: 20},
                375:{slidesPerView: 2, spaceBetween: 20},
                320:{slidesPerView: 2, spaceBetween: 20},
            }}
            
        >
                {Theloailichsu?.data.items.map((item, index) => (
                <SwiperSlide key={index}>
                        <div className="flip-card2 ">
                            <div className="flip-card-inner2 duration-200 hover:border-5 hover:border-amber-200">
                                {/* Mặt trước */}
                                <div  className="flip-card-front2 ">
                                    <img src={`${Theloailichsu.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="rounded-lg h-[300px] w-full"/>
                                </div>
                                {/* Mặt sau */}
                                <div className="flip-card-back2 bg-[#2F3346]">
                                    <Link to={`/phim/${item.slug}`}>
                                    <img src={`${Theloailichsu.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="w-full h-35 object-cover mask-b-from-10%" />
                                    <div className="flex flex-col h-full px-[7px]">
                                        <h3 className="text-[#ffff] font-bold text-[14px] mb-1 mt-2 line-clamp-1">{item.name}</h3>
                                        <p className="text-gray-300 text-sm mb-2 line-clamp-1">{item.origin_name}</p>
                                        <div className="">
                                            <Link 
                                                to={`/Player/${item.slug}/${encodeURIComponent(selectedServer ?? `${item?.lang}`)}/${item.tmdb.type === "tv" ? "tap-01" : "full" }`}
                                                className="bg-gradient-to-r from-[#d1ad52] via-[#e4c36f] to-[#FFE8AC] transition-colors text-black py-1 px-2 w-[50%] max-[500px]:w-[70%] flex rounded-lg justify-center items-center "
                                            >
                                            <p className="text-[14px] max-[500px]:text-[10px] max-[400px]:text-[8px]"><Icon name='right'/></p>
                                            <span className="text-[14px] max-[500px]:text-[10px] max-[400px]:text-[8px]">Xem Ngay</span>
                                            </Link>
                                        </div>
                                        <div className="flex gap-2 mb-[10px]">
                                            {item.episode_current && (
                                            <div className=" text-[#ffff] text-xs px-2 py-1 rounded-md bg-[#3B4052] mt-2 line-clamp-1">
                                                {item.episode_current}
                                            </div>
                                        )}
                                            {item.quality && (
                                                <div className="px-2 py-1 text-xs rounded-md bg-[#3B4052] mt-2">{item.quality}</div>
                                            )}
                                            <div className="px-2 py-1 text-xs rounded-md bg-[#3B4052] mt-2">
                                                <span >{item.year}</span>
                                            </div>
                                        </div>
                                        
                                        
                                        
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                        <div className='text-center'>
                        <h3 className='text-[#ffff] text-[14px] pt-[10px] line-clamp-1 pr-[10px] font-semibold'>{item.name}</h3>
                        <p className='text-gray-400 text-[12px] line-clamp-1 pr-[10px] '>{item.origin_name}</p>
                    </div>
                    </SwiperSlide>
            ))}
        </Swiper>
    );
}
export default SliderImage;