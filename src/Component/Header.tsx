import rophim from '../assets/img/logo.svg'
import Icon from './Icon'
import { useEffect, useState, useRef } from 'react';
import { QuocgiaAPI, ListSearchAPI} from '../Services/API';
import { TheloaiAPI } from '../Services/API';
import type { Theloai } from '../types/Phimtype';
import type { QuocGia } from "../types/Phimtype";
import type { SearchMovie } from '../types/Phimtype';
import aapicon from '../assets/img/appicon.png'

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import Login from './Login';


type NavbarItem = {
    title: string;
    id: number;
    link?:  string;
    sub?: { title: string; link: string }[];
}

function Header () {
    const [keyword, setKeyWord] = useState('');

    const [quocgia, setQuocgia] = useState<QuocGia[]>([]);
    const [loading, setLoading] = useState(false);
    const [theloai, setTheloai] = useState<Theloai[]>([]);
    const navigate = useNavigate();
    const [listdata, setListData] = useState<SearchMovie | null>(null)
    const submenuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const [Navbar, setNavbar] = useState<NavbarItem[]>([
        { title: 'Chủ đề', id: 1, link : '/chu-de'},
        { title: 'Thể loại', id: 2, sub: []},
        { title: 'Phim lẻ', id: 3, link: '/danh-sach/phim-le'},
        { title: 'Phim bộ', id: 4, link: '/danh-sach/phim-bo' },
        { title: 'Quốc gia', id: 5, sub: []},
        { title: 'Hoạt hình', id: 6, link: '/danh-sach/hoat-hinh'},
        { title: 'Diễn viên', id: 7, link: '#'}
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const quocgiaData = await QuocgiaAPI();
                const theloaiData = await TheloaiAPI();
                setQuocgia(quocgiaData);
                setTheloai(theloaiData);
                const updatedNavbar = Navbar.map(item => {
                    if (item.id === 2) {
                        return {
                            ...item,
                            sub: theloaiData.map((theloai : Theloai) => ({
                                title: theloai.name,
                                link: `/the-loai/${theloai.slug}`
                            }))
                        };
                    }
                    if (item.id === 5) {
                        return {
                            ...item,
                            sub: quocgiaData.map((qg : QuocGia) => ({
                                title: qg.name,
                                link: `/quoc-gia/${qg.slug}`
                            }))
                        };
                    }
                    
                    return item;
                });

                setNavbar(updatedNavbar);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    const fetchSearchData = async () => {
      if (!keyword.trim()) {
        return;
      }
      try {
        setLoading(true);
        const searchdata = await ListSearchAPI(keyword);
        setListData(searchdata);
      } catch (error) {
        console.log('Lỗi search', error);
        setListData(null);
      } finally {   
        setLoading(false);
      }
    };
    fetchSearchData();
    
  }, [keyword]);

  
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
                setOpenSubMenu(null);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && keyword.trim()) {
            navigate(`/tim-kiem?keyword=${(keyword.trim())}`);
        }
    }

    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const toggleSubMenu = (id: number) => {
        setOpenSubMenu(openSubMenu === id ? null : id);
    };
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    
    const HeaderNabar = Navbar.map((item) => (
        <div key={item.id} className='px-[10px] flex items-center relative'>
            <div onClick={() => item.sub && toggleSubMenu(item.id)} className='flex gap-2 cursor-pointer'>
                <a className='flex gap-2'>
                {item.link ? (
                    <Link to={item.link}>
                        <p className='text-[14px] max-[1441px]:text-[13px] flex items-center '>{item.title}</p>
                    </Link>
                ) : (
                    <p className='text-[14px] max-[1441px]:text-[13px] flex items-center '>{item.title}</p>
                )}
                {item.sub && item.sub.length > 0 && (
                <a className='text-[16px] flex items-center'><Icon name='down'/></a>
                )}
                </a>
            </div>
            {item.sub && item.sub.length > 0  && (
               <div className={`absolute text-white left-0 top-[110%] z-10 w-[500px] max-[700px]:w-[170px] max-[700px]:text-center bg-black max-[1100px]:max-h-[500px] max-[1100px]:overflow-auto opacity-90 rounded-md shadow-lg ${openSubMenu === item.id ? 'block' : 'hidden'}`}>
                    {item.id === 2 && (
                        <ul className={'py-2 grid grid-cols-4 max-[700px]:grid-cols-1'} >
                        {item.sub.map((subitem) => (
                            <li key={subitem.link} className="px-4 py-1 line-clamp-1 hover:bg-gray-700 hover:text-amber-400 w-[120px]  ">
                                <a className='text-[16px]' >
                                    <Link to={subitem.link}>
                                    {subitem.title}
                                    </Link>
                                </a>
                            </li>
                        ))}
                    </ul>
                    )}
                    {item.id === 5 && (
                        <ul className={'py-2 grid grid-cols-3 max-[700px]:grid-cols-1'} >
                        {item.sub.map((subitem) => (
                            <li key={subitem.link} className="px-4 py-1 line-clamp-1 hover:bg-gray-700 hover:text-amber-400 w-[150px]">
                                <a className='text-[16px]'>
                                    <Link to={subitem.link}>
                                    {subitem.title}
                                    </Link>
                                </a>
                            </li>
                        ))}
                    </ul>
                    )}
               </div>
            )}
        </div>
        
    ))
        
    const [visible, setVisible] = useState(false);
    const handroll = () => {
    if (window.scrollY > 10){
        setVisible(true);
    }else{
        setVisible(false);
    }
}

