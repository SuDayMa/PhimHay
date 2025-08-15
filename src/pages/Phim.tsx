import { useState, useEffect } from "react";
import { PhimAPI } from "../Services/API";
import type { Phim } from "../types/Phimtype";
import { useParams } from "react-router-dom";
import Icon from "../Component/Icon";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function Phim() {
    const {slug} = useParams();
    const [phim, setPhim] = useState<Phim | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedServer, setSelectedServer] = useState<string | null>(null);

    useEffect(() => {
        const loadingPhim = async () => {
            try {
                setLoading(true);
                if (!slug) return
                const PhimData = await PhimAPI(slug);
                if (PhimData) {
                    setPhim(PhimData);
                    if (PhimData.episodes && PhimData.episodes.length > 0) {
                        setSelectedServer(PhimData.episodes[0].server_name);
                    }
                }
                
            } catch (error) {
                console.error("Error fetching Phim data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadingPhim();
    }, [slug]);

    const [openlist, setOpenList] = useState<number | null>(null);
        const toggleClick = (id: number) => {
         setOpenList(openlist === id ? null : id);
       }
    const playmovie = (phim?.episodes.find((item) => item.server_name === selectedServer))

    const List = (
        <div>
            <div onClick={() => toggleClick(1)} className="text-center">
                <span>Thông tin phim</span>
                <i><Icon name="down"/></i>
            </div>
            {openlist === 1 && (
                <div className=" p-[40px] mx-[40px] rounded-4xl bg-[#21242e] ">
                                <div className="mb-[32px]">
                                    <div>
                                        <div className="flex mb-[12px] gap-2">
                                        <div className="px-[8px] border-1 border-white rounded-md">
                                            <p className="text-white text-[14px] font-extralight">{phim?.movie.year}</p>
                                        </div>
                                        {phim?.movie.tmdb.season && (
                                            <div className="px-[8px] border-1 border-white rounded-md text-white">
                                                Phần {phim?.movie.tmdb.season}
                                            </div>
                                        )}
                                        <div className="px-[8px] border-1 border-white rounded-md">
                                            <p className="text-white text-[14px] font-extralight">{phim?.movie.episode_current}</p>
                                        </div>

                                        </div>
                                        <div className="flex mb-[12px]">
                                            <div className="flex ">
                                                <p className="text-white text-[14px] font-extralight flex gap-2">{phim?.movie.category.map((item, index) => (
                                                    <span className="bg-gray-700 px-[8px] rounded-md line-clamp-1" key={index}>{item.name}</span>
                                                ))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex mb-[24px]">
                                            <div className="bg-yellow-700 p-[6px] rounded-md">
                                                <span className="text-white">{phim?.movie.episode_current}/{phim?.movie.episode_total}</span>
                                            </div>
                                        </div>
                                        <div className="mb-[19px]">
                                            <div className="text-white mb-[8px] font-semibold text-[18px]">
                                                Giới thiệu:
                                            </div>
                                            <div className="text-gray-300 text-[14px] font-extralight">
                                                {phim?.movie.content}
                                            </div>
                                        </div>
                                        <div className="flex mb-[19px] gap-2 text-white text-[14px]">
                                            <div className="font-semibold">
                                                Thời Lượng:
                                            </div>
                                            <div>
                                                {phim?.movie.time}
                                            </div>
                                        </div>
                                        <div className="flex mb-[19px] gap-2 text-white text-[14px]">
                                            <div className="font-semibold">
                                                Quốc gia:
                                            </div>
                                            <div>
                                                {phim?.movie.country.map((item, index) => (
                                                    <span key={index}>{item.name}</span>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-[32px] text-white">
                                    <div className="flex mb-[19px] text-[22px] font-semibold">
                                        Diễn Viên:
                                    </div>
                                    <div>
                                        {phim?.movie.actor.map((item, index) => {
                                            return(
                                            <div key={index} className="text-white bg-amber-300" >
                                                <span>{item.name}</span>
                                            </div>
                                            )})}
                                    </div>
                                </div>
                            </div>
            )}
        </div>
    )
    const loadingphim = (
        <div className="relative">
        <div
            className="w-5 h-5 rounded-full animate-spin  border-3 border-solid border-white border-t-transparent">
        </div>
    </div>
    )
    return (
        <div >
            {loading ? (
                <p ><Loading /></p>
            ) : (
                <div>
                    <div className="">
                        <img src={phim?.movie.thumb_url} alt="" className="object-cover w-[100%] h-[800px] opacity-70 mask-b-from-10% mask-t-from-80% max-[1441px]:h-[600px]"/>
                    </div>
                    <div className=" -translate-y-50">
                        <div className=" mx-[330px] max-[2000px]:mx-[150px] px-[50px] max-[2000px]:px-[20px] flex  max-[1100px]:hidden">
                            <div className="w-[35%] p-[40px] rounded-4xl rounded-tr-[80px] bg-[#191B24]">
                                <div className="mb-[32px]">
                                    <div className="mb-[20px]">
                                        <img src={phim?.movie.poster_url} alt="" className="w-[50%] rounded-2xl "/>
                                    </div>
                                    <h2 className="text-white text-[20px] font-bold mb-[8px]">{phim?.movie.name}</h2>
                                    <h2 className="text-[#d1a83f] text-[12px] font-bold mb-[24px]">{phim?.movie.origin_name}</h2>
                                    <div>
                                        <div className="flex mb-[12px] gap-2">
                                        <div className="px-[8px] border-1 border-white rounded-md">
                                            <p className="text-white text-[14px] font-extralight">{phim?.movie.year}</p>
                                        </div>
                                        {phim?.movie.tmdb.season && (
                                            <Link to={`/tim-kiem?keyword=${phim.movie.origin_name}`}>
                                            <div className="px-[8px] border-1 border-white rounded-md text-white">
                                                Phần {phim?.movie.tmdb.season}
                                            </div>
                                            </Link>
                                        )}
                                        <div className="px-[8px] border-1 border-white rounded-md">
                                            <p className="text-white text-[14px] font-extralight">{phim?.movie.episode_current}</p>
                                        </div>

                                        </div>
                                        <div className="flex mb-[12px]">
                                            <div className="flex ">
                                                <p className="text-white text-[14px] font-extralight flex flex-wrap gap-2">{phim?.movie.category.map((item, index) => (
                                                    <Link to={`/the-loai/${item.slug}`}>
                                                    <span className="bg-gray-700 px-[8px] rounded-md" key={index}>{item.name}</span>
                                                    </Link>
                                                ))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex mb-[24px]">
                                        {phim?.movie.episode_current && (
                                            <div className="bg-yellow-700 p-[6px] rounded-md flex gap-1">
                                                <div className="p-[2px]">{loadingphim}</div>
                                                <span className={`text-white`}>{phim?.movie.episode_current}</span>
                                            </div>
                                        )}
                                        </div>
                                        <div className="mb-[19px]">
                                            <div className="text-white mb-[8px] font-semibold text-[18px]">
                                                Giới thiệu:
                                            </div>
                                            <div className="text-gray-300 text-[14px] font-extralight">
                                                {phim?.movie.content}
                                            </div>
                                        </div>
                                        <div className="flex mb-[19px] gap-2 text-white text-[14px]">
                                            <div className="font-semibold">
                                                Thời Lượng:
                                            </div>
                                            <div>
                                                {phim?.movie.time}
                                            </div>
                                        </div>
                                        <div className="flex mb-[19px] gap-2 text-white text-[14px]">
                                            <div className="font-semibold">
                                                Quốc gia:
                                            </div>
                                            <div className="flex gap-2">
                                                {phim?.movie.country.map((item, index) => (
                                                    <span key={index}>{item.name}</span>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-[32px] text-white">
                                    <div className="flex mb-[19px] text-[22px] font-semibold">
                                        Diễn Viên:
                                    </div>
                                    <div>
                                        {phim?.movie.actor.map((item, index) => {
                                            return(
                                            <div key={index} className="text-white bg-amber-300" >
                                                <span>{item.name}</span>
                                            </div>
                                            )})}
                                    </div>
                                </div>
                            </div>
                            <div className="w-[70%] p-[40px]  bg-[#191B24] rounded-[80px] ">
                                <div className="flex mb-[32px] border-b border-gray-600 pb-[32px]">
                                    {selectedServer && playmovie ? (
                                        <Link
                                            to={`/Player/${slug}/${encodeURIComponent(selectedServer)}/${playmovie?.server_data[0]?.slug || ""}`}
                                        >
                                            <div className="bg-gradient-to-r from-[#d1ad52] via-[#e4c36f] to-[#FFE8AC] flex gap-2 px-[32px] py-[15px] rounded-4xl">
                                                <p className="text-[24px]">
                                                    <Icon name="right" />
                                                </p>
                                                <span className="text-[23px]">Xem Ngay</span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="text-white">Chưa có tập nào </div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-white text-[28px] mb-[20px]">Tập Phim: </div>
                                    <div className="flex gap-4 mb-[20px]">
                                        {phim?.episodes.map((item) => (
                                            <button
                                                key={item.server_name}
                                                onClick={() => setSelectedServer(item.server_name)}
                                                className={`px-[16px] py-[8px] rounded-md ${ selectedServer === item.server_name? "bg-[#e4c36f] text-black": "bg-gray-700 text-white"}`}>
                                                {item.server_name}
                                            </button>
                                            ))}
                                    </div>
                                    {phim?.episodes.filter((item) => item.server_name === selectedServer).map((item, index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-7  max-[1530px]:grid-cols-5  max-[1355px]:grid-cols-3 text-[18px] ">
                                                
                                                {item.server_data.map((server,indexs) => (
                                                    <Link to={`/Player/${slug}/${encodeURIComponent(item.server_name)}/${server.slug}`}>
                                                    <a key={indexs} className="p-[10px] m-[5px] bg-[#282B3A] rounded-md hover:bg-gray-600 transition-all justify-center gap-2 flex">
                                                        <span className="text-white">
                                                                <Icon name="right" />
                                                            </span>
                                                            <span className="text-white text-[13px] flex justify-center items-center">
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
                        {/* Phone */}
                        <div className="min-[1100px]:hidden">
                            <div className=" flex flex-col items-center justify-center ">
                                <div className="flex tems-center justify-center mb-[20px]">
                                    <img src={phim?.movie.poster_url} alt="" className="w-[20%] rounded-2xl "/>
                                </div>
                                <div className="text-center ">
                                    <h2 className="text-white text-[20px] font-bold mb-[8px]">{phim?.movie.name}</h2>
                                    <h2 className="text-[#747068] text-[12px] font-bold mb-[24px]">{phim?.movie.origin_name}</h2>
                                </div>
                                <div className="mb-[25px] text-[#d1a83f]">
                                    {List}
                                </div>
                                <div className="mb-[25px]">
                                    {selectedServer && playmovie ? (
                                        <Link
                                            to={`/Player/${slug}/${encodeURIComponent(selectedServer)}/${playmovie?.server_data[0]?.slug || ""}`}
                                        >
                                            <div className="bg-gradient-to-r from-[#d1ad52] via-[#e4c36f] to-[#FFE8AC] justify-center fill-amber-200 drop-shadow-lg drop-shadow-amber-200/50 w-[300px] flex gap-2 px-[32px] py-[15px] rounded-4xl">
                                                <p className="text-[24px]">
                                                    <Icon name="right" />
                                                </p>
                                                <span className="text-[23px]">Xem Ngay</span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="text-white">Không có tập phim nào để xem</div>
                                    )}
                                </div>
                                <div className="text-white flex gap-5 mb-[30px]">
                                    <a className="flex flex-col text-center">
                                        <i><Icon name="heart"/></i>
                                        <span>Yêu thích</span>
                                    </a>
                                    <a className="flex flex-col text-center">
                                        <i><Icon name="+"/></i>
                                        <span>Thêm vào</span>
                                    </a>
                                    <a className="flex flex-col text-center">
                                        <i><Icon name="telegram"/></i>
                                        <span>Chia sẻ</span>
                                    </a>
                                    <a className="flex flex-col text-center">
                                        <i><Icon name="cmt"/></i>
                                        <span>Bình luận</span>
                                    </a>
                                </div>
                                <div className="flex flex-col items-center ">
                                    <div className="flex gap-4 mb-[20px]">
                                        {phim?.episodes.map((item) => (
                                            <button
                                                key={item.server_name}
                                                onClick={() => setSelectedServer(item.server_name)}
                                                className={`px-[16px] py-[8px] rounded-md ${item.server_name ? "bg-[#e4c36f] text-black": "bg-gray-700 text-white"}`}>
                                                {item.server_name}
                                            </button>
                                            ))}
                                    </div>
                                    {phim?.episodes.filter((item) => item.server_name === selectedServer).map((item, index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-8 max-[1441px]:grid-cols-6 max-[500px]:grid-cols-4 max-[400px]:grid-cols-3 text-[18px]">
                                                {item.server_data.map((server,indexs) => (
                                                    <a href={`/Player/${slug}/${encodeURIComponent(item.server_name)}/${server.slug}`} key={indexs} className="p-[10px] m-[5px] bg-[#282B3A] rounded-md hover:bg-gray-600 transition-all duration-300 justify-center gap-2 flex">
                                                        <span className="text-white">
                                                                <Icon name="right" />
                                                            </span>
                                                            <span className="text-white text-[13px] flex justify-center items-center">
                                                                {server.name}
                                                            </span>

                                                    </a>
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
        </div>
    )
}

