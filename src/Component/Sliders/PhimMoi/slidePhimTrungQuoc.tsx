import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import type { QuocGiaResponse, Phim } from '../../../types/Phimtype';
import { slidePhimQuocGia, PhimAPI } from '../../../Services/API';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../Icon';


export default function SlideImage() {
    const [phimTrung, setPhimTrung] = useState<QuocGiaResponse | null>(null);
    const [phim, setPhim] = useState<Phim| null>(null);
    const [selectedServer, setSelectedServer] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPhim = async () => {
            try {
                setLoading(true);
                const XemPhim = await PhimAPI('')
                const Phimtrung = await slidePhimQuocGia('/trung-quoc');
                if (Phimtrung) {
                    setPhimTrung(Phimtrung);
                    console.log('Phim trung',Phimtrung);
                    console.log('Phim trung Tap phim', XemPhim)
                }
            } catch (error) {
                console.error("Error fetching Quoc gia data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhim();
    }, []);

    const Moviephim =  phimTrung?.data.items[0]
     const Typephim =  Moviephim?.tmdb.type === "movie" ? "full" : "tap-01"
  
    return (
        <div>
            <Swiper
        slidesPerView={5}
        spaceBetween={1}
        modules={[Pagination]}  
        loop={true}
        className="mySwiper"
        breakpoints={{
                1024:{ slidesPerView: 3, spaceBetween: 1 },
                1440:{ slidesPerView: 3, spaceBetween: 1 },
                768:{ slidesPerView: 2, spaceBetween: 1 },
                1658:{ slidesPerView: 5, spaceBetween: 1 },
                425:{slidesPerView: 2.2, spaceBetween: 1},
                375:{slidesPerView: 2.1, spaceBetween: 1},
                320:{slidesPerView: 2.1, spaceBetween: 1},
            }}
      >     
            {phimTrung?.data.items.map((item, index) => (
                <SwiperSlide key={index}>
                        <div className="flip-card3 ">
                            <div className="flip-card-inner3 duration-200">
                                {/* Mặt trước */}
                                <div  className="flip-card-front3 ">
                                    <img src={`${phimTrung.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="rounded-lg max-[1441px]:w-100 w-75 h-50 object-cover "/>
                                </div>
                                {/* Mặt sau */}
                                <div className="flip-card-back3 bg-[#2F3346]">
                                    <Link to={`/phim/${item.slug}`}>
                                    <img src={`${phimTrung.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="w-full h-25 object-cover mask-b-from-10%" />
                                    <div className="flex flex-col h-full px-[7px]">
                                        <div className="">
                                            <Link 
                                                to={`/Player/${item.slug}/${encodeURIComponent(selectedServer ?? `${phim?.movie.category[0].name}`)}/${Typephim}`}
                                                className="bg-gradient-to-r from-[#d1ad52] via-[#e4c36f] to-[#FFE8AC] transition-colors text-black py-1 px-3 w-[40%] max-[500px]:w-[80%] flex rounded-lg justify-center items-center "
                                            >
                                            <p className="text-[14px] max-[500px]:text-[10px] max-[400px]:text-[8px]"><Icon name='right'/></p>
                                            <span className="text-[14px] max-[500px]:text-[10px] max-[400px]:text-[8px]">Xem Ngay</span>
                                            </Link>
                                        </div>
                                        <div className="flex gap-2 mb-[10px]">
                                            {item.episode_current && (
                                            <div className=" text-white text-xs px-2 py-1 rounded-md bg-[#3B4052] mt-2 line-clamp-1">
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
                                        <div>
                                            <div className="flex text-[11px] text-gray-300 gap-2 line-clamp-1">
                                                    {item.category.map((item) => (
                                                        <Link to={`/the-loai/${item.slug}`}>
                                                        <div className=' line-clamp-1'>{item.name}</div>
                                                        </Link>
                                                    ))}
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                        <h3 className='text-white text-[14px] pt-[10px] line-clamp-1 w-[90%] pl-[10px] font-semibold'>{item.name}</h3>
                        <p className='text-gray-400 text-[12px] pl-[10px] line-clamp-1 w-[90%]'>{item.origin_name}</p>
                        </div>
                    </SwiperSlide>
            ))}

      </Swiper>
        </div>
    );
}

