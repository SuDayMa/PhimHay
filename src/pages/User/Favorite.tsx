export default function Favorite () {
    return(
        <div>
            <div className="text-white">
                <div className="flex flex-col mb-[32px] gap-5">
                    <div className="text-[20px] font-semibold">Yêu thích</div>
                    <div className="flex">
                        <div className="rounded-full bg-white text-black flex justify-center py-[8px] px-[16px] w-[100px]">Phim</div>
                    </div>
                </div>
                <div className="py-[48px] px-[32px] text-center rounded-2xl bg-[#14161D]">
                    Bạn chưa có phim yêu thích nào
                </div>
            </div>
        </div>
    )
}