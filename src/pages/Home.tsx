import Icon from "../Component/Icon"
import Slide from "../Component/Sliders/slide"
import SlidePhim from "../Component/Sliders/slidephim"
import SliderPhim from "../Component/Sliders/phimlichsu/sliderphim"
import SlidePhimbo from "../Component/Sliders/PhimBo/Slidephimbo"

import { Link } from "react-router-dom"
function Home(){
    

    return(
        <>
        <div className="">
            
            <div className="">
                <div>
               <Slide/> 
                </div>
            </div>
            <div className="flex flex-col gap-[50px] mt-[50px] mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]">
                <div className=" px-[10px] h-full">
                    <div className="mb-[19px] flex text-white text-[28px] font-bold max-[400px]:text-[20px]">
                        <h3>Bạn đang quan tâm gì?</h3>
                    </div>
                    <div className="grid grid-cols-7 justify-between gap-5 max-[426px]:gap-3 max-[1441px]:grid-cols-6 max-[1440px]:grid-cols-5 max-[1024px]:grid-cols-4 max-[789px]:grid-cols-3 ">
                        <a className="bg-blue-400 rounded-xl hover:-translate-y-[10px] transition-all duration-300">
                            <Link to='/c/vien-tuong'>
                            <div className=" flex pl-5 pr-10 py-5  h-full max-[600px]:px-2">
                                <div className="flex flex-col justify-end max-[600px]:justify-center w-full gap-3 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold max-[600px]:text-[16px] max-[426px]:text-[10px] ">
                                        Viễn Tưởng
                                    </div>
                                    <div className="text-[14px] flex items-center gap-1 max-[600px]:hidden">
                                        <span>Xem chủ đề</span>
                                        <p className="text-2xl"><Icon name="small right" /></p>
                                    </div>
                                </div>
                            </div>
                             </Link>
                            </a>

                        <a className=" bg-[#8282AC] rounded-xl hover:-translate-y-[10px] transition-all duration-300">
                            <Link to='/c/the-thao'>
                            <div className=" flex pl-5 pr-10 py-5 h-full max-[600px]:px-2">
                                <div className="flex flex-col justify-end max-[600px]:justify-center w-full gap-3 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold max-[600px]:text-[16px] max-[426px]:text-[10px]">
                                        Thể Thao
                                    </div>
                                    <div className="text-[14px] flex items-center gap-1 max-[600px]:hidden">
                                        <span>Xem chủ đề</span>
                                        <p className="text-2xl"><Icon name="small right" /></p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>

                        <a className=" bg-[#409984] rounded-xl hover:-translate-y-[10px] transition-all duration-300 max-[789px]:hidden">
                            <Link to="/c/am-nhac">
                            <div className=" flex pl-5 pr-10 py-5 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold">
                                        Âm Nhạc
                                    </div>
                                    <div className="text-[14px] flex items-center gap-1">
                                        <span>Xem chủ đề</span>
                                        <p className="text-2xl"><Icon name="small right" /></p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>

                        <a className=" bg-[#9281C2] rounded-xl hover:-translate-y-[10px] transition-all duration-300 max-[1024px]:hidden">
                            <Link to="/c/gia-dinh" >
                            <div className=" flex pl-5 pr-10 py-5 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold">
                                        Gia Đình
                                    </div>
                                    <div className="text-[14px] flex items-center gap-1">
                                        <span>Xem chủ đề</span>
                                        <p className="text-2xl"><Icon name="small right" /></p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>

                        <a className=" bg-[#D6947B] rounded-xl hover:-translate-y-[10px] transition-all duration-300 max-[1440px]:hidden">
                            <Link to="/c/hoc-duong">
                            <div className=" flex pl-5 pr-10 py-5 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold">
                                        Học Đường
                                    </div>
                                    <div className="text-[14px] flex items-center gap-1">
                                        <span>Xem chủ đề</span>
                                        <p className="text-2xl"><Icon name="small right" /></p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>


                        <a className=" bg-[#B75C5C] rounded-xl hover:-translate-y-[10px] transition-all duration-300 max-[1500px]:hidden">
                            <Link to="/c/co-trang">
                            <div className=" flex pl-5 pr-10 py-5 h-full">
                                <div className="flex flex-col justify-end w-full gap-3 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold">
                                        Cổ Trang
                                    </div>
                                    <div className="text-[14px] flex items-center gap-1">
                                        <span>Xem chủ đề</span>
                                        <p className="text-2xl"><Icon name="small right" /></p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>

                        <a className=" bg-[#525565] rounded-xl hover:-translate-y-[10px] transition-all duration-300 max-[1500px]:hidden">
                            <Link to="/chu-de">
                            <div className=" flex p-8 h-full">
                                <div className="flex flex-col justify-center items-center w-full gap-5 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold">
                                        +4 Chủ Đề
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>
                        
                        <a className=" bg-[#525565] rounded-xl hover:-translate-y-[10px] transition-all duration-300 hidden max-[1441px]:block max-[1025px]:hidden">
                            <Link to="/chu-de">
                            <div className=" flex p-8 h-full">
                                <div className="flex flex-col justify-center items-center w-full gap-5 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold">
                                        +5 Chủ Đề
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>
                        <a className=" bg-[#525565] rounded-xl hover:-translate-y-[10px] transition-all duration-300 hidden max-[1025px]:block max-[789px]:hidden">
                            <Link to="/chu-de">
                            <div className=" flex p-8 h-full">
                                <div className="flex flex-col justify-center items-center w-full gap-5 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold">
                                        +6 Chủ Đề
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>
                        <a className=" bg-[#525565] rounded-xl hover:-translate-y-[10px] transition-all duration-300 hidden max-[789px]:block">
                            <Link to="/chu-de">
                            <div className=" flex p-8 max-[426px]:py-5 max-[600px]:px-2 h-full">
                                <div className="flex flex-col justify-center items-center w-full gap-5 h-full text-white">
                                    <div className="text-[28px] max-[1360px]:text-[19px] max-[1441px]:text-[22px] font-bold max-[600px]:text-[16px] max-[426px]:text-[10px]">
                                        +8 Chủ Đề
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </a>
                    </div>
                </div>
                <div className="min-[641px]:px-[20px] min-[800]:px-[50px]">
                    <div className="p-[32px] min-[641px]:rounded-2xl flex flex-col gap-10 bg-[#2B3141]">
                        <SlidePhim />
                    </div>
                </div>
                <div className="min-[641px]:px-[50px]">
                    <div className="flex mb-[19px] text-white text-[28px] max-[400px]:text-[23px] font-bold gap-5 items-center">
                        
                            <h2>Phim Lịch Sử</h2>
                            <Link to={"/the-loai/lich-su"}>
                            <div className=" rounded-full border-1 h-[30px] border-white flex items-center justify-center">
                                <a><Icon name="small right" /></a>
                            </div>
                            </Link>
                    </div>
                    <div className="w-full h-full mb-[50px]">
                        <SliderPhim />
                    </div>

                </div>
                <div className="min-[641px]:px-[50px]">
                    <div className="flex mb-[19px] text-white text-[32px] max-[400px]:text-[23px] font-bold gap-5 items-center">
                        <h2>Top 10 phim bộ hôm nay</h2>
                    </div>
                    <div className="w-full h-full mb-[50px]">
                        <SlidePhimbo/>
                    </div>

                </div>
            </div>
            
        </div>
        </>
    )
}
export default Home