window.addEventListener('scroll', handroll);

// Ham loc tim kiem
const searchphim = (
    <>
        {keyword.trim() && (
            <div className="absolute max-[1360px]:w-[95%] top-[60px] bg-[#191b24cb] w-[20%] p-[20px] py-2 rounded-md shadow-lg z-50 max-h-[500px] overflow-auto">
                {loading ? (
                    <div className="text-white text-center">Đang tìm ...</div>
                ) : listdata?.data.items && listdata.data.items.length > 0 ? (
                    <div>
                        {listdata.data.items.map((item,index) => (
                            <div key={index}>
                                <div>
                                    <Link to={`/phim/${item.slug}`} className='flex hover:bg-[#2528337a] rounded-md'>
                                        <img src={`${listdata.data.APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`} className='w-[20%] min-[550px]:w-[10%] min-[1100px]:w-[5%] min-[1360px]:w-[20%] p-[9px]'/>
                                        <div className='w-[90%] text-[14px] line-clamp-1 p-[10px]'>
                                            <p className='line-clamp-1 text-white font-semibold'>{item.name}</p>
                                            <p className='text-[12px] text-gray-400 line-clamp-1'>{item.origin_name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            ))}
                    </div>
                ): (
                    <div className='text-center'>Không có Phim này</div>
                    )}
                    </div>
                )}
        </>
)

if(quocgia) 
if(theloai)
    

    return(
        <>
            <div className={`sticky top-0 z-50 ${visible ? 'bg-black opacity-100 duration-500  ' : 'duration-300'}`}>
                <div className=' px-[6px] min-[1360px]:px-[20px] min-[14450]:px-[32px] h-[80px] '>
                    <div className='flex items-center justify-between gap-5 text-[24px] max-[1360px]:pt-[10px]'>
                        <button className='text-white absolute min-[1360px]:hidden' onClick={() => setIsNavOpen(!isNavOpen)}>
                            {isNavOpen ? <i className='text-red-400'><Icon name='x'/></i>:<Icon name='menu'/>}
                        </button>
                        <div className='flex w-[10%] max-[1360px]:ml-[50px]'>
                            <Link to='/'>
                            <img src={rophim} alt="" className='w-[90%] object-cover'/>
                            </Link>
                        </div>
                        <button className='text-white min-[1360px]:hidden' onClick={() => setSearchOpen(!searchOpen)}>
                            {searchOpen ? <i className='text-red-400'><Icon name='x'/></i>:<i><Icon name='tim kiem'/></i>}
                        </button>
                        <div className='flex text-white items-center w-[20%] h-[80px] max-[1360px]:hidden'>
                            <div className=' absolute text-[18px] pl-[15px] flex items-center'><Icon name='tim kiem'/></div>
                                    
                                        <input 
                                        autoComplete='on'
                                        type="text"
                                        onChange={(e) => setKeyWord(e.target.value)}
                                        onKeyDown={handleKeyDown} 
                                        value={keyword}
                                        placeholder='Tìm kiếm phim, diễn viên' 
                                        className='px-[48px] w-full flex rounded-md text-white text-[16px] bg-[#2b314183] items-center py-[5px]' 
                                        />{searchphim}
                                
                                
                        </div>
                        
                        <div className='flex gap-2 grow-1 max-[1360px]:hidden'>
                            <div className='text-white items-center flex '>
                                <div className=' flex min-[1450px]:gap-3 gap-1'>
                                    {HeaderNabar}   
                                </div>
                            </div>
                            <div className='grow-1 invisible'></div>
                            <div className='text-white flex text-right pr-[20px] items-center border-r-1 border-white justify-end'>
                                    <a  onClick={() => setIsOpenMenu(!isOpenMenu)} className='flex text-[30px] px-[20px] cursor-pointer'>
                                        <Icon name='devices'/>
                                        <div className='flex flex-col '>
                                            <span className='text-[12px]'>Tải ứng dụng</span>
                                            <strong className='text-[14px]'>RoPhim</strong>
                                        </div>
                                    </a>
    

                            </div>
                            <div >
                                <Login/>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {/* isnavopen */}
                        <div className={`absolute p-[24px] h-auto flex flex-col max-[1440px]:w-[350px] max-[400px]:w-[280px] max-[1440px]:top-18 z-100 bg-[#3A4782] rounded-lg duration-500 min-[1360px]:hidden ${isNavOpen ? 'translate-x-2' : 'hidden '}`}>
                            <div><Login/></div>
                            <div className='px-[9.5px] py-[8px] flex gap-3 bg-[#485386] rounded-lg mb-[15px]'>
                                <div className='flex justify-center items-center text-3xl text-amber-200'>
                                    <Icon name='devices'/>
                                </div>
                                <div className='flex flex-col text-white'>
                                    <span className='text-[12px]'>Tải ứng dụng</span>
                                    <strong className='text-[14px]'>RoPhim</strong>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-2 text-white'>
                                    {HeaderNabar}
                                </div>
                        </div>
                        {/* searchOpen */}
                        <div className={`absolute p-[24px] w-full h-[70px] -top-4 flex flex-col z-100 rounded-lg duration-500 ${searchOpen ? '-translate-x-5' : 'hidden '}`}>
                            <div  className=' absolute text-[18px] pt-2 pl-[15px] text-white flex items-center justify-center'><Icon name='tim kiem'/></div>
                            <input 
                            type="text"
                            onChange={(e) => setKeyWord(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={keyword}
                            placeholder='Tìm kiếm phim, diễn viên' 
                            className='px-[48px] w-full flex rounded-md text-white text-[16px] bg-[#2b3141] border-1 border-white items-center py-[5px]' 
                            />{searchphim}
                        </div>
                        {/* isOpenMenu */}
                        <div className={`absolute p-[16px] h-[150px] right-0 flex flex-col max-[1441px]:w-[250px] w-[15%] max-[1440px]:top-18 z-100 bg-white gap-5 rounded-3xl duration-500 ${isOpenMenu ? '-translate-x-50' : 'hidden '}`}>
                            <div className='flex justify-between'>
                                <img src={aapicon} className='w-[50px] rounded-lg max-[1441px]:w-[40px] max-[1441px]:h-[40px] '/>
                                <div className='text-[15px] max-[1441px]:text-[12px] w-[70%]'>Chọn thiết bị tương ứng để tải và cài đặt</div>
                            </div>
                            <div className='flex items-center justify-center gap-2'>
                                <a href="#" className='flex gap-2 px-[8px] py-[6px] border-2 border-gray-400 hover:border-black rounded-lg'>
                                    <i><Icon name='desktop'/></i>
                                    <span className='max-[1441px]:text-[10px]'>Android TV</span>
                                </a>
                                <a href="#" className='flex gap-2 px-[8px] py-[6px] border-2 border-gray-400 hover:border-black rounded-lg'>
                                    <i><Icon name='mobile'/></i>
                                    <span className='max-[1441px]:text-[10px]'>Điện thoại</span>
                                </a>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header