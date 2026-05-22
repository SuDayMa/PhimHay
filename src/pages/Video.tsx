import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import ReactPlayer from 'react-player'
import { useState, useEffect } from "react";
import { PhimAPI } from "../Services/API";
import type { Phim } from "../types/Phimtype";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from './Loading';
import Icon from '../Component/Icon';
// ... (Giữ nguyên các import bên trên)

export default function Video() {
  const { slug, server, episodeSlug } = useParams();
  const navigate = useNavigate();
  const [phim, setPhim] = useState<Phim | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState<string | null>(server || null);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [loadingPhimData, setLoadingPhimData] = useState(true);

  // 1. Thêm state để kiểm tra thiết bị (Mobile hay Desktop)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Dưới 1024px (tablet/mobile) sẽ được coi là mobile để ẩn Media Chrome
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadingPhim = async () => {
      try {
        setLoading(true);
        if (!slug) return;
        const PhimData = await PhimAPI(slug);
        if (PhimData) {
          setPhim(PhimData);
          if (server && PhimData.episodes.find((item: any) => item.server_name === server)) {
            setSelectedServer(server);
          } else if (PhimData.episodes && PhimData.episodes.length > 0) {
            setSelectedServer(PhimData.episodes[0].server_name);
          } else {
            setSelectedServer(null);
          }
        }
      } catch (error) {
        console.error("Error fetching Phim data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadingPhim();
    // Cuộn lên đầu trang khi đổi tập
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, server, episodeSlug]);

  useEffect(() => {
    if (phim && selectedServer && episodeSlug) {
      const serverData = phim.episodes.find((item) => item.server_name === selectedServer)?.server_data;
      const episodeIndex = serverData?.findIndex((ep) => ep.slug === episodeSlug) || 0;
      setCurrentEpisodeIndex(episodeIndex >= 0 ? episodeIndex : 0);
    }
  }, [phim, selectedServer, episodeSlug]);

  const handleNextEpisode = () => {
    const serverData = phim?.episodes.find((item) => item.server_name === selectedServer)?.server_data;
    if (serverData && currentEpisodeIndex < serverData.length - 1) {
      const nextEpisode = serverData[currentEpisodeIndex + 1];
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      navigate(`/Player/${slug}/${encodeURIComponent(selectedServer || "")}/${nextEpisode.slug}`);
    } else {
      setCurrentEpisodeIndex(0);
      navigate(`/Player/${slug}/${encodeURIComponent(selectedServer || "")}/${serverData?.[0].slug || ""}`);
    }
  };

  const tapphim = phim?.episodes
    .find((item) => item.server_name === selectedServer)
    ?.server_data.find((server) => server.slug === episodeSlug);

  useEffect(() => {
    setLoadingPhimData(true);
    if (tapphim) {
      setLoadingPhimData(false);
    }
  }, [tapphim]);

  const handleVideoEnded = () => {
    if (autoPlayNext) {
      handleNextEpisode();
    }
  };

  const toggleAutoPlayNext = () => {
    setAutoPlayNext(!autoPlayNext);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-[#0f111a] min-h-screen">
          <div className="mx-[330px] max-[2000px]:mx-[128px] max-[1100px]:mx-0 px-[50px] max-[587px]:px-[20px] items-center pt-[50px]">
            <div className="relative overflow-hidden rounded-t-2xl shadow-lg shadow-black aspect-video bg-black">
              {loadingPhimData ? (
                <div className="h-full flex justify-center items-center text-[#ffff] text-4xl md:text-6xl">
                  Loading...
                </div>
              ) : (
                <MediaController style={{ width: "100%", height: "100%" }}>
                  <ReactPlayer
                    slot="media"
                    src={tapphim?.link_m3u8}
                    // 2. Bật controls của trình duyệt trên Mobile, tắt trên Desktop
                    controls={isMobile}
                    playing={true}
                    pip={true}
                    width="100%"    
                    height="100%"
                    className="outline-0"
                    onEnded={handleVideoEnded}
                  />

                  {/* 3. Chỉ hiện MediaControlBar trên màn hình lớn (Desktop) */}
                  <MediaControlBar className="hidden lg:flex bg-[#1a1c2a41] text-[#ffff] w-full">
                    <MediaPlayButton className="px-3" />
                    <MediaSeekBackwardButton seekOffset={10} className="px-2" />
                    <MediaSeekForwardButton seekOffset={10} className="px-2" />
                    <MediaTimeRange />
                    <MediaTimeDisplay showDuration className="px-2" />
                    <MediaMuteButton className="px-1" />
                    <MediaVolumeRange />
                    <MediaPlaybackRateButton />
                    <MediaFullscreenButton className="px-5" />
                  </MediaControlBar>
                </MediaController>
              )}
            </div>

            {/* Phần Action Bar (Yêu thích, Chia sẻ...) */}
            <div className="bg-black text-[#ffff] -translate-y-2 rounded-b-2xl shadow-lg shadow-black">
              <div className="px-[16px] flex gap-3 py-[16px] max-[400px]:text-[12px] max-[350px]:text-[10px]">
                <div className="px-[9px] max-[350px]:px-0 py-[12px] flex gap-2 hover:bg-gray-800 rounded-md cursor-pointer">
                  <i><Icon name="heart" /></i>
                  <span>Yêu thích</span>
                </div>
                <div className="px-[9px] max-[350px]:px-0 py-[12px] flex gap-2 hover:bg-gray-800 rounded-md cursor-pointer">
                  <i><Icon name="+" /></i>
                  <span>Thêm vào</span>
                </div>
                <div className="px-[9px] max-[350px]:px-0 py-[12px] flex gap-2 hover:bg-gray-800 rounded-md cursor-pointer">
                  <i><Icon name="telegram" /></i>
                  <span>Chia sẻ</span>
                </div>
                <div
                  onClick={toggleAutoPlayNext}
                  className={`px-[9px] max-[350px]:px-0 py-[12px] flex gap-2 hover:bg-gray-800 rounded-md max-[991px]:hidden cursor-pointer`}
                >
                  <span>Chuyển tiếp</span>
                  <div
                    className={`border-1 text-[9px] border-amber-200 px-[8px] flex justify-center items-center rounded-md ${
                      autoPlayNext ? "border-amber-200" : "border-gray-50"
                    }`}
                  >
                    <span>{autoPlayNext ? "ON" : "OFF"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách tập phim và thông tin */}
          <div className="mx-[330px] max-[2000px]:mx-[128px] max-[1100px]:mx-0 px-[50px] max-[500px]:px-[20px]">
            <div className="p-[40px] max-[587px]:p-0">
                {/* (Phần thông tin phim giữ nguyên code của bạn...) */}
                <div className="pb-[40px] flex gap-5 text-[#ffff] max-[1100px]:hidden">
                    <div>
                        <img src={phim?.movie.poster_url} className='w-[100px] rounded-lg' alt="poster"/>
                    </div>
                    <div className='w-[40%]'>
                        <h2 className='mb-[8px] font-medium text-[20px]'>{phim?.movie.name}</h2>
                        <div className='mb-[20px] text-amber-200'>{phim?.movie.origin_name}</div>
                    </div>
                    <div className='w-[50%]'>
                        <div className='mb-[24px] text-gray-400'>{phim?.movie.content}</div>
                        <Link to={`/phim/${slug}`} className='text-amber-200'>Thông tin phim <i className='text-[17px] items-center'><Icon name='small right'/></i></Link>
                    </div>
                </div>

                <hr className="text-gray-700 w-[90%]"></hr>
                
                <div className="mt-[30px]">
                    <div className="flex gap-4 mb-[20px] overflow-x-auto pb-2">
                        {phim?.episodes.filter((item) => item.server_name).map((item) => (
                        <Link key={item.server_name} to={`/Player/${slug}/${encodeURIComponent(item.server_name)}/${episodeSlug}`}>
                            <button
                            onClick={() => setSelectedServer(item.server_name)}
                            className={`px-[16px] py-[8px] rounded-md whitespace-nowrap ${
                                selectedServer === item.server_name ? "bg-yellow-200 text-black" : "bg-gray-700 text-[#ffff]"
                            }`}
                            >
                            {item.server_name}
                            </button>
                        </Link>
                        ))}
                    </div>

                    {phim?.episodes
                        .filter((item) => item.server_name === selectedServer)
                        .map((item, id) => (
                        <div key={id}>
                            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 text-[#ffff]">
                            {item.server_data.map((server, index) => (
                                <Link key={index} to={`/Player/${slug}/${encodeURIComponent(item.server_name)}/${server.slug}`}>
                                <div
                                    className={`p-[10px] m-[5px] rounded-md transition-all duration-300 justify-center gap-2 flex ${
                                    server.slug === episodeSlug && item.server_name === selectedServer
                                        ? "bg-yellow-200 text-black"
                                        : "bg-[#282B3A]"
                                    }`}
                                >
                                    <span className="text-current self-center"><Icon name="right" /></span>
                                    <span className="text-current">{server.name}</span>
                                </div>
                                </Link>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}