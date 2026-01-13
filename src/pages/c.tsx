import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import type { TheloaiResponse, Theloai, QuocGia } from "../types/Phimtype";
import { TheloaiMovieAPI, TheloaiAPI, QuocgiaAPI } from "../Services/API";
import Icon from "../Component/Icon";
import Loading from "./Loading";

export default function TheLoaiDetail() {
    const [pages, setPages] = useSearchParams();
    const [filtersParam, setFiltersParam] = useSearchParams();
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

    useEffect(() => {
        const LoadingTheloaiMovie = async () => {
            try {
                setLoading(true);
                if (!type_list) return;
                const [quocgias, theloais] = await Promise.all([
                    QuocgiaAPI(),
                    TheloaiAPI()
                ]);
                setQuocgia(quocgias);
                setTheloai(theloais);

                const currentPage = pages.get("page") || "1";
                const params = {
                    sort_field: filtersParam.get("sort_field") || "modified.time",
                    sort_type: filtersParam.get("sort_type") || "desc",
                    sort_lang: filtersParam.get("sort_lang") || "",
                    category: filtersParam.get("category") || type_list,
                    country: filtersParam.get("country") || "",
                    year: filtersParam.get("year") || "",
                    limit: 64,
                };
                const data = await TheloaiMovieAPI(
                    type_list,
                    parseInt(currentPage),
                    params.sort_field,
                    params.sort_type,
                    params.sort_lang,
                    params.category,
                    params.country,
                    params.year,
                    params.limit
                );
                if (data) {
                    setTheloaiMovie(data);
                }
            } catch (error) {
                console.error("Error fetching Theloai data:", error);
            } finally {
                setLoading(false);
            }
        };
        LoadingTheloaiMovie();
    }, [type_list, pages.get("page"), filtersParam]);

    const [openfilter, setOpenfilter] = useState<number | null>(null);
    const toggleClick = (id: number) => {
        setOpenfilter(openfilter === id ? null : id);
    };

    const nextpages = (page: number) => {
        if (page < 1 || page > (TheloaiMovie?.data.params.pagination.totalPages || 1))
            return;

        setPages(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", page.toString());
            return newParams;
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const updatedFilter = (paramName: string, value: string) => {
        setFiltersParam((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', '1');
            newParams.set(paramName, value);
            return newParams;
        });
    };

    const filterSection = (
        <div>
            <h2 className='text-2xl font-bold mb-4 text-[#ffff]'>Phim {TheloaiMovie?.data.titlePage || filtersParam.get('category')}</h2>
            <div className="mb-[32px]">
                <div onClick={() => toggleClick(1)} className="pl-[8px] pr-[12px] py-2 flex items-center gap-2 text-[#ffff] cursor-pointer">
                    <span className={`${openfilter === 1 ? 'text-amber-300' : ''}`}>
                        <Icon name="filter" />
                    </span>
                    <span>Bộ lọc</span>
                </div>

                {openfilter === 1 && (
                    <div className="py-4 rounded-lg border-gray-600 border-[0.1px] mb-4 duration-700">
                        {/* Time */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thời gian:</h3>
                            <div className="flex gap-2 ">
                                <button onClick={() => updatedFilter('sort_field', 'modified.time')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'modified.time' ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Thời gian cập nhật</button>
                                <button onClick={() => updatedFilter('sort_field', '_id')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === '_id' ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>ID Phim</button>
                                <button onClick={() => updatedFilter('sort_field', 'year')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'year' ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Năm phát hành</button>
                            </div>
                        </div>

                        {/* Language */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Ngôn ngữ:</h3>
                            <div className="grid grid-cols-4 max-[350px]:grid-cols-3 gap-2">
                                <button onClick={() => updatedFilter('sort_lang', '')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${!filtersParam.get('sort_lang') ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Tất cả</button>
                                <button onClick={() => updatedFilter('sort_lang', 'vietsub')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'vietsub' ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Vietsub</button>
                                <button onClick={() => updatedFilter('sort_lang', 'thuyet-minh')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'thuyet-minh' ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Thuyết Minh</button>
                                <button onClick={() => updatedFilter('sort_lang', 'long-tieng')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'long-tieng' ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Lồng Tiếng</button>
                            </div>
                        </div>

                        {/* Category */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thể loại:</h3>
                            <div className="grid grid-cols-14 max-[1441px]:grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-4 gap-2">
                                <button onClick={() => updatedFilter('category', '')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${!filtersParam.get('category') ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Tất cả</button>
                                {theloai.map((item, index) => (
                                    <button key={index} onClick={() => updatedFilter('category', item.slug)} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('category') === item.slug ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>{item.name}</button>
                                ))}
                            </div>
                        </div>

                        {/* Country */}
                        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Quốc gia:</h3>
                            <div className="grid grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-3 gap-2">
                                <button onClick={() => updatedFilter('country', '')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${!filtersParam.get('country') ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Tất cả</button>
                                {quocgia.map((item, index) => (
                                    <button key={index} onClick={() => updatedFilter('country', item.slug)} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('country') === item.slug ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>{item.name}</button>
                                ))}
                            </div>
                        </div>

                        {/* Year */}
                        <div className='flex gap-5 border-dashed border-b border-gray-700 pb-3 mb-3'>
                            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Năm:</h3>
                            <div className="grid grid-cols-21 max-[1441px]:grid-cols-18 max-[1300px]:grid-cols-12 max-[800px]:grid-cols-8 max-[500px]:grid-cols-4 gap-2">
                                <button onClick={() => updatedFilter('year', '')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${!filtersParam.get('year') ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>Tất cả</button>
                                {years.map((year) => (
                                    <button key={year} onClick={() => updatedFilter('year', year.toString())} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('year') === year.toString() ? 'text-yellow-200 border-1 border-gray-600' : 'hover:text-amber-200'}`}>{year}</button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 flex">
                            <div className='w-[10%]'></div>
                            <button onClick={() => setOpenfilter(null)} className="px-4 py-2 border-gray-500 text-[#ffff] border-1 rounded-4xl hover:bg-amber-200 hover:text-black mr-2 flex duration-300">Đóng</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className='mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]'>{filterSection}</div>
                    <div className='grid grid-cols-8 max-[1600px]:grid-cols-7 max-[1360px]:grid-cols-6 max-[1190px]:grid-cols-5 max-[950px]:grid-cols-4 max-[730px]:grid-cols-3 max-[500px]:grid-cols-2 gap-4 mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px] h-auto'>
                        {TheloaiMovie && TheloaiMovie.data.items.map((item, index) => (
                            <Link key={item.slug || index} to={`/phim/${item.slug}`} className="block group">
                                <div className="relative bg-[#1b1d20] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {/* Poster */}
                                    <div className="relative">
                                        <img
                                            src={`${TheloaiMovie.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`}
                                            alt={item.name}
                                            loading="lazy"
                                            className="w-full aspect-[2/3] object-cover group-hover:brightness-110 transition duration-300"
                                        />
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300" />
                                        
                                        {/* Badge Điểm - Sử dụng tmb hoặc tmdb tùy file type của bạn */}
                                        {(item.tmdb?.vote_average || (item as any).tmb?.vote_average) > 0 && (
                                            <span className="absolute top-3 left-3 bg-gradient-to-r from-[#ff3d3d] to-[#ff9d00] text-white font-bold text-xs px-2.5 py-1.5 rounded-full shadow-md">
                                                ★ {Number(item.tmdb?.vote_average || (item as any).tmb?.vote_average).toFixed(1)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Nội dung */}
                                    <div className="p-3">
                                        <h3 className="text-white text-lg font-semibold line-clamp-1 group-hover:text-[#ffcc00] transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                        <div className="mt-1 gap-x-3 gap-y-1 text-sm text-gray-300">
                                            {item.time && <p className="flex items-center gap-1">⏱️ <span className="truncate">{item.time}</span></p>}
                                            {item.episode_current && <p className="flex items-center gap-1">🎬 <span className="truncate">{item.episode_current}</span></p>}
                                            {item.lang && <p className="flex items-center gap-1">🌐 <span className="truncate">{item.lang}</span></p>}
                                        </div>
                                    </div>

                                    {/* Viền sáng khi hover */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* GIỮ NGUYÊN PHẦN CHUYỂN TRANG CỦA BẠN */}
                    <div className='my-16 flex items-center justify-center'>
                        <div className='flex text-[#ffff] gap-3'>
                            <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px] cursor-pointer'
                                onClick={() => nextpages(parseInt(pages.get("page") || "1") - 1)}
                            >
                                <i className='text-[24px]'><Icon name='left' /></i>
                            </button>
                            <div className='flex gap-2 bg-[#676b6d44] rounded-4xl'>
                                <div className='w-[40%] flex items-center justify-center'> Trang </div>
                                <input type='number' value={pages.get("page") || "1"}
                                    onChange={(e) => nextpages(parseInt(e.target.value))}
                                    className='w-[30%] px-[10px] my-[12px] border-1 border-gray-600'></input>
                                <div className='w-[40%] flex items-center justify-center'>/ {TheloaiMovie?.data.params.pagination.totalPages}</div>
                            </div>
                            <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px] cursor-pointer'
                                onClick={() => nextpages(parseInt(pages.get("page") || "1") + 1)}
                            >
                                <i className='text-[24px]'><Icon name='big right' /></i>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}