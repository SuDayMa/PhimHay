import {  SlidePhimboAPI } from "../../../Services/API"
import type { Danhsach, Phim } from "../../../types/Phimtype"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import './Stylecard.css';
import Icon from "../../Icon";

export default function slidetop10phimbo (){
    const [danhsach, setDanhSach] = useState<Danhsach |null>(null);
    const [selectedServer] = useState<string | null>(null)
    const [phim] = useState<Phim| null>(null);
    useEffect(() => {
            const LoadingDanhsach = async () => {
                try{
                    
                    const phimboData = await SlidePhimboAPI('/phim-bo')
                    if(phimboData){
                        setDanhSach(phimboData);
                    }
                } catch (error) {
                    console.error("Error fetching Theloai data:", error);
                } 
            }
            LoadingDanhsach();
        }, []);

        return (
            <>
            <Swiper
        slidesPerView={6}
        spaceBetween={30}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
                1024:{ slidesPerView: 4, spaceBetween: 20 },
                1440:{ slidesPerView: 5, spaceBetween: 12 },
                768:{ slidesPerView: 3, spaceBetween: 20 },
                1658:{ slidesPerView: 6, spaceBetween: 35 },
                425:{slidesPerView: 2, spaceBetween: 20},
                375:{slidesPerView: 1.1, spaceBetween: 20},
                320:{slidesPerView: 1.1, spaceBetween: 20}
            }}
      >
        {danhsach?.data.items.slice(0, 10).map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flip-card ">
                            <div className="flip-card-inner hover:border-5 hover:border-amber-200 duration-200">
                                {/* Mặt trước */}
                                <div  className="flip-card-front ">
                                    <img src={`${danhsach.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="rounded-lg h-[400px] w-full "/>
                                </div>
                                {/* Mặt sau */}
                                <div className="flip-card-back bg-[#2F3346]">
                                    <Link to={`/phim/${item.slug}`}>
                                    <img src={`${danhsach.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="w-full h-50 object-cover mask-b-from-10%" />
                                    <div className="flex flex-col h-full px-[7px]">
                                        <h3 className="text-white font-bold text-[14px] mb-1 mt-2 line-clamp-1">{item.name}</h3>
                                        <p className="text-gray-300 text-sm mb-2 line-clamp-1">{item.origin_name}</p>
                                        <div className="">
                                            <Link 
                                                to={`/Player/${item.slug}/${encodeURIComponent(selectedServer ?? `${phim?.movie.category[0].name}`)}/${item.tmdb.type === "tv" ? "tap-01":"full"}`}
                                                className="bg-gradient-to-r from-[#d1ad52] via-[#e4c36f] to-[#FFE8AC] transition-colors text-black py-1 px-4 w-[50%] max-[500px]:w-[70%] flex rounded-lg justify-center items-center "
                                            >
                                            <p className="text-[20px]"><Icon name='right'/></p>
                                            <span className="text-[14px] ">Xem Ngay</span>
                                            </Link>
                                        </div>
                                        <div className="flex gap-2 mb-[10px]">
                                            {item.episode_current && (
                                            <div className=" text-white text-xs px-2 py-1 rounded-md bg-[#3B4052] mt-2">
                                                {item.episode_current}
                                            </div>
                                        )}
                                            {item.tmdb.season && (
                                                <div className="px-2 py-1 text-xs rounded-md bg-[#3B4052] mt-2">Phần {item.tmdb.season}</div>
                                            )}
                                            <div className="px-2 py-1 text-xs rounded-md bg-[#3B4052] mt-2">
                                                <span >{item.year}</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            
                                                <div className="flex flex-wrap gap-2 text-[11px] max-[500px]:text-[8px] text-gray-300">
                                                    {item.category.map((item) => (
                                                        <Link to={`/the-loai/${item.slug}`}>
                                                        <div>{item.name}</div>
                                                        </Link>
                                                    ))}
                                                </div>
                                        
                                        </div>
                                        
                                        
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                        <div key={index} className="flex gap-1 mt-[10px]">
                            <div className=" text-[60px] font-bold bg-gradient-to-r from-[#FED876]  to-[#FFE7AA] bg-clip-text text-transparent rotate-3 pr-[12px]">{index + 1}</div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-white text-[16px] line-clamp-1">
                                        {item.name}
                                    </div>
                                    <div className="text-gray-500 line-clamp-1">
                                        {item.origin_name}
                                    </div>
                                    <div className="flex gap-2 max-[426px]:gap-2 mb-[9px] text-white">
                                            {item.quality && (
                                            <div className=" text-[9px]  py-1 mt-2 font-bold text-amber-200 border-amber-200 border-1 rounded-md p-1">
                                                {item.quality}
                                            </div>
                                            )}
                                            {item.tmdb.season && (
                                                <div className=" py-1 text-[9px] mt-2  border-white border-1 rounded-md p-1">Phần {item.tmdb.season}</div>
                                            )}
                                            {item.episode_current && (
                                            <div className=" py-1 text-[9px] mt-2  border-white border-1 rounded-md p-1">
                                                {item.episode_current}
                                            </div>
                                             )}
                                        </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
      </>
        
    )
}