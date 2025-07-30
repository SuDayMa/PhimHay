
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Controller} from 'swiper/modules';
import type { QuocGiaResponse, Phim } from '../../types/Phimtype';
import { useEffect, useState, useRef } from 'react';
import { slidePhimQuocGia  } from '../../Services/API';
import Icon from '../Icon';
import { Link } from 'react-router-dom';



function slide (){
    const [phimmoicapnhat, setPhimmoicapnhat] = useState<QuocGiaResponse| null>(null);
    const [phim] = useState<Phim| null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedServer] = useState<string | null>(null)
    const swiperRef = useRef<any>(null);
    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.realIndex);
        setCurrentImage(swiper.realIndex);
    };

    useEffect(() => {
        const fetchPhimmoicapnhat = async () => {
            try{    
                const phimData = await slidePhimQuocGia('han-quoc');
                if (phimData) {
                    setPhimmoicapnhat(phimData);
                    console.log(phimData);
                }
            }catch (error) {
                console.error("Error fetching Phimmoicapnhat data:", error);
            }
        };
        fetchPhimmoicapnhat();
    }, []);

    const currentMovie = phimmoicapnhat?.data.items[activeIndex] || phimmoicapnhat?.data.items[0];
    const [currentImage, setCurrentImage] = useState(0);
    const ImageClick = (index: number) => {
        setActiveIndex(index);
        setCurrentImage(index);
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index)
        }
    } 
    const Tylephim = currentMovie?.tmdb.type  === 'movie' ? 'full' : 'tap-01'
    
    return(
    

        <>
        <div className='absolute top-0 h-[10px] left-0 w-full z-1'>
            <Swiper  modules={[Navigation, Pagination, Autoplay , Controller]}
                                spaceBetween={50}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                onSlideChange={handleSlideChange}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                
        >
        {phimmoicapnhat?.data.items.slice(0,6).map((item, index) => (
            <SwiperSlide key={index}>
                <Link to={`/phim/${currentMovie?.slug}`}>
                <div className='h-[850px] max-[1360px]:h-[600px]'>

                <img src={`${phimmoicapnhat.data.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`} alt={`Phim nổi bật ${index + 1}`} className='w-full h-full bg-cover bg-center bg-no-repeat object-cover opacity-60 mask-b-from-10% mask-t-from-90%' />
                <div></div>
                </div>
                </Link>
            </SwiperSlide>
            
        ))}
      </Swiper>
      </div>

      {/* Movie Info */}
      <div className='flex w-full h-[750px] max-[1360px]:h-[500px]'>
            <div className='z-10 w-[60%] max-[1000px]:w-[70%] max-[640px]:w-[100%] max-[640px]:flex max-[640px]:items-center max-[640px]:justify-center max-[640px]:text-center py-[140px] px-[40px] max-[400px]:px-[10px] '>
                <div>
                    <div>
                        
                    </div>
                        {currentMovie?.name && (
                        <div className='mb-[8px] text-white '>
                            <h2 className='font-medium text-[40px] max-[1360px]:text-[28px] max-[640px]:text-[20px]'>{currentMovie.name}</h2>
                        </div>
                    )}
                    <div className='mb-[16px] text-yellow-500 max-[1360px]:text-[15px] max-[1000px]:text-[13px]'>
                        <h1>{currentMovie?.origin_name}</h1>
                    </div>
                    <div className='mb-[16px] flex gap-3 max-[1360px]:text-[12px] max-[1000px]:text-[10px] max-[640px]:text-[10px] max-[350px]:text-[7px]'>
                        {currentMovie?.tmdb && (
                       <div className=' border-yellow-500 border-1 rounded-md px-[6px]'>
                        <span className='text-yellow-500'>IMDb </span>
                        <span className='text-white'>{currentMovie?.tmdb.vote_average}</span>
                       </div>
                       )}
                       {currentMovie?.quality && (
                         <div className='rounded-md px-[6px] bg-blue-500'>
                            <span className='text-white'>{currentMovie?.quality}</span>
                         </div>
                       )}
                       {currentMovie?.tmdb.season && (
                       <div className='  rounded-md px-[6px] bg-white'>
                        <span>Phần {currentMovie?.tmdb.season}</span>
                       </div>
                       )}
                       {currentMovie?.year && (
                        <Link to={`/year/${currentMovie.year}`}>
                       <div className='  rounded-md px-[6px] border-white border-1'>
                        <span className='text-white'>{currentMovie?.year}</span>
                       </div>
                       </Link>
                       )}
                       {currentMovie?.tmdb && (
                        <div className='  rounded-md px-[6px] border-white border-1'>
                        <span className='text-white'>{currentMovie?.time}</span>
                       </div>
                       )}
                       {currentMovie?.episode_current && (
                         <div className='rounded-md px-[6px] border-white border-1'>
                            <span className='text-white'>{currentMovie?.episode_current}</span>
                         </div>
                       )}
                          
                    </div>
                    
                    <div className='mb-[24px] max-[1360px]:text-[12px] max-[640px]:hidden'>
                        {currentMovie?.category&& (
                          <div>
                            {currentMovie.category.map((item, index) => (
                                <Link to={`/the-loai/${item.slug}`}>
                                <span key={index} className='bg-gray-700 px-[8px] rounded-md mr-[8px] text-white py-[4px]'>{item.name}</span>
                                </Link>
                            ))}
                          </div>
                        )}
                    </div>
                    <div className='absolute flex gap-3 right-0 pr-[50px] max-[400px]:pr-[30px] max-[350px]:pr-[10px]   translate-y-50 max-[1441px]:translate-y-30 max-[640px]:translate-y-10'>
                        {phimmoicapnhat?.data.items.slice(0,6).map((item , index) => (
                                <div
                                key={index}
                                onClick={() => ImageClick(index)}
                                aria-label={`${index + 1}`}
                                
                                >
                                <img src={`${phimmoicapnhat.data.APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`} alt="" className={`w-20 max-[1100px]:w-10 max-[1100px]:h-10 h-15 object-cover rounded-lg max-[1100px]:rounded-full ${ currentImage === index ? 'border-2 border-white' : ''}`}/>

                                </div>
                            ))}
                    </div>
                    <div>
                        {currentMovie?.slug &&
                            <div className='flex gap-7 absolute translate-y-50  max-[1441px]:translate-y-30 max-[640px]:hidden'>
                                <a className='bg-gradient-to-r from-[#d1ad52] via-[#e4c36f] to-[#FFE8AC] rounded-full max-[1100px]:w-[50px] max-[1100px]:h-[50px] w-[70px] h-[70px] flex justify-center items-center'>
                            
                                    <Link to={`/Player/${currentMovie.slug}/${encodeURIComponent(selectedServer ?? `${phim?.movie.category[0].name}`)}/${Tylephim}`}>
                                        <i className='text-[36px] font-bold'><Icon name='right'/></i>
                                    </Link>
                                    
                                </a>
                                <div className='rounded-4xl flex border-gray-500 border-2 hover:border-white '>
                                    <a className='flex flex-col justify-center items-center '>
                                        <Link to={`/phim/${currentMovie.slug}`} className='px-[20px]'>
                                            <i className='w-[80px] text-center text-white text-[24px]'><Icon name='heart'/></i>
                                        </Link>
                                    </a>
                                    <a className='flex flex-col border-l-2 border-gray-500 justify-center items-center '>
                                        <Link to={`/phim/${currentMovie.slug}`} className='px-[20px]'>
                                            <i className='w-[80px] text-center text-white text-[24px]'><Icon name='error'/></i>
                                        </Link>
                                    </a>
                                </div>
                            </div>
                            
                        }
                    </div>
                </div>
            </div>
      </div>
        </>
    )
}
export default slide