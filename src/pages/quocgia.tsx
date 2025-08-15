

import { useEffect,useState } from "react";

import Icon from "../Component/Icon";

import {QuocgiaAPI} from "../Services/API";
import type { QuocGia } from "../types/Phimtype";
import loi404 from "../assets/img/404.svg";



export default function Quocgia() {
    // Khai báo type cho state đúng với kiểu dữ liệu trả về từ API
    const [quocgiaid, setquocgiaid] = useState<QuocGia[]>([]);
   
    
    useEffect(() => {
        const fetchQuocgia = async () => {
            try {
                
                const quocgia = await QuocgiaAPI();
                setquocgiaid(quocgia);
            } catch (error) {
                console.error("Error fetching Quocgia data:", error);
            }
        };
        
        fetchQuocgia();
    }, []);
    if(quocgiaid)
    return (
        <div>
                <div>
                    <div className="pb-[200px] ">
                        <div className="my-[96px] mx-[273px] px-[30px] ">
                            <div className="flex justify-center">
                                <img src={loi404} alt="404 Not Found" className="h-[200px] sepia opacity-35" />
                            </div>
                            <div className="text-[32px] font-bold text-[#ffff] text-center mt-4 mb-[16px]">
                                Lỗi 404 - Không tìm thấy trang
                            </div>
                            <div className="pb-[48px] text-[#ffff] text-center">
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
        </div>
    )

}