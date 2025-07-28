
import ReactPlayer from 'react-player'
import { useState, useEffect } from "react";
import { PhimAPI } from "../Services/API";
import type { Phim } from "../types/Phimtype";
import { Link, useParams } from "react-router-dom";
import Loading from './Loading';
import Icon from '../Component/Icon';
export default function Video(){
    const {slug ,server , episodeSlug} = useParams();
    const [phim, setPhim] = useState<Phim | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedServer, setSelectedServer] = useState<string | null>(server || null)
    useEffect(() => {
        const loadingPhim = async () => {
            try {
                setLoading(true);
                if (!slug) return
                const PhimData = await PhimAPI(slug);
                if (PhimData) {
                    setPhim(PhimData);
                    console.log('phim data',PhimData);
                    if (server && PhimData.episodes.find((item : any) => item.server_name === server)) {
                        setSelectedServer(server);
                    }else  if (PhimData.episodes && PhimData.episodes.length > 0) {
                        setSelectedServer(PhimData.episodes[0].server_name);
                    }else {
                        setSelectedServer(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching Phim data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadingPhim();
    }, [slug,server]);
    
    const tapphim = phim?.episodes.find((item) => item.server_name === selectedServer)?.server_data.find((server) => server.slug === episodeSlug)
    return(
        <>
            {loading ? (
                <p ><Loading /></p>
            ) : (
                <div>
                    <div>
                        <div className=' mx-[330px] max-[2000px]:mx-[128px] max-[1100px]:mx-0 px-[50px] max-[500px]:px-[20px] items-center pt-[50px]'>
                             
                            <ReactPlayer 
                            controls={true}
                            playing={true}
                            pip={true}
                            src={tapphim?.link_m3u8}
                            width="100%"
                            height="auto"
                            className=' shadow-black'/>
                            

                            <div className='bg-black text-white '>
                                <div className='px-[16px] flex gap-3 py-[16px] max-[400px]:text-[12px] max-[350px]:text-[10px] '>
                                    <div className='px-[9px] py-[12px] flex gap-2 hover:bg-gray-800'>
                                        <i><Icon name='heart'/></i>
                                        <span>Yêu thích</span>
                                    </div>
                                    <div className='px-[9px] py-[12px] flex gap-2 hover:bg-gray-800'>
                                        <i><Icon name='+'/></i>
                                        <span>Thêm vào</span>
                                    </div>
                                    <div className='px-[9px] py-[12px] flex gap-2 hover:bg-gray-800'>
                                        <i><Icon name='telegram'/></i>
                                        <span>Chia sẻ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-[330px] max-[2000px]:mx-[128px] max-[1100px]:mx-0 px-[50px] max-[500px]:px-[20px] '>
                            <div className='p-[40px] max-[500px]:p-0'>
                                <div className='pb-[40px] flex gap-5 text-white max-[1100px]:hidden'>
                                    <div>
                                        <img src={phim?.movie.poster_url} className='w-[100px] rounded-lg'/>
                                    </div>
                                    <div className='w-[40%]'>
                                        <h2 className='mb-[8px] font-medium text-[20px]'>
                                            {phim?.movie.name}
                                        </h2>
                                        <div className='mb-[20px] text-amber-200'>
                                            {phim?.movie.origin_name}
                                        </div>
                                        <div className='flex gap-2 mb-[12px]'>
                                                <div className='border-1 border-amber-200  rounded-md px-[8px]'>
                                                    <span className='text-amber-200'>IMDb </span>
                                                    {phim?.movie.tmdb.vote_average}
                                                </div>
                                            {phim?.movie.quality && (
                                                <div className=' border-1 rounded-md px-[8px] bg-white text-black'>
                                                    {phim.movie.quality}
                                                </div>
                                            )}
                                            {phim?.movie.year && (
                                                <div className='border-1 rounded-md px-[8px]'>
                                                    {phim.movie.year}
                                                </div>
                                            )}
                                            {phim?.movie.tmdb.season && (
                                                <div className='border-1 rounded-md px-[8px]'>
                                                    Phần {phim.movie.tmdb.season}
                                                </div>
                                            )}
                                            {phim?.movie.episode_total && (
                                                <div className='border-1 rounded-md px-[8px]'>
                                                    {phim.movie.episode_current}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {phim?.movie.category && (
                                                <div className='flex gap-2'>{phim.movie.category.map((item , id) => (
                                                    <div key={id} className='bg-[#282B3A] rounded-md px-[6px]'>{item.name}</div>
                                                ))}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='w-[50%]'>
                                        <div className='mb-[24px] text-gray-400'>{phim?.movie.content}</div>
                                        <Link to={`/phim/${slug}`} className='text-amber-200'>Thông tin phim <i className='text-[17px] items-center'><Icon name='small right'/></i></Link>
                                    </div>
                                </div>
                                <hr className='text-gray-700 w-[90%]'></hr>
                                <div className='mt-[30px]'>
                                    <div className='flex gap-4 mb-[20px]'>
                                            
                                            {phim?.episodes.filter((item) => item.server_name ).map((item) => (
                                                <Link to={`/Player/${slug}/${encodeURIComponent(item.server_name)}/${episodeSlug}`} >
                                                <button 
                                                key={item.server_name}
                                                onClick={() => setSelectedServer(item.server_name)}
                                                className={`px-[16px] py-[8px] rounded-md ${selectedServer === item.server_name? "bg-yellow-200 text-black": "bg-gray-700 text-white"}`}>
                                                {item.server_name}
                                                </button>
                                                </Link>
                                            ))}
                                    </div>
                                    {phim?.episodes.filter((item) => item.server_name === selectedServer).map((item, id) => (
                                            <div key={id}>
                                                <div className="grid grid-cols-8 max-[1100px]:grid-cols-6 max-[800px]:grid-cols-4 max-[500px]:grid-cols-3 text-white max-[350px]:text-[10px]">
                                                    {item.server_data.map((server, index) => (
                                                        <Link to={`/Player/${slug}/${encodeURIComponent(item.server_name)}/${server.slug}`}>
                                                        <a
                                                            
                                                            key={index}
                                                            className={`p-[10px] m-[5px] rounded-md transition-all duration-300 justify-center gap-2 flex ${server.slug === episodeSlug && item.server_name === selectedServer? "bg-yellow-200 text-black": "bg-[#282B3A]"}`}
                                                        >
                                                            <span className="text-current">
                                                                <Icon name="right" />
                                                            </span>
                                                            <span className="text-current">
                                                                {server.name}
                                                            </span>
                                                        </a>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}