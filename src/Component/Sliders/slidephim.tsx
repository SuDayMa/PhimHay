import SlideImage from './PhimMoi/slidephimHan';
import Icon from '../Icon';
import ImageTrung from './PhimMoi/slidePhimTrungQuoc';
import ImageViet from './PhimMoi/slidePhimUs-Uk';
import { Link } from 'react-router-dom';


function SlidePhim() {

    return (
        <>
            <div className="flex max-[1360px]:flex-col max-[1360px]:gap-5">
                <div className="min-[1360px]:w-[12%] bg-center min-[1360px]:flex min-[1360px]:items-center">
                    <div className="pl-[8px] pr-[24px] flex min-[1360px]:flex-col max-[1360px]:justify-between gap-3 ">
                        <div className="text-[28px] max-[1441px]:text-[25px] max-[400px]:text-[13px] font-bold text-[#ffff] ">
                            Phim Hàn Quốc Mới
                        </div>
                        <div className="flex items-center gap-2 text-[14px] max-[400px]:text-[10px] text-[#ffff]">
                            <Link to={"/quoc-gia/han-quoc"}>
                                <span className="">Xem toàn bộ</span>
                            </Link>
                            <p className="text-2xl"><Icon name="small right" /></p>
                        </div>
                    </div>
                </div>
                <div className="min-[1360px]:w-[88%]">
                    <div className="w-full h-full">
                        <SlideImage />
                    </div>
                </div>
            </div>
            <div className="flex max-[1360px]:flex-col max-[1360px]:gap-5 ">
                <div className="min-[1360px]:w-[12%] bg-center min-[1360px]:flex min-[1360px]:items-center ">
                    <div className="pl-[8px] pr-[24px] flex min-[1360px]:flex-col max-[1360px]:justify-between gap-3 ">
                        <div className="text-[28px] max-[1441px]:text-[25px] font-bold text-[#ffff] max-[400px]:text-[13px]">
                            Phim Trung Quốc Mới
                        </div>
                        <div className="flex items-center gap-2 text-[14px] text-[#ffff] max-[400px]:text-[10px]">
                            <Link to={"/quoc-gia/trung-quoc"}>
                                <span className="">Xem toàn bộ</span>
                            </Link>
                            <p className="text-2xl"><Icon name="small right" /></p>
                        </div>
                    </div>
                </div>
                <div className="min-[1360px]:w-[88%]">
                    <div className="w-full h-full">
                        <ImageTrung />
                    </div>
                </div>
            </div>
            <div className="flex max-[1360px]:flex-col max-[1360px]:gap-5">
                <div className="min-[1360px]:w-[12%] bg-center min-[1360px]:flex min-[1360px]:items-center">
                    <div className="pl-[8px] pr-[24px] flex min-[1360px]:flex-col max-[1360px]:justify-between gap-3 ">
                        <div className="text-[28px] max-[1441px]:text-[25px] font-bold text-[#ffff] max-[400px]:text-[13px] ">
                            Phim US-UK Mới
                        </div>
                        <div className="flex items-center gap-2 text-[14px] text-[#ffff] max-[400px]:text-[10px]">
                            <Link to={"/quoc-gia/au-my"}>
                                <span className="">Xem toàn bộ</span>
                            </Link>
                            <p className="text-2xl"><Icon name="small right" /></p>
                        </div>
                    </div>
                </div>
                <div className="min-[1360px]:w-[88%]">
                    <div className="w-full h-full">
                        <ImageViet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default SlidePhim;