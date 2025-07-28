import { Routes, Route  } from "react-router-dom";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../Component/Icon";
import {TheloaiAPI} from "../Services/API";
import type { Theloai } from "../types/Phimtype";
import loi404 from "../assets/img/404.svg";

export default function Theloai() {
    const [ theloaiid, settheloaiid ] = useState<Theloai[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadingtheloai = async () => {
            try {
                setLoading(true);
                const theloai = await TheloaiAPI();
                settheloaiid(theloai);
            }
            catch (error){
                console.error("Error fetching Theloai data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadingtheloai();
    },[]);
    return (
    <div>
        {loading ? (
            <div className='text-white bg-[#191B24] py-[90px] px-[50px]'>Loading...</div>
        ) : (
            <div>
                    <div className="pb-[200px] ">
                        <div className="my-[96px] mx-[273px] px-[30px] ">
                            <div className="flex justify-center">
                                <img src={loi404} alt="404 Not Found" className="h-[200px] sepia opacity-35" />
                            </div>
                            <div className="text-[32px] font-bold text-white text-center mt-4 mb-[16px]">
                                Lỗi 404 - Không tìm thấy trang
                            </div>
                            <div className="pb-[48px] text-white text-center">
                                Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra đường dẫn hoặc quay về trang chủ.
                            </div>
                            <div className="flex justify-center ">
                                <a href="/" className="flex items-center gap-2 bg-amber-200 rounded-4xl py-[11px] px-[24px] ">
                                <i className="text-3xl flex items-center">{<Icon name="small left" />}</i>
                                <span>Quay về trang chủ</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        )}
    </div>
    );
}

