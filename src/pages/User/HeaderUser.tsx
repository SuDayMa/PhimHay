import { Link } from "react-router-dom"
import Icon from "../../Component/Icon"
export default function HeaderUser () {
    const nav = [
        {
            id: 1, name: 'Yêu thích', icon: 'heart' , path:'/user/favorite'
        },
        {
            id: 2, name: 'Danh sách', icon: '+' , path:'/user/playlist'
        },
        {
            id: 3, name: 'Xem tiếp', icon: 'time'
        },
        {
            id: 4, name: 'Thông báo', icon: 'notification'
        },
        {
            id: 5, name: 'Tài khoản', icon: 'user', path:'/user/profile'
        }
    ]
    console.log("ne",location.pathname)
    return(
        <div className="p-[40px] bg-[#25272F] rounded-2xl text-white ">
            <div className="flex flex-col gap-5">
                <div className="mb-[8px] font-semibold text-[20px]">
                    Quan ly tai khoan
                </div>
                <div className=""> 
                    {nav.map((item: any) => (
                        <Link to={item?.path}>
                        <div className={`py-[16px] flex justify-between border-b-1 border-gray-600 ${location.pathname === item.path ? "text-amber-300":"text-white"}`}>
                        <i><Icon name={item.icon}/></i>
                        <span className="w-[85%]">{item.name}</span>
                        </div>
                        </Link>
                    ))}
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}