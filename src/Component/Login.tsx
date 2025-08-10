import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Icon from './Icon';
import rophimlogin from '../assets/img/rophim-login.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type profileType = {
    name: string,
    email: string,
    picture: string,
    sub: string,
    id: number,
}; 


export default function Login () {
    const navigate = useNavigate()
   const [user, setUser] = useState<any>(null)
   const [profile, setProfile] = useState<profileType | null>(null)
   const [islogout, setIsLogout] = useState(false)
   const [isOpenLogin, setIsOpenLogin] = useState(false)
   const [isOpenLoginMobile, setIsOpenLoginMobile] = useState(false)
   const [IsopenregisterMobile, setIsOpenRegisterMobile] = useState(false)
   const [isOpenprofile, setIsOpenProfile] = useState(false)
   const [Isopenregister, setIsOpenRegister] = useState(false)

   const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
   })

   const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
   })




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
    if (profile) {
        const user = {
            ...profile,
            id: Date.now()
        };
        localStorage.setItem('user', JSON.stringify(user));
        Userlist.push(user)
        localStorage.setItem('userlist',JSON.stringify(Userlist))
        window.location.reload()
    }
   }, [profile]);

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
    navigate('/')

   }

   
   
//    nut đăng ký (register)
   const Userlist = JSON.parse(localStorage.getItem('userlist') || '[]')
    const handleregister = () => {

        const Userregister = Userlist.find((u:any) =>  u.email === registerForm.email)
        if(Userregister){
            alert('Email đã có người đăng ký')
            return
        }
        else if(registerForm.password_confirmation !== registerForm.password){
            alert('mật khẩu không giống nhau')
            return
        }
        else if(registerForm.password.length < 10){
            alert('Mật khẩu phải có ít nhất 10 ký tự')
            return
        }
        else if(registerForm.name.length < 5){
            alert('Tên phải có ít nhất 5 ký tự')
            return
        }else{
            alert('đăng ký thành công')
            
        }

        const newuser = {
            ...registerForm,
            picture: '',
            id: Date.now(),
        }
        Userlist.push(newuser)
        localStorage.setItem('userlist',JSON.stringify(Userlist))
        

    }
//


// nut đăng nhập (Login)

const handleLogin = () => {
    const UserLogin = JSON.parse(localStorage.getItem('userlist') || '[]');
    const User = UserLogin.find((u :any) => u.email === loginForm.email && u.password === loginForm.password)  
    if(!loginForm.email || !loginForm.password) {
        alert('Vui lòng nhập email và mật khẩu');
        return;
    }
    if(User){
        alert('Đăng nhập thành công')
        localStorage.setItem('user', JSON.stringify(User))
        window.location.reload();
    }
    else{
        alert('Sai email hoặc mật khẩu')
    }
}


//

