import { Link, Route, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import type { QuocGiaResponse, Theloai , QuocGia } from '../types/Phimtype';
import { MovieAPI } from '../Services/API';
import { useEffect } from 'react';
import Icon from '../Component/Icon';
import Phim from './Phim'; 
import Loading from './Loading';// Assuming Phim is a component that displays movie details
import { TheloaiAPI, QuocgiaAPI } from '../Services/API';
export default function QuocGiaDetail() {
     const [pages, setPages] = useSearchParams();
     const [filtersParam, setFiltersParam] = useSearchParams();
     const { type_list } = useParams();
     const [Movie, setMovie] = useState<QuocGiaResponse | null>(null);
     const [theloai, setTheloai] = useState<Theloai []>([]);
     const [quocgia, setQuocgia] = useState<QuocGia []>([]);
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
         const LoadingMovie = async () => {
             try {
                setLoading(true);
                  if (!type_list) return
                 const theloais = await TheloaiAPI();
                 setTheloai(theloais)
                 const quocgias = await QuocgiaAPI();
                 setQuocgia(quocgias)
                 const currentPage = pages.get("page") || "1";
                 const params = {
                  sort_field: filtersParam.get("sort_field") || "modified.time",
                  sort_type: filtersParam.get("sort_type") || "desc",
                  sort_lang: filtersParam.get("sort_lang") || "",
                  category: filtersParam.get("category") || "",
                  country: filtersParam.get('country') || '',
                  year: filtersParam.get("year") || "",
                  limit: 64,
                 }
                 const movie = await MovieAPI(
                  type_list, 
                  parseInt(currentPage), 
                  params.sort_field,
                  params.sort_type, 
                  params.sort_lang, 
                  params.category, 
                  params.year, 
                  params.limit );
                 console.log(type_list);
                 if (movie){
                     setMovie(movie);
                     console.log(movie);
                 }
             } catch (error) {
                    console.error("Error fetching Quoc gia data:", error);
                } finally {
                    setLoading(false);
                }
            };
            LoadingMovie();
        }, [type_list, pages.get("page"), filtersParam, window.scrollTo({ top: 0, behavior: "smooth" })]);
        const [openfilter, setOpenfilter] = useState<number | null>(null);
        const toggleClick = (id: number) => {
         setOpenfilter(openfilter === id ? null : id);
       }
       const nextpages = (page : number) => {
      if( page < 1 || page > (Movie?.data.params.pagination.totalPages || 1))
        return;

      setPages(prev =>{
        const newParams = new URLSearchParams(prev);
        newParams.set("page" ,page.toString())
        return newParams;
      })
    }
    const updatedFilter = (paramName: string, value: string) => {
      setFiltersParam((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('page','1');
        newParams.set(paramName, value)
        return newParams
      })
    }

       const filter = (
  <div>
    <h2 className='text-2xl font-bold mb-4 text-white'>Phim từ quốc gia: {Movie?.data.titlePage}</h2>
    <div className="w-[30%]">
      <div 
        onClick={() => toggleClick(1)} 
        className="pl-[8px] pr-[12px] py-2 flex items-center gap-2 text-white cursor-pointer"
      >
        <span className={` max-[500px]:text-[10px] ${openfilter === 1 ? 'text-amber-300' : ''}`}>
        <Icon name="filter" />
        </span>
        <span className='max-[500px]:text-[10px]'>Bộ lọc</span>
        
      </div>
    </div>
    
    {openfilter === 1 && (
      
      <div className="py-4 rounded-lg border-gray-600  border-[0.1px] mb-4 duration-700">
        {/* Time */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-white font-medium mb-2 w-[10%] text-right">Thời gian:</h3>
          <div className="flex gap-2 ">
            <button 
            onClick={() => updatedFilter("sort_field",'modified.time')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'modified.time'? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >
              Thời gian cập nhật 
            </button>
            <button 
            onClick={() => updatedFilter("sort_field",'_id')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === '_id'? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >
              Thời gian Đăng 
            </button>
            <button 
            onClick={() => updatedFilter("sort_field",'year')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('sort_field') === 'year'? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >
              Năm sản xuất 
            </button>
          </div>
        </div>
        
        {/* Language */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-white font-medium mb-2 w-[10%] text-right">Ngôn ngữ:</h3>
          <div className="grid grid-cols-4 max-[350px]:grid-cols-3 gap-2">
            <button
            onClick={() => updatedFilter("sort_lang",'')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === ''? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >Tất cả</button>
            <button
            onClick={() => updatedFilter("sort_lang",'vietsub')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'vietsub'? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >vietsub</button>
            <button
            onClick={() => updatedFilter("sort_lang",'thuyet-minh')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'thuyet-minh'? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >Thuyết Minh</button>
            <button
            onClick={() => updatedFilter("sort_lang",'long-tieng')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('sort_lang') === 'long-tieng'? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >Lồng Tiếng</button>
          </div>
        </div>
        {/* category */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-white font-medium mb-2 w-[10%] text-right">Thể loại:</h3>
          <div className="grid grid-cols-14 max-[1441px]:grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-4 gap-2 text-center text-white">
            <button
            onClick={() => updatedFilter("category",'')}
            className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('category') === ''? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >Tất cả</button>
            {theloai?.map((item, index) => (
              <button
              onClick={() => updatedFilter("category",item.slug)}
              key={index}
               className={`px-3 py-1 text-white rounded cursor-pointer text-sm ${filtersParam.get('category') === item.slug? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        {/* country */}
        <div className='border-b border-dashed border-gray-700 pb-3 mb-3 flex gap-5'>
          <h3 className="text-white font-medium mb-2 w-[10%] text-right">Quốc gia:</h3>
          <div className="grid grid-cols-12 max-[1300px]:grid-cols-8 max-[800px]:grid-cols-7 max-[500px]:grid-cols-3 gap-2">
            <div 
            onClick={() => updatedFilter('country','')}
            className={`px-3 py-1 text-center hover:text-amber-200 text-white rounded cursor-pointer text-sm ${filtersParam.get('country') === ''? ' text-amber-200 border-1 border-gray-600' : ''}`}>Tất cả</div>
            {quocgia.map((item, index) => (
              <button 
               onClick={() => updatedFilter('country',item.slug)}
               key={index}
               className={`px-3 py-1 text-white hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('country') === item.slug ? ' text-amber-200 border-1 border-gray-600' : ''}`}>
                <div>{item.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div className='flex gap-5 border-dashed border-b border-gray-700 pb-3 mb-3'>
          <h3 className="text-white font-medium mb-2 w-[10%] text-right">Năm:</h3>
          <div className="grid grid-cols-21 max-[1441px]:grid-cols-18 max-[1300px]:grid-cols-12 max-[800px]:grid-cols-8 max-[500px]:grid-cols-4 gap-2">
            <button
            onClick={() => updatedFilter("year", '')}
            className={`px-3 py-1 text-white hover:text-amber-200 rounded cursor-pointer text-sm ${filtersParam.get('year') === '' ? 'text-amber-200 border-1 border-gray-600' : ' hover:text-amber-200'}`}
            >Tất cả</button>
            {years.map((item) => (
              <button
              key={item}
              onClick={() => updatedFilter("year",item.toString())}
              className={`px-3 py-1 text-white  rounded cursor-pointer text-sm ${filtersParam.get('year') === item.toString() ? ' text-amber-200 border-1 border-gray-600' : ''}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex ">
          <div className='w-[10%]'></div>
          <button 
          onClick={() => setOpenfilter(null)}
          className="px-4 py-2 border-gray-500 text-white border-1 rounded-4xl hover:opacity-80 mr-2 flex duration-300">
            Đóng
            <span className='flex items-center text-[20px]'><Icon name="big right" /></span>
          </button>
        </div>
      </div>
    )}
  </div>
);


         return (
    <div className=''>
      
          <div className='mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]'>{filter}</div>
        {loading ? (
        <p className='text-white'><Loading /></p>
      ) : (
        <>
            <div className='grid grid-cols-8 max-[1360px]:grid-cols-5 max-[780px]:grid-cols-4 max-[500px]:grid-cols-2 gap-4 mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]'>
            {Movie?.data.items.map((item, index) => {
              return (
                <Link to={`/phim/${item.slug}`} >
              <div key={index} className='bg-[#676b6d44] p-4 rounded-lg mb-4 group-hover:w-[100px] group-hover:h-[500px] transition-all duration-300 hover:bg-gray-600'>
                <div className='flex'>
                 <img src={`${Movie.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="w-full max-[1441px]:h-[150px] h-[250px] mb-2" />
                 {item.tmdb && item.tmdb.vote_average > 0 && (
                  <p className=" text-sm absolute text-white px-[10px] font-mono py-[5px] bg-red-400 border-white border-2 rounded-b-lg">{item.tmdb.vote_average}</p>
                 )}
                </div>
              <h3 className="text-white text-lg font-semibold line-clamp-1">{item.name}</h3>
              <div className='transition-all duration-300'>
                <p className="text-gray-400 text-sm">{item.chieurap}</p>
                <p className="text-gray-400 text-sm">{item.time}</p>
                <p className="text-gray-400 text-sm">{item.episode_current}</p>
                <p className='text-gray-400 text-sm'>{item.quality}</p>
                <p className="text-gray-400 text-sm line-clamp-1">{item.lang}</p>
                <p className="text-gray-400 text-sm">{item.year}</p>
              </div>
              
              </div>
              </Link>
              )
            })}

            </div>
            <div className='my-16 flex items-center justify-center'>
                <div className='flex text-white gap-3'>
                    <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px]'
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
                        <div className='w-[40%] flex items-center justify-center'>/ {Movie?.data.params.pagination.totalPages}</div>
                    </div>
                    
                    <button className='bg-[#676b6d44] rounded-full p-[10px] w-[50px]'
                    onClick={() => nextpages(parseInt(pages.get("page") || "1") + 1)}
                    >
                        <i className='text-[24px]'><Icon name='big right'/></i>
                    </button>
                </div>
            </div>
          
      </>
      )}
    </div>
    
  );
}

