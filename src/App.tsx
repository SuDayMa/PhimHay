
import './App.css'
import './tailwin.css'
import Header from './Component/Header'
import Footer from './Component/Footer'
import Home from './pages/Home'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Chude from './pages/chude'
import Quocgia from './pages/quocgia'
import QuocGiaDetail from './pages/QuocGiaDetail'
import Theloai from './pages/theloai'
import TheLoaiDetail from './pages/TheLoaiDetail'
import Phim from './pages/Phim'
import Danhsach from './pages/Danhsach'
import SearchMovie from './pages/SearchMovie'
import C from "./pages/c"
import Video from './pages/Video'
import ScrollToTop from './pages/ScrollToTop'
import Year from './pages/Year'
import Userlayer from './pages/User/userlayer'
import Favorite from './pages/User/Favorite'
import Playlist from './pages/User/Playlist'
import Profile from './pages/User/Profile'

function AppRouter() {
  return(
    <div className='bg-[#191B24]'>
      <Header/>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chu-de' element={<Chude />} />
        <Route path='/quoc-gia' element={<Quocgia />} />
        <Route path='/quoc-gia/:type_list' element={<QuocGiaDetail />} />
        <Route path='/the-loai' element={<Theloai />} />
        <Route path='/the-loai/:type_list' element={<TheLoaiDetail />} />
        <Route path='/phim/:slug' element={<Phim />}/>
        <Route path='/danh-sach/:type_list' element={<Danhsach />} />
        <Route path='/tim-kiem' element={<SearchMovie />}/>
        <Route path='/c/:type_list' element={<C />} />
        <Route path='/Player/:slug/:server/:episodeSlug' element={<Video />} />
        <Route path='/year/:type_list' element={<Year />} />
        <Route path='/User/*' element={<Userlayer />} >
          <Route path='Favorite' element={<Favorite />} />
          <Route path='Playlist' element={<Playlist />} />
          <Route path='Profile' element={<Profile />} />
        </Route>
      </Routes>
      <Footer/>
    </div>
  ) 
}
function App() {

  
  return (
      
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    
  )
}

export default App
