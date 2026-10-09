import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import type { TheloaiResponse, Theloai, QuocGia } from "../types/Phimtype";
import { TheloaiMovieAPI, TheloaiAPI, QuocgiaAPI } from "../Services/API";
import Icon from "../Component/Icon";
import Loading from "./Loading";

export default function TheLoaiDetail() {
    // Dùng duy nhất 1 useSearchParams cho toàn bộ trang
    const [searchParams, setSearchParams] = useSearchParams();
    const { type_list } = useParams();
    const [TheloaiMovie, setTheloaiMovie] = useState<TheloaiResponse | null>(null);
    const [theloai, setTheloai] = useState<Theloai[]>([]);
    const [quocgia, setQuocgia] = useState<QuocGia[]>([]);
    const [loading, setLoading] = useState(true);

    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years: number[] = [];
        for (let year = 2000; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    };

    const years = generateYears();

    // Lấy các giá trị param từ URL
    const currentPage = searchParams.get("page") || "1";
    const sortField = searchParams.get("sort_field") || "modified.time";
    const sortType = searchParams.get("sort_type") || "desc";
    const sortLang = searchParams.get("sort_lang") || "";
    const category = searchParams.get("category") || "";
    const country = searchParams.get("country") || "";
    const year = searchParams.get("year") || "";

    // 1. Chỉ gọi API khi type_list hoặc các giá trị param thay đổi thực sự
    useEffect(() => {
        const LoadingTheloaiMovie = async () => {
            try {
                setLoading(true);
                if (!type_list) return;

                // Có thể tách API thể loại/quốc gia ra một useEffect riêng khởi tạo 1 lần 
                // nhưng để giữ nguyên logic của bạn, ta gọi chung ở đây:
                const quocgias = await QuocgiaAPI();
                setQuocgia(quocgias?.data?.items || quocgias);
                const theloais = await TheloaiAPI();
                setTheloai(theloais?.data?.items || theloais);

                const theloaiMovie = await TheloaiMovieAPI(
                    type_list, 
                    parseInt(currentPage),
                    sortField,
                    sortType, 
                    sortLang,
                    category,
                    country, 
                    year, 
                    64 
                );

                if (theloaiMovie) {
                    setTheloaiMovie(theloaiMovie);
                }
            } catch (error) {
                console.error("Error fetching Theloai data:", error);
            } finally {
                setLoading(false);
            }
        };

        LoadingTheloaiMovie();
    }, [type_list, currentPage, sortField, sortType, sortLang, category, country, year]);

    // 2. Tách riêng hiệu ứng cuộn lên đầu trang khi chuyển trang
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const [openfilter, setOpenfilter] = useState<number | null>(null);
    const toggleClick = (id: number) => {
        setOpenfilter(openfilter === id ? null : id);
    };

    const nextpages = (page: number) => {
        if (page < 1 || page > (TheloaiMovie?.data.params.pagination.totalPages || 1))
            return;

        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", page.toString());
            return newParams;
        });
    };

    const updatedFilter = (paramName: string, value: string) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", "1"); // Reset về trang 1 khi đổi bộ lọc
            if (value === "") {
                newParams.delete(paramName);
            } else {
                newParams.set(paramName, value);
            }
            return newParams;
        });
    };

    const categorySlug = category || type_list;

    const filter = (
        <div>
            <h2 className='text-2xl font-bold mb-4 text-[#ffff]'>Thể Loại Phim: {categorySlug}</h2>
            <div className="mb-[32px]">
                <div className="w-[30%]">
                    <div 
                        onClick={() => toggleClick(1)} 
                        className="pl-[8px] pr-[12px] py-2 flex items-center gap-2 text-[#ffff] cursor-pointer"
                    >
                        <span className={`max-[500px]:text-[10px] ${openfilter === 1 ? 'text-amber-300' : ''}`}>
                            <Icon name="filter" />
                        </span>
                        <span className='max-[500px]:text-[10px]'>Bộ lọc</span>
                    </div>
                </div>
    
                {openfilter === 1 && (
                    <div className="py-4 rounded-lg border-gray-600 border-[0.1px] mb-4 duration-700">
                        {/* Time */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thời gian:</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updatedFilter('sort_field', 'modified.time')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${sortField === 'modified.time' ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>Thời gian cập nhật
                                </button>
                                <button
                                    onClick={() => updatedFilter('sort_field', '_id')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${sortField === '_id' ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>ID Phim
                                </button>
                                <button
                                    onClick={() => updatedFilter('sort_field', 'year')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${sortField === 'year' ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>Năm phát hành
                                </button>
                            </div>
                        </div>
                        
                        {/* Language */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Ngôn ngữ:</h3>
                            <div className="grid grid-cols-4 max-[350px]:grid-cols-3 gap-2">
                                <button 
                                    onClick={() => updatedFilter('sort_lang', '')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${!sortLang ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>Tất cả</button>
                                <button
                                    onClick={() => updatedFilter('sort_lang', 'vietsub')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${sortLang === 'vietsub' ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>
                                    vietsub
                                </button>
                                <button
                                    onClick={() => updatedFilter('sort_lang', 'thuyet-minh')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${sortLang === 'thuyet-minh' ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>
                                    Thuyết Minh
                                </button>
                                <button
                                    onClick={() => updatedFilter('sort_lang', 'long-tieng')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${sortLang === 'long-tieng' ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>
                                    Lồng Tiếng
                                </button>
                            </div>
                        </div>
                        
                        {/* category */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thể loại:</h3>
                            <div className="grid grid-cols-14 max-[1441px]:grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-4 gap-2">
                                {theloai.map((item, index) => (
                                    <button 
                                        onClick={() => updatedFilter('category', item.slug)}
                                        className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${categorySlug === item.slug ? 'text-yellow-200 border-1 border-gray-600' : ''}`}
                                        key={index}>
                                        <div>{item.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* country */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Quốc gia:</h3>
                            <div className="grid grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-3 gap-2">
                                <button 
                                    onClick={() => updatedFilter('country', '')}
                                    className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${!country ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>Tất cả</button>
                                {quocgia.map((item, index) => (
                                    <button 
                                        onClick={() => updatedFilter('country', item.slug)}
                                        className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${country === item.slug ? 'text-yellow-200 border-1 border-gray-600' : ''}`}
                                        key={index}>
                                        <div>{item.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* year */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Năm:</h3>
                            <div className="grid grid-cols-21 max-[1441px]:grid-cols-18 max-[1300px]:grid-cols-12 max-[800px]:grid-cols-8 max-[500px]:grid-cols-4 gap-2">
                                <button
                                    onClick={() => updatedFilter('year', '')}
                                    className={`px-3 py-1 text-[#ffff] hover:text-amber-200 rounded cursor-pointer text-sm ${!year ? 'text-yellow-200 border-1 border-gray-600' : ''}`}>Tất cả</button>
                                {years.map((y) => (
                                    <button
                                        key={y}
                                        onClick={() => updatedFilter('year', y.toString())}
                                        className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${year === y.toString() ? 'text-amber-200 border-1 border-gray-600' : ''}`}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-6 flex">
                            <div className='w-[10%]'></div>
                            <button 
                                onClick={() => setOpenfilter(null)}
                                className="px-4 py-2 border-gray-500 text-[#ffff] border-1 rounded-4xl hover:bg-amber-200 hover:text-black mr-2 flex duration-300">
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="">
            <div className='mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]'>{filter}</div>
            {loading ? (
                <p><Loading/></p>
            ) : TheloaiMovie?.data.items && TheloaiMovie.data.items.length > 0 ? (
                <>
                    <div className='grid grid-cols-8 max-[1600px]:grid-cols-7 max-[1360px]:grid-cols-6 max-[1190px]:grid-cols-5 max-[950px]:grid-cols-4 max-[730px]:grid-cols-3 max-[500px]:grid-cols-2 gap-4 mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px] h-auto'>
                        {TheloaiMovie.data.items.map((item, index) => (
                            <Link key={index} to={`/phim/${item.slug}`} className="block group">
                                <div className="relative bg-[#1b1d20] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="relative">
                                        <img
                                            src={`${TheloaiMovie.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`}
                                            alt={item.name}
                                            className="w-full aspect-[2/3] object-cover group-hover:brightness-110 transition duration-300"
                                        />
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300"></div>
                                        {item.tmdb && item.tmdb.vote_average > 0 && (
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#ff3d3d] to-[#ff9d00] text-white font-bold text-xs px-2.5 py-1.5 rounded-full shadow-md">
                                                ⭐ {Number(item.tmdb.vote_average).toFixed(1)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-white text-lg font-semibold line-clamp-1 group-hover:text-[#ffcc00] transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                        <div className="mt-1 gap-x-3 gap-y-1 text-sm text-gray-300">
                                            {item.time && <span className="flex items-center gap-1">⏱️ <span className="truncate">{item.time}</span></span>}
                                            {item.episode_current && <span className="flex items-center gap-1">🎬 <span className="truncate">{item.episode_current}</span></span>}
                                            {item.lang && <span className="flex items-center gap-1">🌐 <span className="truncate">{item.lang}</span></span>}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='my-16 flex items-center justify-center'>
                        <div className='flex text-[#ffff] gap-3'>
                            <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px] cursor-pointer'
                                onClick={() => nextpages(parseInt(currentPage) - 1)}
                            >
                                <i className='text-[24px]'><Icon name='left'/></i>
                            </button>
                            <div className='flex gap-2 bg-[#676b6d44] rounded-4xl'>
                                <div className='w-[40%] flex items-center justify-center'> Trang </div>
                                <input type='number' value={currentPage}
                                    onChange={(e) => nextpages(parseInt(e.target.value) || 1)} 
                                    className='w-[30%] px-[10px] my-[12px] border-1 border-gray-600 text-center text-white'
                                />
                                <div className='w-[40%] flex items-center justify-center'>/ {TheloaiMovie?.data.params.pagination.totalPages}</div>
                            </div>
                            <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px] cursor-pointer'
                                onClick={() => nextpages(parseInt(currentPage) + 1)}
                            >
                                <i className='text-[24px]'><Icon name='big right'/></i>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-[#ffff] text-lg py-[300px]">
                    Không tìm thấy kết quả 
                </div>
            )}
        </div>
    );
}