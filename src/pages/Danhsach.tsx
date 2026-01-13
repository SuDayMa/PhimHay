import { useEffect, useState } from 'react';
import { DanhSachAPI, QuocgiaAPI, TheloaiAPI } from '../Services/API';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import type { Danhsach, QuocGia, Theloai } from '../types/Phimtype';
import Loading from './Loading';
import Icon from '../Component/Icon';

export default function Danhsach() {
  const { type_list } = useParams();
  const [filtersParam, setFiltersParam] = useSearchParams();
  const [pages, setPages] = useSearchParams();
  const [danhsach, setDanhSach] = useState<Danhsach | null>(null);
  const [loading, setLoading] = useState(true);
  const [quocgia, setQuocgia] = useState<QuocGia[]>([]);
  const [theloai, setTheloai] = useState<Theloai[]>([]);
  const [openfilter, setOpenfilter] = useState<number | null>(null);

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
    const LoadingDanhSach = async () => {
      try {
        setLoading(true);
        if (!type_list) return;

        const [theloaiData, quocgiaData] = await Promise.all([
          TheloaiAPI(),
          QuocgiaAPI()
        ]);
        
        setTheloai(theloaiData);
        setQuocgia(quocgiaData);

        const currentPage = pages.get("page") || "1";
        const params = {
          sort_field: filtersParam.get("sort_field") || "modified.time",
          sort_type: filtersParam.get("sort_type") || "desc",
          sort_lang: filtersParam.get("sort_lang") || "",
          category: filtersParam.get("category") || "",
          country: filtersParam.get("country") || '',
          year: filtersParam.get("year") || "",
          limit: 64,
        };

        const data = await DanhSachAPI(
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
          setDanhSach(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    LoadingDanhSach();
  }, [type_list, pages.get("page"), filtersParam]);

  const toggleClick = (id: number) => {
    setOpenfilter(openfilter === id ? null : id);
  };

  const nextpages = (page: number) => {
    if (page < 1 || page > (danhsach?.data.params.pagination.totalPages || 1)) return;
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
      <h2 className='text-2xl font-bold mb-4 text-[#ffff]'>{danhsach?.data.titlePage}</h2>
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
          <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thời gian:</h3>
            <div className="flex gap-2">
              <button onClick={() => updatedFilter("sort_field",'modified.time')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'modified.time'? 'text-yellow-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>Thời gian cập nhật</button>
              <button onClick={() => updatedFilter("sort_field",'_id')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === '_id'? 'text-yellow-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>Thời gian Đăng</button>
              <button onClick={() => updatedFilter("sort_field",'year')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'year'? 'text-yellow-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>Năm sản xuất</button>
            </div>
          </div>
          
          <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Ngôn ngữ:</h3>
            <div className="grid grid-cols-4 max-[350px]:grid-cols-3 gap-2">
              <button onClick={() => updatedFilter("sort_lang",'')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') ? 'hover:text-amber-200' : ' text-yellow-200 border-1 border-gray-600'}`}>Tất cả</button>
              <button onClick={() => updatedFilter("sort_lang",'vietsub')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'vietsub'? 'text-yellow-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>vietsub</button>
              <button onClick={() => updatedFilter("sort_lang",'thuyet-minh')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'thuyet-minh'? 'text-yellow-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>Thuyết Minh</button>
              <button onClick={() => updatedFilter("sort_lang",'long-tieng')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'long-tieng'? 'text-yellow-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>Lồng Tiếng</button>
            </div>
          </div>

          <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thể loại:</h3>
            <div className="grid grid-cols-14 max-[1441px]:grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-4 gap-2 text-center text-[#ffff]">
              <button onClick={() => updatedFilter("category",'')} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('category') ? 'hover:text-amber-200' : ' text-yellow-200 border-1 border-gray-600 '}`}>Tất cả</button>
              {theloai?.map((item, index) => (
                <button key={index} onClick={() => updatedFilter("category",item.slug)} className={`px-3 py-1 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('category') === item.slug? 'text-yellow-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>{item.name}</button>
              ))}
            </div>
          </div>

          <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Quốc gia:</h3>
            <div className="grid grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-3 gap-2">
              <button onClick={() => updatedFilter('country', '')} className={`px-3 py-1 text-[#ffff] hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('country') ? '' : ' text-yellow-200 border-1 border-gray-600'}`}>Tất cả</button>
              {quocgia.map((item, index) => (
                <button key={index} onClick={() => updatedFilter('country',item.slug)} className={`px-3 py-1 text-[#ffff] hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('country') === item.slug ? ' text-yellow-200 border-1 border-gray-600' : ''}`}>{item.name}</button>
              ))}
            </div>
          </div>

          <div className='flex gap-5 border-dashed border-b border-gray-700 pb-3 mb-3'>
            <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Năm:</h3>
            <div className="grid grid-cols-21 max-[1441px]:grid-cols-18 max-[1300px]:grid-cols-12 max-[800px]:grid-cols-8 max-[500px]:grid-cols-4 gap-2">
              <button onClick={() => updatedFilter("year", '')} className={`px-3 py-1 text-[#ffff] hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('year') ? '' : ' text-yellow-200 border-1 border-gray-600'}`}>Tất cả</button>
              {years.map((item) => (
                <button key={item} onClick={() => updatedFilter("year",item.toString())} className={`px-3 py-1 text-[#ffff] hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('year') === item.toString() ? ' text-yellow-200 border-1 border-gray-600' : ''}`}>{item}</button>
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
  );

  return (
    <div className=''>
      <div className='mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]'>{filterSection}</div>
      
      {loading ? (
        <h1 className='text-[#ffff]'><Loading /></h1>
      ) : danhsach?.data.items && danhsach.data.items.length > 0 ? (
        <>
          <div className='grid grid-cols-8 max-[1600px]:grid-cols-7 max-[1360px]:grid-cols-6 max-[1190px]:grid-cols-5 max-[950px]:grid-cols-4 max-[730px]:grid-cols-3 max-[500px]:grid-cols-2 gap-4 mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px] h-auto'>
            {danhsach.data.items.map((item, index) => (
              <Link key={item.slug || index} to={`/phim/${item.slug}`} className="block group">
                <div className="relative bg-[#1b1d20] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={`${danhsach.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`}
                      alt={item.name}
                      loading="lazy"
                      className="w-full aspect-[2/3] object-cover group-hover:brightness-110 transition duration-300"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300" />
                    {item.tmdb && item.tmdb.vote_average > 0 && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-[#ff3d3d] to-[#ff9d00] text-white font-bold text-xs px-2.5 py-1.5 rounded-full shadow-md">
                        ★ {Number(item.tmdb.vote_average).toFixed(1)}
                      </span>
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
                        <i className='text-[24px]'><Icon name='left'/></i>
                    </button>
                    <div className='flex gap-2 bg-[#676b6d44] rounded-4xl'>
                        <div className='w-[40%] flex items-center justify-center'> Trang </div>
                        
                        <input type='number' value={pages.get("page") || "1"}
                        onChange={(e) => nextpages(parseInt(e.target.value))} 
                        name='text'
                        className='w-[30%] px-[10px] my-[12px] border-1 border-gray-600'></input>
                        <div className='w-[40%] flex items-center justify-center'>/ {danhsach?.data.params.pagination.totalPages}</div>
                    </div>
                    
                    <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px] cursor-pointer'
                    onClick={() => nextpages(parseInt(pages.get("page") || "1") + 1)}
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