return(
    <div>

        

        {UserInfore && UserInfore.email ? (
            <>
            <div onClick={() => setIsOpenProfile(!isOpenprofile)} className='flex justify-center items-center w-[60px] max-[1360px]:hidden'>
                <img src={UserInfore.picture} alt="avatar" className=' rounded-full border-4 border-white' />
            </div>
            <div className='text-white p-[10px] min-[1360px]:hidden'>
                <div className='flex justify-between mb-[10px]'>
                    <div className='flex justify-center items-center'>{UserInfore.name}</div>
                    <div className='flex justify-center items-center w-[30px] '>
                        <img src={UserInfore.picture} alt="avatar" className=' rounded-full border-4 border-white' />
                    </div>
                </div>
                <div className='flex flex-col'>
                        <Link to={'/user/favorite'}>
                        <div className='py-[9px] px-[16px] flex gap-2 text-[15px] border-1 border-white cursor-pointer rounded-md mb-[5px]'>
                            <i className='flex justify-center items-center'><Icon name='heart'/></i>
                            <span>Yêu thích</span>
                        </div>
                        </Link>
                        <Link to={'/user/playlist'}>
                        <div className='py-[9px] px-[16px] flex gap-2 text-[15px] border-1 border-white cursor-pointer rounded-md mb-[5px]'>
                            <i className='flex justify-center items-center'><Icon name='+'/></i>
                            <span>Danh sách</span>
                        </div>
                        </Link>
                        <div className='py-[9px] px-[16px] flex gap-2 text-[15px] border-1 border-white cursor-pointer rounded-md mb-[5px]'>
                            <i className='flex justify-center items-center'><Icon name='time'/></i>
                            <span>Xem tiếp</span>
                        </div>
                        <Link to={`/user/profile/${UserInfore.id}`}>
                        <div className='py-[9px] px-[16px] flex gap-2 text-[15px] border-1 border-white cursor-pointer rounded-md mb-[5px]'>
                            <i className='flex justify-center items-center'><Icon name='user'/></i>
                            <span>Tài khoản</span>
                        </div>
                        </Link>
                        <div onClick={handlelogout} className='py-[9px] px-[16px] flex gap-2 text-[15px] border-1 border-white rounded-md cursor-pointer'>
                            <i className='flex justify-center items-center'><Icon name='out'/></i>
                            <span>Đăng xuất</span>
                        </div>
                    </div>
            </div>
            </>

        ): (
            <div className='flex justify-center items-center'>
            <div>
            <a onClick={() => setIsOpenLogin(!isOpenLogin)}>
                <button className='px-[22px] py-[10px] bg-white rounded-4xl cursor-pointer max-[1360px]:hidden'>
                    <div className='flex gap-2'>
                        <p className='text-[14px] max-[1441px]:flex max-[1441px]:items-center'><Icon name='user'/></p>
                        <span className='text-[14px] max-[1441px]:flex max-[1441px]:items-center'>thành viên</span>
                    </div>
                </button>
            </a>
        </div>
        <div className='w-full min-[1360px]:hidden'>
            <a onClick={() => setIsOpenLoginMobile(!isOpenLoginMobile)}>
                <div className='mb-[15px] '>
                    <button className='px-[22px] py-[10px] w-full bg-white rounded-4xl'>
                        <div className='flex gap-2 justify-center items-center '>
                            <p><Icon name='user'/></p>
                            <span className='text-[14px]'>thành viên</span>
                        </div>
                    </button>
                </div>
            </a>
        </div>
            
            

            </div>
        )}

            {/* Dang nhap */}
            <div className={`fixed inset-0 flex items-center justify-center z-50 bg-[#1e25459d] transition-all duration-300  ${isOpenLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`flex w-[50%] transition-transform duration-500 ${isOpenLogin ? 'translate-y-0 max-[1360px]:translate-y-100' : 'translate-y-10 max-[1360px]:translate-y-110'}`}>
                    {/* Ảnh bên trái */}
                    <div className="hidden md:block w-2/5 relative overflow-hidden rounded-l-2xl">
                    <img 
                        src={rophimlogin} 
                        className="w-full h-full object-cover" 
                        alt="Login background"/>
                    </div>
                    
                    {/* Form bên phải */}
                    <div className="w-full md:w-3/5 bg-[#1E2545] p-8 md:p-12 rounded-2xl md:rounded-l-none md:rounded-r-2xl relative">
                    {/* Nút đóng */}
                    <button
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsOpenLogin(false)}>
                        <i className="text-xl"><Icon name='x'/></i>
                    </button>
                    
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white">Đăng nhập</h3>
                        <p className="text-gray-400 mt-2 text-[14px]">
                        Nếu bạn chưa có tài khoản, 
                        <a onClick={() => { setIsOpenRegister(!Isopenregister); setIsOpenLogin(false); }} className="text-amber-200 hover:text-amber-300 ml-1 cursor-pointer transition-colors">
                            Đăng ký ngay
                        </a>
                        </p>
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-gray-300 text-[14px] font-medium mb-[4px]">Email</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 pl-4 pr-4 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="email" 
                            placeholder="Nhập email của bạn" 
                            name="email" 
                            value={loginForm.email} 
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            />
                        </div>
                        
                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Mật khẩu</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 pl-4 pr-4 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            name="password" 
                            value={loginForm.password} 
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                        <a className="text-amber-200 hover:text-amber-300 text-sm font-medium cursor-pointer">
                            Quên mật khẩu?
                        </a>
                        </div>
                        
                        <button 
                        onClick={handleLogin} 
                        className="w-full bg-amber-200 text-black font-semibold py-3 rounded-lg hover:bg-[#a09253] transition-all duration-300 shadow-lg "
                        >
                        Đăng nhập
                        </button>
                        
                        <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-[#1E2545] text-gray-400 text-[14px]">hoặc đăng nhập với</span>
                        </div>
                        </div>
                        
                        <button 
                        onClick={() => login()} 
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg "
                        > 
                        <span className="text-lg"><Icon name='google'/></span>
                        <span>Google</span>
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Danng ky */}
            <div className={`fixed inset-0 flex items-center justify-center z-50 bg-[#1e25459d] transition-all duration-300 ${Isopenregister ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`flex w-[50%] transition-transform duration-500 ${Isopenregister ? 'translate-y-0' : 'translate-y-10'}`}>
                    {/* Ảnh bên trái */}
                    <div className="hidden md:block w-2/5 relative overflow-hidden rounded-l-2xl">
                    <img 
                        src={rophimlogin} 
                        className="w-full h-full object-cover" 
                        alt="Login background"/>
                    </div>
                    
                    {/* Form bên phải */}
                    <div className="w-full md:w-3/5 bg-[#1E2545] p-8 md:p-12 rounded-2xl md:rounded-l-none md:rounded-r-2xl relative">
                    {/* Nút đóng */}
                    <button
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsOpenRegister(false)}>
                        <i className="text-xl"><Icon name='x'/></i>
                    </button>
                    
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white">Tạo tài khoản mới</h3>
                        <p className="text-gray-400 mt-2 text-[14px]">
                        nếu bạn đã có tài khoản, 
                        <a onClick={() => { setIsOpenLogin(!isOpenLogin); setIsOpenRegister(false); }} className="text-amber-200 hover:text-amber-300 ml-1 cursor-pointer transition-colors">
                            Đăng nhập
                        </a>
                        </p>
                    </div>
                    
                    <div className="space-y-3">
                        <div>
                            <label className="block text-gray-300 text-[14px] font-medium mb-[4px]">Tên</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="name" 
                            placeholder="Tên hiển thị" 
                            name="name" 
                            value={registerForm.name} 
                            onChange={(e) => setRegisterForm({...registerForm,name: e.target.value})}
                            />
                        </div>
                        
                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            value={registerForm.email} 
                            onChange={(e) => setRegisterForm({...registerForm,email: e.target.value})}
                            />
                        </div>

                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Mật khẩu</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            name="password" 
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm,password: e.target.value})}
                            />
                        </div>

                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Nhập lại Mật khẩu</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="password" 
                            placeholder="Nhập lại mật khẩu" 
                            name="password" 
                            value={registerForm.password_confirmation}
                            onChange={(e) => setRegisterForm({...registerForm,password_confirmation: e.target.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                        <a className="text-amber-200 hover:text-amber-300 text-sm font-medium cursor-pointer">
                            Quên mật khẩu?
                        </a>
                        </div>
                        
                        <button 
                        onClick={handleregister} 
                        className="w-full bg-amber-200 text-black font-semibold py-3 rounded-lg hover:bg-[#a09253] transition-all duration-300 shadow-lg ">
                        Đăng ký
                        </button>
                        
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
                <Link to={`/user/profile/${UserInfore.id}`}>
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

            {/* OpenMobile */}

            {/* Dang nhap */}
            <div className={`fixed z-50 w-[900px] max-[1187px]:w-[700px] translate-x-60 max-[980px]:translate-x-40 max-[980px]:w-[600px] max-[800px]:w-[500px] max-[698px]:translate-x-20 max-[698px]:w-[400px] max-[557px]:translate-x-0 max-[430px]:w-[350px] max-[383px]:w-[280px]  transition-all duration-300  ${isOpenLoginMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`flex w-[90%] transition-transform duration-500 ${isOpenLoginMobile ? 'translate-y-20  max-[600px]:-translate-y-20 max-[350px]:-translate-y-50' : 'translate-y-10 max-[1360px]:translate-y-110'}`}>
                    {/* Ảnh bên trái */}
                    <div className="hidden md:block w-2/5 relative overflow-hidden rounded-l-2xl">
                    <img 
                        src={rophimlogin} 
                        className="w-full h-full object-cover" 
                        alt="Login background"/>
                    </div>
                    
                    {/* Form bên phải */}
                    <div className="w-full md:w-3/5 bg-[#1E2545] p-8 md:p-12 rounded-2xl md:rounded-l-none md:rounded-r-2xl relative">
                    {/* Nút đóng */}
                    <button
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsOpenLoginMobile(false)}>
                        <i className="text-xl"><Icon name='x'/></i>
                    </button>
                    
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white">Đăng nhập</h3>
                        <p className="text-gray-400 mt-2 text-[14px]">
                        Nếu bạn chưa có tài khoản, 
                        <a onClick={() => { setIsOpenRegisterMobile(!IsopenregisterMobile); setIsOpenLoginMobile(false); }} className="text-amber-200 hover:text-amber-300 ml-1 cursor-pointer transition-colors">
                            Đăng ký ngay
                        </a>
                        </p>
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-gray-300 text-[14px] font-medium mb-[4px]">Email</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 pl-4 pr-4 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="email" 
                            placeholder="Nhập email của bạn" 
                            name="email" 
                            value={loginForm.email} 
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            />
                        </div>
                        
                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Mật khẩu</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 pl-4 pr-4 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            name="password" 
                            value={loginForm.password} 
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                        <a className="text-amber-200 hover:text-amber-300 text-sm font-medium cursor-pointer">
                            Quên mật khẩu?
                        </a>
                        </div>
                        
                        <button 
                        onClick={handleLogin} 
                        className="w-full bg-amber-200 text-black font-semibold py-3 rounded-lg hover:bg-[#a09253] transition-all duration-300 shadow-lg "
                        >
                        Đăng nhập
                        </button>
                        
                        <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-[#1E2545] text-gray-400 text-[14px]">hoặc đăng nhập với</span>
                        </div>
                        </div>
                        
                        <button 
                        onClick={() => login()} 
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg "
                        > 
                        <span className="text-lg"><Icon name='google'/></span>
                        <span>Google</span>
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Danng ky */}
            <div className={`fixed z-50 w-[900px] max-[1187px]:w-[700px] translate-x-60 max-[980px]:translate-x-40 max-[980px]:w-[600px] max-[800px]:w-[500px] max-[698px]:translate-x-20 max-[698px]:w-[400px] max-[557px]:translate-x-0 max-[430px]:w-[350px] max-[383px]:w-[280px]  transition-all duration-300 ${IsopenregisterMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`flex w-[90%] transition-transform duration-500 ${IsopenregisterMobile ? '-translate-y-20 max-[500px]:-translate-y-50' : 'translate-y-10'}`}>
                    {/* Ảnh bên trái */}
                    <div className="hidden md:block w-2/5 relative overflow-hidden rounded-l-2xl">
                    <img 
                        src={rophimlogin} 
                        className="w-full h-full object-cover" 
                        alt="Login background"/>
                    </div>
                    
                    {/* Form bên phải */}
                    <div className="w-full md:w-3/5 bg-[#1E2545] p-8 md:p-12 rounded-2xl md:rounded-l-none md:rounded-r-2xl relative">
                    {/* Nút đóng */}
                    <button
                        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsOpenRegisterMobile(false)}>
                        <i className="text-xl"><Icon name='x'/></i>
                    </button>
                    
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white">Tạo tài khoản mới</h3>
                        <p className="text-gray-400 mt-2 text-[14px]">
                        nếu bạn đã có tài khoản, 
                        <a onClick={() => { setIsOpenLoginMobile(!isOpenLoginMobile); setIsOpenRegisterMobile(false); }} className="text-amber-200 hover:text-amber-300 ml-1 cursor-pointer transition-colors">
                            Đăng nhập
                        </a>
                        </p>
                    </div>
                    
                    <div className="space-y-3">
                        <div>
                            <label className="block text-gray-300 text-[14px] font-medium mb-[4px]">Tên</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="name" 
                            placeholder="Tên hiển thị" 
                            name="name" 
                            value={registerForm.name} 
                            onChange={(e) => setRegisterForm({...registerForm,name: e.target.value})}
                            />
                        </div>
                        
                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            value={registerForm.email} 
                            onChange={(e) => setRegisterForm({...registerForm,email: e.target.value})}
                            />
                        </div>

                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Mật khẩu</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            name="password" 
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm,password: e.target.value})}
                            />
                        </div>

                        <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Nhập lại Mật khẩu</label>
                            <input 
                            className="w-full bg-[#2A3352] text-white rounded-lg py-3 px-5 placeholder-gray-500 focus:ring-2 focus:ring-amber-200/50 focus:outline-none transition-all" 
                            type="password" 
                            placeholder="Nhập lại mật khẩu" 
                            name="password" 
                            value={registerForm.password_confirmation}
                            onChange={(e) => setRegisterForm({...registerForm,password_confirmation: e.target.value})}
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                        <a className="text-amber-200 hover:text-amber-300 text-sm font-medium cursor-pointer">
                            Quên mật khẩu?
                        </a>
                        </div>
                        
                        <button 
                        onClick={handleregister} 
                        className="w-full bg-amber-200 text-black font-semibold py-3 rounded-lg hover:bg-[#a09253] transition-all duration-300 shadow-lg ">
                        Đăng ký
                        </button>
                        
                    </div>
                    </div>
                </div>
            </div>
            
            
            
    </div>
)

   
}