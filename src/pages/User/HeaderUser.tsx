import { Link } from "react-router-dom"
import Icon from "../../Component/Icon"
import { useNavigate } from "react-router-dom"
export default function HeaderUser () {
    const Navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
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
            id: 5, name: 'Tài khoản', icon: 'user', path:`/user/profile/${user.id}`
        }
    ]


    const handlelogout = () => {
        localStorage.removeItem('user')
        Navigate('/')
    }
    return(
        <div className="p-[40px] bg-[#25272F] max-[1121px]:p-0 rounded-2xl text-white ">
            <div className="flex flex-col gap-5 max-[1121px]:gap-0">
                <div className="mb-[8px] font-semibold text-[20px] max-[1121px]:px-[16px] max-[1121px]:py-[16px]">
                    Quan ly tai khoan
                </div>
                <div className="hidden max-[1121px]:block">
                    <div className="grid-cols-5 grid max-[500px]:text-[11px]">
                    {nav.map((item: any) => (
                        <Link to={item?.path}>
                        <div className={`py-[16px] flex gap-2 justify-center max-[801px]:flex-col ${location.pathname === item.path ? "text-amber-300":"text-white"}`}>
                        <i><Icon name={item.icon}/></i>
                        <span>{item.name}</span>
                        </div>
                        </Link>
                    ))}
                    </div>
                </div>
                <div className="mb-[128px] max-[1121px]:mb-0 max-[1121px]:hidden"> 
                    {nav.map((item: any) => (
                        <Link to={item?.path}>
                        <div className={`py-[16px] flex justify-between border-b-1 border-gray-600 ${location.pathname === item.path ? "text-amber-300":"text-white"}`}>
                        <i><Icon name={item.icon}/></i>
                        <span className="w-[85%]">{item.name}</span>
                        </div>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col gap-5 max-[1121px]:hidden">
                    <div>
                    <img src={user.picture} alt="avatar" className=" rounded-full w-20 border-4 border-white"/>
                    </div>
                    <div>
                    <div className="text-[14px] text-gray-400">
                        <span>{user.name}</span>
                    </div>
                    <div className="mb-[14px] text-[14px] text-gray-400">
                        <span>{user.email}</span>
                    </div>
                    <div className="flex gap-2">
                        <i className="flex justify-center items-center"><Icon name="out"/></i>
                        <button onClick={handlelogout}>Đăng xuất</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}