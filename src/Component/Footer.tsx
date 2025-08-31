import vn from '../assets/img/vn_flag.svg'
import phimhay from '../assets/img/logophimhay.png'
import Icon from './Icon'

function Footer () {
    return(
        <>
        <div className="bg-black">
            <div className="mx-[330px] max-[2000px]:mx-[0px] px-[50px] max-[2000px]:px-[20px]">
                <div className="py-[32px] flex">
                    <div className='w-[60%] max-[1100px]:w-[100%] max-[1100px]:flex max-[1100px]:flex-col max-[1100px]:items-center'>
                        <div className='mb-[24px] max-[1100px]:flex max-[1100px]:items-center max-[1100px]:justify-center'>
                            <div className=' bg-red-800 flex px-[10px] py-[8px] w-[50%] max-[2000px]:w-[50%] max-[1441px]:w-[60%] max-[1100px]:w-[35%] max-[800px]:w-[45%] max-[500px]:w-[90%] max-[400px]:w-[100%] max-[1100px]:text-[14px] rounded-3xl text-[#ffff] '>
                                <img src={vn} alt="" className='w-[5%] '/>
                                <span className='pl-5 flex text-center'>Hoàng Sa & Trường Sa là của  Việt Nam!</span>
                            </div>
                        </div>
                        <div className='flex text-[#ffff] mb-[32px] max-[1100px]:gap-8 max-[1100px]:flex-col max-[2000px]:w-[70%] max-[1441px]:w-[80%] max-[1100px]:w-[50%] max-[800px]:w-[70%] max-[500px]:w-[100%] max-[1100px]:items-center'>
                            <div className=' w-[200px] pr-5'>
                                <img src={phimhay} alt="#"/>
                            </div>
                            <div className='max-[1100px]:pl-0 pl-[48px] max-[1100px]:border-hidden border-l-1 border-gray-600 pr-[10px] gap-2 max-[424px]:gap-1 flex items-center justify-between max-[500px]:w-[90%] left-0 text-center'>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='telegram'/></p></a>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='discord'/></p></a>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='x'/></p></a>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='facebook'/></p></a>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='tiktok'/></p></a>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='youtube'/></p></a>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='500px'/></p></a>
                                <a className='bg-[#282B3A] rounded-[50%] px-3 max-[424px]:px-2'><p className='h-[35px] flex justify-center items-center'><Icon name='instagram'/></p></a>
                            </div>
                        </div>
                        <div className='mb-[16px] flex text-[#ffff] max-[590px]:text-[10px] max-[424px]:text-[8px] max-[370px]:text-[6px]'>
                            <a href="" className='mr-[24px]'>Hỏi-đáp</a>
                            <a href="" className='mr-[24px]'>Chính sách bảo mật</a>
                            <a href="" className='mr-[24px]'>Điều khoản sử dụng</a>
                            <a href="" className='mr-[24px]'>Giới thiệu</a>
                            <a href="" className=''>Liên hệ</a>
                        </div>
                        <div className='text-gray-400 mb-[8px] max-[500px]:text-[14px] max-[400px]:text-[12px]'>
                            RoPhim – Phim hay cả rổ - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
                        </div>
                        <div className='text-gray-400 '>
                            © 2024 RoPhim
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Footer