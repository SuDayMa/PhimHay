import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Icon from './Icon';
import rophimlogin from '../assets/img/rophim-login.jpg'
import { Link } from 'react-router-dom';

type profileType = {
    name: string,
    email: string,
    picture: string,
}; 
export default function Login () {
   const [user, setUser] = useState<any>(null)
   const [profile, setProfile] = useState<profileType | null>(null)
   const [islogout, setIsLogout] = useState(false)
   const [isOpenLogin, setIsOpenLogin] = useState(false)
   const [isOpenprofile, setIsOpenProfile] = useState(false)

   const login = useGoogleLogin({
    onSuccess: (codeRespone) => setUser (codeRespone),
    onError: (error) => console.log('Dang nhap that bai',error),
   })

   const UserInfore = JSON.parse(localStorage.getItem('user') || '{}')
   const fetchUserProfile = async (accessToken: string) => {
    try{
        const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }

      );
      setProfile(res.data)
    }catch(err){
        console.log('loi khi lay thong tin user:',err);
    }

    
   } 

   console.log('profile', profile)

   useEffect(() => {
    if(profile && !UserInfore.sub){
        localStorage.setItem('user',JSON.stringify(profile))
        window.location.reload();
    }

   },[profile, UserInfore.sub])

   useEffect(() => {
    if(user?.access_token){
        fetchUserProfile(user.access_token)
    }
   },[user]);

   useEffect(() => {
    if(islogout){
    localStorage.removeItem('user')
    window.location.reload();
    }
   },[islogout])

   const handlelogout = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
    setIsLogout(true);
   }

   
   
   console.log('user1',UserInfore)
return(
    <div>
        
        
        {UserInfore && UserInfore.sub ? (
            <div onClick={() => setIsOpenProfile(!isOpenprofile)} className='flex justify-center items-center'>
                <img src={UserInfore.picture} alt="User Avata" className=' rounded-full w-[50%] border-4 border-white' />
            </div>
        ): (
            <>
            <div>
            <a onClick={() => setIsOpenLogin(!isOpenLogin)}>
                <button className='px-[22px] py-[10px] bg-white rounded-4xl cursor-pointer'>
                    <div className='flex gap-2'>
                        <p className='text-[14px] max-[1441px]:flex max-[1441px]:items-center'><Icon name='user'/></p>
                        <span className='text-[14px] max-[1441px]:flex max-[1441px]:items-center'>thành viên</span>
                    </div>
                </button>
            </a>
        </div>
            
            </>
        )}


        <div className={`absolute p-[16px] top-0 left-1/2 text-white w-[100%] max-[2000px]:h-[1000px] h-[1310px] text-whitez-100 bg-[#1e25459d] duration-500 ${isOpenLogin ? '-translate-x-1/2' : 'hidden '}`}>
                <div className='mx-[330px] max-[700px]:mx-[100px] max-[426px]:mx-[0px] flex justify-center items-center py-[250px] max-[2000px]:py-[150px]'>
                    <div className='w-[26%] max-[1441px]:w-[40%] max-[426px]:hidden max-[2000px]:w-[40%]'>
                        <img src={rophimlogin} className=' rounded-l-2xl'/>
                    </div>
                    <div className='p-[64px] max-[426px]:p-[21px] bg-[#1E2545] h-[725px] max-[1441px]:h-[450px] rounded-r-2xl max-[342px]:p-[5px]'>
                        <button
                        className='absolute translate-x-110 max-[1580px]:translate-x-90 -translate-y-10 cursor-pointer max-[426px]:translate-x-70 max-[426px]:translate-y-2 text-white'
                        onClick={() => setIsOpenLogin(false)}
                        >
                            <i><Icon name='x'/></i>
                        </button>
                        <div className='mb-[20px] w-[300px]'>
                            <h4 className='text-[24px] font-semibold'>Đăng nhập</h4>
                        </div>
                        <div>
                            <p className='mb-[24px]'>nếu bạn chưa có tài khoản, <a href="" className='text-amber-200'>Đăng ký ngay</a></p>
                                <div className='mb-[12px]'>
                                    <input className='py-[8px] px-[16px] w-[100%] border-1 border-gray-500 rounded-md' type="email" placeholder='Email' name='email'/>
                                </div>
                                <div className='mb-[40px]'>
                                    <input className='py-[8px] px-[16px] w-[100%] border-1 border-gray-500 rounded-md' type="password" placeholder='Mật khẩu' name='password'/>
                                </div>
                                <div className='text-center mb-[24px]'>
                                    <button className='bg-amber-200 w-[100%] py-[5px] rounded-md text-black font-semibold'>Đăng nhập</button>
                                </div>
                                <div className='text-center font-semibold mb-[24px]'>
                                    <a >Quên mật khẩu?</a>
                                </div>
                                <div className='w-[100%] flex items-center justify-center'>
                                    <button  onClick={() => login()} className='flex gap-2 bg-[#ffffff] rounded-full p-2 text-black font-semibold hover:bg-gray-400 cursor-pointer'> <span className='flex justify-center items-center'><Icon name='google'/></span>Đăng nhập với Google</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* isopenprofile */}
            <div className={`absolute py-[8px] h-[262px] right-0 flex flex-col max-[1441px]:w-[20%] w-[10%] max-[1440px]:top-18 bg-[#2B3141] text-white top-18 z-100  rounded-3xl duration-500 ${isOpenprofile ? '-translate-x-10' : 'hidden '}`}>
                <div className='py-[6px] px-[16px] flex text-[15px] border-b-1 border-gray-600 '>
                    <span>{UserInfore.name}</span>
                </div>
                <Link to={'/user/favorite'}>
                <div className='py-[9px] px-[16px] flex gap-2 text-[15px] hover:bg-gray-600 cursor-pointer'>
                    <i className='flex justify-center items-center'><Icon name='heart'/></i>
                    <span>Yêu thích</span>
                </div>
                </Link>
                <Link to={'/user/playlist'}>
                <div className='py-[9px] px-[16px] flex gap-2 text-[15px] hover:bg-gray-600 cursor-pointer'>
                    <i className='flex justify-center items-center'><Icon name='+'/></i>
                    <span>Danh sách</span>
                </div>
                </Link>
                <div className='py-[9px] px-[16px] flex gap-2 text-[15px] hover:bg-gray-600 cursor-pointer'>
                    <i className='flex justify-center items-center'><Icon name='time'/></i>
                    <span>Xem tiếp</span>
                </div>
                <Link to={'/user/profile'}>
                <div className='py-[9px] px-[16px] flex gap-2 text-[15px] hover:bg-gray-600 cursor-pointer'>
                    <i className='flex justify-center items-center'><Icon name='user'/></i>
                    <span>Tài khoản</span>
                </div>
                </Link>
                <div onClick={handlelogout} className='py-[9px] px-[16px] flex gap-2 text-[15px] border-t-1 border-gray-600 hover:bg-gray-600 cursor-pointer'>
                    <i className='flex justify-center items-center'><Icon name='out'/></i>
                    <span>Đăng xuất</span>
                </div>
            </div>
    </div>
)

   
}