import type { Year } from "../types/Phimtype";
import { useState , useEffect, useId } from "react";
import { YearAPI } from "../Services/API";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function Year () {
    const [yearmovie, setYearMovie] = useState<Year | null>(null)
    const [pages, setPage] = useSearchParams();
    const [filtersParam, setFiltersParam] = useSearchParams();
    const {type_list} = useParams();
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
        const YearData = async () => {
            try{
                setLoading(true)
                if(!type_list) return

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
                const yearphim = await YearAPI(
                    Number(type_list),
                    parseInt(currentPage),
                    params.sort_field,
                    params.sort_type,
                    params.sort_lang,
                    params.category,
                    params.country,
                    Number(params.year),
                    params.limit
                )
                setYearMovie(yearphim)
                console.log('nam',yearphim)
            }catch(error){
                console.log("loading loi",error)
            }finally{
                setLoading(false)
            }
        }
        YearData();
    },[type_list])



    return(
        <div>
        {loading? (
            <div><Loading/></div>
        ):(
            <>
            <div className='grid grid-cols-8 max-[1360px]:grid-cols-5 max-[780px]:grid-cols-4 max-[500px]:grid-cols-2 gap-4 mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]'>
            {yearmovie?.data.items.map((item, index) => {
              return (
                <Link to={`/phim/${item.slug}`} >
              <div key={index} className='bg-[#676b6d44] p-4 rounded-lg mb-4 group-hover:w-[100px] group-hover:h-[500px] transition-all duration-300 hover:bg-gray-600'>
                <div className='flex'>
                 <img src={`${yearmovie.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className="w-full max-[1441px]:h-[150px] h-[250px] mb-2" />
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
            {/* <div className='my-16 flex items-center justify-center'>
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
            </div> */}
          
            </>
        )}
        </div>
    )
}