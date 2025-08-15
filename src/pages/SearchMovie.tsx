import type { SearchMovie } from "../types/Phimtype";
import { SearchAPI, QuocgiaAPI, TheloaiAPI } from "../Services/API";
import Icon from "../Component/Icon";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import type { QuocGia } from '../types/Phimtype';
import type { Theloai } from '../types/Phimtype';
import { Link } from "react-router-dom";

export default function SearchMovie () {
    const [SearchParams] = useSearchParams();
    const [filtersParam, setFiltersParam] = useSearchParams();
    const [pages,setPages] = useSearchParams()
    const [searchs, setSearchs] = useState<SearchMovie | null>(null);
    const [loading, setLoading] = useState(true);
    const [quocgia, setQuocgia] = useState<QuocGia []>([]);
    const [theloai, setTheloai] = useState<Theloai []>([])
    const keyword = SearchParams.get('keyword') || '';
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
        const fetchsearch = async () => {
            try{
                setLoading(true)
                if(!keyword) return;
                const theloai = await TheloaiAPI();
                setTheloai(theloai)
                const QuocgiaData = await QuocgiaAPI();
                setQuocgia(QuocgiaData)
                const currentPage = pages.get("page") || "1";
                const params = {
                  sort_field: filtersParam.get("sort_field") || "modified.time",
                  sort_type: filtersParam.get("sort_type") || "desc",
                  sort_lang: filtersParam.get("sort_lang") || "",
                  category: filtersParam.get("category") || "",
                  country: filtersParam.get("country") || "",
                  year: filtersParam.get("year") || "",
                  limit: 64,
                };
                const searchData = await SearchAPI(
                  keyword,
                parseInt(currentPage) ,
                params.sort_field,
                params.sort_type,
                params.sort_lang,
                params.category,
                params.country,
                params.year,
                params.limit);
                if (searchData)
                setSearchs(searchData)
            }catch (error){
                console.log("khong co du lieu", error)
            }finally{
                setLoading(false)
            }
        }
        fetchsearch()
    },[keyword, pages.get('page'), filtersParam]);

    const [openfilter, setOpenfilter] = useState<number | null>(null);
    const toggleClick = (id: number) => {
        setOpenfilter(openfilter === id ? null : id);
    }
    const nextpages = (page: number) => {
      if (page < 1 || page > (searchs?.data.params.pagination.totalPages || 1)) {
        return;
      }
      
      setPages(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set("page", page.toString());
        return newParams;
      });

    };
    const updatedFilter = (paramName: string, value: string) => {
    setFiltersParam((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', '1');
      newParams.set(paramName, value);
      return newParams;
    });
  };
  
    const filter = (
        <div>
            <h2 className='text-2xl font-bold mb-4 text-[#ffff]'>Tìm Kiếm: {keyword} </h2>
            <div className="mb-[32px]">
           <div className="">
      <div 
        onClick={() => toggleClick(1)} 
        className="pl-[8px] pr-[12px] py-2 flex items-center gap-2 text-[#ffff] cursor-pointer"
      >
        <span className={`${openfilter === 1 ? 'text-amber-300' : ''}`}>
        <Icon name="filter" />
        </span>
        <span>Bộ lọc</span>
        
      </div>
    </div>
    
    {openfilter === 1 && (
      
      <div className="py-4 rounded-lg border-gray-600  border-[0.1px] mb-4 duration-700">

        {/* Time */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thời gian:</h3>
          <div className="flex gap-2 ">
            <button
            onClick={() => updatedFilter('sort_field', 'modified.time')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'modified.time' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>Thời gian cập nhật
            </button>
            <button
            onClick={() => updatedFilter('sort_field', '_id')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === '_id' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>ID Phim
            </button>
            <button
            onClick={() => updatedFilter('sort_field', 'year')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'year' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>Năm phát hành
            </button>
          </div>
        </div>

        {/* Language */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Ngôn ngữ:</h3>
          <div className="flex gap-2">
              <button 
            onClick={() => updatedFilter('sort_lang', '')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === '' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>Tất cả</button>
            <button
            onClick={() => updatedFilter('sort_lang', 'vietsub')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'vietsub' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>
              vietsub
            </button>
            <button
            onClick={() => updatedFilter('sort_lang', 'thuyet-minh')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'thuyet-minh' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>
              Thuyết Minh
            </button>
            <button
            onClick={() => updatedFilter('sort_lang', 'long-tieng')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'long-tieng' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>
              Lồng Tiếng
            </button>
          </div>
        </div>
        
        {/* Category */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Thể loại:</h3>
          <div className="grid grid-cols-14 max-[1441px]:grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-4 gap-2">
            <button 
            onClick={() => updatedFilter('category', '')}
            className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('category') === '' ? ' text-amber-200 border-1 border-gray-600' : ''}`}>Tất cả</button>
            {theloai.map((item, index) => (
               <button 
               onClick={() => updatedFilter('category', item.slug)}
               className={`px-3 py-1 text-center hover:text-amber-200 text- text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('category') === item.slug ? 'text-amber-200 border-1 border-gray-600' : ''}`}
               key={index}>
                <div>{item.name}</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Country */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Quốc gia:</h3>
          <div className="grid grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-3 gap-2">
            <div 
            onClick={() => updatedFilter('country','')}
            className={`px-3 py-1 text-center hover:text-amber-200 text-[#ffff] rounded cursor-pointer text-sm ${filtersParam.get('country') === ''? ' text-amber-200 border-1 border-gray-600' : ''}`}>Tất cả</div>
            {quocgia.map((item, index) => (
              <button 
               onClick={() => updatedFilter('country',item.slug)}
               key={index}
               className={`px-3 py-1 text-[#ffff] hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('country') === item.slug ? ' text-amber-200 border-1 border-gray-600' : ''}`}>
                <div>{item.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div className='flex gap-5 border-dashed border-b border-gray-700 pb-3 mb-3'>
          <h3 className="text-[#ffff] font-medium mb-2 w-[10%] text-right">Năm:</h3>
          <div className="grid grid-cols-21 max-[1441px]:grid-cols-18 max-[1300px]:grid-cols-12 max-[800px]:grid-cols-8 max-[500px]:grid-cols-4 gap-2">
            <button
            onClick={() => updatedFilter('year', '')}
            className={`px-3 py-1 text-[#ffff] hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('year') === '' ? 'text-amber-200 border-1 border-gray-600':''}`}>Tất cả</button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => updatedFilter('year',year.toString())}
                  className={`px-3 py-1 text-[#ffff]  rounded cursor-pointer text-sm ${filtersParam.get('year') === year.toString() ? ' text-amber-200 border-1 border-gray-600' : ''}`}
                >
                  {year}
                </button>
              ))}
          </div>
        </div>
        {/* nut dong */}
        <div className="mt-6 flex ">
          <div className='w-[10%]'></div>
          <button 
          onClick={() => setOpenfilter(null)}
          className="px-4 py-2 border-gray-500 text-[#ffff] border-1 rounded-4xl hover:opacity-80 mr-2 flex duration-300">
            Đóng
            <span className='flex items-center text-[20px]'><Icon name="big right" /></span>
          </button>
        </div>
      </div>
    )}
        </div>
        
        </div>
    )
    return (
    <div>
      <div className="mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]">{filter}</div>
      {loading ? (
          <Loading />
        
      ) : searchs?.data.items && searchs.data.items.length > 0 ? (
        <div>
          <div className="grid grid-cols-8 max-[1600px]:grid-cols-7 max-[1360px]:grid-cols-6 max-[1190px]:grid-cols-5 max-[950px]:grid-cols-4 max-[730px]:grid-cols-3 max-[500px]:grid-cols-2 gap-4 mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px] h-auto">
          {searchs.data.items.map((item, index) => (
            <Link to={`/phim/${item.slug}`} key={index}>
              <div className="bg-[#676b6d44] p-4 rounded-lg mb-4 group-hover:w-[100px] group-hover:h-[500px] transition-all duration-300 hover:bg-gray-600">
                <div className="flex">
                  <img
                    src={`${searchs.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`}
                    className="w-full h-[200px] mb-2 rounded-lg"
                    alt={item.name}
                  />
                </div>
                <h3 className="text-[#ffff] text-lg font-semibold line-clamp-1">{item.name}</h3>
                <div className="transition-all duration-300">
                  <p className="text-gray-400 text-sm">{item.time}</p>
                  <p className="text-gray-400 text-sm line-clamp-1">{item.episode_current}</p>
                  <p className="text-gray-400 text-sm">{item.quality}</p>
                  <p className="text-gray-400 text-sm line-clamp-1">{item.lang}</p>
                </div>
              </div>
            </Link>
          ))}
          
        </div>
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
                        <div className='w-[40%] flex items-center justify-center'>/ {searchs?.data.params.pagination.totalPages}</div>
                    </div>
                    
                    <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px] cursor-pointer'
                    onClick={() => nextpages(parseInt(pages.get("page") || "1") + 1)}
                    >
                        <i className='text-[24px]'><Icon name='big right'/></i>
                    </button>
                </div>
            </div>
        </div>

      ) : (
        <div className="text-center text-[#ffff] text-lg py-[300px]">
          Không tìm thấy kết quả 
        </div>
      )}
    </div>
  );
}